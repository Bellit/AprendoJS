# Plan de Mejoras — AprendoJS (Fase 2)

> **Formato**: cada tarea tiene un checkbox `[ ]` (pendiente) o `[x]` (completado).  
> **Criterio de aceptación**: lo que debe cumplirse para marcar como completado.  
> **Instrucciones para agente**: pasos detallados para que un agente implementador pueda trabajar autónomamente.

---

## Lote 1 — Contenido: Ampliar Módulo 5 (DOM y APIs del Navegador)

El plan de estudios (`lecciones.md`) describe ~25 contenidos para el Módulo 5, pero solo hay 5 lecciones implementadas (IDs 25, 26, 55). Faltan conceptos fundamentales como delegación de eventos, IntersectionObserver, IndexedDB, History API, Drag & Drop, etc.

### 1.1 Delegación de eventos — ID 59

- [x] **1.1a** — Agregar lección `id: 59` — Delegación de eventos.
- [x] **1.1b** — `npm test` pasa (68 tests).
- [x] **1.1c** — `npm run build` compila.

**Criterio de aceptación**: Nueva lección ID 59 visible en sidebar, con teoría, ejercicio, solución y ≥3 tests. `npm test` pasa.

**Instrucciones para agente**:
1. Abrir `js/lessons.ts`, agregar objeto al final del array `LESSONS`
2. Asignar `id: 59`, `module: "DOM y Eventos"`
3. La teoría debe incluir: `event.target`, `event.currentTarget`, `event.stopPropagation()`, ejemplo con lista
4. Ejercicio: pedir función `manejarClick` que reciba un evento y retorne el `textContent` del `li` clickeado
5. Tests: `typeof manejarClick === 'function'`, y 2 tests más
6. Ejecutar `npm test` y `npm run build`

### 1.2 IntersectionObserver — ID 60

- [x] **1.2a** — Agregar lección `id: 60` sobre IntersectionObserver.
- [x] **1.2b** — `npm test` pasa, `npm run build` compila.

### 1.3 IndexedDB básico — ID 61

- [x] **1.3a** — Agregar lección `id: 61` sobre IndexedDB básico.
- [x] **1.3b** — `npm test` pasa, `npm run build` compila.

### 1.4 History API — ID 62

- [x] **1.4a** — Agregar lección `id: 62` sobre History API.
- [x] **1.4b** — `npm test` pasa, `npm run build` compila.

### 1.5 Drag & Drop API — ID 63

- [x] **1.5a** — Agregar lección `id: 63` sobre Drag & Drop.
- [x] **1.5b** — `npm test` pasa, `npm run build` compila.

### 1.6 Clipboard API — ID 64

- [x] **1.6a** — Agregar lección `id: 64` sobre Clipboard API.
- [x] **1.6b** — `npm test` pasa, `npm run build` compila.

### 1.7 Geolocation API — ID 65

- [x] **1.7a** — Agregar lección `id: 65` sobre Geolocation API.
- [x] **1.7b** — `npm test` pasa, `npm run build` compila.

**Criterio de aceptación**: Lección ID 65 funcional.

---

## Lote 2 — Contenido: Ampliar Módulo 6 (Asincronía y APIs)

### 2.1 Callbacks y callback hell — ID 66

- [x] **2.1a** — Agregar lección `id: 66` sobre callbacks.
- [x] **2.1b** — `npm test` pasa.

### 2.2 Fetch API — ID 67

- [x] **2.2a** — Agregar lección `id: 67` sobre Fetch API.
- [x] **2.2b** — `npm test` pasa.

### 2.3 Reintentos con exponential backoff — ID 68

- [x] **2.3a** — Agregar lección `id: 68` sobre exponential backoff.
- [x] **2.3b** — `npm test` pasa.

### 2.4 API paginada — ID 69

- [x] **2.4a** — Agregar lección `id: 69` sobre APIs paginadas.
- [x] **2.4b** — `npm test` pasa.

### 2.5 Promise combinators avanzados — ID 70

- [x] **2.5a** — Agregar lección `id: 70` sobre Promise combinators.
- [x] **2.5b** — `npm test` pasa.

### 2.6 Manejo de errores asincrónicos — ID 71

- [x] **2.6a** — Agregar lección `id: 71` sobre errores asincrónicos.
- [x] **2.6b** — `npm test` pasa.

---

## Lote 3 — Contenido: Ampliar Módulo 8 (Optimización y Estructuras de Datos)

### 3.1 Pilas (Stacks) — ID 72

- [x] **3.1a** — Agregar lección `id: 72` sobre Pilas.
- [x] **3.1b** — `npm test` pasa.

### 3.2 Colas (Queues) — ID 73

- [x] **3.2a** — Agregar lección `id: 73` sobre Colas.
- [x] **3.2b** — `npm test` pasa.

### 3.3 Sets y Maps — ID 74

- [x] **3.3a** — Agregar lección `id: 74` sobre Sets y Maps.
- [x] **3.3b** — `npm test` pasa.

### 3.4 Búsqueda binaria — ID 75

- [x] **3.4a** — Agregar lección `id: 75` sobre búsqueda binaria.
- [x] **3.4b** — `npm test` pasa.

### 3.5 Recursión — ID 76

- [x] **3.5a** — Agregar lección `id: 76` sobre recursión.
- [x] **3.5b** — `npm test` pasa.

### 3.6 Análisis Big O — ID 77

- [x] **3.6a** — Agregar lección `id: 77` sobre Big O.
- [x] **3.6b** — `npm test` pasa.

---

## Lote 4 — Contenido: Ampliar Módulo 9 (Proyectos Finales)

### 4.1 Proyecto: Juego Memory — ID 78

- [x] **4.1a** — Agregar lección `id: 78` sobre juego Memory.
- [x] **4.1b** — `npm test` pasa.

### 4.2 Proyecto: Router SPA — ID 79

- [x] **4.2a** — Agregar lección `id: 79` sobre Router SPA.
- [x] **4.2b** — `npm test` pasa.

### 4.3 Proyecto: Dashboard con datos — ID 80

- [x] **4.3a** — Agregar lección `id: 80` sobre Dashboard.
- [x] **4.3b** — `npm test` pasa.

### 4.4 Proyecto: Carrito de compra persistente — ID 81

- [x] **4.4a** — Agregar lección `id: 81` sobre carrito persistente.
- [x] **4.4b** — `npm test` pasa.

---

## Lote 5 — Routing y Deep Linking

### 5.1 Sistema de routing hash-based

- [x] **5.1a** — Implementar routing con hash (`#/leccion/5`). Escuchar `hashchange`. Al cargar la página, leer `window.location.hash` y seleccionar la lección correspondiente. Si no hay hash, cargar la primera lección.
- [x] **5.1b** — Actualizar el hash cuando el usuario selecciona una lección desde el sidebar (`selectLesson` → `location.hash = '#/leccion/' + id`).
- [x] **5.1c** — El botón "Siguiente lección" debe actualizar el hash también.
- [x] **5.1d** — Asegurar que al cargar una URL como `index.html#/leccion/15`, la lección 15 se seleccione automáticamente.
- [x] **5.1e** — Agregar tests: que `selectLesson` actualice el hash.
- [x] **5.1f** — `npm test` pasa (68 tests), `npm run build` compila.

**Criterio de aceptación**: Compartir `url#/leccion/5` abre la app directamente en la lección 5. El hash se actualiza al navegar entre lecciones. No hay recarga de página al cambiar de lección.

**Instrucciones para agente**:
1. En `js/app.ts`, agregar después de `completedIds = new Set(getProgress());`:
   - Función `handleHashChange()`: leer `window.location.hash`, extraer el ID, llamar a `selectLesson(id)`
   - En `selectLesson`, agregar `location.hash = '#/leccion/' + id` al inicio
   - En `DOMContentLoaded`, primero verificar hash, si no hay hash seleccionar primera lección
2. Agregar `window.addEventListener('hashchange', handleHashChange)`
3. En `js/app.test.ts`, agregar tests que verifiquen:
   - `selectLesson(5)` → `location.hash === '#/leccion/5'`
   - Simular hashchange y verificar que se llama a selectLesson
4. Ejecutar `npm test`, `npm run build`, y hacer prueba manual en `npm run dev`

---

## Lote 6 — Sincronizar tema de CodeMirror con el tema de la app

### 6.1 CodeMirror theme sync

- [x] **6.1a** — Definir estilos CM para modo oscuro en `css/style.css` usando `.cm-s-default` dentro de `[data-theme="dark"]`: invertir colores de fondo (`--color-code-bg`), texto (`--color-text`), gutter, cursor, selección.
- [x] **6.1b** — En `js/editor.ts`, agregar función `syncEditorTheme()` que se llame al inicializar y al cambiar tema. No requiere recargar CM (CM5 se repinta automáticamente al cambiar CSS).
- [x] **6.1c** — En `js/theme.ts`, después de `setAttribute('data-theme', ...)`, disparar un evento personalizado `'themechange'` o llamar directamente a `syncEditorTheme()`.
- [x] **6.1d** — Verificar que en modo oscuro el editor tenga fondo oscuro y texto claro, y viceversa.
- [x] **6.1e** — `npm test` pasa, `npm run build` compila.

**Criterio de aceptación**: Al cambiar entre tema claro/oscuro, el editor CodeMirror cambia de colores sincronizadamente. No hay parpadeo ni estado inconsistente.

**Instrucciones para agente**:
1. Abrir `css/style.css`, al final del bloque `[data-theme="dark"]` agregar reglas para `.CodeMirror`, `.CodeMirror-gutters`, `.CodeMirror-cursor`, `.CodeMirror-selected`, `.CodeMirror-linenumber` con colores oscuros
2. En `js/editor.ts`, exportar función `syncEditorTheme(theme: 'dark' | 'light')` (no-op si CM se repinta con CSS)
3. En `js/theme.ts`, importar `syncEditorTheme` y llamarla desde `setTheme`
4. Verificar manualmente en navegador

---

## Lote 7 — Test Infrastructure

### 7.1 Tests de integración (flujo completo)

- [x] **7.1a** — Crear test que simule seleccionar una lección usando `selectLesson` y verifique que el DOM se actualiza: `theory-area` tiene contenido HTML, `exercise-title` tiene el título. Requiere exponer `selectLesson` o crear wrapper.
- [x] **7.1b** — Crear test que simule escribir en el editor (mock CodeMirror) y ejecutar código, verificando que `showResult` se llama con los parámetros correctos.
- [x] **7.1c** — Crear test que verifique que `renderLessonList` produce la estructura correcta de sidebar con módulos y lecciones.
- [x] **7.1d** — `npm test` pasa (81 tests).

**Criterio de aceptación**: 3+ nuevos tests de integración que ejerciten flujos multi-funcionales.

### 7.2 Tests de accesibilidad automatizados

- [x] **7.2a** — Instalar `vitest-axe` (fork de jest-axe compatible con Vitest).
- [x] **7.2b** — Crear test que renderice la app básica (sidebar + editor) con jsdom y ejecute auditoría axe-core. Verificar que no haya violaciones críticas/serias.
- [x] **7.2c** — Crear test que verifique roles ARIA en la lista de lecciones: `role="tree"` en el `ul`, `role="treeitem"` en cada `li`.
- [x] **7.2d** — `npm test` pasa (83 tests).

**Criterio de aceptación**: Tests de accesibilidad con axe-core integrados y pasando.

### 7.3 Tests del Web Worker

- [x] **7.3a** — Crear test que verifique que el mensaje enviado al Worker tiene el formato correcto (`userCode` + `testExpressions` array de strings).
- [x] **7.3b** — Crear test para `getTestExpression()` que cubra: string simple, TestExpression tipo expression, TestExpression tipo function con expected, tipos mixtos.
- [x] **7.3c** — Crear test para `getTestDisplay()` que retorne representación legible.
- [x] **7.3d** — `npm test` pasa.

### 7.4 Tests de tema y persistencia

- [x] **7.4a** — Test: `setTheme('dark')` establece `data-theme="dark"` en `<html>` y guarda en localStorage.
- [x] **7.4b** — Test: `loadTheme()` respeta preferencia guardada sobre `prefers-color-scheme`.
- [x] **7.4c** — Test: `loadTheme()` usa `prefers-color-scheme` si no hay preferencia guardada.
- [x] **7.4d** — Test: búsqueda filtra lecciones correctamente (mock del DOM).
- [x] **7.4e** — `npm test` pasa.

---

## Lote 8 — Dashboard de Progreso

### 8.1 Barra de progreso global

- [x] **8.1a** — Agregar en el sidebar, debajo del buscador, un contenedor de progreso: `<div id="progress-bar"><div id="progress-fill"></div><span id="progress-text">0/58 lecciones</span></div>`.
- [x] **8.1b** — En `js/constants.ts`, agregar IDs: `PROGRESS_BAR`, `PROGRESS_FILL`, `PROGRESS_TEXT`.
- [x] **8.1c** — En `js/app.ts`, crear función `updateProgressBar()` que calcule `completedIds.size / lessons.length * 100` y actualice la barra y el texto.
- [x] **8.1d** — Llamar a `updateProgressBar()` después de `renderLessonList()`, `addCompleted()`, y al hacer clic en "Reiniciar progreso".
- [x] **8.1e** — En `css/style.css`, agregar estilos para la barra: altura 8px, fondo sutíl, relleno con color primary, border-radius, animación suave en `width`.
- [x] **8.1f** — Asegurar accesibilidad: `role="progressbar"`, `aria-valuenow`, `aria-valuemin="0"`, `aria-valuemax="100"`, `aria-label="Progreso del curso"`.
- [x] **8.1g** — Agregar en `index.html` el contenedor de progreso en el sidebar.
- [x] **8.1h** — Tests: verificar que `updateProgressBar()` actualiza correctamente el DOM.
- [x] **8.1i** — `npm test` pasa, `npm run build` compila.

**Criterio de aceptación**: Barra visible en el sidebar que muestra % de lecciones completadas, se actualiza al completar una lección o reiniciar progreso.

**Instrucciones para agente**:
1. Editar `index.html`: dentro del sidebar, después del input de búsqueda y antes del `<nav>`, agregar el contenedor de progreso
2. Editar `js/constants.ts`: agregar PROGRESS_BAR, PROGRESS_FILL, PROGRESS_TEXT
3. Editar `js/dom.ts` o `js/app.ts`: implementar `updateProgressBar()`
4. Editar `css/style.css`: estilos para `.progress-bar`, `.progress-fill`, `.progress-text`
5. Llamar a `updateProgressBar()` en los 3 lugares (init, addCompleted, reset)
6. Ejecutar `npm test && npm run build`

### 8.2 Estadísticas por módulo

- [x] **8.2a** — Mostrar contador "Módulo (3/5)" en headers del sidebar.
- [x] **8.2b** — Calcular en `renderLessonList()`: totales y completadas.
- [x] **8.2c** — `npm test` pasa.

**Criterio de aceptación**: Los headers del sidebar muestran progreso por módulo (ej: "Fundamentos (5/8)").

---

## Lote 9 — UX: Editor y Feedback

### 9.1 Resaltar línea de error en el editor

- [x] **9.1a** — En `runTests()` y `runTestsInWorker()`: cuando se capture un error con número de línea, devolver el `errorLine` en el resultado.
- [x] **9.1b** — En `js/editor.ts`, agregar función `highlightLine(cm, lineNum)` que use `cm.addLineClass(lineNum - 1, 'background', 'error-line')`.
- [x] **9.1c** — En `js/editor.ts`, agregar función `clearHighlights(cm)` para remover la clase `error-line` de todas las líneas.
- [x] **9.1d** — En `app.ts` `runCode()`: al recibir un error con línea, limpiar highlights previos y resaltar la línea del error.
- [x] **9.1e** — En `css/style.css`, agregar `.error-line { background: rgba(255, 0, 0, 0.1); }` y para modo oscuro `[data-theme="dark"] .error-line { background: rgba(255, 80, 80, 0.15); }`.
- [x] **9.1f** — `npm test` pasa.

**Criterio de aceptación**: Si el código del alumno tiene un error en línea 3, esa línea se resalta en rojo en el editor.

### 9.2 Paleta de atajos de teclado

- [x] **9.2a** — Agregar botón "⌨" al lado de "Ejecutar".
- [x] **9.2b** — Crear modal con lista de atajos.
- [x] **9.2c** — Cerrar con Escape o clic fuera. `aria-modal`, `role="dialog"`, `aria-labelledby`.
- [x] **9.2d** — Agregar botón y modal en `index.html`.
- [x] **9.2e** — Estilos para modal y overlay en `style.css`.
- [x] **9.2f** — Tests: verificar que el modal comienza oculto y tiene atributos ARIA correctos.
- [x] **9.2g** — `npm test` pasa (68 tests).

**Criterio de aceptación**: Botón visible que abre un modal con todos los atajos de teclado. Modal se cierra con Escape o clic fuera.

### 9.3 Tooltip en botón "Ejecutar"

- [x] **9.3a** — Agregar `title="Ejecutar código (Ctrl+Enter)"` al botón de ejecutar.
- [x] **9.3b** — Verificar en `index.html` que el botón `run-btn` tenga `title` y `aria-keyshortcuts="Ctrl+Enter"`.
- [x] **9.3c** — `npm test` pasa.

---

## Lote 10 — Calidad y Refactor

### 10.1 Eliminar duplicación de error-handling

- [x] **10.1a** — Extraer la lógica de parseo de errores a `js/errors.ts`: `parseError(err: unknown): { message: string; line?: number }`.
- [x] **10.1b** — Actualizar `runTests()` en `app.ts` para usar `parseError()`.
- [x] **10.1c** — Actualizar `sandbox.worker.ts` para importar y usar `parseError()` (el worker puede importar módulos ES).
- [x] **10.1d** — Agregar tests para `parseError()`: SyntaxError, ReferenceError, TypeError, error con stack, error sin stack, error genérico.
- [x] **10.1e** — `npm test` pasa (66 tests).

**Criterio de aceptación**: La lógica de parseo de errores existe en un solo lugar (DRY). Ambos `runTests` y el worker la usan.

### 10.2 Centralizar clases CSS faltantes en constants.ts

- [x] **10.2a** — Identificar clases CSS usadas como strings literales en el código: solo 3 ocurrencias en `app.test.ts` (`'hidden'`, `'error'`, `'success'`). Las fuentes (`app.ts`, `dom.ts`) ya usan `CSS_CLASSES`.
- [x] **10.2b** — Agregar a `CSS_CLASSES` en `constants.ts`: `BTN_RUN`, `BTN_RESET`, `BTN_SOLUTION`. `BTN`, `BTN_NEXT`, `SIDEBAR_OVERLAY_ACTIVE` ya existían.
- [x] **10.2c** — Reemplazar los 3 literales en `app.test.ts` por `CSS_CLASSES.HIDDEN`, `CSS_CLASSES.ERROR`, `CSS_CLASSES.SUCCESS`.
- [x] **10.2d** — La convención de prefijo `.` ya está correcta: clases con punto para `querySelector` (`.content`, `.lesson-list li`), sin punto para `className`/`classList` (`btn`, `hidden`, `sidebar__header`).
- [x] **10.2e** — `npm test` pasa (81 tests), `npm run build` compila.

**Criterio de aceptación**: No hay strings CSS literales en `js/*.ts` (solo referencias a `CSS_CLASSES`). Todas las clases siguen el mismo formato (sin punto para className, con punto para selectors).

### 10.3 Agregar tipo para resultado de Worker

- [x] **10.3a** — En `js/types.ts`, agregar interfaz `WorkerResult` (incluye `errorLine?: number`).
- [x] **10.3b** — Actualizar firma de `runTests()` y `runTestsInWorker()` para usar `WorkerResult`.
- [x] **10.3c** — Actualizar `sandbox.worker.ts` para usar `WorkerResult`.
- [x] **10.3d** — `npm test` pasa.

### 10.4 Agregar tipo `loading` a `LessonResult`

- [x] **10.4a** — En `js/types.ts`, agregar variante `loading` a `LessonResult`.
- [x] **10.4b** — En `js/app.ts`, cambiar a `{ status: 'loading', message: 'Ejecutando...' }`.
- [x] **10.4c** — En `js/dom.ts`, manejar `status: 'loading'` con spinner.
- [x] **10.4d** — Actualizar tests de tipos en `app.test.ts` para incluir `'loading'`.
- [x] **10.4e** — `npm test` pasa.

---

## Lote 11 — CI/CD y GitHub Actions

### 11.1 Workflow de CI con tests y build

- [x] **11.1a** — Crear `.github/workflows/ci.yml` con test + build.
- [x] **11.1b** — Verificar que el workflow es sintácticamente válido (YAML correcto, `npm ci`/`npm test`/`npm run build` comandos válidos).

**Criterio de aceptación**: Al hacer push a `main`, GitHub Actions ejecuta `npm test` y `npm run build` automáticamente.

### 11.2 Workflow de deploy a GitHub Pages

- [x] **11.2a** — Crear `.github/workflows/deploy.yml` para GitHub Pages.
- [x] **11.2b** — Configurar GitHub Pages en Settings > Pages > Source: GitHub Actions.
- [x] **11.2c** — Verificar que el deploy se completa exitosamente (push a main activa el workflow automáticamente).

**Criterio de aceptación**: Cada push a `main` despliega automáticamente a GitHub Pages.

---

## Lote 12 — Mejoras UX adicionales

### 12.1 Spinner de carga para el Worker

- [x] **12.1a** — En `js/dom.ts`, en `showResult` con `status: 'loading'`, mostrar un spinner CSS.
- [x] **12.1b** — En `css/style.css`, agregar clases `.spinner` con animación `@keyframes spin`.
- [x] **12.1c** — `npm test` pasa.

### 12.2 Foco automático al seleccionar lección

- [x] **12.2a** — En `selectLesson()`, mover el foco a `exercise-title`.
- [x] **12.2b** — Usar `tabindex="-1"` y `focus()`.
- [x] **12.2c** — `npm test` pasa.

### 12.3 Feedback visual del estado de guardado

- [x] **12.3a** — Mostrar indicador "Guardado ✓" cerca del editor.
- [x] **12.3b** — Desaparece tras 1.5s. Texto pequeño y gris.
- [x] **12.3c** — `npm test` pasa.

---

## Flujo de Trabajo para Agentes

### Agente Implementador

1. Elegir un lote y una tarea (ej: `[ ] 1.1a — Delegación de eventos`)
2. Leer atentamente las **instrucciones para agente** de esa tarea
3. Implementar los cambios según el criterio de aceptación
4. Ejecutar `npm test` para verificar que los tests existentes siguen pasando
5. Ejecutar `npm run build` para verificar que compila
6. Ejecutar `npm run dev` y verificar visualmente en el navegador (si aplica)
7. Si pasa todo, marcar `[x]` en esta tarea
8. Si falla, arreglar y repetir
9. Al terminar un lote completo, ejecutar `npm test` y `npm run build` como verificación final

### Agente Revisor (skill `reviewer`)

1. Tomar un lote marcado como completado por el implementador
2. Para cada tarea `[x]` del lote:
   - Leer el código modificado
   - Verificar que cumple el criterio de aceptación (ejecutar `npm test`, revisar archivos, probar en navegador)
   - Si cumple: dejar `[x]`
   - Si NO cumple: cambiar a `[ ]` y añadir nota con formato:
     ```
     **REVISIÓN — [nombre tarea]**: ❌ No aceptado.
     Motivo: [explicación clara de qué falta]
     ```
3. Reportar resultados: cuántas tareas pasaron, cuántas requieren corrección

### Ciclo completo

```
Implementador → marca [x] → Revisor → ¿Aceptado?
    ↓ sí                    ↓ no
Siguiente lote        Implementador corrige → [x] → Revisor → ...
```
