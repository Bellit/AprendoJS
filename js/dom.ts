import type { LessonResult } from './types';
import { DOM_IDS, CSS_CLASSES } from './constants';

export function getEl<T extends HTMLElement>(id: string): T | null {
  return document.getElementById(id) as T | null;
}

export function getLessonItems(): NodeListOf<HTMLLIElement> {
  return document.querySelectorAll<HTMLLIElement>(CSS_CLASSES.LESSON_LIST_ITEM);
}

export function showResult(
  result: LessonResult,
  onNext?: (id: number) => void
): void {
  const resultArea = getEl<HTMLDivElement>(DOM_IDS.RESULT_AREA);
  const resultMsg = getEl<HTMLParagraphElement>(DOM_IDS.RESULT_MSG);
  if (!resultArea || !resultMsg) return;

  resultArea.classList.remove(CSS_CLASSES.HIDDEN, CSS_CLASSES.SUCCESS, CSS_CLASSES.ERROR, CSS_CLASSES.INFO);

  const existingBtn = document.getElementById(DOM_IDS.NEXT_LESSON_BTN);
  if (existingBtn) existingBtn.remove();

  if (result.status === 'success') {
    resultArea.classList.add(CSS_CLASSES.SUCCESS);
    resultMsg.textContent = result.message;
    if (result.nextLessonId && onNext) {
      const btn = document.createElement('button');
      btn.id = DOM_IDS.NEXT_LESSON_BTN;
      btn.className = 'btn btn-next';
      btn.textContent = 'Siguiente lección →';
      btn.setAttribute('aria-label', 'Ir a la siguiente lección');
      btn.addEventListener('click', () => onNext(result.nextLessonId!));
      resultArea.appendChild(btn);
    }
  } else if (result.status === 'error') {
    resultArea.classList.add(CSS_CLASSES.ERROR);
    resultMsg.textContent = result.message;
  } else if (result.status === 'info') {
    resultArea.classList.add(CSS_CLASSES.INFO);
    resultMsg.textContent = result.message;
  } else {
    resultArea.classList.add(CSS_CLASSES.HIDDEN);
  }
}
