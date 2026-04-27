import { create } from 'zustand';
import type { ExamMode, SessionState, WordResult, SessionMetrics, Difficulty } from '@/types/typing';
import { classifyWord, computeMetrics } from '@/lib/errorClassifier';

function tokenize(text: string): string[] {
  return text.trim().split(/\s+/);
}

function initWordResults(words: string[]): WordResult[] {
  return words.map((w, i) => ({
    reference: w,
    typed: '',
    status: i === 0 ? 'current' : 'pending',
    charResults: Array.from(w).map(c => ({ char: c, status: 'pending' as const })),
    errorType: 'none',
  }));
}

interface TypingStore {
  examMode: ExamMode;
  duration: number;
  difficulty: Difficulty;
  sessionState: SessionState;
  elapsedSeconds: number;
  textId: string;
  passage: string;
  words: string[];
  wordResults: WordResult[];
  currentWordIndex: number;
  currentInput: string;
  backspaceCount: number;
  keyDepressions: number;
  metrics: SessionMetrics | null;

  setExamMode: (mode: ExamMode) => void;
  setDuration: (minutes: number) => void;
  setDifficulty: (diff: Difficulty) => void;
  startSession: () => Promise<void>;
  endSession: () => Promise<void>;
  resetSession: () => void;
  tick: () => void;
  updateCurrentInput: (input: string) => void;
  commitWord: (typed: string) => void;
  goBackOneWord: () => void;
  incrementBackspace: () => void;
  incrementKeyDepressions: () => void;
}

export const useTypingStore = create<TypingStore>((set, get) => {
  return {
    examMode: 'SSC',
    duration: 5,
    difficulty: 'easy',
    sessionState: 'idle',
    elapsedSeconds: 0,
    textId: '',
    passage: '',
    words: [],
    wordResults: [],
    currentWordIndex: 0,
    currentInput: '',
    backspaceCount: 0,
    keyDepressions: 0,
    metrics: null,

    setExamMode: (mode) => set({ examMode: mode }),
    setDuration: (minutes) => set({ duration: minutes }),
    setDifficulty: (diff) => set({ difficulty: diff }),

    startSession: async () => {
      set({ sessionState: 'loading' });
      try {
        const { difficulty } = get();
        // Fetch index to find passage list
        const idxRes = await fetch('/corpus/index.json');
        const allPassages: {id: string, difficulty: string, wordCount: number}[] = await idxRes.json();
        
        // Filter by difficulty
        const available = allPassages.filter(p => p.difficulty === difficulty);
        if (available.length === 0) throw new Error(`No passages for difficulty ${difficulty}`);
        
        // Prevent repeats within 24h
        const seenStr = localStorage.getItem('typing_seen_passages');
        let seen: Record<string, number> = seenStr ? JSON.parse(seenStr) : {};
        const now = Date.now();
        // Cleanup older than 24h
        seen = Object.fromEntries(Object.entries(seen).filter(([, time]) => now - time < 24 * 60 * 60 * 1000));
        
        let availableUnseen = available.filter(p => !seen[p.id]);
        if (availableUnseen.length === 0) {
          // Fallback to allowing repeats if all have been seen
          availableUnseen = available;
        }
        
        // Pick random
        const pMeta = availableUnseen[Math.floor(Math.random() * availableUnseen.length)];
        
        // Mark as seen
        seen[pMeta.id] = now;
        localStorage.setItem('typing_seen_passages', JSON.stringify(seen));
        
        // Fetch passage
        const pRes = await fetch(`/corpus/${difficulty}/${pMeta.id}.json`);
        const pData: {id: string, text: string} = await pRes.json();
        
        const words = tokenize(pData.text);
        set({
          sessionState: 'active',
          elapsedSeconds: 0,
          textId: pData.id,
          passage: pData.text,
          words,
          wordResults: initWordResults(words),
          currentWordIndex: 0,
          currentInput: '',
          backspaceCount: 0,
          keyDepressions: 0,
          metrics: null,
        });
      } catch (err) {
        console.error("Failed to load passage:", err);
        set({ sessionState: 'idle' });
        alert("Failed to load passage. Please try again.");
      }
    },

    endSession: async () => {
      const { wordResults, elapsedSeconds, backspaceCount, keyDepressions, examMode, difficulty, duration } = get();
      const metrics = computeMetrics(wordResults, elapsedSeconds, backspaceCount, keyDepressions, examMode);
      set({ sessionState: 'completed', metrics });
      
      try {
        const { db } = await import('@/lib/db');
        await db.sessions.add({
          date: new Date().toISOString(),
          examMode,
          difficulty,
          duration,
          metrics,
        });
      } catch (err) {
        console.error("Failed to save session:", err);
      }
    },

    resetSession: () => {
      set({
        sessionState: 'idle',
        elapsedSeconds: 0,
        currentWordIndex: 0,
        currentInput: '',
        backspaceCount: 0,
        keyDepressions: 0,
        metrics: null,
      });
    },

    tick: () => {
      const { elapsedSeconds, duration, sessionState } = get();
      if (sessionState !== 'active') return;
      const next = elapsedSeconds + 1;
      if (next >= duration * 60) {
        get().endSession();
      } else {
        set({ elapsedSeconds: next });
      }
    },

    updateCurrentInput: (input) => set({ currentInput: input }),

    commitWord: (typed) => {
      const { words, wordResults, currentWordIndex } = get();
      const reference = words[currentWordIndex];
      if (!reference) return;

      // 3-word resync window: check if typed matches a future word
      let advance = 1;
      let commitIndex = currentWordIndex;

      if (typed !== reference && typed !== '') {
        for (let lookahead = 1; lookahead <= 3; lookahead++) {
          const futureRef = words[currentWordIndex + lookahead];
          if (futureRef && typed === futureRef) {
            // Mark skipped words as omitted (full mistake)
            for (let k = 0; k < lookahead; k++) {
              wordResults[currentWordIndex + k] = {
                ...wordResults[currentWordIndex + k],
                typed: '',
                status: 'omitted',
                errorType: 'full',
                charResults: Array.from(words[currentWordIndex + k]).map(c => ({ char: c, status: 'error' as const })),
              };
            }
            commitIndex = currentWordIndex + lookahead;
            advance = lookahead + 1;
            break;
          }
        }
      }

      // Classify the committed word
      const classification = classifyWord(typed, words[commitIndex]);
      const newResults = [...wordResults];
      newResults[commitIndex] = {
        reference: words[commitIndex],
        typed,
        status: classification.status,
        charResults: classification.charResults,
        errorType: classification.errorType,
      };

      const nextIndex = currentWordIndex + advance;
      if (nextIndex < words.length) {
        newResults[nextIndex] = { ...newResults[nextIndex], status: 'current' };
      }

      set({
        wordResults: newResults,
        currentWordIndex: nextIndex,
        currentInput: '',
      });
    },

    goBackOneWord: () => {
      const { currentWordIndex, wordResults, words } = get();
      if (currentWordIndex === 0) return;
      const prevIndex = currentWordIndex - 1;
      const prevTyped = wordResults[prevIndex].typed;
      
      const newResults = [...wordResults];
      // Reset the previous word to current
      newResults[prevIndex] = {
        reference: words[prevIndex],
        typed: '',
        status: 'current',
        charResults: Array.from(words[prevIndex]).map(c => ({ char: c, status: 'pending' as const })),
        errorType: 'none',
      };
      
      // If we are not past the end, reset the current word to pending
      if (currentWordIndex < words.length) {
        newResults[currentWordIndex] = {
          ...newResults[currentWordIndex],
          status: 'pending',
          typed: '',
          charResults: Array.from(words[currentWordIndex]).map(c => ({ char: c, status: 'pending' as const })),
        };
      }
      
      set({
        wordResults: newResults,
        currentWordIndex: prevIndex,
        currentInput: prevTyped,
      });
    },

    incrementBackspace: () => set(s => ({ backspaceCount: s.backspaceCount + 1 })),
    incrementKeyDepressions: () => set(s => ({ keyDepressions: s.keyDepressions + 1 })),
  };
});
