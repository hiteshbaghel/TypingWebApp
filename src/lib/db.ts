import Dexie, { type Table } from 'dexie';
import type { SessionMetrics, ExamMode, Difficulty } from '@/types/typing';

export interface TypingSessionRecord {
  id?: number;
  date: string; // ISO string
  examMode: ExamMode;
  difficulty: Difficulty;
  duration: number;
  metrics: SessionMetrics;
}

export class TypingDatabase extends Dexie {
  sessions!: Table<TypingSessionRecord, number>;

  constructor() {
    super('TypingProDB');
    this.version(1).stores({
      sessions: '++id, date, examMode, difficulty',
    });
  }
}

export const db = new TypingDatabase();
