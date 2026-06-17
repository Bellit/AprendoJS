export interface TestExpression {
  type: 'expression' | 'function';
  code: string;
  expected?: unknown;
}

export type Test = string | TestExpression;

export interface Lesson {
  id: number;
  module: string;
  title: string;
  theory: string;
  exercise: string;
  solution: string;
  tests: Test[];
}

export type ModuleGroup = Record<string, Lesson[]>;

export interface WorkerResult {
  passed: boolean;
  failedIndex: number | null;
  logs: string[];
  errorLine?: number;
}

export type LessonResult =
  | { status: 'idle' }
  | { status: 'success'; message: string; nextLessonId?: number }
  | { status: 'error'; message: string; nextLessonId?: number }
  | { status: 'info'; message: string }
  | { status: 'loading'; message: string };

export function isLesson(value: unknown): value is Lesson {
  if (!value || typeof value !== 'object') return false;
  const candidate = value as Record<string, unknown>;
  return (
    typeof candidate.id === 'number' &&
    typeof candidate.title === 'string'
  );
}
