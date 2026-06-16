# Arquitectura de AprendoJS

## 1. Resumen

AprendoJS es una plataforma web interactiva para aprender JavaScript. Ofrece lecciones con teoría, un editor de código integrado (CodeMirror) y validación automática mediante tests. Todo es frontend puro, sin servidor backend.

---

## 2. Stack Tecnológico

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| TypeScript | ^6.0.3 | Lenguaje principal, tipado estático |
| Vite | ^8.0.16 | Dev server con HMR y build tool |
| Vitest | ^4.1.8 | Test runner para tests unitarios |
| CodeMirror 5 | 5.65.18 | Editor de código en el navegador (vía CDN) |
| jsdom | ^26.0 | Entorno DOM para tests (vía Vitest) |

---

## 3. Estructura del Proyecto

```
aprendojs/
├── index.html             # Entrada: layout, CDNs, module script
├── package.json           # Dependencias y scripts npm
├── tsconfig.json          # Configuración de TypeScript
├── vite.config.ts         # Configuración de Vite
├── vitest.config.ts       # Configuración de Vitest
├── vite-env.d.ts          # Declaraciones de tipos (CodeMirror)
├── .gitignore             # node_modules/, dist/
├── AGENTS.md              # Instrucciones para agentes de IA
├── lecciones.md           # Plan de estudio: 10 módulos
├── docs/
│   └── ARQUITECTURA.md    # Este documento
├── css/
│   └── style.css          # Estilos visuales (layout, colores, responsive)
├── js/
│   ├── types.ts           # Interfaces TypeScript
│   ├── lessons.ts         # Array con todas las lecciones (40+)
│   ├── app.ts             # Lógica principal de la aplicación
│   └── app.test.ts        # Tests unitarios con Vitest
└── dist/                  # Build de producción (generado por Vite)
```

---

## 4. Flujo de la Aplicación

### 4.1 Carga inicial

1. El navegador carga `index.html`
2. Se descargan CodeMirror (CSS + JS) desde CDN
3. Vite sirve `js/app.ts` como módulo ES
4. `app.ts` importa `lessons.ts` y asigna `lessons = LESSONS`
5. `renderLessonList()` agrupa las lecciones por módulo y las renderiza en el sidebar
6. `DOMContentLoaded` dispara `initEditor()` que inicializa CodeMirror

### 4.2 Selección de lección

1. El usuario hace clic en una lección del sidebar
2. `selectLesson(id)` busca la lección por ID
3. Renderiza la teoría (`renderTheory`) en el área de teoría
4. Muestra el título y enunciado del ejercicio
5. Limpia el editor y el área de resultados

### 4.3 Ejecución de código

1. El usuario escribe código en el editor
2. Al hacer clic en "Ejecutar" (o Ctrl+Enter):
   - `runCode()` obtiene el código del editor
   - `runTests(userCode, tests)` evalúa el código del usuario contra los tests de la lección
   - `showResult(success, message)` muestra feedback visual

---

## 5. Arquitectura Interna

### 5.1 Sistema de módulos

```
types.ts         Define la interfaz Lesson
     ↓
lessons.ts       Importa el tipo Lesson, exporta el array de lecciones
     ↓
app.ts           Importa lecciones, implementa la UI y la lógica
     ↓
index.html       Punto de entrada (Vite resuelve app.ts)
```

### 5.2 renderTheory (markdown simple a HTML)

La función convierte texto markdown básico a HTML:

- `**texto**` → `<strong>texto</strong>`
- `` `codigo` `` → `<code>codigo</code>`
- ` ``` ` (bloques de código) → `<pre><code>...</code></pre>`
- Párrafos separados por doble salto de línea → `<p>...</p>`
- Caracteres `<` y `>` escapados dentro de bloques de código

### 5.3 runTests (evaluación del alumno)

```ts
function runTests(userCode: string, tests: string[]): boolean {
  const testCode = tests.map(t => `if (!(${t})) return false;`).join(' ') + ' return true;';
  const fullCode = userCode + ';' + testCode;
  return eval('(function(){' + fullCode + '})()');
}
```

1. Concatena el código del usuario con los tests
2. Cada test es una expresión JS que debe evaluar a `true`
3. Si algún test falla, retorna `false`
4. Si hay un error de sintaxis, el `catch` retorna `false`
5. El `eval` envuelve todo en una IIFE para evitar contaminar el scope global

### 5.4 CodeMirror

Se carga desde CDN en `index.html`. No está incluido en el bundle de Vite. `app.ts` lo declara como tipo global en `vite-env.d.ts` para que TypeScript lo reconozca.

---

## 6. Sistema de Lecciones

### 6.1 Formato

Cada lección es un objeto `Lesson` definido en `js/types.ts`:

```ts
interface Lesson {
  id: number;
  module: string;
  title: string;
  theory: string;
  exercise: string;
  solution: string;
  tests: string[];
}
```

### 6.2 Campos

- `id` — número único
- `module` — nombre del módulo (agrupa lecciones en el sidebar)
- `title` — título visible
- `theory` — contenido markdown (`**negrita**`, `` `código` ``, `` ```js ``` ``)
- `exercise` — enunciado del ejercicio
- `solution` — solución de referencia (no visible para el alumno)
- `tests` — array de expresiones JS que deben evaluar a `true`

### 6.3 Agregar una nueva lección

1. Agregar el objeto al array en `js/lessons.ts`
2. Asignar un `id` que no se repita
3. Escribir tests como expresiones JS que validen lo que el alumno debe crear
4. Probar con `npm run dev`

---

## 7. Tests del Proyecto (Vitest)

### 7.1 Configuración

`vitest.config.ts`:
- Entorno: `jsdom` (para APIs DOM como `document`)
- Incluye: `js/**/*.test.ts`

### 7.2 Tests existentes

Los tests en `js/app.test.ts` cubren tres áreas:

**renderTheory** (6 tests):
- Conversión de `**negrita**` a `<strong>`
- Conversión de `` `código` `` a `<code>`
- Conversión de bloques `` ```js `` a `<pre><code>`
- Texto plano envuelto en `<p>`
- Escape de `<` y `>` en bloques de código
- Combinación de múltiples formatos

**runTests** (7 tests):
- Tests que pasan (retorna `true`)
- Tests que fallan (retorna `false`)
- Código con error de sintaxis (retorna `false`)
- Variables indefinidas en tests (retorna `false`)
- Evaluación correcta del código del usuario

**Estructura de lecciones** (4 tests):
- `LESSONS` es un array
- Cada lección tiene todos los campos requeridos con tipos correctos
- Todos los tests dentro de las lecciones son strings
- Los IDs son números positivos únicos

### 7.3 Ejecutar

```bash
npm test          # Una vez
npm run test:watch  # Modo watch
```

---

## 8. Comandos de Desarrollo

```bash
npm run dev       # Servidor de desarrollo con HMR
npm run build     # Compilar TypeScript y empaquetar con Vite
npm run preview   # Vista previa de la build de producción
npm test          # Ejecutar tests
npm run test:watch # Tests en modo watch
```

---

## 9. Decisiones Técnicas

### 9.1 ¿Por qué eval()?

El sistema de tests del alumno usa `eval()` porque:
- Es un entorno controlado (el alumno ejecuta su propio código)
- No hay servidor backend para ejecutar código remoto
- Se envuelve en una IIFE para aislar el scope
- El `try/catch` captura cualquier error de sintaxis o runtime

### 9.2 ¿Por qué CodeMirror vía CDN?

- CodeMirror 5 tiene soporte limitado con bundlers modernos
- La versión CDN es estable y no requiere configuración
- Se declara como tipo global (`any`) para TypeScript

### 9.3 ¿Por qué no CSS-in-JS?

El CSS es pequeño (~250 líneas) y puramente visual. No hay componentes dinámicos que justifiquen CSS-in-JS. Se mantiene como `css/style.css`.

### 9.4 Tipado estricto

TypeScript está configurado con `strict: true`. Esto significa:
- `noImplicitAny`: toda variable debe tener tipo explícito o inferible
- `strictNullChecks`: `null` y `undefined` no son asignables a otros tipos
- `noUnusedLocals`: error si hay variables no usadas
