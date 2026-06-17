import { expect } from 'vitest';
import * as matchers from 'vitest-axe/matchers';
import 'vitest-axe/extend-expect';

expect.extend(matchers);

window.requestAnimationFrame = (cb: FrameRequestCallback) => setTimeout(cb, 0);

if (!Element.prototype.scrollTo) {
  Element.prototype.scrollTo = () => {};
}

document.body.innerHTML = `
  <button id="menu-toggle" class="menu-toggle" aria-label="Abrir menú de lecciones" aria-expanded="false">
    <span class="hamburger"></span>
  </button>
  <button id="theme-toggle" class="theme-toggle" aria-label="Cambiar tema oscuro/claro">🌙</button>
  <div class="sidebar-overlay" id="sidebar-overlay"></div>
  <aside id="sidebar" class="sidebar" role="complementary" aria-label="Lista de lecciones">
    <h2>Lecciones</h2>
    <div role="search">
      <input type="search" id="search-input" class="search-input" placeholder="Buscar lecciones..." aria-label="Buscar lecciones">
    </div>
    <div id="progress-bar" class="progress-bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0" aria-label="Progreso del curso">
      <div id="progress-fill" class="progress-fill"></div>
      <span id="progress-text" class="progress-text">0 / 81 lecciones</span>
    </div>
    <nav aria-label="Navegación de lecciones">
      <ul id="lesson-list" class="lesson-list" role="tree"></ul>
    </nav>
    <button id="reset-progress-btn" class="btn btn-reset-progress" aria-label="Reiniciar progreso">Reiniciar progreso</button>
  </aside>
  <div class="content">
    <div id="theory-area" class="theory-area" role="article"></div>
    <div id="exercise-area" class="exercise-area">
      <h3 id="exercise-title"></h3>
      <p id="exercise-desc"></p>
      <div class="editor-wrapper">
        <textarea id="editor" aria-label="Escribe tu código JavaScript aquí"></textarea>
        <span id="save-indicator" class="save-indicator hidden" aria-live="polite"></span>
      </div>
      <div class="actions">
        <button id="run-btn" class="btn btn-run" aria-label="Ejecutar código">Ejecutar</button>
        <button id="reset-btn" class="btn btn-reset" aria-label="Reiniciar ejercicio">Reiniciar</button>
        <button id="solution-btn" class="btn btn-solution" aria-label="Ver solución">Ver solución</button>
        <button id="shortcuts-btn" class="btn btn-shortcuts" aria-label="Atajos de teclado">⌨</button>
      </div>
      <div id="shortcuts-modal" class="modal-overlay hidden" role="dialog" aria-modal="true">
        <div class="modal-content">
          <h2>Atajos de teclado</h2>
          <button id="shortcuts-close-btn" class="btn" aria-label="Cerrar atajos">Cerrar</button>
        </div>
      </div>
      <div id="result-area" class="result-area hidden" role="status" aria-live="polite">
        <p id="result-msg"></p>
        <pre id="result-output"></pre>
      </div>
    </div>
  </div>
`;

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => { },
    removeListener: () => { },
    addEventListener: () => { },
    removeEventListener: () => { },
    dispatchEvent: () => false,
  }),
});

Object.defineProperty(window, 'localStorage', {
  value: (() => {
    let store: Record<string, string> = {};
    return {
      getItem: (key: string) => store[key] ?? null,
      setItem: (key: string, value: string) => { store[key] = value; },
      removeItem: (key: string) => { delete store[key]; },
      clear: () => { store = {}; },
      get length() { return Object.keys(store).length; },
      key: (i: number) => Object.keys(store)[i] ?? null,
    };
  })(),
});
