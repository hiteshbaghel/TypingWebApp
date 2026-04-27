'use client';

import { useRef, useEffect, useCallback } from 'react';
import { useTypingStore } from '@/store/typingStore';
import styles from './TypingInput.module.css';

export default function TypingInput() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const sessionState = useTypingStore(s => s.sessionState);
  const currentInput = useTypingStore(s => s.currentInput);
  const updateCurrentInput = useTypingStore(s => s.updateCurrentInput);
  const commitWord = useTypingStore(s => s.commitWord);
  const goBackOneWord = useTypingStore(s => s.goBackOneWord);
  const incrementBackspace = useTypingStore(s => s.incrementBackspace);
  const incrementKeyDepressions = useTypingStore(s => s.incrementKeyDepressions);

  // Sync textarea value when currentInput changes externally (e.g. goBackOneWord)
  useEffect(() => {
    if (textareaRef.current && textareaRef.current.value !== currentInput) {
      textareaRef.current.value = currentInput;
    }
  }, [currentInput]);

  // Auto-focus when session becomes active
  useEffect(() => {
    if (sessionState === 'active') {
      textareaRef.current?.focus();
    }
  }, [sessionState]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (sessionState !== 'active') return;

    // Anti-cheat: block ctrl/cmd combos (copy/paste/cut etc.)
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      return;
    }

    incrementKeyDepressions();

    // Tab key — paragraph indentation (SSC)
    if (e.key === 'Tab') {
      e.preventDefault();
      // Treat Tab as space advancement for now; full paragraphing in Phase 4
      const val = textareaRef.current?.value ?? '';
      commitWord(val.trim());
      if (textareaRef.current) textareaRef.current.value = '';
      return;
    }

    if (e.key === 'Backspace') {
      incrementBackspace();
      // Allow backspace to go back one word if input is empty
      const val = textareaRef.current?.value ?? '';
      if (val === '') {
        e.preventDefault();
        goBackOneWord();
      }
      return;
    }

    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      const val = textareaRef.current?.value ?? '';
      if (val.trim() === '') return; // don't commit empty
      commitWord(val.trim());
      if (textareaRef.current) textareaRef.current.value = '';
    }
  }, [sessionState, commitWord, goBackOneWord, incrementBackspace, incrementKeyDepressions]);

  const handleInput = useCallback((e: React.FormEvent<HTMLTextAreaElement>) => {
    const val = (e.target as HTMLTextAreaElement).value;
    // Prevent space from being typed (we handle it in keydown)
    if (val.includes(' ')) {
      const trimmed = val.replace(/\s/g, '');
      if (textareaRef.current) textareaRef.current.value = trimmed;
      updateCurrentInput(trimmed);
    } else {
      updateCurrentInput(val);
    }
  }, [updateCurrentInput]);

  if (sessionState !== 'active') return null;

  return (
    <textarea
      ref={textareaRef}
      className={styles.input}
      onKeyDown={handleKeyDown}
      onInput={handleInput}
      onPaste={(e) => e.preventDefault()}
      onContextMenu={(e) => e.preventDefault()}
      onDrop={(e) => e.preventDefault()}
      onCopy={(e) => e.preventDefault()}
      onCut={(e) => e.preventDefault()}
      autoComplete="off"
      autoCorrect="off"
      autoCapitalize="off"
      spellCheck={false}
      rows={1}
      aria-label="Typing input — start typing to practice"
    />
  );
}
