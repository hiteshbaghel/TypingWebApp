export type ExamMode = 'SSC' | 'RRB' | 'Bank' | 'Standard';
export type SessionState = 'idle' | 'loading' | 'active' | 'completed';
export type Difficulty = 'easy' | 'medium' | 'hard' | 'numerical';
export type CharStatus = 'pending' | 'correct' | 'error';
export type WordStatus = 'pending' | 'current' | 'correct' | 'error-full' | 'error-half' | 'omitted';

export interface CharResult {
  char: string;
  status: CharStatus;
}

export interface WordResult {
  reference: string;
  typed: string;
  status: WordStatus;
  charResults: CharResult[];
  errorType: 'none' | 'full' | 'half';
}

export interface SessionMetrics {
  grossWpm: number;
  netWpm: number;
  accuracy: number;
  fullMistakes: number;
  halfMistakes: number;
  keyDepressions: number;
  backspaceCount: number;
  errorPercent: number;
}

export const DURATION_OPTIONS: { label: string; value: number; desc: string }[] = [
  { label: '1 min',  value: 1,  desc: 'Warm-up'           },
  { label: '3 min',  value: 3,  desc: 'Speed Drill'       },
  { label: '5 min',  value: 5,  desc: 'Speed Drill'       },
  { label: '10 min', value: 10, desc: 'SSC / RRB'         },
  { label: '15 min', value: 15, desc: 'SSC Standard'      },
  { label: '20 min', value: 20, desc: 'Banking'           },
  { label: '25 min', value: 25, desc: 'Banking'           },
  { label: '30 min', value: 30, desc: 'Banking Descriptive'},
];
