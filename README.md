# AprendoJS

> Plataforma interactiva gratuita para aprender JavaScript con lecciones prácticas, editor de código integrado y validación automática.

![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?logo=vite)
![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?logo=typescript)
![Vitest](https://img.shields.io/badge/Vitest-4.1-6E9F18?logo=vitest)
![CodeMirror](https://img.shields.io/badge/CodeMirror-5-D30707?logo=codemirror)
![License](https://img.shields.io/badge/license-ISC-blue)

---

## 🚀 Características

- **58 lecciones** distribuidas en 10 módulos (fundamentos, control de flujo, funciones, arrays/DOM/asincronía/patrones/proyectos)
- **Editor de código** con CodeMirror 5 (autocompletado, resaltado de sintaxis, atajo Ctrl+Enter)
- **Validación automática** — cada lección tiene tests que verifican tu código en tiempo real
- **Persistencia** — progreso y código guardados en localStorage
- **Tema oscuro/claro** con detección automática y toggle manual
- **Responsive** — sidebar colapsable en móvil con menú hamburguesa
- **Offline parcial** — Service Worker para usar la app sin conexión
- **Feedback detallado** — muestra qué test falló, errores con número de línea, captura `console.log`
- **8 miniproyectos** prácticos (juego del número secreto, gestor de tareas, buscador de películas, etc.)

## 📦 Stack

| Tecnología | Uso |
|------------|-----|
| **HTML5 + CSS3** | Estructura y estilos (variables CSS, diseño responsive) |
| **TypeScript** | Lógica de la aplicación con tipado estricto |
| **Vite** | Servidor de desarrollo y build |
| **Vitest** | Tests unitarios |
| **CodeMirror 5** | Editor de código en el navegador |

## 🛠️ Empezar

```bash
# Clonar el repositorio
git clone https://github.com/Bellit/AprendoJS.git
cd AprendoJS

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Compilar para producción
npm run build

# Vista previa de la build
npm run preview
```

## 🧪 Tests

```bash
npm test         # Una vez
npm run test:watch  # Modo watch
```

## 📚 Estructura del proyecto

```
AprendoJS/
├── index.html          # Página principal
├── css/style.css       # Estilos
├── js/
│   ├── app.ts          # Lógica principal
│   ├── lessons.ts      # Definición de lecciones
│   ├── types.ts        # Interfaces TypeScript
│   └── app.test.ts     # Tests unitarios
├── docs/               # Documentación
├── sw.js               # Service Worker (offline)
├── vite.config.ts
├── tsconfig.json
└── vitest.config.ts
```

## 📖 Módulos del curso

1. **Fundamentos del Lenguaje** — variables, tipos, operadores
2. **Control de Flujo** — condicionales, bucles, errores
3. **Funciones** — parámetros, arrow functions, scope
4. **Arrays y Objetos** — map/filter/reduce, destructuring
5. **DOM y Eventos** — manipulación del DOM, eventos
6. **Asincronía** — promesas, async/await, fetch
7. **Programación Avanzada** — clases, closures, patrones
8. **Optimización** — testing, rendimiento
9. **Proyectos Finales** — juegos, SPA, dashboard
10. **JS en el Mundo Real** — Vite, despliegue, CI/CD

## 🤝 Contribuir

1. Haz fork del proyecto
2. Agrega una lección en `js/lessons.ts` siguiendo el formato existente
3. Asegúrate de que `npm test` pase
4. Abre un Pull Request

## 📄 Licencia

ISC
