export interface Lesson {
  id: number;
  module: string;
  title: string;
  theory: string;
  exercise: string;
  solution: string;
  tests: string[];
}

export type ModuleGroup = Record<string, Lesson[]>;

export type LessonResult =
  | { status: 'idle' }
  | { status: 'success'; message: string; nextLessonId?: number }
  | { status: 'error'; message: string; nextLessonId?: number }
  | { status: 'info'; message: string };

export function isLesson(value: unknown): value is Lesson {
  if (!value || typeof value !== 'object') return false;
  const candidate = value as Record<string, unknown>;
  return (
    typeof candidate.id === 'number' &&
    typeof candidate.title === 'string'
  );
}
