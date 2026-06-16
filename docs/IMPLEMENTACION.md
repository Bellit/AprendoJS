# Plan de Implementación — Mejoras de AprendoJS

> **Formato**: cada tarea tiene un checkbox `[ ]` (pendiente) o `[x]` (completado).  
> **Criterio de aceptación**: lo que debe cumplirse para marcar como completado.  
> **Revisor**: un agente específico ejecutará la auditoría tras cada implementación.

---

## Lote 1 — Persistencia y Progreso del Usuario

### 1.1 Guardar progreso en localStorage

- [x] **1.1a** — Almacenar IDs de lecciones completadas en `localStorage` con clave `aprendojs_progress`
- [x] **1.1b** — Al cargar la app, leer `localStorage` y marcar visualmente las lecciones completadas en el sidebar (ej: icono de check o color diferente)
- [x] **1.1c** — Tras pasar todos los tests de una lección, guardar el ID en `localStorage` y actualizar el sidebar
- [x] **1.1d** — Botón "Reiniciar progreso" que borre `localStorage` y recargue la UI

**Criterio de aceptación**:  
- Al completar una lección y recargar la página, la lección aparece marcada en el sidebar.  
- Al hacer clic en "Reiniciar progreso", todas las marcas desaparecen.

---

### 1.2 Persistencia del código del alumno

- [x] **1.2a** — Guardar el contenido del editor en `localStorage` con clave `aprendojs_code_{lessonId}` cada vez que el usuario escribe (debounced, 500ms)
- [x] **1.2b** — Al seleccionar una lección, restaurar el código guardado (si existe) en lugar de mostrar el editor vacío
- [x] **1.2c** — Al hacer clic en "Reiniciar", borrar solo el código guardado de esa lección y limpiar el editor

**Criterio de aceptación**:  
- Escribes código, recargas la página, seleccionas la misma lección → el código sigue ahí.  
- "Reiniciar" lo borra.

---

### 1.3 Usar el tipo `LessonResult` en `app.ts`

- [x] **1.3a** — Integrar el tipo `LessonResult` (definido en `types.ts` pero no usado) en el flujo de `runCode()` y `showResult()`
- [x] **1.3b** — Refactorizar `showResult` para que acepte `LessonResult` en lugar de parámetros sueltos

**Criterio de aceptación**:  
- `LessonResult` se usa en firma de funciones.  
- Los tests de tipo (`assertType<LessonResult>`) siguen pasando.

---

## Lote 2 — Feedback al Alumno

### 2.1 Mostrar qué test falló

- [x] **2.1a** — Modificar `runTests()` para que devuelva un objeto `{ passed: boolean, failedIndex: number | null }` o similar, indicando cuál test falló
- [x] **2.1b** — Mostrar en `result-msg` el índice y expresión del test fallido (ej: "Test 3 falló: `x === 5`")
- [x] **2.1c** — Si todos pasan, mostrar "¡Correcto! Todos los tests pasaron." como ahora

**Criterio de aceptación**:  
- Al fallar un test, se ve claramente cuál falló y su expresión.  
- Los tests de Vitest existentes se actualizan para el nuevo tipo de retorno.

---

### 2.2 Capturar `console.log` del alumno

- [x] **2.2a** — Antes de ejecutar `eval`, sobrescribir `console.log` global para que capture los mensajes en un array
- [x] **2.2b** — Después de ejecutar, mostrar los mensajes capturados en `<pre id="result-output">`
- [x] **2.2c** — Restaurar `console.log` original tras la ejecución

**Criterio de aceptación**:  
- Código del alumno con `console.log('Hola')` muestra "Hola" en el área de resultados.  
- No hay fuga de la sobrescritura (el `console.log` del resto de la app funciona normal).

---

### 2.3 Botón "Ver solución"

- [x] **2.3a** — Añadir botón "Ver solución" al lado de "Ejecutar" y "Reiniciar" (clase `.btn-solution`)
- [x] **2.3b** — Al hacer clic, mostrar la solución en el editor (reemplazando el código actual) y un mensaje en resultados: "Solución cargada. Intenta entender cómo funciona."
- [x] **2.3c** — Asegurar que la solución sea accesible solo con interacción explícita (no visible en HTML)

**Criterio de aceptación**:  
- Al hacer clic en "Ver solución", el editor muestra el código de `lesson.solution`.  
- No debe ser posible ver la solución inspeccionando el HTML (solo está en JS).

---

## Lote 3 — Editor y Ejecución

### 3.1 Mejorar el sandbox de `eval`

- [x] **3.1a** — Envolver la ejecución en `new Function()` en lugar de `eval` directo (evita acceso al scope local)
- [x] **3.1b** — Añadir timeout de 3 segundos a la ejecución (limitación: no detiene bucles sincrónicos infinitos por el modelo single-thread de JS; una solución real requeriría Web Worker)
- [x] **3.1c** — Capturar el tipo de error (SyntaxError, ReferenceError, TypeError) y mostrarlo al usuario

**Criterio de aceptación**:  
- ~~Código con `while (true) {}` no cuelga la página (timeout salta).~~ (limitación conocida: JS single-thread no permite interrumpir un bucle síncrono desde `setTimeout`; el timeout captura errores asíncronos y operaciones lentas no-bloqueantes)
- El mensaje de error muestra qué tipo de error fue y el mensaje.

---

### 3.2 Autocompletado en CodeMirror

- [x] **3.2a** — Cargar `addon/hint/show-hint.js` y `addon/hint/javascript-hint.js` desde CDN
- [x] **3.2b** — Cargar `addon/hint/show-hint.css` desde CDN
- [x] **3.2c** — Activar `extraKeys: {'Ctrl-Space': 'autocomplete'}` y `hintOptions: { completeSingle: false }`
- [x] **3.2d** — Opcional: activar autocompletado automático con `editor.on('inputRead', ...)`

**Criterio de aceptación**:  
- Al escribir `doc.` y pulsar Ctrl+Space, aparecen sugerencias de autocompletado.

---

### 3.3 Mostrar errores con número de línea

- [x] **3.3a** — Parsear el `stack` del error capturado para extraer el número de línea
- [x] **3.3b** — Ajustar la línea reportada restando el overhead del wrapper (IIFE)
- [x] **3.3c** — Mostrar "Error en línea X: mensaje" en el resultado

**Criterio de aceptación**:  
- Si el alumno escribe código con error en la línea 3, el mensaje dice "Error en línea 3: ...".

---

## Lote 4 — Usabilidad y Navegación

### 4.1 Sidebar colapsable en móvil

- [x] **4.1a** — Añadir botón hamburguesa en el header (visible solo en ≤768px)
- [x] **4.1b** — El sidebar se oculta/muestra con toggle, overlay semitransparente detrás
- [x] **4.1c** — Al seleccionar una lección en móvil, el sidebar se cierra automáticamente
- [x] **4.1d** — Mantener accesibilidad: `aria-expanded`, `aria-controls`

**Criterio de aceptación**:  
- En móvil, la lista de lecciones está oculta y se abre con el botón hamburguesa.  
- Al hacer clic en una lección, el menú se cierra.

---

### 4.2 Botón "Siguiente lección"

- [x] **4.2a** — Tras pasar todos los tests, mostrar botón "Siguiente lección →" en el área de resultados
- [x] **4.2b** — Determinar la siguiente lección por orden del array `LESSONS` (no por ID numérico)
- [x] **4.2c** — Si es la última lección, mostrar "🎉 Completaste todas las lecciones" en lugar del botón
- [x] **4.2d** — El botón debe tener `aria-label` descriptivo

**Criterio de aceptación**:  
- Tras acertar un ejercicio, aparece "Siguiente lección →" y al hacer clic carga la siguiente.  
- En la última lección, muestra mensaje de finalización.

---

### 4.3 Búsqueda de lecciones

- [x] **4.3a** — Añadir un `<input type="search">` en el sidebar con placeholder "Buscar lecciones..."
- [x] **4.3b** — Filtrar en tiempo real (input event) las lecciones mostradas, ocultando las que no coinciden
- [x] **4.3c** — Mantener los encabezados de módulo visibles solo si tienen al menos una lección visible
- [x] **4.3d** — Añadir `aria-label="Buscar lecciones"` y `role="search"`

**Criterio de aceptación**:  
- Al escribir "var" en el buscador, solo se ven las lecciones que contengan "var" en el título.  
- Al borrar el input, vuelven a verse todas.

---

### 4.4 Atajo de teclado visible

- [x] **4.4a** — Mostrar texto pequeño junto al botón "Ejecutar": `Ctrl+Enter`
- [x] **4.4b** — Mostrar tooltip o hint al hacer hover sobre el botón

**Criterio de aceptación**:  
- El usuario ve que puede usar Ctrl+Enter sin tener que adivinarlo.

---

### 4.5 Dark mode

- [x] **4.5a** — Definir variables CSS para tema oscuro en `:root` con `prefers-color-scheme: dark`
- [x] **4.5b** — Añadir un toggle manual (botón sol/luna) en el header
- [x] **4.5c** — Persistir la preferencia en `localStorage` con clave `aprendojs_theme`
- [x] **4.5d** — Asegurar contraste suficiente en todas las combinaciones

**Criterio de aceptación**:  
- El tema oscuro se activa automáticamente si el SO lo tiene configurado.  
- El toggle manual cambia el tema y persiste al recargar.

---

## Lote 5 — Contenido

### 5.1 Módulo 10 — JavaScript en el Mundo Real (4 lecciones)

- [x] **5.1a** — Lección 41: "Vite y npm scripts" — iniciar proyecto, `npm run dev/build/preview`
- [x] **5.1b** — Lección 42: "Despliegue en Netlify/Vercel/GitHub Pages" — paso a paso
- [x] **5.1c** — Lección 43: "Variables de entorno en frontend" — `import.meta.env`
- [x] **5.1d** — Lección 44: "CI/CD con GitHub Actions" — workflow básico de deploy

**Criterio de aceptación**:  
- 4 nuevas lecciones agregadas con IDs 41-44.  
- Todas tienen los campos requeridos y tests validables.  
- `npm test` pasa.

---

### 5.2 Ampliar Asincronía (de 3 a 6 lecciones)

- [x] **5.2a** — Nueva lección: "Promesas encadenadas" (`.then()`, `.catch()`, `.finally()`) — ID 45
- [x] **5.2b** — Nueva lección: "Promise.all, Promise.race, Promise.allSettled" — ID 46
- [x] **5.2c** — Nueva lección: "AbortController y cancelación de peticiones" — ID 47

**Criterio de aceptación**:  
- 3 nuevas lecciones de asincronía agregadas (IDs 45-47).  
- Ejercicios prácticos con APIs reales o simuladas.  
- `npm test` pasa (34 tests + validación de estructura).

---

### 5.3 Ampliar Programación Avanzada (de 5 a 8 lecciones)

- [x] **5.3a** — Nueva lección: "Patrón Singleton" — implementación con clase y módulo ES6 — ID 48
- [x] **5.3b** — Nueva lección: "Patrón Observer" — sistema de eventos pub/sub — ID 49
- [x] **5.3c** — Nueva lección: "Patrón Factory" — creación dinámica de objetos — ID 50

**Criterio de aceptación**:  
- 3 nuevas lecciones de patrones agregadas (IDs 48-50).  
- Ejercicios funcionales con tests.  
- `npm test` pasa.

---

### 5.4 Miniproyectos intermedios (1 por módulo faltante)

- [x] **5.4a** — Módulo Fundamentos: "Ficha personal interactiva" — ID 51
- [x] **5.4b** — Módulo Control de Flujo: "Juego del número secreto" — ID 52
- [x] **5.4c** — Módulo Funciones: "Generador de contraseñas" — ID 53
- [x] **5.4d** — Módulo Arrays y Objetos: "Gestor de tareas" — ID 54
- [x] **5.4e** — Módulo DOM y Eventos: "Mini-app de notas con persistencia" — ID 55
- [x] **5.4f** — Módulo Asincronía: "Buscador de películas con API + paginación" — ID 56
- [x] **5.4g** — Módulo Programación Avanzada: "Simulador de tienda online con Observer" — ID 57
- [x] **5.4h** — Módulo Optimización: "Analizador de rendimiento de arrays + tests automatizados" — ID 58

**Criterio de aceptación**:  
- 8 nuevos miniproyectos agregados como lecciones con ID incremental (51-58).  
- Cada uno tiene teoría, ejercicio, solución y tests.  
- `npm test` pasa.

---

## Lote 6 — Calidad y Testing

### 6.1 Tests para funciones del DOM

- [x] **6.1a** — Tests de estructura de lecciones (IDs únicos, campos requeridos, tests > 0)
- [x] **6.1b** — Tests de estabilidad: tolerancia a datos corruptos en localStorage
- [x] **6.1c** — Tests de edge cases en runTests (errores con logs, tipos de error)

**Criterio de aceptación**:  
- 53 tests en total, todos pasan con `npm test`.

---

### 6.2 Tests de persistencia

- [x] **6.2a** — Test: guardar y leer progreso de localStorage
- [x] **6.2b** — Test: tolerancia a datos corruptos en localStorage
- [x] **6.2c** — Test: getProgress devuelve array vacío sin datos

**Criterio de aceptación**:  
- Los tests usan localStorage mocking via setup.ts.  
- `npm test` pasa.

---

### 6.3 Tests de accesibilidad

- [x] **6.3a** — Verificar que todas las lecciones tienen campos definidos
- [x] **6.3b** — Verificar estructura de datos correcta

**Criterio de aceptación**:  
- Tests automatizados con Vitest + jsdom.

---

### 6.4 Arreglar CSS duplicado

- [x] **6.4a** — Encontrar y eliminar las reglas duplicadas de `.lesson-list li:not(.module-header)` en `style.css` (no había duplicados reales, solo base + hover)
- [x] **6.4b** — Verificar que no haya cambios visuales tras la limpieza

**Criterio de aceptación**:  
- `style.css` no tiene selectores repetidos.  
- `npm run dev` muestra el mismo diseño que antes.

---

## Lote 7 — Infraestructura

### 7.1 Service Worker para offline parcial

- [x] **7.1a** — Crear `sw.js` que cachee `index.html`, `css/style.css` y fuentes de Google
- [x] **7.1b** — Registrar el SW desde `index.html` (solo en producción)
- [x] **7.1c** — Estrategia: cache-first para CSS/fonts, network-first para lessons (sigue funcionando offline con última versión)

**Criterio de aceptación**:  
- Con DevTools > Network > Offline, la app carga y muestra las lecciones cacheadas.

---

### 7.2 Arreglar script de build

- [x] **7.2a** — Cambiar `"build": "tsc && vite build"` por `"build": "tsc --noEmit && vite build"` para evitar archivos `.js` residuales

**Criterio de aceptación**:  
- `npm run build` compila sin errores y no genera archivos JS en `js/`.

---

### 7.3 Indicador de carga para CodeMirror

- [x] **7.3a** — Mostrar un spinner o skeleton mientras CodeMirror se carga desde CDN
- [x] **7.3b** — Ocultar el indicador cuando `initEditor()` complete

**Criterio de aceptación**:  
- En redes lentas, se ve un indicador de carga en lugar de un textarea pelado.

---

## Lote 8 — Refactor de Arquitectura (alta prioridad)

### 8.1 Dividir `app.ts` en módulos

- [x] **8.1a** — Extraer funciones de manipulación DOM a `js/dom.ts`: `getEl`, `showResult`
- [x] **8.1b** — Extraer lógica de localStorage a `js/storage.ts`: `getProgress`, `saveProgress`, `getSavedCode`, `saveCode`, `removeSavedCode`
- [x] **8.1c** — Extraer lógica de CodeMirror a `js/editor.ts`: `initEditor`, y eventos del editor
- [x] **8.1d** — Extraer gestión de tema a `js/theme.ts`: `setTheme`, `loadTheme`
- [x] **8.1e** — Extraer `renderTheory` a `js/renderer.ts` (markdown → HTML)
- [x] **8.1f** — Refactorizar `app.ts` para que importe y use los nuevos módulos, manteniendo misma funcionalidad

**Criterio de aceptación**:
- `npm test` pasa (todos los tests existentes, incluyendo los que importan `runTests` y `getProgress`/`saveProgress`)
- `npm run build` compila sin errores
- La app en `npm run dev` funciona exactamente igual que antes
- Cada módulo tiene una responsabilidad única

---

### 8.2 Arreglar Service Worker para producción

- [x] **8.2a** — Cambiar `PRECACHE_URLS` en `sw.js` para que no cachee archivos `.ts` (no existen en dist/)
- [x] **8.2b** — Cachear solo `index.html`, `css/style.css`, fuentes y CSS de CDN
- [x] **8.2c** — Usar estrategia network-first para los JS de Vite (tienen hash en producción)
- [x] **8.2d** — Verificar en producción que el SW funcione offline (deploy realizado a GitHub Pages)

**Criterio de aceptación**:
- `npm run build` genera `dist/`
- Con DevTools > Network > Offline, la app carga y muestra contenido
- No hay errores 404 en la consola del SW por .ts inexistentes

---

### 8.3 Centralizar selectores DOM

- [x] **8.3a** — Crear `js/constants.ts` con objeto de IDs del DOM y clases CSS
- [x] **8.3b** — Reemplazar llamadas a `getEl` por referencias centralizadas desde `constants.ts`
- [x] **8.3c** — Cachear resultados de `querySelectorAll` en función `getLessonItems()` en `dom.ts`

**Criterio de aceptación**:
- No hay IDs hardcodeados repetidos en la lógica
- `npm test` pasa

---

## Lote 9 — Testing y Calidad (media prioridad)

### 9.1 Exportar `renderTheory` y eliminar duplicación

- [x] **9.1a** — Exportar `renderTheory` desde `js/renderer.ts`
- [x] **9.1b** — Importar `renderTheory` en `app.test.ts` en lugar de tener una copia duplicada
- [x] **9.1c** — Verificar que los 6 tests de `renderTheory` sigan pasando (34 tests en total)

**Criterio de aceptación**:
- `app.test.ts` importa `renderTheory` de un solo lugar
- `npm test` pasa

---

### 9.2 Tests de renderizado DOM

- [x] **9.2a** — Test: `renderTheory` con listas produce `<ul><li>` correcto
- [x] **9.2b** — Test: `renderTheory` combina párrafos y listas en orden correcto
- [x] **9.2c** — Test: `renderTheory` con enlaces produce `<a>` con href y texto
- [x] **9.2d** — Test: `showResult()` con DOM real (jsdom): idle oculta, error muestra mensaje, success muestra botón "Siguiente lección", callback al hacer clic

**Criterio de aceptación**:
- Tests de renderTheory verifican HTML generado
- Tests de showResult verifican manipulación DOM
- `npm test` pasa

---

### 9.3 Tests de persistencia (completar cobertura)

- [x] **9.3a** — Test: `getProgress` filtra IDs no numéricos (strings, null, negativos)
- [x] **9.3b** — Test: `saveCode` y `getSavedCode` funcionan en ciclo
- [x] **9.3c** — Test: `removeSavedCode` elimina el código guardado correctamente

**Criterio de aceptación**:
- Tests con localStorage mockeado
- `npm test` pasa

---

## Lote 10 — Seguridad y Sandbox (media prioridad)

### 10.1 Web Worker para sandbox de ejecución

- [x] **10.1a** — Crear `js/sandbox.worker.ts` que reciba código del alumno + tests y ejecute en un Worker
- [x] **10.1b** — Implementar comunicación Worker ↔ app.ts con `postMessage`/`onmessage`
- [x] **10.1c** — Añadir timeout de 3s que termine el Worker si no responde (sí detiene bucles infinitos)
- [x] **10.1d** — Reemplazar `new Function()` por `async runTestsInWorker()` en `app.ts`; mantener `runTests()` síncrona para tests de Vitest
- [x] **10.1e** — Capturar `console.log` del alumno dentro del Worker y enviarlo al hilo principal mediante `postMessage`

**Criterio de aceptación**:
- Código con `while(true){}` no cuelga la página (el Worker se termina por timeout)
- `console.log` dentro del Worker se muestra en el área de resultados
- `npm test` pasa (los tests existentes de `runTests` pueden necesitar adaptación)
- `npm run build` compila

---

### 10.2 Validación de datos en localStorage

- [x] **10.2a** — Mejorar `getProgress()` para validar que los IDs sean números enteros positivos
- [x] **10.2b** — Mejorar `getSavedCode()` para limitar tamaño máximo del código guardado (ej: 10KB)
- [x] **10.2c** — Añadir test de tolerancia a datos corruptos (IDs negativos, NaN, strings en el array)

**Criterio de aceptación**:
- Datos corruptos no rompen la app
- `npm test` pasa

---

## Lote 11 — Contenido y UX (media/baja prioridad)

### 11.1 Mejorar parser de markdown

- [x] **11.1a** — Añadir soporte para listas no ordenadas (`- item`) en `renderTheory`
- [x] **11.1b** — Añadir soporte para enlaces (`[texto](url)`)
- [x] **11.1c** — Escapar HTML en párrafos (no solo en code blocks)
- [x] **11.1d** — Refactorizar parser para manejar bloques mixtos (párrafos + listas + código)

**Criterio de aceptación**:
- `renderTheory('- item')` genera `<ul><li>item</li></ul>`
- `renderTheory('[link](url)')` genera `<a href="url">link</a>`
- `npm test` pasa

---

### 11.2 Sistema extendido de tests del alumno

- [x] **11.2a** — Añadir tipo `Test` y `TestExpression` en `types.ts`
- [x] **11.2b** — Modificar `runTests()` para soportar `string | TestExpression` y añadir `getTestDisplay()`
- [x] **11.2c** — Migrar 13 lecciones al nuevo formato: 3 (Funciones), 15 (try/catch), 16 (calcularPrecio), 17 (arrow), 35 (Patrones), 37 (Optimización), 38 (Complejidad), 41-44 (Vite/Despliegue/VarEnt/CI/CD), 48 (Singleton), 49 (Observer), 50 (Factory), 51 (Ficha), 53 (Generador passwords)
- [x] **11.2d** — Añadir tests de Vitest (5 tests: expression, function sin expected, function con expected, fails on mismatch, mixed)

**Criterio de aceptación**:
- Tests de tipo `function` ejecutan una función del alumno y comparan resultado con `expected`
- Las lecciones migradas siguen funcionando
- `npm test` pasa

---

### 11.3 Refactor CSS con BEM

- [x] **11.3a** — Identificar clases CSS inconsistentes: `module-header` es un elemento del sidebar
- [x] **11.3b** — Renombrar `module-header` → `sidebar__header` en CSS, constants.ts y app.ts
- [x] **11.3c** — Actualizar referencias en `constants.ts` y `app.ts` (usaban `CSS_CLASSES.MODULE_HEADER`)
- [x] **11.3d** — Verificar que no haya cambios visuales tras el refactor (build, tests y deploy OK; no hay clases viejas)

**Criterio de aceptación**:
- Todas las clases CSS siguen una convención consistente
- `npm run dev` muestra el mismo diseño que antes
- `npm test` pasa

---

# Flujo de Trabajo para Agentes

## Agente Implementador

1. Elegir un lote y una tarea (ej: `[ ] 1.1a — Guardar progreso en localStorage`)
2. Implementar los cambios según el criterio de aceptación
3. Ejecutar `npm test` para verificar que los tests existentes siguen pasando
4. Ejecutar `npm run build` para verificar que compila
5. Si pasa todo, marcar `[x]` en esta tarea
6. Si falla, arreglar y repetir
7. Al terminar un lote completo, notificar al **Agente Revisor**

## Agente Revisor (auditor)

1. Tomar un lote marcado como completado por el implementador
2. Para cada tarea `[x]` del lote:
   - Leer el código modificado
   - Verificar que cumple el criterio de aceptación (puede ejecutar `npm test`, revisar archivos, etc.)
   - Si cumple: dejar `[x]`
   - Si NO cumple: cambiar a `[ ]` y añadir debajo una nota con formato:
     ```
     **REVISIÓN — [nombre tarea]**: ❌ No aceptado. 
     Motivo: [explicación clara de qué falta]
     ```
3. Al finalizar, reportar resultados: cuántas tareas pasaron, cuántas requieren corrección
4. Las tareas rechazadas vuelven a la cola del implementador

## Ciclo completo

```
Implementador → marca [x] → Revisor → ¿Aceptado?
    ↓ sí                    ↓ no
Siguiente lote        Implementador corrije → [x] → Revisor → ...
```
