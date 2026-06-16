import type { Lesson, ModuleGroup, Test, TestExpression } from './types';
import LESSONS from './lessons';
import { getEl, showResult, getLessonItems } from './dom';
import { renderTheory } from './renderer';
import { getProgress, saveProgress, getSavedCode, saveCode, removeSavedCode } from './storage';
import { setTheme, loadTheme } from './theme';
import { initEditor } from './editor';
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

function addCompleted(id: number): void {
  completedIds.add(id);
  saveProgress(Array.from(completedIds));
  updateLessonStatus(id);
}

const lessonListEl = getEl<HTMLUListElement>(DOM_IDS.LESSON_LIST);
if (lessonListEl) {
  lessons = LESSONS;
  completedIds = new Set(getProgress());
  renderLessonList();
}

function renderLessonList(): void {
  if (!lessonListEl) return;

  lessonListEl.innerHTML = '';
  const groups: ModuleGroup = {};

  lessons.forEach(l => {
    const mod = l.module || 'General';
    if (!groups[mod]) groups[mod] = [];
    groups[mod].push(l);
  });

  Object.entries(groups).forEach(([module, modLessons]) => {
    const header = document.createElement('li');
    header.className = CSS_CLASSES.MODULE_HEADER;
    header.textContent = module;
    header.setAttribute('role', 'treeitem');
    header.setAttribute('aria-level', '1');
    lessonListEl.appendChild(header);

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
      lessonListEl.appendChild(li);
    });
  });
}

function updateLessonStatus(id: number): void {
  getLessonItems().forEach(li => {
    if (Number(li.dataset.id) === id) {
      li.classList.add(CSS_CLASSES.COMPLETED);
    }
  });
}

function selectLesson(id: number): void {
  const lesson = lessons.find(l => l.id === id);
  if (!lesson) return;

  currentLesson = lesson;

  getLessonItems().forEach(li => {
    const isActive = Number(li.dataset.id) === id;
    li.classList.toggle(CSS_CLASSES.ACTIVE, isActive);
    if (isActive) li.setAttribute('aria-current', 'true');
    else li.removeAttribute('aria-current');
  });

  exerciseArea?.classList.remove(CSS_CLASSES.HIDDEN);

  const resultArea = getEl<HTMLDivElement>(DOM_IDS.RESULT_AREA);
  resultArea?.classList.add(CSS_CLASSES.HIDDEN);

  if (theoryArea) {
    theoryArea.classList.remove(CSS_CLASSES.HIDDEN);
    theoryArea.innerHTML = renderTheory(lesson.theory);
  }

  if (exerciseTitle) exerciseTitle.textContent = lesson.title;
  if (exerciseDesc) exerciseDesc.textContent = lesson.exercise;

  if (editor) {
    const saved = getSavedCode(lesson.id);
    editor.setValue(saved);
    editor.focus();
  }

  requestAnimationFrame(() => {
    document.querySelector(CSS_CLASSES.CONTENT)?.scrollTo(0, 0);
  });
}

let saveTimer: number | null = null;

function setupEditor(): void {
  editor = initEditor(DOM_IDS.EDITOR, (cm) => {
    if (!currentLesson) return;
    if (saveTimer) clearTimeout(saveTimer);
    saveTimer = window.setTimeout(() => {
      saveCode(currentLesson!.id, cm.getValue());
    }, 500);
  }, runCode);
}

function getNextLessonId(currentId: number): number | null {
  const idx = lessons.findIndex(l => l.id === currentId);
  if (idx === -1 || idx >= lessons.length - 1) return null;
  return lessons[idx + 1].id;
}

function runCode(): void {
  if (!currentLesson || !editor) return;

  const userCode = editor.getValue().trim();
  if (!userCode) {
    showResult({ status: 'error', message: 'Escribe algo de código antes de ejecutar.' }, selectLesson);
    return;
  }

  const result = runTests(userCode, currentLesson.tests);
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
  }
  if (resultOutput) {
    resultOutput.textContent = result.logs.length > 0 ? result.logs.join('\n') : '';
  }
}

function getTestExpression(test: Test): string {
  if (typeof test === 'string') return test;
  if (test.type === 'function' && test.expected !== undefined) {
    return `(${test.code}) === ${JSON.stringify(test.expected)}`;
  }
  return test.code;
}

function getTestDisplay(test: Test): string {
  if (typeof test === 'string') return test;
  return test.code;
}

export function runTests(userCode: string, tests: Test[]): { passed: boolean; failedIndex: number | null; logs: string[] } {
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
    let msg = 'Error de ejecución';
    if (err instanceof SyntaxError) msg = 'Error de sintaxis';
    else if (err instanceof ReferenceError) msg = 'Error de referencia: variable no definida';
    else if (err instanceof TypeError) msg = 'Error de tipo';
    else if (err instanceof RangeError) msg = 'Error de rango';

    if (err instanceof Error && err.stack) {
      const lines = err.stack.split('\n');
      for (const line of lines) {
        const match = line.match(/:(\d+):\d+/);
        if (match) {
          const lineNum = parseInt(match[1], 10) - 1;
          if (lineNum > 0) {
            msg += ` en línea ${lineNum}`;
          }
          break;
        }
      }
    }
    logs.push(msg);
    return { passed: false, failedIndex: null, logs };
  } finally {
    console.log = originalLog;
  }
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
    if (resultOutput) resultOutput.textContent = '';
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
  });
}

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
    sidebarOverlay.classList.toggle('active', isOpen);
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
