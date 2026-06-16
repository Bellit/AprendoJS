const STORAGE_PROGRESS = 'aprendojs_progress';
const STORAGE_CODE = 'aprendojs_code_';

export function getProgress(): number[] {
  try {
    const data = localStorage.getItem(STORAGE_PROGRESS);
    if (!data) return [];
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) ? parsed.filter((id): id is number => typeof id === 'number' && Number.isInteger(id) && id > 0) : [];
  } catch {
    return [];
  }
}

export function saveProgress(ids: number[]): void {
  localStorage.setItem(STORAGE_PROGRESS, JSON.stringify(ids));
}

export function getSavedCode(lessonId: number, maxSize = 10240): string {
  try {
    const code = localStorage.getItem(STORAGE_CODE + lessonId) || '';
    return code.length > maxSize ? code.slice(0, maxSize) : code;
  } catch {
    return '';
  }
}

export function saveCode(lessonId: number, code: string): void {
  try {
    localStorage.setItem(STORAGE_CODE + lessonId, code);
  } catch { }
}

export function removeSavedCode(lessonId: number): void {
  try {
    localStorage.removeItem(STORAGE_CODE + lessonId);
  } catch { }
}
