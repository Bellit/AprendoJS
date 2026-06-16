import type { Lesson, ModuleGroup, LessonResult } from './types';
import LESSONS from './lessons';

const STORAGE_PROGRESS = 'aprendojs_progress';
const STORAGE_CODE = 'aprendojs_code_';

let lessons: Lesson[] = [];
let currentLesson: Lesson | null = null;
let editor: CodeMirror.Editor | null = null;
let completedIds: Set<number> = new Set();

function getEl<T extends HTMLElement>(id: string): T | null {
  return document.getElementById(id) as T | null;
}

const lessonListEl = getEl<HTMLUListElement>('lesson-list');
const theoryArea = getEl<HTMLDivElement>('theory-area');
const exerciseArea = getEl<HTMLDivElement>('exercise-area');
const exerciseTitle = getEl<HTMLHeadingElement>('exercise-title');
const exerciseDesc = getEl<HTMLParagraphElement>('exercise-desc');
const editorEl = getEl<HTMLTextAreaElement>('editor');
const runBtn = getEl<HTMLButtonElement>('run-btn');
const resetBtn = getEl<HTMLButtonElement>('reset-btn');
const resetProgressBtn = getEl<HTMLButtonElement>('reset-progress-btn');
const searchInput = getEl<HTMLInputElement>('search-input');
const resultArea = getEl<HTMLDivElement>('result-area');
const resultMsg = getEl<HTMLParagraphElement>('result-msg');
const resultOutput = getEl<HTMLPreElement>('result-output');

export function getProgress(): number[] {
  try {
    const data = localStorage.getItem(STORAGE_PROGRESS);
    if (!data) return [];
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveProgress(ids: number[]): void {
  localStorage.setItem(STORAGE_PROGRESS, JSON.stringify(ids));
}

function addCompleted(id: number): void {
  completedIds.add(id);
  saveProgress(Array.from(completedIds));
  updateLessonStatus(id);
}

function getSavedCode(lessonId: number): string {
  try {
    return localStorage.getItem(STORAGE_CODE + lessonId) || '';
  } catch {
    return '';
  }
}

function saveCode(lessonId: number, code: string): void {
  try {
    localStorage.setItem(STORAGE_CODE + lessonId, code);
  } catch { }
}

function removeSavedCode(lessonId: number): void {
  try {
    localStorage.removeItem(STORAGE_CODE + lessonId);
  } catch { }
}

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
    header.className = 'module-header';
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
        li.classList.add('completed');
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
  const items = document.querySelectorAll<HTMLLIElement>('.lesson-list li');
  items.forEach(li => {
    if (Number(li.dataset.id) === id) {
      li.classList.add('completed');
    }
  });
}

function renderTheory(text: string): string {
  const parts = text.split(/(```[\s\S]*?```)/g);
  return parts.map(part => {
    if (part.startsWith('```')) {
      const code = part.replace(/```\w*\n?/, '').replace(/```$/, '');
      return `<pre><code>${code.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>`;
    }
    const escaped = part.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const withInline = escaped
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    return withInline.split('\n\n').filter(Boolean).map(p => `<p>${p.replace(/\n/g, '<br>')}</p>`).join('');
  }).join('');
}

function selectLesson(id: number): void {
  const lesson = lessons.find(l => l.id === id);
  if (!lesson) return;

  currentLesson = lesson;

  const items = document.querySelectorAll<HTMLLIElement>('.lesson-list li');
  items.forEach(li => {
    const isActive = Number(li.dataset.id) === id;
    li.classList.toggle('active', isActive);
    if (isActive) li.setAttribute('aria-current', 'true');
    else li.removeAttribute('aria-current');
  });

  exerciseArea?.classList.remove('hidden');
  resultArea?.classList.add('hidden');

  if (theoryArea) {
    theoryArea.classList.remove('hidden');
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
    document.querySelector('.content')?.scrollTo(0, 0);
  });
}

let saveTimer: number | null = null;

function initEditor(): void {
  if (!editorEl) return;

  const loadingEl = document.getElementById('editor-loading');
  if (loadingEl) loadingEl.style.display = 'none';

  editor = CodeMirror.fromTextArea(editorEl, {
    mode: 'javascript',
    lineNumbers: true,
    indentUnit: 2,
    autofocus: true,
    extraKeys: {
      'Ctrl-Enter': runCode,
      'Ctrl-Space': 'autocomplete',
    },
    hintOptions: {
      completeSingle: false,
    },
  });

  editor.on('inputRead', (_cm: unknown, change: unknown) => {
    const ch = change as CodeMirror.EditorChange;
    if (ch.origin !== 'complete' && ch.text.length === 1) {
      const char = ch.text[0];
      if (/[a-zA-Z0-9._$]/.test(char)) {
        (_cm as CodeMirror.Editor).showHint({ completeSingle: false });
      }
    }
  });

  editor.on('change', () => {
    if (!currentLesson) return;
    if (saveTimer) clearTimeout(saveTimer);
    saveTimer = window.setTimeout(() => {
      saveCode(currentLesson!.id, editor!.getValue());
    }, 500);
  });
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
    showResult({ status: 'error', message: 'Escribe algo de código antes de ejecutar.' });
    return;
  }

  const result = runTests(userCode, currentLesson.tests);
  if (result.passed) {
    addCompleted(currentLesson.id);
    const nextId = getNextLessonId(currentLesson.id);
    const msg = nextId
      ? '¡Correcto! Todos los tests pasaron.'
      : '🎉 ¡Felicidades! Completaste todas las lecciones.';
    showResult({ status: 'success', message: msg, nextLessonId: nextId ?? undefined });
  } else {
    const idx = result.failedIndex;
    const msg = idx !== null && currentLesson.tests[idx]
      ? `Test ${idx + 1} falló: \`${currentLesson.tests[idx]}\``
      : 'Algo no está bien. Revisa tu código e inténtalo de nuevo.';
    showResult({ status: 'error', message: msg });
  }
  if (resultOutput) {
    resultOutput.textContent = result.logs.length > 0 ? result.logs.join('\n') : '';
  }
}

export function runTests(userCode: string, tests: string[]): { passed: boolean; failedIndex: number | null; logs: string[] } {
  const logs: string[] = [];
  const originalLog = console.log;
  console.log = (...args: unknown[]) => {
    logs.push(args.map(String).join(' '));
  };

  const testCode = tests.map((t, i) => `if (!(${t})) { return ${i}; }`).join(' ') + '; return -1;';
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

function showResult(result: LessonResult): void {
  if (!resultArea || !resultMsg) return;

  resultArea.classList.remove('hidden', 'success', 'error', 'info');

  const existingBtn = document.getElementById('next-lesson-btn');
  if (existingBtn) existingBtn.remove();

  if (result.status === 'success') {
    resultArea.classList.add('success');
    resultMsg.textContent = result.message;
    if (result.nextLessonId) {
      const btn = document.createElement('button');
      btn.id = 'next-lesson-btn';
      btn.className = 'btn btn-next';
      btn.textContent = 'Siguiente lección →';
      btn.setAttribute('aria-label', 'Ir a la siguiente lección');
      btn.addEventListener('click', () => selectLesson(result.nextLessonId!));
      resultArea.appendChild(btn);
    }
  } else if (result.status === 'error') {
    resultArea.classList.add('error');
    resultMsg.textContent = result.message;
  } else if (result.status === 'info') {
    resultArea.classList.add('info');
    resultMsg.textContent = result.message;
  } else {
    resultArea.classList.add('hidden');
    return;
  }
}

if (runBtn) runBtn.addEventListener('click', runCode);

const solutionBtn = getEl<HTMLButtonElement>('solution-btn');

if (resetBtn && editorEl) {
  resetBtn.addEventListener('click', () => {
    if (!currentLesson) return;
    editor?.setValue('');
    removeSavedCode(currentLesson.id);
    resultArea?.classList.add('hidden');
    if (resultOutput) resultOutput.textContent = '';
    editor?.focus();
  });
}

if (solutionBtn) {
  solutionBtn.addEventListener('click', () => {
    if (!currentLesson || !editor) return;
    editor.setValue(currentLesson.solution);
    saveCode(currentLesson.id, currentLesson.solution);
    showResult({ status: 'info', message: 'Solución cargada. Intenta entender cómo funciona.' });
  });
}

if (resetProgressBtn) {
  resetProgressBtn.addEventListener('click', () => {
    localStorage.removeItem(STORAGE_PROGRESS);
    completedIds = new Set();
    const items = document.querySelectorAll<HTMLLIElement>('.lesson-list li');
    items.forEach(li => li.classList.remove('completed'));
    showResult({ status: 'idle' });
  });
}

const themeToggle = getEl<HTMLButtonElement>('theme-toggle');
function setTheme(theme: 'dark' | 'light'): void {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('aprendojs_theme', theme);
  if (themeToggle) {
    themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
  }
}

function loadTheme(): void {
  const saved = localStorage.getItem('aprendojs_theme');
  if (saved === 'dark' || saved === 'light') {
    setTheme(saved);
    return;
  }
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    setTheme('dark');
  }
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    setTheme(current === 'dark' ? 'light' : 'dark');
  });
}

loadTheme();

if (searchInput) {
  searchInput.addEventListener('input', () => {
    const q = searchInput.value.toLowerCase().trim();
    const items = document.querySelectorAll<HTMLLIElement>('.lesson-list li');
    items.forEach(li => {
      if (li.classList.contains('module-header')) {
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
      if (li.classList.contains('module-header')) {
        li.style.display = 'none';
      } else if (li.style.display !== 'none') {
        const header = li.previousElementSibling as HTMLLIElement | null;
        if (header?.classList.contains('module-header')) {
          header.style.display = '';
        }
      }
    });
  });
}

const menuToggle = getEl<HTMLButtonElement>('menu-toggle');
const sidebar = getEl<HTMLElement>('sidebar');
const sidebarOverlay = getEl<HTMLDivElement>('sidebar-overlay');

function toggleSidebar(open?: boolean): void {
  if (!menuToggle || !sidebar) return;
  const isOpen = open ?? !sidebar.classList.contains('open');
  sidebar.classList.toggle('open', isOpen);
  menuToggle.classList.toggle('open', isOpen);
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

document.addEventListener('DOMContentLoaded', initEditor);
