import type { Lesson, ModuleGroup, Test, TestExpression, WorkerResult } from './types';
import LESSONS from './lessons';
import { getEl, showResult, getLessonItems } from './dom';
import { renderTheory } from './renderer';
import { parseError } from './errors';
import { getProgress, saveProgress, getSavedCode, saveCode, removeSavedCode } from './storage';
import { setTheme, loadTheme } from './theme';
import { initEditor, clearErrorHighlights, highlightErrorLine } from './editor';
import { DOM_IDS, CSS_CLASSES } from './constants';

let lessons: Lesson[] = [];
let currentLesson: Lesson | null = null;
let editor: CodeMirror.Editor | null = null;
let completedIds: Set<number> = new Set();

const theoryArea = getEl<HTMLDivElement>(DOM_IDS.THEORY_AREA);
const exerciseArea = getEl<HTMLDivElement>(DOM_IDS.EXERCISE_AREA);
const exerciseTitle = getEl<HTMLHeadingElement>(DOM_IDS.EXERCISE_TITLE);
const exerciseDesc = getEl<HTMLParagraphElement>(DOM_IDS.EXERCISE_DESC);
const resultOutput = getEl<HTMLPreElement>(DOM_IDS.RESULT_OUTPUT);

export function updateProgressBar(): void {
  const fill = getEl<HTMLDivElement>(DOM_IDS.PROGRESS_FILL);
  const text = getEl<HTMLSpanElement>(DOM_IDS.PROGRESS_TEXT);
  const bar = getEl<HTMLDivElement>(DOM_IDS.PROGRESS_BAR);
  if (!fill || !text || !bar) return;

  const total = lessons.length;
  const done = completedIds.size;
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;

  (fill as HTMLElement).style.setProperty('width', pct + '%');
  text.textContent = `${done} / ${total} lecciones`;
  bar.setAttribute('aria-valuenow', String(pct));
}

function addCompleted(id: number): void {
  completedIds.add(id);
  saveProgress(Array.from(completedIds));
  updateLessonStatus(id);
  updateProgressBar();
}

const lessonListEl = getEl<HTMLUListElement>(DOM_IDS.LESSON_LIST);
if (lessonListEl) {
  lessons = LESSONS;
  completedIds = new Set(getProgress());
  renderLessonList();
  updateProgressBar();
  handleHashChange();
}

export function renderLessonList(): void {
  const listEl = getEl<HTMLUListElement>(DOM_IDS.LESSON_LIST);
  if (!listEl) return;

  listEl.innerHTML = '';
  const groups: ModuleGroup = {};

  lessons.forEach(l => {
    const mod = l.module || 'General';
    if (!groups[mod]) groups[mod] = [];
    groups[mod].push(l);
  });

  Object.entries(groups).forEach(([module, modLessons]) => {
    const header = document.createElement('li');
    header.className = CSS_CLASSES.MODULE_HEADER;
    const total = modLessons.length;
    const done = modLessons.filter(l => completedIds.has(l.id)).length;
    header.textContent = `${module} (${done}/${total})`;
    header.setAttribute('role', 'treeitem');
    header.setAttribute('aria-level', '1');
    listEl.appendChild(header);

    modLessons.forEach(lesson => {
      const li = document.createElement('li');
      li.textContent = lesson.title;
      li.dataset.id = String(lesson.id);
      li.setAttribute('role', 'treeitem');
      li.setAttribute('aria-label', `${module}: ${lesson.title}`);
      li.setAttribute('tabindex', '0');
      if (completedIds.has(lesson.id)) {
        li.classList.add(CSS_CLASSES.COMPLETED);
      }
      li.addEventListener('click', () => selectLesson(lesson.id));
      li.addEventListener('keydown', (e: KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          selectLesson(lesson.id);
        }
      });
      listEl.appendChild(li);
    });
  });
}

function updateLessonStatus(id: number): void {
  getLessonItems().forEach(li => {
    if (Number(li.dataset.id) === id) {
      li.classList.add(CSS_CLASSES.COMPLETED);
    }
  });
  refreshModuleHeaders();
}

function refreshModuleHeaders(): void {
  if (!lessonListEl) return;
  const groups: ModuleGroup = {};
  lessons.forEach(l => {
    const mod = l.module || 'General';
    if (!groups[mod]) groups[mod] = [];
    groups[mod].push(l);
  });
  lessonListEl.querySelectorAll('.' + CSS_CLASSES.MODULE_HEADER).forEach(header => {
    const modName = header.textContent?.replace(/\s*\(\d+\/\d+\)\s*$/, '') || '';
    const modLessons = groups[modName];
    if (modLessons) {
      const total = modLessons.length;
      const done = modLessons.filter(l => completedIds.has(l.id)).length;
      header.textContent = `${modName} (${done}/${total})`;
    }
  });
}

function handleHashChange(): void {
  const match = window.location.hash.match(/^#\/leccion\/(\d+)$/);
  if (match) {
    const id = parseInt(match[1], 10);
    if (lessons.some(l => l.id === id)) {
      selectLesson(id);
      return;
    }
  }
  if (lessons.length > 0 && !currentLesson) {
    selectLesson(lessons[0].id);
  }
}

window.addEventListener('hashchange', handleHashChange);

export function selectLesson(id: number): void {
  location.hash = '#/leccion/' + id;
  const lesson = lessons.find(l => l.id === id);
  if (!lesson) return;

  currentLesson = lesson;

  getLessonItems().forEach(li => {
    const isActive = Number(li.dataset.id) === id;
    li.classList.toggle(CSS_CLASSES.ACTIVE, isActive);
    if (isActive) li.setAttribute('aria-current', 'true');
    else li.removeAttribute('aria-current');
  });

  const exArea = getEl<HTMLDivElement>(DOM_IDS.EXERCISE_AREA);
  exArea?.classList.remove(CSS_CLASSES.HIDDEN);

  const resultArea = getEl<HTMLDivElement>(DOM_IDS.RESULT_AREA);
  resultArea?.classList.add(CSS_CLASSES.HIDDEN);

  const thArea = getEl<HTMLDivElement>(DOM_IDS.THEORY_AREA);
  if (thArea) {
    thArea.classList.remove(CSS_CLASSES.HIDDEN);
    thArea.innerHTML = renderTheory(lesson.theory);
  }

  const exTitle = getEl<HTMLHeadingElement>(DOM_IDS.EXERCISE_TITLE);
  const exDesc = getEl<HTMLParagraphElement>(DOM_IDS.EXERCISE_DESC);
  if (exTitle) exTitle.textContent = lesson.title;
  if (exDesc) exDesc.textContent = lesson.exercise;

  if (editor) {
    const saved = getSavedCode(lesson.id);
    editor.setValue(saved);
    editor.focus();
  }

  requestAnimationFrame(() => {
    document.querySelector(CSS_CLASSES.CONTENT)?.scrollTo(0, 0);
    const exTitleFocus = getEl<HTMLHeadingElement>(DOM_IDS.EXERCISE_TITLE);
    if (exTitleFocus) {
      exTitleFocus.setAttribute('tabindex', '-1');
      exTitleFocus.focus();
    }
  });
}

let saveTimer: number | null = null;

function showSaveIndicator(): void {
  const indicator = getEl<HTMLSpanElement>(DOM_IDS.SAVE_INDICATOR);
  if (!indicator) return;
  indicator.textContent = 'Guardado ✓';
  indicator.classList.remove(CSS_CLASSES.HIDDEN);
  setTimeout(() => indicator.classList.add(CSS_CLASSES.HIDDEN), 1500);
}

function setupEditor(): void {
  editor = initEditor(DOM_IDS.EDITOR, (cm) => {
    if (!currentLesson) return;
    if (saveTimer) clearTimeout(saveTimer);
    saveTimer = window.setTimeout(() => {
      saveCode(currentLesson!.id, cm.getValue());
      showSaveIndicator();
    }, 500);
  }, runCode);
}

function getNextLessonId(currentId: number): number | null {
  const idx = lessons.findIndex(l => l.id === currentId);
  if (idx === -1 || idx >= lessons.length - 1) return null;
  return lessons[idx + 1].id;
}

async function runCode(): Promise<void> {
  if (!currentLesson || !editor) return;

  const userCode = editor.getValue().trim();
  if (!userCode) {
    showResult({ status: 'error', message: 'Escribe algo de código antes de ejecutar.' }, selectLesson);
    return;
  }

  showResult({ status: 'loading', message: 'Ejecutando...' }, selectLesson);
  clearErrorHighlights();

  const result = await runTestsInWorker(userCode, currentLesson.tests);
  if (result.passed) {
    addCompleted(currentLesson.id);
    const nextId = getNextLessonId(currentLesson.id);
    const msg = nextId
      ? '¡Correcto! Todos los tests pasaron.'
      : '🎉 ¡Felicidades! Completaste todas las lecciones.';
    showResult({ status: 'success', message: msg, nextLessonId: nextId ?? undefined }, selectLesson);
  } else {
    const idx = result.failedIndex;
    const msg = idx !== null && currentLesson.tests[idx]
      ? `Test ${idx + 1} falló: \`${getTestDisplay(currentLesson.tests[idx])}\``
      : 'Algo no está bien. Revisa tu código e inténtalo de nuevo.';
    showResult({ status: 'error', message: msg }, selectLesson);
    if (result.errorLine !== undefined) {
      highlightErrorLine(result.errorLine);
    }
  }
  const outputEl = getEl<HTMLPreElement>(DOM_IDS.RESULT_OUTPUT);
  if (outputEl) {
    outputEl.textContent = result.logs.length > 0 ? result.logs.join('\n') : '';
  }
}

export function getTestExpression(test: Test): string {
  if (typeof test === 'string') return test;
  if (test.type === 'function' && test.expected !== undefined) {
    return `(${test.code}) === ${JSON.stringify(test.expected)}`;
  }
  return test.code;
}

export function getTestDisplay(test: Test): string {
  if (typeof test === 'string') return test;
  return test.code;
}

export function runTests(userCode: string, tests: Test[]): WorkerResult {
  const logs: string[] = [];
  const originalLog = console.log;
  console.log = (...args: unknown[]) => {
    logs.push(args.map(String).join(' '));
  };

  const testCode = tests.map((t, i) => `if (!(${getTestExpression(t)})) { return ${i}; }`).join(' ') + '; return -1;';
  const fullCode = userCode + ';' + testCode;

  try {
    const fn = new Function(fullCode);
    const timeoutMs = 3000;

    let timedOut = false;
    const timer = setTimeout(() => { timedOut = true; }, timeoutMs);

    const failedIndex = fn();

    clearTimeout(timer);

    if (timedOut) {
      console.log = originalLog;
      return { passed: false, failedIndex: null, logs };
    }

    return { passed: failedIndex === -1, failedIndex: failedIndex === -1 ? null : failedIndex, logs };
  } catch (err) {
    const parsed = parseError(err);
    logs.push(parsed.message);
    return { passed: false, failedIndex: null, logs, errorLine: parsed.line };
  } finally {
    console.log = originalLog;
  }
}

function runTestsInWorker(userCode: string, tests: Test[]): Promise<WorkerResult> {
  return new Promise((resolve) => {
    try {
      const worker = new Worker(new URL('./sandbox.worker.ts', import.meta.url), { type: 'module' });
      const timeout = setTimeout(() => {
        worker.terminate();
        resolve({ passed: false, failedIndex: null, logs: ['La ejecución tomó demasiado tiempo y fue cancelada.'] });
      }, 3000);

      worker.onmessage = (e) => {
        clearTimeout(timeout);
        worker.terminate();
        resolve(e.data);
      };

      worker.onerror = (err) => {
        clearTimeout(timeout);
        worker.terminate();
        resolve({ passed: false, failedIndex: null, logs: ['Error en el Worker: ' + err.message] });
      };

      worker.postMessage({
        userCode,
        testExpressions: tests.map(t => getTestExpression(t)),
      });
    } catch {
      resolve({ passed: false, failedIndex: null, logs: ['Error al iniciar el Worker.'] });
    }
  });
}


const runBtn = getEl<HTMLButtonElement>(DOM_IDS.RUN_BTN);
if (runBtn) runBtn.addEventListener('click', runCode);

const resetBtn = getEl<HTMLButtonElement>(DOM_IDS.RESET_BTN);
const editorEl = getEl<HTMLTextAreaElement>(DOM_IDS.EDITOR);

if (resetBtn) {
  resetBtn.addEventListener('click', () => {
    if (!currentLesson) return;
    editor?.setValue('');
    removeSavedCode(currentLesson.id);
    getEl<HTMLDivElement>(DOM_IDS.RESULT_AREA)?.classList.add(CSS_CLASSES.HIDDEN);
    const resetOutput = getEl<HTMLPreElement>(DOM_IDS.RESULT_OUTPUT);
    if (resetOutput) resetOutput.textContent = '';
    editor?.focus();
  });
}

const solutionBtn = getEl<HTMLButtonElement>(DOM_IDS.SOLUTION_BTN);
if (solutionBtn) {
  solutionBtn.addEventListener('click', () => {
    if (!currentLesson || !editor) return;
    editor.setValue(currentLesson.solution);
    saveCode(currentLesson.id, currentLesson.solution);
    showResult({ status: 'info', message: 'Solución cargada. Intenta entender cómo funciona.' }, selectLesson);
  });
}

const resetProgressBtn = getEl<HTMLButtonElement>(DOM_IDS.RESET_PROGRESS_BTN);
if (resetProgressBtn) {
  resetProgressBtn.addEventListener('click', () => {
    saveProgress([]);
    completedIds = new Set();
    getLessonItems().forEach(li => li.classList.remove(CSS_CLASSES.COMPLETED));
    showResult({ status: 'idle' });
    updateProgressBar();
  });
}

const shortcutsBtn = getEl<HTMLButtonElement>(DOM_IDS.SHORTCUTS_BTN);
const shortcutsModal = getEl<HTMLDivElement>(DOM_IDS.SHORTCUTS_MODAL);
const shortcutsCloseBtn = getEl<HTMLButtonElement>(DOM_IDS.SHORTCUTS_CLOSE_BTN);

function toggleShortcutsModal(open?: boolean): void {
  if (!shortcutsModal) return;
  const isOpen = open ?? !shortcutsModal.classList.contains(CSS_CLASSES.OPEN);
  shortcutsModal.classList.toggle(CSS_CLASSES.OPEN, isOpen);
}

if (shortcutsBtn) {
  shortcutsBtn.addEventListener('click', () => toggleShortcutsModal(true));
}
if (shortcutsCloseBtn) {
  shortcutsCloseBtn.addEventListener('click', () => toggleShortcutsModal(false));
}
if (shortcutsModal) {
  shortcutsModal.addEventListener('click', (e) => {
    if (e.target === shortcutsModal) toggleShortcutsModal(false);
  });
}
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && shortcutsModal?.classList.contains(CSS_CLASSES.OPEN)) {
    toggleShortcutsModal(false);
  }
  if (e.key === '?' && !(e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement)) {
    toggleShortcutsModal(true);
  }
});

const themeToggle = getEl<HTMLButtonElement>(DOM_IDS.THEME_TOGGLE);
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    setTheme(current === 'dark' ? 'light' : 'dark');
  });
}
loadTheme();

const searchInput = getEl<HTMLInputElement>(DOM_IDS.SEARCH_INPUT);
if (searchInput) {
  searchInput.addEventListener('input', () => {
    const q = searchInput.value.toLowerCase().trim();
    const items = getLessonItems();
    items.forEach(li => {
      if (li.classList.contains(CSS_CLASSES.MODULE_HEADER)) {
        li.style.display = '';
        return;
      }
      if (!q) {
        li.style.display = '';
        return;
      }
      const title = li.textContent?.toLowerCase() || '';
      li.style.display = title.includes(q) ? '' : 'none';
    });

    items.forEach(li => {
      if (li.classList.contains(CSS_CLASSES.MODULE_HEADER)) {
        li.style.display = 'none';
      } else if (li.style.display !== 'none') {
        const header = li.previousElementSibling as HTMLLIElement | null;
        if (header?.classList.contains(CSS_CLASSES.MODULE_HEADER)) {
          header.style.display = '';
        }
      }
    });
  });
}

const menuToggle = getEl<HTMLButtonElement>(DOM_IDS.MENU_TOGGLE);
const sidebar = getEl<HTMLElement>(DOM_IDS.SIDEBAR);
const sidebarOverlay = getEl<HTMLDivElement>(DOM_IDS.SIDEBAR_OVERLAY);

function toggleSidebar(open?: boolean): void {
  if (!menuToggle || !sidebar) return;
  const isOpen = open ?? !sidebar.classList.contains(CSS_CLASSES.OPEN);
  sidebar.classList.toggle(CSS_CLASSES.OPEN, isOpen);
  menuToggle.classList.toggle(CSS_CLASSES.OPEN, isOpen);
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Cerrar menú de lecciones' : 'Abrir menú de lecciones');
  if (sidebarOverlay) {
    sidebarOverlay.classList.toggle(CSS_CLASSES.SIDEBAR_OVERLAY_ACTIVE, isOpen);
  }
}

if (menuToggle) {
  menuToggle.addEventListener('click', () => toggleSidebar());
}

if (sidebarOverlay) {
  sidebarOverlay.addEventListener('click', () => toggleSidebar(false));
}

if (lessonListEl) {
  lessonListEl.addEventListener('click', () => {
    if (window.innerWidth <= 768) toggleSidebar(false);
  });
}

document.addEventListener('DOMContentLoaded', setupEditor);
