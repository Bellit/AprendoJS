# Arquitectura de AprendoJS

## 1. Resumen

AprendoJS es una plataforma web interactiva para aprender JavaScript. Ofrece lecciones con teoría, un editor de código integrado (CodeMirror) y validación automática mediante tests. Todo es frontend puro, sin servidor backend. Incluye routing hash-based, Web Worker para ejecución sandbox, persistencia en localStorage y tema claro/oscuro.

---

## 2. Stack Tecnológico

| Tecnología | Versión | Propósito |
|---|---|---|
| TypeScript | ^6.0.3 | Lenguaje principal, tipado estricto |
| Vite | ^8.0.16 | Dev server con HMR y build tool |
| Vitest | ^4.1.8 | Test runner para tests unitarios |
| CodeMirror 5 | 5.65.18 | Editor de código en el navegador (vía CDN) |
| jsdom | ^26.0 | Entorno DOM para tests (vía Vitest) |
| vitest-axe | ^1.0 | Auditoría de accesibilidad automatizada |

---

## 3. Estructura del Proyecto

```
aprendojs/
├── index.html                # Entrada: layout, CDNs, module script
├── package.json              # Dependencias y scripts npm
├── tsconfig.json             # Configuración de TypeScript (strict: true)
├── vite.config.ts            # Configuración de Vite
├── vitest.config.ts          # Configuración de Vitest (jsdom)
├── vite-env.d.ts             # Declaraciones de tipos (CodeMirror, Vite)
├── .gitignore                # node_modules/, dist/, .env
├── AGENTS.md                 # Instrucciones para agentes de IA
├── lecciones.md              # Plan de estudio: 10 módulos
├── docs/
│   └── ARQUITECTURA.md       # Este documento
├── css/
│   └── style.css             # Estilos visuales (BEM, layout, responsive, dark mode)
├── js/
│   ├── types.ts              # Interfaces y tipos TypeScript
│   ├── constants.ts          # IDs del DOM y clases CSS centralizadas
│   ├── lessons.ts            # Array con todas las lecciones (86)
│   ├── renderer.ts           # Parseador markdown a HTML
│   ├── storage.ts            # Persistencia localStorage (progreso, código, tema)
│   ├── theme.ts              # Gestión de tema claro/oscuro
│   ├── dom.ts                # Manipulación DOM (getEl, showResult, getLessonItems)
│   ├── editor.ts             # Inicialización y control de CodeMirror
│   ├── errors.ts             # Parseo de errores (SyntaxError, ReferenceError, etc.)
│   ├── sandbox.worker.ts     # Web Worker para ejecución sandbox (timeout 3s)
│   ├── app.ts                # Lógica principal de la aplicación
│   ├── setup.ts              # Setup de Vitest (DOM mock, polyfills, vitest-axe)
│   └── app.test.ts           # Tests unitarios con Vitest (87 tests)
├── public/
│   └── sw.js                 # Service Worker para offline parcial
├── .github/
│   └── workflows/
│       ├── ci.yml            # CI: test + build en cada push
│       └── deploy.yml        # Deploy a GitHub Pages
└── dist/                     # Build de producción (generado por Vite)
```

---

## 4. Flujo de la Aplicación

### 4.1 Carga inicial

1. El navegador carga `index.html`
2. Se descargan CodeMirror (CSS + JS) y addons (hint) desde CDN
3. Vite sirve `js/app.ts` como módulo ES
4. `app.ts` importa `lessons.ts` y asigna `lessons = LESSONS`
5. Se lee `localStorage` para restaurar progreso y preferencia de tema
6. `loadTheme()` aplica el tema guardado o la preferencia del SO
7. `renderLessonList()` agrupa las lecciones por módulo, muestra progreso por módulo y renderiza en el sidebar
8. `updateProgressBar()` calcula el porcentaje global y actualiza la barra
9. `DOMContentLoaded` dispara `initEditor()` que inicializa CodeMirror
10. Se lee `window.location.hash`; si hay hash, se selecciona la lección correspondiente; si no, la primera

### 4.2 Selección de lección

1. El usuario hace clic en una lección del sidebar
2. `selectLesson(id)` actualiza `location.hash = '#/leccion/' + id`
3. Busca la lección por ID en el array `lessons`
4. Renderiza la teoría (`renderTheory`) en el área de teoría
5. Muestra el título y enunciado del ejercicio
6. Restaura el código guardado en localStorage (si existe) o limpia el editor
7. Limpia el área de resultados y los highlights de error
8. Mueve el foco al título del ejercicio (`tabindex="-1"`)

### 4.3 Ejecución de código

1. El usuario escribe código en el editor (se guarda automáticamente con debounce de 500ms)
2. Al hacer clic en "Ejecutar" (o Ctrl+Enter):
   - `runCode()` obtiene el código del editor
   - Muestra estado `loading` con spinner
   - `runTestsInWorker(userCode, tests)` envía código + tests al Web Worker
   - El Worker ejecuta con timeout de 3s, captura `console.log`
   - Si hay error, se parsea con `parseError()` y se resalta la línea en el editor
   - `showResult(success, message)` muestra feedback visual
   - Si pasa, se guarda el progreso y aparece botón "Siguiente lección"
3. Si el Worker no responde en 3s, se termina y se muestra error de timeout

### 4.4 Routing hash-based

- Cada lección tiene una URL única: `index.html#/leccion/5`
- `hashchange` event dispara `selectLesson()` automáticamente
- El hash se actualiza al navegar entre lecciones
- Compatible con botón "Atrás" del navegador
- Permite compartir enlaces directos a una lección

---

## 5. Sistema de Módulos JS

### 5.1 Dependencias

```
    types.ts        constants.ts
        ↓               ↓
    lessons.ts      renderer.ts     storage.ts     errors.ts
        ↓               ↓               ↓              ↓
        └──────────────┬┘               │              │
                  ┌────┴────┐           │              │
                  │  app.ts  ◄──────────┼──────────────┤
                  └────┬────┘           │              │
                       │                │              │
                   ┌───┴───┐      ┌─────┴─────┐       │
                   │ dom.ts │      │  editor.ts │      │
                   └───────┘      └─────┬──────┘      │
                                        │              │
                                   ┌────┴────┐        │
                                   │ theme.ts│        │
                                   └─────────┘        │
                                                      │
                                          ┌───────────┴────────┐
                                          │ sandbox.worker.ts   │
                                          └────────────────────┘
```

### 5.2 Módulos

| Módulo | Responsabilidad | Exportaciones clave |
|---|---|---|
| `types.ts` | Interfaces y tipos compartidos | `Lesson`, `TestExpression`, `WorkerResult`, `LessonResult`, `ModuleGroup`, `isLesson` |
| `constants.ts` | IDs del DOM y clases CSS | `getEl(id)`, `CSS_CLASSES`, `DOM_IDS`, todos los IDs como constantes |
| `lessons.ts` | Array de lecciones del curso | `LESSONS` (86 lecciones, 10 módulos) |
| `renderer.ts` | Convertir markdown a HTML | `renderTheory(text): string` (negrita, inline code, code blocks, párrafos, listas, enlaces, escaping) |
| `storage.ts` | Persistencia en localStorage | `getProgress()`, `saveProgress(ids)`, `getSavedCode(id)`, `saveCode(id, code)`, `removeSavedCode(id)` |
| `theme.ts` | Gestión de tema claro/oscuro | `setTheme(theme)`, `loadTheme()`, `getPreferredTheme()` |
| `dom.ts` | Manipulación del DOM | `showResult(result)`, `getLessonItems()`, `updateProgressBar()` |
| `editor.ts` | CodeMirror control | `initEditor()`, `getEditor()`, `setEditorContent(code)`, `syncEditorTheme()`, `highlightLine(line)`, `clearHighlights()` |
| `errors.ts` | Parseo de errores JS | `parseError(err): { message, line? }` |
| `sandbox.worker.ts` | Ejecución sandbox en Worker | Web Worker que recibe `{ userCode, testExpressions }`, postea `WorkerResult` |
| `app.ts` | Orquestador principal | `selectLesson(id)`, `runCode()`, `runTests(userCode, tests)`, `renderLessonList()`, `filterLessons(query)` |
| `setup.ts` | Configuración de Vitest | DOM mock, polyfills (scrollTo, matchMedia), integración vitest-axe |
| `app.test.ts` | Tests unitarios | 87 tests cubriendo todos los módulos |

---

## 6. Funciones Clave

### 6.1 renderTheory (markdown a HTML)

En `js/renderer.ts`. Convierte texto markdown básico a HTML:

- `**texto**` → `<strong>texto</strong>`
- `` `codigo` `` → `<code>codigo</code>`
- `` ``` `` (bloques de código) → `<pre><code>...</code></pre>`
- Párrafos separados por doble salto de línea → `<p>...</p>`
- `- item` → `<ul><li>item</li></ul>`
- `[texto](url)` → `<a href="url">texto</a>`
- Caracteres `<` y `>` escapados en todo el output (seguridad XSS)

### 6.2 runTests (evaluación del alumno)

En `js/app.ts`. Evalúa el código del usuario contra los tests de la lección:

```ts
function runTests(userCode: string, tests: Test[]): WorkerResult {
  const resolvedTests = tests.map(t =>
    typeof t === 'string' ? t : getTestExpression(t)
  );
  const testCode = resolvedTests.map(t =>
    `if (!(${t})) return ${resolvedTests.indexOf(t)};`
  ).join(' ') + ' return -1;';
  const fullCode = userCode + ';' + testCode;
  try {
    const failedIndex = eval('(function(){' + fullCode + '})()');
    return { passed: failedIndex === -1, failedIndex, logs: [] };
  } catch (err) {
    const parsed = parseError(err);
    return { passed: false, failedIndex: null, logs: [], errorLine: parsed.line };
  }
}
```

Soporta dos formatos de test:
- **String**: expresión JS directa (`"x === 5"`)
- **TestExpression**: `{ type: 'function', code: 'suma(2,3)', expected: 5 }`

### 6.3 Web Worker (sandbox)

En `js/sandbox.worker.ts`:
- Recibe `{ userCode, testExpressions }` vía `postMessage`
- Captura `console.log` del alumno sobrescribiéndolo
- Ejecuta con timeout de 3s (el Worker se puede terminar forzosamente)
- Envía `WorkerResult` de vuelta al hilo principal
- Los bucles infinitos (`while(true){}`) se detienen al terminar el Worker

### 6.4 Persistencia (localStorage)

| Clave | Formato | Propósito |
|---|---|---|
| `aprendojs_progress` | `number[]` | IDs de lecciones completadas |
| `aprendojs_code_{id}` | `string` | Código del alumno por lección (max 10KB) |
| `aprendojs_theme` | `"dark" \| "light"` | Preferencia de tema |

### 6.5 Parsing de errores

En `js/errors.ts`. `parseError()` extrae de cualquier error capturado:
- **Mensaje**: mensaje legible del error
- **Línea**: número de línea (extraído del stack, ajustado por el wrapper IIFE)

Usado tanto en `runTests()` síncrono como en `sandbox.worker.ts`.

---

## 7. Sistema de Lecciones

### 7.1 Formato

Cada lección es un objeto `Lesson` definido en `js/types.ts`:

```ts
interface Lesson {
  id: number;
  module: string;
  title: string;
  theory: string;
  exercise: string;
  solution: string;
  tests: Test[];
}

type Test = string | TestExpression;

interface TestExpression {
  type: 'expression' | 'function';
  code: string;
  expected?: unknown;
}
```

### 7.2 Campos

- `id` — número único (no secuencial)
- `module` — nombre del módulo (agrupa lecciones en el sidebar)
- `title` — título visible
- `theory` — contenido markdown (`**negrita**`, `` `código` ``, `` ```js ``` ``, `- listas`, `[enlaces](url)`)
- `exercise` — enunciado del ejercicio
- `solution` — solución de referencia (no visible para el alumno, solo en JS)
- `tests` — array de expresiones JS o `TestExpression` que validan el código del alumno

### 7.3 Lecciones actuales

86 lecciones distribuidas en 10 módulos:

| Módulo | Lecciones |
|---|---|
| Fundamentos del Lenguaje | 1-8, 51 (ficha personal) |
| Control de Flujo | 9-15, 52 (juego número secreto) |
| Funciones | 16-20, 53 (generador contraseñas) |
| Arrays y Objetos | 21-25, 54 (gestor tareas) |
| DOM y Eventos | 26-32, 55 (notas persistente), 59 (delegación), 60 (IntersectionObserver), 61 (IndexedDB), 62 (History API), 63 (Drag & Drop), 64 (Clipboard), 65 (Geolocation), 83 (MutationObserver), 86 (DocumentFragment) |
| Asincronía | 33-37, 45-47 (promesas combinadas, AbortController), 56 (buscador películas), 66-71 (callbacks, Fetch, backoff, paginación, combinators, errores) |
| Programación Avanzada | 38-40, 48-50 (Singleton, Observer, Factory), 57 (tienda online), 82 (Módulos ES6) |
| Optimización y Buenas Prácticas | 41-44 (Vite, despliegue, env, CI/CD), 58 (analizador rendimiento), 72-77 (Pilas, Colas, Set/Map, búsqueda binaria, recursión, Big O), 84 (Testing Vitest), 85 (Quick Sort) |
| Proyectos Finales | 78 (Memory), 79 (Router SPA), 80 (Dashboard), 81 (Carrito persistente) |
| JavaScript en el Mundo Real | 41-44 (compartido con Optimización) |

---

## 8. Tests del Proyecto (Vitest)

### 8.1 Configuración

`vitest.config.ts`:
- Entorno: `jsdom` con recursos
- `setupFiles`: `js/setup.ts`
- `include`: `js/**/*.test.ts`

`js/setup.ts`:
- Inicializa `localStorage` mock (limpiado entre tests)
- Polyfill para `Element.prototype.scrollTo`
- Mock para `window.matchMedia` (usado en tema)
- Mock para `MutationObserver`
- Mock para `Worker` global
- Elementos DOM completos de `index.html` (sidebar, editor, botones, etc.)
- Integración `vitest-axe` (extiende `expect`)

### 8.2 Tests existentes (87 tests)

**renderTheory** (6 tests):
- Conversión de `**negrita**` a `<strong>`
- Conversión de `` `código` `` a `<code>`
- Conversión de bloques `` ```js `` a `<pre><code>`
- Texto plano envuelto en `<p>`
- Escape de `<` y `>` en bloques de código
- Combinación de múltiples formatos

**runTests** (7 tests):
- Tests que pasan (retorna `passed: true`)
- Tests que fallan (retorna `passed: false`)
- Código con error de sintaxis
- Variables indefinidas en tests
- Evaluación correcta del código del usuario
- Función con expected
- TestExpression tipo expresión

**Estructura de lecciones** (4 tests):
- `LESSONS` es un array
- Cada lección tiene todos los campos requeridos con tipos correctos
- Todos los tests son strings o `TestExpression`
- Los IDs son números positivos únicos

**Tipos avanzados** (tests de tipos):
- `ModuleGroup` agrupa por módulo
- `LessonResult` cubre idle, success, error, info, loading
- `TestExpression` y `WorkerResult`

**Persistencia** (tests de storage):
- `getProgress` / `saveProgress` ciclo
- Tolerancia a datos corruptos (IDs negativos, NaN, strings)
- `getProgress` devuelve array vacío sin datos
- `saveCode` / `getSavedCode` / `removeSavedCode`

**showResult** (tests DOM):
- Estado idle oculta resultados
- Estado error muestra mensaje
- Estado success muestra botón "Siguiente lección"
- Callback al hacer clic en "Siguiente"

**Integración**:
- `selectLesson` actualiza DOM (theory-area, exercise-title)
- `runCode` con mock Worker/CodeMirror (éxito, vacío, fallo)
- `renderLessonList` produce estructura sidebar correcta

**Accesibilidad**:
- Auditoría axe-core (sin violaciones críticas/serias)
- Roles ARIA en lista (`role="tree"`, `role="treeitem"`)

**Web Worker**:
- Formato correcto del mensaje (`userCode` + `testExpressions`)

**Tema y búsqueda**:
- `setTheme('dark')` establece `data-theme` y guarda en localStorage
- `loadTheme()` respeta preferencia guardada sobre `prefers-color-scheme`
- Búsqueda filtra lecciones por texto

**UX**:
- `updateProgressBar()` actualiza DOM correctamente
- Modal de atajos comienza oculto y tiene atributos ARIA

### 8.3 Ejecutar

```bash
npm test              # Una vez
npm run test:watch    # Modo watch
npm run coverage      # Con reporte de cobertura
npm run typecheck     # Solo typecheck (tsc --noEmit)
```

---

## 9. UX y Accesibilidad

### 9.1 Sidebar responsive

- En desktop (>768px): sidebar fijo a la izquierda
- En móvil: sidebar oculto, botón hamburguesa lo despliega con overlay semitransparente
- `aria-expanded` y `aria-controls` en el toggle
- Al seleccionar lección en móvil, el sidebar se cierra automáticamente

### 9.2 Barra de progreso

- Contenedor `<div id="progress-bar">` en el sidebar
- Relleno `<div id="progress-fill">` con `width` animado
- Texto `<span id="progress-text">` con "X/86 lecciones"
- Roles ARIA: `role="progressbar"`, `aria-valuenow`, `aria-valuemin="0"`, `aria-valuemax="100"`
- Se actualiza al completar lección, reiniciar progreso, o cargar la app

### 9.3 Estadísticas por módulo

- Cada header de módulo en el sidebar muestra "Módulo (completadas/totales)"
- Se calcula en `renderLessonList()` al renderizar

### 9.4 Modal de atajos de teclado

- Botón "⌨" al lado de "Ejecutar"
- Modal con `role="dialog"`, `aria-modal="true"`, `aria-labelledby`
- Se cierra con Escape o clic fuera

### 9.5 Resaltado de errores en editor

- `highlightLine(cm, lineNum)` agrega clase `error-line` a la línea
- `clearHighlights(cm)` limpia highlights previos
- Color rojo semitransparente (modo claro y oscuro)

### 9.6 Feedback de guardado

- Indicador "Guardado ✓" cerca del editor, desaparece tras 1.5s
- El código del alumno se guarda automáticamente con debounce de 500ms

### 9.7 Atajos de teclado

| Atajo | Acción |
|---|---|
| Ctrl+Enter | Ejecutar código |
| Ctrl+Space | Autocompletado (CodeMirror) |
| Escape | Cerrar modal |
| Clic fuera | Cerrar modal |

### 9.8 Tema claro/oscuro

- Detecta `prefers-color-scheme` al cargar
- Toggle manual (sol/luna) en el header
- Persiste en localStorage (`aprendojs_theme`)
- CodeMirror se sincroniza con clases CSS (no requiere recarga)
- Contraste suficiente verificado con axe-core

---

## 10. Routing

### 10.1 Sistema hash-based

- Formato: `#/leccion/{id}`
- Escucha `hashchange` en `window`
- Al cargar la página, lee `location.hash` y selecciona la lección
- `selectLesson(id)` actualiza `location.hash`
- Botón "Siguiente lección" también actualiza el hash
- Compatible con navegación "Atrás/Adelante"

---

## 11. CI/CD

### 11.1 CI (ci.yml)

Se ejecuta en cada push a `main`:
```yaml
- uses: actions/checkout@v4
- uses: actions/setup-node@v4
- run: npm ci
- run: npm test
- run: npm run build
```

### 11.2 Deploy (deploy.yml)

Despliega automáticamente a GitHub Pages:
- Usa `actions/configure-pages` y `actions/deploy-pages`
- Build con `npm ci && npm run build`
- Sube `dist/` como artifact
- Se activa con cada push a `main`

---

## 12. Service Worker

En `public/sw.js`. Estrategia:
- **Cache-first** para CSS, fuentes y recursos CDN
- **Network-first** para JS de Vite (con hash en producción)
- Precarga `index.html` y `css/style.css`
- Permite carga offline parcial (lecciones cacheadas)

---

## 13. Comandos de Desarrollo

```bash
npm run dev          # Servidor de desarrollo con HMR
npm run build        # Compilar TypeScript y empaquetar con Vite
npm run preview      # Vista previa de la build de producción
npm test             # Ejecutar tests (Vitest)
npm run test:watch   # Tests en modo watch
npm run typecheck    # Solo typecheck (tsc --noEmit)
npm run coverage     # Tests con reporte de cobertura
```

---

## 14. Decisiones Técnicas

### 14.1 ¿Por qué eval()?

El sistema de tests del alumno usa `eval()` porque:
- Es un entorno controlado (el alumno ejecuta su propio código)
- No hay servidor backend para ejecutar código remoto
- Se envuelve en una IIFE para aislar el scope
- El `try/catch` captura cualquier error de sintaxis o runtime
- En producción, la ejecución se delega a un Web Worker

### 14.2 ¿Por qué Web Worker?

- El Worker permite terminar forzosamente código con bucles infinitos (`while(true){}`)
- Aísla completamente la ejecución del alumno del hilo principal
- Timeout de 3s: si no responde, se termina con `worker.terminate()`
- `console.log` del alumno se captura dentro del Worker y se envía al hilo principal

### 14.3 ¿Por qué dos modos de ejecución?

- `runTests()`: síncrono, usado en tests de Vitest (eval directo)
- `runTestsInWorker()`: asíncrono, usado en producción (Worker)
- Ambos producen el mismo `WorkerResult`

### 14.4 ¿Por qué CodeMirror vía CDN?

- CodeMirror 5 tiene soporte limitado con bundlers modernos
- La versión CDN es estable y no requiere configuración
- Se declara como tipo global (`any`) para TypeScript

### 14.5 ¿Por qué CSS plano?

- El CSS es pequeño y puramente visual
- No hay componentes dinámicos que justifiquen CSS-in-JS
- Convención BEM para naming (`sidebar__header`, `lesson-list`, `btn--primary`)
- Variables CSS para theming (colores en `:root` y `[data-theme="dark"]`)

### 14.6 Tipado estricto

TypeScript configurado con `strict: true`:
- `noImplicitAny`: toda variable debe tener tipo explícito o inferible
- `strictNullChecks`: `null` y `undefined` son tipos separados
- `noUnusedLocals`: error si hay variables no usadas
- `noUnusedParameters`: error si hay parámetros no usados

### 14.7 Seguridad

- Los `<` y `>` se escapan en `renderTheory` para prevenir XSS
- El código del alumno se ejecuta en Web Worker (aislado del DOM)
- localStorage validado: IDs deben ser números enteros positivos, código limitado a 10KB
- Las soluciones nunca se renderizan en HTML (solo existen como string en JS)
