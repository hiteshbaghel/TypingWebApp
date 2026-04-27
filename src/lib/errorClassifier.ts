import type { CharResult, CharStatus, WordResult, WordStatus, ExamMode } from '@/types/typing';

/** Build per-character results comparing typed vs reference word */
export function buildCharResults(typed: string, reference: string): CharResult[] {
  return Array.from(reference).map((char, i) => ({
    char,
    status: (i < typed.length ? (typed[i] === char ? 'correct' : 'error') : 'error') as CharStatus,
  }));
}

/** Live character results while the user is still typing the current word */
export function buildLiveCharResults(input: string, reference: string): CharResult[] {
  return Array.from(reference).map((char, i) => ({
    char,
    status: (
      i < input.length ? (input[i] === char ? 'correct' : 'error') : 'pending'
    ) as CharStatus,
  }));
}

/** Classify a completed word against its reference */
export function classifyWord(typed: string, reference: string): Pick<WordResult, 'errorType' | 'charResults' | 'status'> {
  if (typed === reference) {
    return {
      errorType: 'none',
      status: 'correct',
      charResults: Array.from(reference).map(c => ({ char: c, status: 'correct' as CharStatus })),
    };
  }
  if (typed.toLowerCase() === reference.toLowerCase()) {
    return {
      errorType: 'half',
      status: 'error-half',
      charResults: buildCharResults(typed, reference),
    };
  }
  return {
    errorType: 'full',
    status: 'error-full',
    charResults: buildCharResults(typed, reference),
  };
}

/** SSC error percentage formula */
export function calcSSCErrorPercent(fullMistakes: number, halfMistakes: number, totalWords: number): number {
  if (totalWords === 0) return 0;
  return ((fullMistakes + halfMistakes * 0.5) / totalWords) * 100;
}

/** SSC pass threshold by category */
export function sscPassThreshold(category: 'UR' | 'OBC' | 'SCST'): number {
  return category === 'UR' ? 20 : category === 'OBC' ? 25 : 30;
}

/** RRB Net WPM formula */
export function calcRRBNetWpm(totalWords: number, totalMistakes: number, durationMinutes: number): number {
  const errorAllowance = Math.floor(0.05 * totalWords);
  const finalMistakes = Math.max(0, totalMistakes - errorAllowance);
  const penalty = finalMistakes * 10;
  return Math.max(0, (totalWords - penalty) / durationMinutes);
}

/** Banking gross WPM: 1 word = 5 characters */
export function calcBankingGrossWpm(totalChars: number, durationMinutes: number): number {
  return totalChars / 5 / durationMinutes;
}

/** Compute final metrics for a completed session */
export function computeMetrics(
  wordResults: WordResult[],
  elapsedSeconds: number,
  backspaceCount: number,
  keyDepressions: number,
  examMode: ExamMode,
): import('@/types/typing').SessionMetrics {
  const durationMinutes = elapsedSeconds / 60 || 1;
  const totalTyped = wordResults.filter(w => w.status !== 'pending' && w.status !== 'current');
  const fullMistakes = totalTyped.filter(w => w.errorType === 'full').length;
  const halfMistakes = totalTyped.filter(w => w.errorType === 'half').length;
  const correct = totalTyped.filter(w => w.errorType === 'none').length;
  const totalWords = totalTyped.length;
  const totalChars = totalTyped.reduce((acc, w) => acc + w.typed.length + 1, 0);

  const grossWpm = totalWords / durationMinutes;
  const errors = fullMistakes + halfMistakes;
  const accuracy = totalWords > 0 ? (correct / totalWords) * 100 : 0;

  let netWpm: number;
  if (examMode === 'RRB') {
    netWpm = calcRRBNetWpm(totalWords, errors, durationMinutes);
  } else if (examMode === 'Bank') {
    netWpm = calcBankingGrossWpm(totalChars, durationMinutes) - errors / durationMinutes;
  } else {
    netWpm = Math.max(0, grossWpm - errors / durationMinutes);
  }

  return {
    grossWpm: Math.round(grossWpm * 10) / 10,
    netWpm: Math.round(netWpm * 10) / 10,
    accuracy: Math.round(accuracy * 10) / 10,
    fullMistakes,
    halfMistakes,
    keyDepressions,
    backspaceCount,
    errorPercent: Math.round(calcSSCErrorPercent(fullMistakes, halfMistakes, totalWords) * 10) / 10,
  };
}
