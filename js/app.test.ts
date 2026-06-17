import { describe, it, expect, assertType, beforeEach, vi, afterEach } from 'vitest';
import type { Lesson, ModuleGroup, LessonResult, Test, TestExpression } from './types';
import LESSONS from './lessons';
import { runTests, getTestExpression, getTestDisplay, selectLesson, updateProgressBar, renderLessonList, filterLessons, runCode, __setEditorForTest } from './app';
import { getProgress, saveProgress, getSavedCode, saveCode, removeSavedCode } from './storage';
import { renderTheory } from './renderer';
import { showResult } from './dom';
import { parseError } from './errors';
import { setTheme, loadTheme } from './theme';
import { CSS_CLASSES } from './constants';

describe('renderTheory', () => {
  it('convierte **negrita** a <strong>', () => {
    const result = renderTheory('**hola**');
    expect(result).toContain('<strong>hola</strong>');
  });

  it('convierte `codigo inline` a <code>', () => {
    const result = renderTheory('Usa `let` para variables');
    expect(result).toContain('<code>let</code>');
  });

  it('convierte bloques ```js a <pre><code>', () => {
    const result = renderTheory('```js\nlet x = 1;\n```');
    expect(result).toContain('<pre><code>');
    expect(result).toContain('let x = 1;');
  });

  it('envuelve texto plano en <p>', () => {
    const result = renderTheory('Esto es un párrafo.');
    assertType<string>(result);
    expect(result).toMatch(/^<p>/);
    expect(result).toContain('Esto es un párrafo.');
  });

  it('escapa HTML especial en bloques de código', () => {
    const result = renderTheory('```\nif (x < 5 && y > 3) {}\n```');
    expect(result).toContain('&lt;');
    expect(result).toContain('&gt;');
  });

  it('combina múltiples formatos', () => {
    const result = renderTheory('Usa `const` para **constantes**.\n\n```js\nconst PI = 3.14;\n```');
    expect(result).toContain('<code>const</code>');
    expect(result).toContain('<strong>constantes</strong>');
    expect(result).toContain('<pre><code>');
  });

  it('convierte listas con - a <ul><li>', () => {
    const result = renderTheory('- item 1\n- item 2\n- item 3');
    expect(result).toContain('<ul>');
    expect(result).toContain('<li>item 1</li>');
    expect(result).toContain('<li>item 3</li>');
  });

  it('convierte enlaces [texto](url) a <a>', () => {
    const result = renderTheory('Visita [MDN](https://developer.mozilla.org)');
    expect(result).toContain('<a href="https://developer.mozilla.org"');
    expect(result).toContain('>MDN</a>');
  });

  it('escapa HTML en parrafos', () => {
    const result = renderTheory('x < 5 && y > 3');
    expect(result).toContain('&lt;');
    expect(result).toContain('&gt;');
  });
});

describe('runTests', () => {
  it('retorna passed true si todos los tests pasan', () => {
    expect(runTests('let x = 1;', ['x === 1']).passed).toBe(true);
  });

  it('retorna passed false si algun test falla', () => {
    expect(runTests('let x = 1;', ['x === 2']).passed).toBe(false);
  });

  it('retorna failedIndex del test que falla', () => {
    const result = runTests('let x = 1; let y = 2;', ['x === 1', 'y === 3']);
    expect(result.passed).toBe(false);
    expect(result.failedIndex).toBe(1);
  });

  it('retorna passed true con multiples tests correctos', () => {
    expect(runTests('let x = 1; let y = 2;', ['x === 1', 'y === 2']).passed).toBe(true);
  });

  it('retorna passed false si el codigo tiene error de sintaxis', () => {
    expect(runTests('let x = ;', ['true']).passed).toBe(false);
  });

  it('retorna passed false si los tests hacen referencia a undefined', () => {
    expect(runTests('let x = 1;', ['z === 1']).passed).toBe(false);
  });

  it('evalua el codigo del usuario correctamente', () => {
    expect(runTests('const a = 5; const b = 3; const c = a + b;', ['c === 8']).passed).toBe(true);
  });

  it('captura console.log del usuario', () => {
    const result = runTests('console.log("hola");', ['true']);
    expect(result.logs).toContain('hola');
  });

  it('restaura console.log despues de ejecutar', () => {
    const originalLog = console.log;
    runTests('console.log("test");', ['true']);
    expect(console.log).toBe(originalLog);
  });

  it('reporta error de sintaxis en logs', () => {
    const result = runTests('let x = ;', ['true']);
    expect(result.logs.some(l => l.includes('sintaxis'))).toBe(true);
  });

  it('reporta error de referencia en logs', () => {
    const result = runTests('x.y();', ['true']);
    expect(result.logs.some(l => l.includes('referencia'))).toBe(true);
  });
});

describe('TestExpression (nuevo formato)', () => {
  it('soporta TestExpression tipo expression', () => {
    const tests: TestExpression[] = [{ type: 'expression', code: 'x === 1' }];
    expect(runTests('let x = 1;', tests).passed).toBe(true);
  });

  it('soporta TestExpression tipo function sin expected', () => {
    const tests: TestExpression[] = [{ type: 'function', code: 'typeof sumar !== "undefined"' }];
    expect(runTests('function sumar(a,b){return a+b}', tests).passed).toBe(true);
  });

  it('soporta TestExpression tipo function con expected', () => {
    const tests: TestExpression[] = [{ type: 'function', code: 'sumar(2, 3)', expected: 5 }];
    expect(runTests('function sumar(a,b){return a+b}', tests).passed).toBe(true);
  });

  it('funcion con expected falla si no coincide', () => {
    const tests: TestExpression[] = [{ type: 'function', code: 'sumar(2, 3)', expected: 10 }];
    expect(runTests('function sumar(a,b){return a+b}', tests).passed).toBe(false);
  });

  it('mezcla string y TestExpression', () => {
    const tests: Test[] = [
      'x === 1',
      { type: 'expression' as const, code: 'typeof y !== "undefined"' },
      { type: 'function' as const, code: 'x + y', expected: 3 },
    ];
    expect(runTests('let x = 1; let y = 2;', tests).passed).toBe(true);
  });
});

describe('Estructura de lecciones', () => {
  it('LESSONS es un array', () => {
    expect(Array.isArray(LESSONS)).toBe(true);
  });

  it('cada leccion tiene los campos requeridos', () => {
    LESSONS.forEach((lesson: Lesson) => {
      expect(lesson).toHaveProperty('id');
      expect(typeof lesson.id).toBe('number');
      expect(lesson).toHaveProperty('title');
      expect(typeof lesson.title).toBe('string');
      expect(lesson).toHaveProperty('module');
      expect(typeof lesson.module).toBe('string');
      expect(lesson).toHaveProperty('theory');
      expect(typeof lesson.theory).toBe('string');
      expect(lesson).toHaveProperty('exercise');
      expect(typeof lesson.exercise).toBe('string');
      expect(lesson).toHaveProperty('solution');
      expect(typeof lesson.solution).toBe('string');
      expect(lesson).toHaveProperty('tests');
      expect(Array.isArray(lesson.tests)).toBe(true);
    });
  });

  it('todos los tests en cada leccion son strings u objetos Test', () => {
    LESSONS.forEach((lesson: Lesson) => {
      lesson.tests.forEach((test) => {
        expect(typeof test === 'string' || (typeof test === 'object' && test !== null)).toBe(true);
      });
    });
  });

  it('los IDs de leccion son numeros positivos unicos', () => {
    const ids = LESSONS.map((l: Lesson) => l.id);
    const unicos = new Set(ids);
    expect(unicos.size).toBe(ids.length);
    ids.forEach(id => {
      expect(id).toBeGreaterThan(0);
    });
  });
});

describe('Persistencia', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('getProgress devuelve array vacio si no hay datos', () => {
    expect(getProgress()).toEqual([]);
  });

  it('saveProgress y getProgress funcionan en ciclo', () => {
    saveProgress([1, 2, 3]);
    expect(getProgress()).toEqual([1, 2, 3]);
  });

  it('saveProgress con array vacio', () => {
    saveProgress([]);
    expect(getProgress()).toEqual([]);
  });

  it('getProgress tolera datos corruptos', () => {
    localStorage.setItem('aprendojs_progress', '{corrupto');
    expect(getProgress()).toEqual([]);
  });

  it('getProgress filtra IDs no numericos', () => {
    localStorage.setItem('aprendojs_progress', JSON.stringify([1, 'a', null, -5, 2]));
    expect(getProgress()).toEqual([1, 2]);
  });

  it('saveCode y getSavedCode funcionan en ciclo', () => {
    saveCode(1, 'let x = 1;');
    expect(getSavedCode(1)).toBe('let x = 1;');
  });

  it('removeSavedCode elimina el codigo guardado', () => {
    saveCode(2, 'let y = 2;');
    removeSavedCode(2);
    expect(getSavedCode(2)).toBe('');
  });

  it('runTests reporta error de sintaxis con log', () => {
    const result = runTests('let x = ;', ['true']);
    expect(result.passed).toBe(false);
    expect(result.logs.some(l => l.toLowerCase().includes('sintaxis'))).toBe(true);
  });
});

describe('Estructura de lecciones (avanzado)', () => {
  it('los titulos de modulo no estan vacios', () => {
    LESSONS.forEach(l => {
      expect(l.module.trim().length).toBeGreaterThan(0);
    });
  });

  it('los titulos de leccion no estan vacios', () => {
    LESSONS.forEach(l => {
      expect(l.title.trim().length).toBeGreaterThan(0);
    });
  });

  it('cada leccion tiene al menos un test', () => {
    LESSONS.forEach(l => {
      expect(l.tests.length).toBeGreaterThan(0);
    });
  });

  it('los IDs de lecciones son unicos', () => {
    const ids = LESSONS.map(l => l.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe('Accesibilidad en lecciones', () => {
  it('todas las lecciones tienen module como string', () => {
    LESSONS.forEach(l => {
      expect(typeof l.module).toBe('string');
    });
  });

  it('ninguna leccion tiene campos undefined', () => {
    LESSONS.forEach(l => {
      expect(l.id).toBeDefined();
      expect(l.title).toBeDefined();
      expect(l.module).toBeDefined();
      expect(l.theory).toBeDefined();
      expect(l.exercise).toBeDefined();
      expect(l.solution).toBeDefined();
      expect(l.tests).toBeDefined();
    });
  });
});

describe('Tipos avanzados', () => {
  it('ModuleGroup es un Record<string, Lesson[]>', () => {
    const group: ModuleGroup = { 'Fundamentos': [LESSONS[0]] };
    expect(group['Fundamentos']).toBeDefined();
    assertType<Lesson[]>(group['Fundamentos']);
  });

  it('LessonResult es una union discriminada', () => {
    const idle: LessonResult = { status: 'idle' };
    const success: LessonResult = { status: 'success', message: 'ok' };
    const error: LessonResult = { status: 'error', message: 'fail' };
    const info: LessonResult = { status: 'info', message: 'info msg' };
    const loading: LessonResult = { status: 'loading', message: 'loading...' };

    expect(idle.status).toBe('idle');
    expect(success.status).toBe('success');
    expect(error.status).toBe('error');
    expect(info.status).toBe('info');
    expect(loading.status).toBe('loading');
  });
});

describe('showResult (DOM)', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="result-area" class="hidden">
        <p id="result-msg"></p>
      </div>
    `;
  });

  it('oculta result-area con status idle', () => {
    showResult({ status: 'idle' });
    const area = document.getElementById('result-area');
    expect(area?.classList.contains(CSS_CLASSES.HIDDEN)).toBe(true);
  });

  it('muestra mensaje de error', () => {
    showResult({ status: 'error', message: 'Test falló' });
    const msg = document.getElementById('result-msg');
    expect(msg?.textContent).toBe('Test falló');
    expect(document.getElementById('result-area')?.classList.contains(CSS_CLASSES.ERROR)).toBe(true);
  });

  it('muestra mensaje de exito', () => {
    showResult({ status: 'success', message: 'Correcto!' });
    const msg = document.getElementById('result-msg');
    expect(msg?.textContent).toBe('Correcto!');
    expect(document.getElementById('result-area')?.classList.contains(CSS_CLASSES.SUCCESS)).toBe(true);
  });

  it('muestra boton siguiente leccion si hay nextLessonId y callback', () => {
    showResult({ status: 'success', message: 'Bien', nextLessonId: 2 }, () => {});
    const btn = document.getElementById('next-lesson-btn');
    expect(btn).not.toBeNull();
    expect(btn?.textContent).toContain('Siguiente');
  });

  it('llama al callback al hacer clic en siguiente leccion', () => {
    let calledId: number | null = null;
    showResult({ status: 'success', message: 'Bien', nextLessonId: 5 }, (id) => { calledId = id; });
    const btn = document.getElementById('next-lesson-btn');
    btn?.click();
    expect(calledId).toBe(5);
  });
});

describe('DOM rendering', () => {
  it('renderTheory produce HTML valido con listas', () => {
    const html = renderTheory('- a\n- b\n- c');
    expect(html).toMatch(/^<ul>/);
    expect(html).toMatch(/<\/ul>$/);
    expect(html.match(/<li>/g)?.length).toBe(3);
  });

  it('renderTheory combina parrafos y listas', () => {
    const html = renderTheory('Texto antes.\n\n- item 1\n- item 2\n\nTexto después.');
    expect(html).toContain('<p>');
    expect(html).toContain('<ul>');
    expect(html.indexOf('<p>')).toBeLessThan(html.indexOf('<ul>'));
  });

  it('renderTheory maneja enlaces dentro de parrafos', () => {
    const html = renderTheory('Lee [esto](https://example.com) ahora.');
    expect(html).toContain('<a href="https://example.com"');
    expect(html).toContain('>esto</a>');
  });
});

describe('getTestExpression', () => {
  it('retorna el string directamente para tests tipo string', () => {
    expect(getTestExpression('x === 1')).toBe('x === 1');
  });

  it('retorna el code para TestExpression tipo expression', () => {
    expect(getTestExpression({ type: 'expression', code: 'typeof x !== "undefined"' })).toBe('typeof x !== "undefined"');
  });

  it('envuelve en parentesis para funcion con expected', () => {
    expect(getTestExpression({ type: 'function', code: 'sumar(2,3)', expected: 5 })).toBe('(sumar(2,3)) === 5');
  });

  it('retorna code si funcion no tiene expected', () => {
    expect(getTestExpression({ type: 'function', code: 'typeof sumar === "function"' })).toBe('typeof sumar === "function"');
  });
});

describe('getTestDisplay', () => {
  it('retorna el string directamente para tests tipo string', () => {
    expect(getTestDisplay('x === 1')).toBe('x === 1');
  });

  it('retorna el code para TestExpression', () => {
    expect(getTestDisplay({ type: 'function', code: 'sumar(2,3)', expected: 5 })).toBe('sumar(2,3)');
  });
});

describe('Routing hash-based', () => {
  it('selectLesson actualiza el hash', () => {
    selectLesson(1);
    expect(window.location.hash).toBe('#/leccion/1');
  });

  it('selectLesson actualiza el hash con otro id', () => {
    selectLesson(5);
    expect(window.location.hash).toBe('#/leccion/5');
  });
});

describe('parseError', () => {
  it('parsea SyntaxError correctamente', () => {
    const result = parseError(new SyntaxError('Unexpected token'));
    expect(result.message).toContain('sintaxis');
  });

  it('parsea ReferenceError correctamente', () => {
    const result = parseError(new ReferenceError('x is not defined'));
    expect(result.message).toContain('referencia');
  });

  it('parsea TypeError correctamente', () => {
    const result = parseError(new TypeError('not a function'));
    expect(result.message).toContain('tipo');
  });

  it('parsea RangeError correctamente', () => {
    const result = parseError(new RangeError('invalid array length'));
    expect(result.message).toContain('rango');
  });

  it('cubre error generico sin tipo', () => {
    const result = parseError(new Error('algo falló'));
    expect(result.message).toContain('ejecución');
  });

  it('no incluye numero de línea sin stack', () => {
    const err = { message: 'simple', name: 'Error' } as Error;
    const result = parseError(err);
    expect(result.line).toBeUndefined();
  });

  it('extrae numero de línea del stack', () => {
    const err = new Error('test');
    err.stack = 'Error: test\n    at file.js:5:10';
    const result = parseError(err);
    expect(result.line).toBe(4);
    expect(result.message).toContain('línea 4');
  });
});

describe('Integración', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <input id="search-input" type="search">
      <ul id="lesson-list" class="lesson-list" role="tree"></ul>
      <div id="theory-area"></div>
      <div id="exercise-area">
        <h3 id="exercise-title"></h3>
        <p id="exercise-desc"></p>
      </div>
      <div id="result-area" class="hidden">
        <p id="result-msg"></p>
        <pre id="result-output"></pre>
      </div>
      <div class="content"></div>
      <div id="progress-bar" class="progress-bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0">
        <div id="progress-fill" class="progress-fill"></div>
        <span id="progress-text" class="progress-text">0 / 81 lecciones</span>
      </div>
      <div id="shortcuts-modal" class="modal-overlay hidden" role="dialog" aria-modal="true">
        <div class="modal-content">
          <button id="shortcuts-close-btn" class="btn">Cerrar</button>
        </div>
      </div>
    `;
    renderLessonList();
  });

  it('selectLesson actualiza theory-area con el HTML de la teoría', () => {
    selectLesson(LESSONS[0].id);
    const theoryArea = document.getElementById('theory-area');
    expect(theoryArea?.innerHTML?.length).toBeGreaterThan(0);
    expect(theoryArea?.innerHTML).toContain('<p>');
  });

  it('selectLesson actualiza el título del ejercicio', () => {
    selectLesson(LESSONS[0].id);
    const title = document.getElementById('exercise-title');
    expect(title?.textContent).toBe(LESSONS[0].title);
  });

  it('renderLessonList produce estructura con módulos y lecciones', () => {
    const list = document.getElementById('lesson-list');
    const items = list?.querySelectorAll('li');
    expect(items?.length).toBeGreaterThan(0);
    const headers = list?.querySelectorAll('.sidebar__header');
    expect(headers?.length).toBeGreaterThan(0);
  });

  it('búsqueda filtra elementos de la lista', () => {
    const items = document.querySelectorAll<HTMLLIElement>('.lesson-list li');
    const initialCount = items.length;
    filterLessons('variables');
    const visible = Array.from(items).filter(li => li.style.display !== 'none');
    expect(visible.length).toBeGreaterThan(0);
    expect(visible.length).toBeLessThan(initialCount);
    filterLessons('');
    const allVisible = Array.from(items).filter(li => li.style.display !== 'none');
    expect(allVisible.length).toBe(initialCount);
  });
});

describe('Tema (setTheme/loadTheme)', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
    document.body.innerHTML = '<button id="theme-toggle"></button>';
  });

  it('setTheme("dark") establece data-theme="dark" en <html>', () => {
    setTheme('dark');
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });

  it('setTheme("dark") guarda en localStorage', () => {
    setTheme('dark');
    expect(localStorage.getItem('aprendojs_theme')).toBe('dark');
  });

  it('setTheme("light") establece data-theme="light"', () => {
    setTheme('light');
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
  });

  it('loadTheme respeta preferencia guardada en localStorage', () => {
    localStorage.setItem('aprendojs_theme', 'dark');
    loadTheme();
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });

  it('loadTheme usa prefers-color-scheme si no hay preferencia guardada', () => {
    vi.spyOn(window, 'matchMedia').mockImplementation(() => ({
      matches: true,
      media: '(prefers-color-scheme: dark)',
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: () => false,
    }));
    loadTheme();
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });
});

describe('Progress bar', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="progress-bar" class="progress-bar" role="progressbar" aria-valuenow="0">
        <div id="progress-fill" class="progress-fill"></div>
        <span id="progress-text" class="progress-text">0 / 81 lecciones</span>
      </div>
    `;
  });

  it('updateProgressBar actualiza el texto de progreso', () => {
    updateProgressBar();
    const text = document.getElementById('progress-text');
    expect(text?.textContent).toMatch(/\d+ \/ \d+ lecciones/);
  });

  it('updateProgressBar actualiza aria-valuenow', () => {
    updateProgressBar();
    const bar = document.getElementById('progress-bar');
    const val = bar?.getAttribute('aria-valuenow');
    expect(val).toMatch(/^\d+$/);
  });
});

describe('Modal de atajos', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="shortcuts-modal" class="modal-overlay hidden" role="dialog" aria-modal="true">
        <div class="modal-content">
          <button id="shortcuts-close-btn" class="btn">Cerrar</button>
        </div>
      </div>
      <button id="shortcuts-btn" aria-label="Atajos de teclado">⌨</button>
    `;
  });

  it('el modal comienza oculto', () => {
    const modal = document.getElementById('shortcuts-modal');
    expect(modal?.classList.contains(CSS_CLASSES.HIDDEN)).toBe(true);
  });

  it('el modal tiene role="dialog" y aria-modal', () => {
    const modal = document.getElementById('shortcuts-modal');
    expect(modal?.getAttribute('role')).toBe('dialog');
    expect(modal?.getAttribute('aria-modal')).toBe('true');
  });
});

describe('Accesibilidad (axe-core)', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <input id="search-input" type="search" aria-label="Buscar lecciones">
      <nav aria-label="Lecciones">
        <ul id="lesson-list" class="lesson-list" role="tree">
          <li class="sidebar__header" role="treeitem" aria-level="1">Fundamentos (0/10)</li>
          <li role="treeitem" tabindex="0">Variables con let</li>
          <li role="treeitem" tabindex="0">Variables con const</li>
        </ul>
      </nav>
      <div class="content">
        <div id="theory-area"></div>
        <div id="exercise-area">
          <h3 id="exercise-title">Variables con let</h3>
          <p id="exercise-desc">Escribe una variable</p>
        </div>
        <div id="result-area" class="hidden">
          <p id="result-msg"></p>
        </div>
      </div>
    `;
  });

  it('no tiene violaciones críticas ni serias', async () => {
    const { axe } = await import('vitest-axe');
    const results = await axe(document.body);
    const criticalSerious = results.violations.filter(
      v => v.impact === 'critical' || v.impact === 'serious'
    );
    expect(criticalSerious).toHaveLength(0);
  });

  it('la lista de lecciones tiene roles ARIA correctos', async () => {
    const { axe } = await import('vitest-axe');
    const results = await axe(document.getElementById('lesson-list')!);
    expect(results.violations).toHaveLength(0);
  });
});

describe('Integración runCode', () => {
  let originalWorker: typeof Worker;
  let lastWorkerMessage: unknown = null;

  beforeEach(() => {
    lastWorkerMessage = null;
    document.body.innerHTML = `
      <ul id="lesson-list" class="lesson-list" role="tree"></ul>
      <div id="theory-area"></div>
      <div id="exercise-area">
        <h3 id="exercise-title"></h3>
        <p id="exercise-desc"></p>
        <div class="editor-wrapper">
          <textarea id="editor"></textarea>
          <span id="save-indicator" class="save-indicator hidden"></span>
        </div>
      </div>
      <div id="result-area" class="hidden">
        <p id="result-msg"></p>
        <pre id="result-output"></pre>
      </div>
      <div class="content"></div>
    `;
    renderLessonList();

    originalWorker = window.Worker;
    window.Worker = class MockWorker {
      onmessage: ((e: { data: unknown }) => void) | null = null;
      onerror: ((e: ErrorEvent) => void) | null = null;
      postMessage(data: unknown): void {
        lastWorkerMessage = data;
        setTimeout(() => {
          this.onmessage?.({ data: { passed: true, failedIndex: null, logs: [] } });
        }, 0);
      }
      terminate(): void {}
    } as unknown as typeof Worker;
  });

  afterEach(() => {
    window.Worker = originalWorker;
    __setEditorForTest(null);
  });

  it('runCode con código correcto muestra mensaje de éxito', async () => {
    selectLesson(LESSONS[0].id);
    const mockEditor = { getValue: () => 'let x = 1;' } as unknown as CodeMirror.Editor;
    __setEditorForTest(mockEditor);

    await runCode();

    const msg = document.getElementById('result-msg');
    expect(msg?.textContent).toContain('Correcto');
    expect(document.getElementById('result-area')?.classList.contains(CSS_CLASSES.SUCCESS)).toBe(true);
  });

  it('runCode con código vacío muestra mensaje de error', async () => {
    selectLesson(LESSONS[0].id);
    const mockEditor = { getValue: () => '' } as unknown as CodeMirror.Editor;
    __setEditorForTest(mockEditor);

    await runCode();

    const msg = document.getElementById('result-msg');
    expect(msg?.textContent).toBe('Escribe algo de código antes de ejecutar.');
    expect(document.getElementById('result-area')?.classList.contains(CSS_CLASSES.ERROR)).toBe(true);
  });

  it('envía formato correcto al Worker', async () => {
    selectLesson(LESSONS[0].id);
    const mockEditor = { getValue: () => 'let x = 1;' } as unknown as CodeMirror.Editor;
    __setEditorForTest(mockEditor);

    await runCode();

    expect(lastWorkerMessage).not.toBeNull();
    const msg = lastWorkerMessage as { userCode: string; testExpressions: string[] };
    expect(msg.userCode).toBe('let x = 1;');
    expect(Array.isArray(msg.testExpressions)).toBe(true);
    expect(msg.testExpressions.length).toBeGreaterThan(0);
  });

  it('runCode con código incorrecto muestra mensaje de fallo', async () => {
    const failWorker = class FailMockWorker {
      onmessage: ((e: { data: unknown }) => void) | null = null;
      onerror: ((e: ErrorEvent) => void) | null = null;
      postMessage(_data: unknown): void {
        const w = this;
        setTimeout(() => {
          w.onmessage?.({ data: { passed: false, failedIndex: 0, logs: [] } });
        }, 0);
      }
      terminate(): void {}
    } as unknown as typeof Worker;
    window.Worker = failWorker;

    selectLesson(LESSONS[0].id);
    const mockEditor = { getValue: () => 'let x = "incorrecto";' } as unknown as CodeMirror.Editor;
    __setEditorForTest(mockEditor);

    await runCode();

    const msg = document.getElementById('result-msg');
    expect(msg?.textContent).toContain('falló');
    expect(document.getElementById('result-area')?.classList.contains(CSS_CLASSES.ERROR)).toBe(true);
  });
});
