# AGENTS.md — AprendoJS

## Descripción del Proyecto
Plataforma web interactiva para aprender JavaScript con lecciones, editor de código integrado (CodeMirror) y validación automática mediante tests. Proyecto construido con **TypeScript + Vite + Vitest**.

## Stack
- HTML5 + CSS3 + **TypeScript**
- CodeMirror 5 vía CDN
- **Vite** (dev server y build tool)
- **Vitest** (test runner)
- Sin frameworks UI, sin backend

## Estructura de Archivos

| Archivo | Propósito |
|---------|-----------|
| `index.html` | Página principal: layout sidebar + content, carga CDNs y module script |
| `css/style.css` | Estilos visuales (layout 2 columnas, colores, responsive) |
| `js/app.ts` | Lógica principal: renderizar lecciones, editor CodeMirror, ejecutar código y tests |
| `js/lessons.ts` | Lecciones como array de `Lesson[]` (importado como módulo) |
| `js/types.ts` | Interfaces TypeScript (`Lesson`, `ModuleGroup`, `LessonResult`, `TestExpression`) |
| `js/app.test.ts` | Tests unitarios con Vitest |
| `js/renderer.ts` | Parseador markdown a HTML |
| `js/storage.ts` | Persistencia localStorage (progreso, código, tema) |
| `js/theme.ts` | Gestión de tema claro/oscuro |
| `js/dom.ts` | Manipulación DOM (showResult, getLessonItems) |
| `js/editor.ts` | Inicialización y control de CodeMirror |
| `js/constants.ts` | IDs del DOM y clases CSS centralizadas |
| `js/sandbox.worker.ts` | Web Worker para ejecución sandbox (timeout 3s, captura console.log) |
| `tsconfig.json` | Configuración de TypeScript |
| `vite.config.ts` | Configuración de Vite |
| `vitest.config.ts` | Configuración de Vitest |
| `vite-env.d.ts` | Declaraciones de tipos (CodeMirror, Vite) |
| `lecciones.md` | Plan de estudio: 10 módulos con contenidos, ejercicios y mini-proyectos |
| `docs/ARQUITECTURA.md` | Documentación técnica del proyecto |
| `AGENTS.md` | Instrucciones para agentes de IA |
| `docs/IMPLEMENTACION.md` | Plan de mejoras con tareas, checkboxes y criterios de aceptación |
| `.agents/skills/` | Skills de IA instaladas con autoskills |

## Skills Instaladas (autoskills)

| Skill | Propósito |
|-------|-----------|
| `accessibility` | Accesibilidad WCAG 2.2 |
| `frontend-design` | Diseño frontend de alta calidad |
| `reviewer` | Auditoría de implementaciones (revisa y marca errores) |
| `seo` | Optimización para buscadores |
| `typescript-advanced-types` | Tipos avanzados de TypeScript |
| `vite` | Configuración de Vite |
| `vitest` | Testing con Vitest |

## Cómo Ejecutar el Proyecto

```bash
npm run dev      # Servidor de desarrollo con Vite (HMR)
npm run build    # Compilar TS y empaquetar con Vite
npm run preview  # Vista previa de la build de producción
npm test         # Ejecutar tests con Vitest
npm run test:watch  # Tests en modo watch
npm run typecheck   # Solo typecheck (tsc --noEmit)
npm run coverage # Tests con reporte de cobertura
```

## Formato de una Lección

```json
{
  "id": 1,
  "module": "Fundamentos del Lenguaje",
  "title": "Variables con let",
  "theory": "Texto con **markdown** y `código` inline.\n\n```js\nBloques de código\n```",
  "exercise": "Descripción del ejercicio para el alumno.",
  "solution": "let x = 1;",
  "tests": [
    "typeof x !== 'undefined'",
    "x === 1"
  ]
}
```

### Campos
- `id` — número único
- `module` — nombre del módulo para agrupar en el sidebar
- `title` — título de la lección
- `theory` — contenido educativo (soporta `**negrita**`, `` `código inline` ``, y bloques ``` ```js ```)
- `exercise` — enunciado del ejercicio
- `solution` — solución de referencia (no se muestra al alumno)
- `tests` — array de expresiones JS que deben evaluar a `true`

## Cómo Agregar una Nueva Lección
1. Agregar el objeto al array en `js/lessons.ts`
2. Asignar un `id` que no se repita
3. Escribir tests como expresiones JS que validen las variables/funciones del alumno
4. Probar con `npm run dev` en el navegador

## Convenciones de Código
- `let` y `const` en lugar de `var`
- camelCase para variables y funciones
- Funciones flecha para callbacks
- Template literals para strings con interpolación
- 2 espacios de indentación
- Sin comentarios en producción
- Nombres de variables/funciones en español (el proyecto es en español)
- Tipado estricto con TypeScript

## Sistema de Tests del Alumno
Los tests son expresiones JS que se evalúan después del código del usuario:
```js
function runTests(userCode, tests) {
  const testCode = tests.map(t => `if (!(${t})) return false;`).join(' ') + ' return true;';
  const fullCode = userCode + ';' + testCode;
  return eval('(function(){' + fullCode + '})()');
}
```
Cada test debe ser una expresión que retorne `true/false`. Las variables declaradas en `userCode` están disponibles para los tests.

## Tests del Proyecto (Vitest)
Los tests del código fuente están en `js/app.test.ts` (53 tests):
- `renderTheory` — convierte markdown a HTML (negrita, code blocks, inline code, escaping, listas, enlaces)
- `runTests` — valida el sistema de evaluación de ejercicios (incluye `TestExpression`)
- `getProgress` / `saveProgress` — persistencia con validación
- `saveCode` / `getSavedCode` / `removeSavedCode` — persistencia de código
- `getTestDisplay` — muestra representación legible de tests
- `showResult` — manipulación DOM (idle, error, success con botón "Siguiente")
- `Estructura de lecciones` — verifica que todas las lecciones tienen los campos requeridos
- `Tipos avanzados` — verifica los tipos TypeScript (ModuleGroup, LessonResult)

Ejecutar con:
```bash
npm test
# o en modo watch:
npm run test:watch
```

## Funciones Clave en app.ts
- `renderLessonList()` — agrupa lecciones por módulo y las muestra en el sidebar
- `selectLesson(id)` — carga teoría y ejercicio en el área principal
- `renderTheory(text)` — convierte markdown simple a HTML (en renderer.ts)
- `initEditor()` — inicializa CodeMirror (en editor.ts)
- `runCode()` — ejecuta el código del usuario en un Web Worker y corre los tests
- `runTests(userCode, tests)` — versión síncrona para tests de Vitest
- `runTestsInWorker(userCode, tests)` — versión asíncrona con Web Worker (3s timeout)
- `showResult(success, message)` — muestra feedback visual (en dom.ts)

## Módulos del Curso
1. Fundamentos del Lenguaje (variables, tipos, operadores, conversión)
2. Control de Flujo (if/else, bucles, operadores lógicos, errores)
3. Funciones (declaración, parámetros, arrow functions, scope)
4. Arrays y Objetos (map/filter/reduce, destructuring, spread)
5. DOM y Eventos (selección, modificación, eventos)
6. Asincronía (promesas, async/await, fetch)
7. Programación Avanzada (clases, closures, módulos, patrones)
8. Optimización y Buenas Prácticas (testing, performance)
9. Proyectos Finales (juegos, SPA, dashboards)
10. JavaScript en el Mundo Real (Vite, despliegue, CI/CD)

## Plan de Mejoras

El documento `docs/IMPLEMENTACION.md` contiene el plan de mejoras organizado en lotes con tareas, checkboxes y criterios de aceptación. Usa el skill `reviewer` para auditar implementaciones.

### Flujo de trabajo
1. **Agente implementador**: elige una tarea, la implementa, marca `[x]`, y verifica con `npm test` + `npm run build`
2. **Agente revisor** (skill `reviewer`): audita que la tarea cumpla el criterio de aceptación. Si no cumple, la revierte a `[ ]` con una nota explicativa

## Notas
- Los IDs de lecciones en `lessons.ts` no son secuenciales (hay saltos: 1, 2, 6, 7, 8...)
- `lessons.ts` se importa directamente en `app.ts` (no global)
- CodeMirror 5 se carga vía CDN en `index.html` (no incluido en el bundle)
- No hay servidor backend — todo es frontend puro
- `eval()` se usa para ejecutar el código del alumno (entorno controlado)
- Los tests de Vitest importan `runTests` desde `app.ts` directamente
