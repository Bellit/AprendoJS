import { expect } from 'vitest';
import * as matchers from 'vitest-axe/matchers';
import 'vitest-axe/extend-expect';

expect.extend(matchers);

window.requestAnimationFrame = (cb: FrameRequestCallback) => setTimeout(cb, 0);

if (!Element.prototype.scrollTo) {
  Element.prototype.scrollTo = () => {};
}

document.body.innerHTML = `
  <ul id="lesson-list" class="lesson-list" role="tree"></ul>
  <div class="content"></div>
  <div id="progress-bar" class="progress-bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0">
    <div id="progress-fill" class="progress-fill"></div>
    <span id="progress-text" class="progress-text">0 / 81 lecciones</span>
  </div>
  <input id="search-input" class="search-input" type="search" placeholder="Buscar lección..." aria-label="Buscar lecciones">
  <div id="shortcuts-modal" class="modal-overlay hidden" role="dialog" aria-modal="true">
    <div class="modal-content">
      <button id="shortcuts-close-btn" class="btn">Cerrar</button>
    </div>
  </div>
  <div id="theory-area"></div>
  <div id="exercise-area">
    <h3 id="exercise-title"></h3>
    <p id="exercise-desc"></p>
  </div>
  <div id="result-area" class="hidden">
    <p id="result-msg"></p>
    <pre id="result-output"></pre>
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
