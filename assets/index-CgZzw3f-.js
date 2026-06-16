(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=[{id:1,module:`Fundamentos del Lenguaje`,title:`Variables con let`,theory:"Las variables son contenedores para almacenar datos. Con **`let`** declaras variables cuyo valor puede cambiar (reasignarse) a lo largo del programa.\n\n```js\n// Declaración e inicialización\nlet nombre = 'Ana';\nlet edad = 25;\n\n// Reasignación: la variable cambia de valor\nnombre = 'Luis';\nedad = 30;\n\n// Declarar sin inicializar da undefined\nlet ciudad;\nconsole.log(ciudad); // undefined\n```\n\n**Nomenclatura y buenas prácticas**:\n- Usa **camelCase**: `let nombreCompleto`, no `let nombrecompleto`\n- Usa nombres descriptivos: `let precioTotal` en vez de `let pt`\n- No uses palabras reservadas: `let`, `if`, `class`, `return`, etc.\n- No empieces con número ni uses guiones: `let 1nombre` o `let mi-var` son inválidos\n- Declara una variable por línea para mejor legibilidad\n- Inicializa siempre si conoces el valor inicial\n\n```js\n// Correcto\nlet nombreUsuario = 'Carlos';\nlet edadUsuario = 30;\n\n// Incorrecto (errores comunes)\n// let 2nombre = 'test';  // SyntaxError\n// let mi-var = 5;        // SyntaxError\n// let let = 'mal';       // SyntaxError\n```\n\n**Diferencia con `var`**: A diferencia de `var`, `let` tiene **ámbito de bloque** (`{}`) y no permite redeclarar la misma variable en el mismo ámbito. Es la forma moderna y recomendada de declarar variables mutables.",exercise:"Declara `lenguaje` con valor 'JavaScript'. Declara `anio` con valor 1995. Declara `mensaje` que combine ambos con el operador `+` para producir el string: 'JavaScript fue creado en 1995'.",solution:`let lenguaje = 'JavaScript';
let anio = 1995;
let mensaje = lenguaje + ' fue creado en ' + anio;`,tests:[`typeof lenguaje !== 'undefined'`,`typeof anio !== 'undefined'`,`typeof mensaje !== 'undefined'`,`lenguaje === 'JavaScript'`,`anio === 1995`,`mensaje === 'JavaScript fue creado en 1995'`]},{id:2,module:`Fundamentos del Lenguaje`,title:`Constantes`,theory:`Las constantes se declaran con **\`const\`** y no pueden reasignarse tras su inicialización. Son ideales para valores fijos o que no deben cambiar durante la ejecución.

\`\`\`js
const PI = 3.1416;
const GRAVEDAD = 9.81;
const PAIS = 'Colombia';

// Esto lanza un TypeError:
// PI = 3.14; // Assignment to constant variable

// Las const deben inicializarse al declararse:
// const valor;  // SyntaxError: Missing initializer in const declaration
\`\`\`

**Nomenclatura**:
- Para valores fijos conocidos (números mágicos, configuraciones) usa **SCREAMING_SNAKE_CASE**: \`const COLOR_ROJO = '#FF0000'\`, \`const IVA = 0.21\`
- Para objetos o arrays que no se reasignarán pero cuyo contenido puede cambiar, usa camelCase: \`const usuario = { nombre: 'Ana' }\`

\`\`\`js
const IVA = 0.21;
let precio = 100;
const total = precio * (1 + IVA);
\`\`\`

**Importante**: \`const\` evita la **reasignación de la variable**, pero si guarda un objeto o array, su **contenido sí puede modificarse**:

\`\`\`js
const persona = { nombre: 'Ana' };
persona.nombre = 'Luis';  // ✓ permitido (mutación)
persona.edad = 30;        // ✓ permitido (agregar propiedad)
// persona = {};          // ✗ error (reasignación)

const numeros = [1, 2, 3];
numeros.push(4);          // ✓ permitido
numeros[0] = 10;          // ✓ permitido
// numeros = [];          // ✗ error
\`\`\`

**Buenas prácticas**:
- Usa \`const\` por defecto. Solo usa \`let\` cuando sepas que la variable necesitará reasignarse.
- Define valores mágicos (números, strings) como constantes con nombre: \`const DESCUENTO_MAXIMO = 0.5\` en vez de escribir \`0.5\` directamente en el código.`,exercise:"Declara `const IVA = 0.21`. Declara `let precioSinIva = 100`. Calcula `precioTotal` como `precioSinIva * (1 + IVA)`. Luego **reasigna** `precioSinIva` a 200 y calcula `precioTotal2` con la misma fórmula.",solution:`const IVA = 0.21;
let precioSinIva = 100;
let precioTotal = precioSinIva * (1 + IVA);
precioSinIva = 200;
let precioTotal2 = precioSinIva * (1 + IVA);`,tests:[`IVA === 0.21`,`precioTotal === 121`,`precioTotal2 === 242`]},{id:3,module:`Funciones`,title:`Funciones`,theory:`Las funciones son bloques de código reutilizable que realizan una tarea específica. Se declaran con la palabra clave **\`function\`**, pueden recibir **parámetros** y devolver un valor con **\`return\`**.

\`\`\`js
// Declaración de función (Function Declaration)
function saludar(nombre) {
  return 'Hola, ' + nombre;
}

// Llamada o invocación
let mensaje = saludar('Ana');
console.log(mensaje); // 'Hola, Ana'
\`\`\`

**Partes de una función**:
1. Palabra clave \`function\`
2. Nombre en **camelCase** (verbo que describe la acción)
3. Parámetros entre paréntesis (pueden ser 0 o más)
4. Cuerpo entre llaves \`{}\` con el código a ejecutar
5. \`return\` para devolver un resultado (opcional)

\`\`\`js
// Función con varios parámetros
function sumar(a, b) {
  return a + b;
}

// Función sin return devuelve undefined
function mostrar(mensaje) {
  console.log(mensaje);
  // No tiene return → undefined implícito
}

// Función sin parámetros
function generarId() {
  return Math.random().toString(36).substring(2);
}
\`\`\`

**Principios importantes**:
- **Una función, una responsabilidad**: Cada función debe hacer una sola cosa bien
- Usa nombres que describan la acción: \`calcularTotal()\`, \`obtenerUsuario()\`, \`validarEmail()\`
- El \`return\` detiene la ejecución inmediatamente. Todo lo que esté después no se ejecuta
- Si no usas \`return\`, la función devuelve \`undefined\`
- Las funciones son **ciudadanos de primera clase**: pueden asignarse a variables, pasarse como argumento y retornarse desde otras funciones`,exercise:"Crea una función `esPar` que reciba un número y devuelva `true` si es par o `false` si es impar. Luego crea una función `filtrarPares` que reciba un array de números y retorne un nuevo array solo con los pares, usando `esPar`.",solution:`function esPar(n) {
  return n % 2 === 0;
}
function filtrarPares(numeros) {
  return numeros.filter(esPar);
}`,tests:[`typeof esPar === 'function'`,`typeof filtrarPares === 'function'`,{type:`function`,code:`esPar(2)`,expected:!0},{type:`function`,code:`esPar(3)`,expected:!1},{type:`function`,code:`filtrarPares([1,2,3,4,5]).length`,expected:2}]},{id:4,module:`Arrays y Objetos`,title:`Arrays`,theory:`Los **arrays** son listas ordenadas de valores. Se crean con corchetes \`[]\` y cada elemento se accede por su **índice** (empieza en 0).

\`\`\`js
let frutas = ['manzana', 'pera', 'uva'];
console.log(frutas[0]); // 'manzana'
console.log(frutas[2]); // 'uva'
console.log(frutas.length); // 3
\`\`\`

Un array puede mezclar tipos, aunque no es recomendable:
\`\`\`js
let mixto = [1, 'hola', true, null];
\`\`\`

**Métodos básicos**:
\`\`\`js
let nums = [1, 2, 3];
nums.push(4);       // añade al final → [1,2,3,4]
nums.pop();         // saca del final → [1,2,3]
nums.unshift(0);    // añade al inicio → [0,1,2,3]
nums.shift();       // saca del inicio → [1,2,3]
\`\`\`

**Recorrer arrays**:
\`\`\`js
for (let i = 0; i < frutas.length; i++) {
  console.log(frutas[i]);
}

for (let fruta of frutas) {
  console.log(fruta);
}
\`\`\`

**Buenas prácticas**:
- Usa arrays homogéneos (mismos tipos de datos)
- \`length\` se actualiza automáticamente al añadir o quitar elementos
- Puedes modificar elementos por índice: \`nums[0] = 10\`
- Para clonar usa spread: \`[...nums]\`
- Acceder a un índice inexistente devuelve \`undefined\`, no lanza error`,exercise:"Declara `let numeros = [10, 20, 30, 40, 50]`. Luego: agrega 60 al final con `push`, elimina el primer elemento con `shift`, y declara `suma` que contenga la suma de `numeros[0] + numeros[1] + numeros[2]`.",solution:`let numeros = [10, 20, 30, 40, 50];
numeros.push(60);
numeros.shift();
let suma = numeros[0] + numeros[1] + numeros[2];`,tests:[`numeros.length === 4`,`numeros[0] === 20`,`numeros[3] === 60`,`suma === 90`]},{id:5,module:`Arrays y Objetos`,title:`Strings y template strings`,theory:"Los **strings** representan texto. Pueden definirse con comillas simples `''`, dobles `\"\"` o **template literals** (backticks `` ` ``).\n\n```js\nlet simple = 'Hola';\nlet doble = \"Mundo\";\nlet template = `Hola ${nombre}`; // Interpolación\n```\n\n**Template literals** permiten:\n1. **Interpolar variables**: `` `Hola ${nombre}` ``\n2. **Strings multilínea** sin \\n:\n```js\nlet texto = `Línea 1\nLínea 2\nLínea 3`;\n```\n3. **Expresiones**: `` `Total: ${precio * 1.21}` ``\n\n**Métodos útiles de string**:\n```js\n'hola'.toUpperCase();        // 'HOLA'\n'HOLA'.toLowerCase();        // 'hola'\n'  texto  '.trim();          // 'texto'\n'JavaScript'.includes('Script'); // true\n'abc'.repeat(3);             // 'abcabc'\n'a,b,c'.split(',');          // ['a','b','c']\n```\n\n**Buenas prácticas**:\n- Prefiere template literals sobre concatenación con `+`\n- Usa `toLowerCase()` para comparaciones sin importar mayúsculas\n- Los strings son **inmutables**: los métodos devuelven un nuevo string, no modifican el original\n- Para strings largos o con muchas variables, templates son más legibles",exercise:"Declara `nombre = 'Carlos'`, `edad = 30`, `ciudad = 'Madrid'`. Declara `ficha` usando **template literal** que genere: 'Carlos (30) - Madrid'. Declara `mayusculas = ficha.toUpperCase()`.",solution:"let nombre = 'Carlos';\nlet edad = 30;\nlet ciudad = 'Madrid';\nlet ficha = `${nombre} (${edad}) - ${ciudad}`;\nlet mayusculas = ficha.toUpperCase();",tests:[`ficha === 'Carlos (30) - Madrid'`,`mayusculas === 'CARLOS (30) - MADRID'`]},{id:6,module:`Fundamentos del Lenguaje`,title:`Tipos de datos`,theory:"JavaScript tiene **tipado dinámico**: una variable puede cambiar de tipo en cualquier momento. No necesitas declarar el tipo explícitamente.\n\n```js\nlet dato = 25;      // number\ndato = 'Hola';      // ahora es string\ndato = true;        // ahora es boolean\n```\n\n**Tipos primitivos**:\n- **`number`**: enteros y decimales (`25`, `3.14`, `Infinity`, `NaN`)\n- **`string`**: texto entre comillas simples, dobles o backticks\n- **`boolean`**: `true` o `false`\n- **`null`**: valor vacío **intencionado** (lo asigna el programador)\n- **`undefined`**: variable declarada pero sin valor asignado\n\n```js\nlet entero = 42;\nlet decimal = 3.14;\nlet nombre = 'Carlos';\nlet esMayor = true;\nlet vacio = null;\nlet noDefinido;\n\nconsole.log(typeof noDefinido); // 'undefined'\nconsole.log(typeof vacio);      // 'object' (error histórico de JS)\nconsole.log(typeof 42);         // 'number'\nconsole.log(typeof 'Hola');     // 'string'\n```\n\n**NaN** (`Not a Number`) aparece al realizar operaciones matemáticas inválidas:\n```js\nconsole.log('texto' * 2);     // NaN\nconsole.log(typeof NaN);       // 'number' (sí, es de tipo number)\nconsole.log(NaN === NaN);      // false (NaN no es igual a sí mismo)\nconsole.log(isNaN('texto'));   // true\n```\n\n**Buenas prácticas**:\n- Usa **`===`** (comparación estricta) en lugar de `==` para evitar coerción automática de tipos\n- No confundas `null` (asignado a propósito por el programador) con `undefined` (JS lo asigna cuando no hay valor)\n- Usa `typeof` para depurar y verificar tipos en tiempo de ejecución",exercise:"Declara `producto = 'Laptop'`, `precio = 999.99`, `disponible = true`, `stock = null`. Declara `descuento` sin inicializar. Declara `tipoDescuento` que almacene el resultado de aplicar `typeof descuento`.",solution:`let producto = 'Laptop';
let precio = 999.99;
let disponible = true;
let stock = null;
let descuento;
let tipoDescuento = typeof descuento;`,tests:[`typeof producto === 'string'`,`typeof precio === 'number'`,`typeof disponible === 'boolean'`,`stock === null`,`tipoDescuento === 'undefined'`]},{id:7,module:`Fundamentos del Lenguaje`,title:`Operadores`,theory:`Los **operadores aritméticos** realizan cálculos matemáticos con números.

\`\`\`js
let suma = 10 + 3;          // 13 | adición
let resta = 10 - 3;         // 7  | sustracción
let mult = 10 * 3;          // 30 | multiplicación
let div = 10 / 3;           // 3.333... | división
let modulo = 10 % 3;        // 1  | resto (módulo)
let expo = 10 ** 3;         // 1000 | exponenciación (ES2016)
\`\`\`

**Operadores de incremento/decremento**:
\`\`\`js
let contador = 0;
contador++;   // post-incremento (primero usa, luego incrementa)
++contador;   // pre-incremento (primero incrementa, luego usa)
contador--;   // decremento
\`\`\`

**Operadores de asignación combinada**:
\`\`\`js
let x = 10;
x += 5;   // x = x + 5 → 15
x -= 3;   // x = x - 3 → 12
x *= 2;   // x = x * 2 → 24
x /= 4;   // x = x / 4 → 6
x %= 4;   // x = x % 4 → 2
x **= 2;  // x = x ** 2 → 4
\`\`\`

**Precedencia de operadores** (como en matemáticas):
1. Paréntesis: \`( )\`
2. Exponenciación: \`**\`
3. Multiplicación, división, módulo: \`*\`, \`/\`, \`%\`
4. Suma y resta: \`+\`, \`-\`

\`\`\`js
let resultado = 10 + 3 * 2;    // 16 (multiplica primero)
let correcto = (10 + 3) * 2;   // 26 (paréntesis primero)
\`\`\`

**Buenas prácticas**: Usa paréntesis para hacer explícita la precedencia, aunque no sea necesaria. Esto mejora la legibilidad del código.`,exercise:"Declara `x = 20`, `y = 7`. Calcula: `cociente` usando `Math.floor(x / y)` (división entera), `residuo` como `x % y`, `elevado` como `x ** y`. Luego usa operador combinado `+= 10` sobre `x` (reasigna la misma variable `x`).",solution:`let x = 20;
let y = 7;
let cociente = Math.floor(x / y);
let residuo = x % y;
let elevado = x ** y;
x += 10;`,tests:[`x === 30`,`cociente === 2`,`residuo === 6`,`elevado === 1280000000`]},{id:8,module:`Fundamentos del Lenguaje`,title:`Entrada/salida básica`,theory:`La **comunicación** entre el programa y el usuario se maneja con funciones de entrada y salida.

**Salida por consola** (para depuración y desarrollo):
\`\`\`js
console.log('Mensaje');          // mensaje simple
console.log('Valor:', 42);       // múltiples argumentos
console.warn('Cuidado...');      // advertencia en amarillo
console.error('Error...');        // error en rojo
console.table([1, 2, 3]);        // muestra como tabla
console.group('Grupo');           // agrupa mensajes
console.time('t');                // cronómetro
\`\`\`

**Interacción con el usuario** (en navegador):
\`\`\`js
alert('¡Bienvenido!');                  // mensaje emergente modal
let dato = prompt('¿Cómo te llamas?');  // entrada de texto (devuelve string)
let numero = Number(prompt('Edad:'));   // convertir string a número
let confirmar = confirm('¿Seguro?');    // true o false
\`\`\`

**Template literals** (backticks \`\` \` \`\`) permiten **interpolar variables** de forma legible:
\`\`\`js
let nombre = 'Ana';
let edad = 30;

// Con template literals (recomendado):
console.log(\`Hola, soy \${nombre} y tengo \${edad} años.\`);

// Equivalente con concatenación (menos legible):
console.log('Hola, soy ' + nombre + ' y tengo ' + edad + ' años.');
\`\`\`

**Buenas prácticas**:
- Usa **template literals** en lugar de concatenación con \`+\` (más limpio y legible)
- No abuses de \`alert()\` o \`prompt()\` en producción (bloquean la ejecución)
- Usa \`console.log()\` para depuración, pero elimínalos del código final o usa un sistema de logging`,exercise:"Declara `nombre = 'Marta'`, `edad = 28`, `ciudad = 'Barcelona'`. Declara `presentacion` usando un **template literal** (backticks `` ` ``) que genere exactamente: 'Soy Marta, tengo 28 años y vivo en Barcelona'.",solution:"let nombre = 'Marta';\nlet edad = 28;\nlet ciudad = 'Barcelona';\nlet presentacion = `Soy ${nombre}, tengo ${edad} años y vivo en ${ciudad}`;",tests:[`presentacion === 'Soy Marta, tengo 28 años y vivo en Barcelona'`]},{id:9,module:`Fundamentos del Lenguaje`,title:`Conversión de tipos`,theory:`En JavaScript puedes convertir entre tipos de forma **explícita** usando funciones constructoras. Esto es importante porque muchas operaciones requieren un tipo específico.

\`\`\`js
// String → Number
Number('42');        // 42
Number('3.14');      // 3.14
Number('');          // 0
Number('   ');       // 0
Number('hola');      // NaN

parseInt('42.7');    // 42 (entero, trunca decimales)
parseInt('101', 2);  // 5 (binario a decimal)
parseFloat('3.14');  // 3.14

// Number → String
String(100);         // '100'
(100).toString();    // '100'
(3.14).toFixed(1);   // '3.1' (formatea decimales)

// A boolean (truthy/falsy)
Boolean(1);           // true
Boolean(0);           // false
Boolean('');          // false
Boolean('false');     // true (string no vacío, ¡cuidado!)
Boolean(null);        // false
Boolean(undefined);   // false
Boolean(NaN);         // false
\`\`\`

**Valores truthy y falsy**:
| Falsy | Truthy |
|-------|--------|
| \`false\` | \`true\` |
| \`0\`, \`-0\` | cualquier número ≠ 0 |
| \`''\` (string vacío) | cualquier string no vacío |
| \`null\` | objetos, arrays (incluso vacíos) |
| \`undefined\` | |
| \`NaN\` | |

**Buenas prácticas**: Haz conversión explícita siempre. No confíes en la coerción automática de JavaScript, ya que puede dar resultados inesperados.`,exercise:"Declara `entrada = '25.8'`. Conviértela a: `numero` (número decimal con `Number()`), `entero` (entero con `parseInt()`), `texto` (string desde `numero` con `String()`), `esTruthy` (booleano con `Boolean(entrada)`).",solution:`let entrada = '25.8';
let numero = Number(entrada);
let entero = parseInt(entrada);
let texto = String(numero);
let esTruthy = Boolean(entrada);`,tests:[`numero === 25.8`,`entero === 25`,`texto === '25.8'`,`esTruthy === true`]},{id:10,module:`Fundamentos del Lenguaje`,title:`Mini-calculadora`,theory:`Combina **variables**, **operadores aritméticos** y funciones del objeto **\`Math\`** para realizar cálculos complejos.

\`\`\`js
let a = 15, b = 4;
let suma = a + b;           // 19
let resta = a - b;          // 11
let producto = a * b;       // 60
let cociente = a / b;       // 3.75
let resto = a % b;          // 3
\`\`\`

**El objeto \`Math\`** ofrece operaciones matemáticas avanzadas:
\`\`\`js
Math.floor(3.7);     // 3 (redondeo hacia abajo)
Math.ceil(3.2);      // 4 (redondeo hacia arriba)
Math.round(3.5);     // 4 (redondeo estándar)
Math.sqrt(25);       // 5 (raíz cuadrada)
Math.max(1, 5, 3);   // 5 (valor máximo)
Math.min(1, 5, 3);   // 1 (valor mínimo)
Math.abs(-5);        // 5 (valor absoluto)
Math.random();       // número aleatorio entre 0 (incluido) y 1 (excluido)
\`\`\`

**Formateo de decimales** con \`toFixed()\`:
\`\`\`js
let precio = 19.999;
console.log(precio.toFixed(2));      // '20.00' (devuelve string)
console.log(Number(precio.toFixed(2))); // 20 (convertido a número)
\`\`\`

**Números aleatorios en un rango**:
\`\`\`js
// Aleatorio entre min y max (incluidos)
function aleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
console.log(aleatorio(1, 10));  // número del 1 al 10
\`\`\`

**Buenas prácticas**:
- Nombra las variables según su propósito (\`total\`, \`precioFinal\`, \`descuento\`)
- Redondea los resultados financieros con \`toFixed()\` o \`Math.round()\`
- Separa la lógica en pasos claros y declarativos`,exercise:"Declara `a = 17`, `b = 5`. Calcula: `suma`, `resta`, `producto`, `division`, `media` ((a + b) / 2), `resto` (a % b) y `maximo` (el valor más grande entre a y b usando `Math.max`).",solution:`let a = 17;
let b = 5;
let suma = a + b;
let resta = a - b;
let producto = a * b;
let division = a / b;
let media = (a + b) / 2;
let resto = a % b;
let maximo = Math.max(a, b);`,tests:[`suma === 22`,`resta === 12`,`producto === 85`,`resto === 2`,`media === 11`,`maximo === 17`]},{id:11,module:`Control de Flujo`,title:`Condicionales if/else`,theory:`Las estructuras **\`if\`/\`else\`** permiten ejecutar código según condiciones booleanas. Son la base de la toma de decisiones en programación.

\`\`\`js
let edad = 18;

if (edad >= 18) {
  console.log('Eres mayor de edad');
} else {
  console.log('Eres menor de edad');
}
\`\`\`

**Variantes**:
\`\`\`js
// if con else if
let nota = 85;
if (nota >= 90) {
  console.log('Sobresaliente');
} else if (nota >= 70) {
  console.log('Notable');
} else if (nota >= 50) {
  console.log('Aprobado');
} else {
  console.log('Reprobado');
}

// if sin llaves (solo para una línea)
if (edad >= 18) console.log('Mayor');
\`\`\`

**Operador ternario** (\`condición ? valorSiTrue : valorSiFalse\`):
\`\`\`js
let mensaje = edad >= 18 ? 'Mayor' : 'Menor';
// Es equivalente a:
let mensaje2;
if (edad >= 18) {
  mensaje2 = 'Mayor';
} else {
  mensaje2 = 'Menor';
}
\`\`\`

**Errores comunes**:
- Usar \`=\` (asignación) en lugar de \`===\` (comparación)
- Olvidar \`else\` cuando necesitas ambos caminos
- Condiciones muy complejas (mejor dividir en variables auxiliares)
- No considerar el caso \`else\` (valores inesperados)`,exercise:"Declara `numero = 15`. Usando condicionales, asigna a `categoria`: 'pequeño' si es menor que 10, 'mediano' si está entre 10 y 50 inclusive, o 'grande' si es mayor que 50.",solution:`let numero = 15;
let categoria;
if (numero < 10) {
  categoria = 'pequeño';
} else if (numero <= 50) {
  categoria = 'mediano';
} else {
  categoria = 'grande';
}`,tests:[`numero === 15`,`categoria === 'mediano'`]},{id:12,module:`Control de Flujo`,title:`Operadores lógicos`,theory:`Los **operadores lógicos** combinan condiciones booleanas: **\`&&\`** (AND, ambas deben ser true), **\`||\`** (OR, al menos una debe ser true), **\`!\`** (NOT, invierte el booleano).

\`\`\`js
let edad = 25;
let tieneCarnet = true;

// AND: ambas condiciones deben cumplirse
let puedeConducir = edad >= 18 && tieneCarnet;
console.log(puedeConducir); // true

// OR: al menos una condición se cumple
let esFinDeSemana = false;
let esFeriado = true;
let descansa = esFinDeSemana || esFeriado;
console.log(descansa); // true

// NOT: invierte el valor
let activo = false;
console.log(!activo); // true
\`\`\`

**Short-circuit evaluation** (evaluación en cortocircuito):
\`\`\`js
// && devuelve el primer falsy o el último truthy
console.log(0 && 'Hola');    // 0
console.log(1 && 'Hola');    // 'Hola'

// || devuelve el primer truthy o el último falsy
console.log('' || 'default'); // 'default'
console.log(0 || null);       // null

// Uso común: valor por defecto
let nombre = usuario.nombre || 'Invitado';
\`\`\`

**Buenas prácticas**:
- Agrupa condiciones complejas con paréntesis: \`(a > 0 && b > 0) || (c > 0)\`
- No abuses del short-circuit; a veces un \`if\` es más legible
- Recuerda: \`!\` tiene alta precedencia, usa paréntesis si combinas con \`&&\` o \`||\``,exercise:"Declara `edad = 20`, `tienePermiso = false`. Declara `puedeEntrar` que sea true solo si (edad >= 18 **Y** tienePermiso) **O** (edad >= 21).",solution:`let edad = 20;
let tienePermiso = false;
let puedeEntrar = (edad >= 18 && tienePermiso) || (edad >= 21);`,tests:[`edad === 20`,`tienePermiso === false`,`puedeEntrar === false`]},{id:13,module:`Control de Flujo`,title:`Bucles for`,theory:`El bucle **\`for\`** repite código un número determinado de veces. Tiene tres partes: **inicialización**, **condición** y **actualización**.

\`\`\`js
for (let i = 1; i <= 5; i++) {
  console.log(i); // 1, 2, 3, 4, 5
}
\`\`\`

**Partes del bucle**:
1. \`let i = 1\` — inicialización (se ejecuta una vez al inicio)
2. \`i <= 5\` — condición (se evalúa antes de cada iteración)
3. \`i++\` — actualización (se ejecuta al final de cada iteración)

**Variantes**:
\`\`\`js
// Recorrer array por índice
let colores = ['rojo', 'verde', 'azul'];
for (let i = 0; i < colores.length; i++) {
  console.log(colores[i]);
}

// Decremento
for (let i = 10; i >= 0; i--) {
  console.log(i); // 10, 9, ..., 0
}

// Paso de 2 en 2
for (let i = 0; i <= 10; i += 2) {
  console.log(i); // 0, 2, 4, 6, 8, 10
}

// Bucle anidado (tabla de multiplicar)
for (let i = 1; i <= 3; i++) {
  for (let j = 1; j <= 3; j++) {
    console.log(\`\${i} x \${j} = \${i * j}\`);
  }
}
\`\`\`

**Errores comunes**:
- Bucle infinito: \`for (let i = 0; i < 10; i--)\` (nunca llega a 10)
- Off-by-one: usar \`<\` en vez de \`<=\` o viceversa
- Olvidar \`let\` en la inicialización (contamina el ámbito global)
- Modificar el array mientras lo recorres`,exercise:"Declara un array vacío `pares`. Usa un bucle `for` que itere del 1 al 20 y guarde solo los números pares en el array.",solution:`let pares = [];
for (let i = 1; i <= 20; i++) {
  if (i % 2 === 0) {
    pares.push(i);
  }
}`,tests:[`pares.length === 10`,`pares[0] === 2`,`pares[pares.length - 1] === 20`]},{id:14,module:`Control de Flujo`,title:`Bucles while`,theory:`El bucle **\`while\`** ejecuta código mientras una condición sea \`true\`. Útil cuando no sabes de antemano cuántas iteraciones se necesitan.

\`\`\`js
let i = 1;
while (i <= 5) {
  console.log(i);
  i++;
}
\`\`\`

**\`do...while\`** (ejecuta al menos una vez):
\`\`\`js
let j = 0;
do {
  console.log(j); // Se ejecuta al menos una vez
  j++;
} while (j < 0);
\`\`\`

**¿Cuándo usar \`while\` vs \`for\`?**
- \`for\`: cuando sabes el número exacto de iteraciones (recorrer array, contar)
- \`while\`: cuando la condición depende de algo que cambia dentro del bucle (leer datos hasta condición, esperar un estado)

\`\`\`js
// Leer datos hasta encontrar 'stop'
let datos = ['a', 'b', 'c', 'stop', 'd'];
let idx = 0;
while (datos[idx] !== 'stop') {
  console.log(datos[idx]);
  idx++;
}
\`\`\`

**Errores comunes**:
- Olvidar actualizar la variable de control → **bucle infinito**
- Condición que nunca se cumple → el bucle no se ejecuta (salvo \`do...while\`)
- No inicializar la variable antes del bucle`,exercise:"Declara `contador = 10`. Usa un bucle `while` para contar hacia atrás: declara un array vacío `cuentaAtras` y, mientras `contador >= 0`, agregalo al array y decrementalo.",solution:`let contador = 10;
let cuentaAtras = [];
while (contador >= 0) {
  cuentaAtras.push(contador);
  contador--;
}`,tests:[`cuentaAtras.length === 11`,`cuentaAtras[0] === 10`,`cuentaAtras[10] === 0`]},{id:15,module:`Control de Flujo`,title:`Manejo de errores`,theory:`**\`try...catch\`** captura errores en tiempo de ejecución sin que el programa se rompa. El bloque \`try\` contiene código que podría fallar, y \`catch\` maneja el error.

\`\`\`js
try {
  let resultado = JSON.parse('{invalido}');
} catch (error) {
  console.log('Error capturado:', error.message);
}

// El programa sigue ejecutándose
console.log('Esto sí se ejecuta');
\`\`\`

**Estructura completa**:
\`\`\`js
try {
  // Código que puede lanzar un error
  let data = JSON.parse(jsonString);
  console.log('Éxito:', data);
} catch (error) {
  // Manejo del error
  console.error('Error al parsear JSON:', error.message);
} finally {
  // Siempre se ejecuta, haya error o no
  console.log('Bloque finally: limpieza aquí');
}
\`\`\`

**Lanzar errores con \`throw\`**:
\`\`\`js
function dividir(a, b) {
  if (b === 0) {
    throw new Error('No se puede dividir por cero');
  }
  return a / b;
}

try {
  console.log(dividir(10, 0));
} catch (e) {
  console.log(e.message); // 'No se puede dividir por cero'
}
\`\`\`

**Tipos de error en JS**:
- \`Error\` — genérico
- \`SyntaxError\` — error de sintaxis
- \`TypeError\` — tipo incorrecto
- \`ReferenceError\` — variable no existe
- \`RangeError\` — valor fuera de rango

**Buenas prácticas**:
- Captura errores específicos: no uses \`catch\` genérico sin manejar el error
- El \`finally\` es ideal para liberar recursos (cerrar conexiones, limpiar)
- No abuses de try/catch para control de flujo normal`,exercise:"Declara `resultado = 'ok'`. Usa `try/catch` para ejecutar `JSON.parse('{invalido}')`. Si hay error, asigna `'error'` a `resultado`. Además, declara `hayError = true` solo dentro del `catch`.",solution:`let resultado = 'ok';
let hayError = false;
try {
  JSON.parse('{invalido}');
} catch (e) {
  resultado = 'error';
  hayError = true;
}`,tests:[`resultado === 'error'`,`hayError === true`]},{id:16,module:`Funciones`,title:`Parámetros y retorno`,theory:`Los **parámetros** son valores que recibe una función para trabajar con ellos. El **\`return\`** devuelve un valor al punto donde se llamó la función.

\`\`\`js
function sumar(a, b) {
  return a + b;
}

let resultado = sumar(5, 3);
console.log(resultado); // 8
\`\`\`

**Parámetros por defecto** (ES6):
\`\`\`js
function saludar(nombre = 'Invitado') {
  return 'Hola, ' + nombre;
}

console.log(saludar('Ana')); // 'Hola, Ana'
console.log(saludar());      // 'Hola, Invitado'
\`\`\`

**Múltiples parámetros y orden**:
\`\`\`js
function crearProducto(nombre, precio, stock = 0) {
  return { nombre, precio, stock };
}

console.log(crearProducto('Laptop', 1200, 10));
\`\`\`

**Return temprano** (early return) para simplificar:
\`\`\`js
function validarEdad(edad) {
  if (edad < 0) return 'Edad inválida';
  if (edad < 18) return 'Menor de edad';
  return 'Mayor de edad';
}
\`\`\`

**Funciones sin return**: devuelven \`undefined\` implícitamente.

**Buenas prácticas**:
- Limita el número de parámetros (ideal ≤ 3). Si necesitas más, usa un objeto
- Usa parámetros por defecto en vez de validar con \`if\`
- Una función debe hacer una sola cosa y tener un solo propósito`,exercise:"Crea una función `calcularPrecio` que reciba `precioBase` (Number) y opcionalmente `descuento` (Number, default 0) e `impuesto` (Number, default 0.21). Debe retornar el precio final: (precioBase - descuento) * (1 + impuesto). Si precioBase es negativo, retorna 0.",solution:`function calcularPrecio(precioBase, descuento = 0, impuesto = 0.21) {
  if (precioBase < 0) return 0;
  return (precioBase - descuento) * (1 + impuesto);
}`,tests:[`typeof calcularPrecio === 'function'`,{type:`function`,code:`calcularPrecio(100)`,expected:121},{type:`function`,code:`calcularPrecio(100, 20)`,expected:96.8},{type:`function`,code:`calcularPrecio(100, 20, 0.1)`,expected:88},{type:`function`,code:`calcularPrecio(-10)`,expected:0}]},{id:17,module:`Funciones`,title:`Funciones flecha`,theory:"Las **arrow functions** (`=>`) son una sintaxis más concisa para escribir funciones. No tienen su propio `this` ni `arguments`.\n\n```js\n// Función tradicional\nfunction sumar(a, b) { return a + b; }\n\n// Arrow function (varias formas)\nconst sumar = (a, b) => { return a + b; };\nconst sumar = (a, b) => a + b;   // return implícito (sin llaves)\nconst cuadrado = n => n * n;     // un parámetro: sin paréntesis\nconst aleatorio = () => Math.random(); // sin parámetros\n```\n\n**Return implícito**: si el cuerpo solo tiene una expresión, puedes omitir `return` y las llaves:\n```js\nconst doble = n => n * 2;\n\n// Para objetos, envuélvelos en paréntesis:\nconst crearPersona = (nombre, edad) => ({ nombre, edad });\n```\n\n**Diferencias clave con function tradicional**:\n- No tienen `this` propio (heredan del ámbito padre)\n- No tienen objeto `arguments`\n- No pueden usarse como constructores (con `new`)\n- No tienen propiedad `prototype`\n\n```js\n// this en arrow vs tradicional\nconst obj = {\n  nombre: 'Ana',\n  saludarTradicional: function() { return 'Hola ' + this.nombre; },\n  saludarArrow: () => 'Hola ' + this.nombre  // this no es el objeto\n};\n```\n\n**Buenas prácticas**:\n- Usa arrow functions para callbacks cortos (`map`, `filter`, `reduce`, `forEach`)\n- Usa function tradicional para métodos de objetos que necesiten su propio `this`\n- El return implícito mejora la legibilidad en funciones simples",exercise:"Crea una arrow function `obtenerMayores` que reciba un array de números y retorne los mayores a 10. Crea otra arrow function `sumarArray` que sume todos los elementos de un array usando reduce.",solution:`const obtenerMayores = arr => arr.filter(n => n > 10);
const sumarArray = arr => arr.reduce((acc, n) => acc + n, 0);`,tests:[`typeof obtenerMayores === 'function'`,`typeof sumarArray === 'function'`,{type:`function`,code:`obtenerMayores([5, 15, 8, 20]).length`,expected:2},{type:`function`,code:`sumarArray([1, 2, 3, 4, 5])`,expected:15}]},{id:18,module:`Funciones`,title:`Scope de variables`,theory:`El **scope** (ámbito) determina dónde es accesible una variable. JavaScript tiene **scope global**, **scope de función** y **scope de bloque** (con \`let\`/\`const\`).

\`\`\`js
// Scope global
let global = 'accesible desde cualquier parte';

function miFuncion() {
  // Scope de función
  let localFuncion = 'solo dentro de la función';
  console.log(global);     // ✓ accesible
  console.log(localFuncion); // ✓ accesible
}

console.log(localFuncion); // ✗ ReferenceError
\`\`\`

**Scope de bloque** (\`{}\`):
\`\`\`js
if (true) {
  let x = 10;
  const y = 20;
  var z = 30;  // var ignora el scope de bloque
}

console.log(x); // ReferenceError: x no está definida
console.log(y); // ReferenceError: y no está definida
console.log(z); // 30 (var se filtra fuera del bloque)
\`\`\`

**Shadowing** (sombreado): una variable local oculta a la global con el mismo nombre:
\`\`\`js
let nombre = 'Global';

function mostrar() {
  let nombre = 'Local';
  console.log(nombre); // 'Local'
}
\`\`\`

**Temporal Dead Zone (TDZ)**: con \`let\` y \`const\`, no puedes acceder a la variable antes de su declaración:
\`\`\`js
console.log(x); // ReferenceError (TDZ)
let x = 5;
\`\`\`

**Buenas prácticas**:
- Prefiere \`const\` por defecto, \`let\` cuando necesites reasignar
- Evita variables globales (contaminación del ámbito global)
- Usa nombres diferentes para evitar shadowing confuso
- Declara las variables al inicio del bloque para evitar TDZ`,exercise:"Declara `x = 10` (global). Crea una función `calcular` que declare `x = 20` (local) y retorne `x * 2`. Luego declara `resultadoLocal` que almacene el retorno de `calcular()`. Declara `resultadoGlobal` como `x * 2` usando la x global.",solution:`let x = 10;
function calcular() {
  let x = 20;
  return x * 2;
}
let resultadoLocal = calcular();
let resultadoGlobal = x * 2;`,tests:[`x === 10`,`resultadoLocal === 40`,`resultadoGlobal === 20`]},{id:19,module:`Funciones`,title:`Refactorización con funciones`,theory:`**Refactorizar** es reescribir código existente para mejorarlo sin cambiar su comportamiento. Extraer funciones es una de las técnicas más poderosas.

**Antes** (código repetido):
\`\`\`js
let numeros1 = [1, 2, 3, 4, 5];
let suma1 = 0;
for (let n of numeros1) suma1 += n;
console.log(suma1);

let numeros2 = [10, 20, 30];
let suma2 = 0;
for (let n of numeros2) suma2 += n;
console.log(suma2);
\`\`\`

**Después** (refactorizado con función):
\`\`\`js
function sumarArray(arr) {
  return arr.reduce((acc, n) => acc + n, 0);
}

console.log(sumarArray([1, 2, 3, 4, 5]));
console.log(sumarArray([10, 20, 30]));
\`\`\`

**Principios SOLID (adaptados)**:
- **Responsabilidad única**: cada función hace una cosa
- **DRY** (Don't Repeat Yourself): no repitas código, extráelo a una función
- **Nombres descriptivos**: el nombre debe explicar qué hace

\`\`\`js
// Mal
function proc(d) { return d * 0.21 + d; }

// Bien
function calcularTotalConIVA(precio) {
  return precio * 1.21;
}
\`\`\`

**Beneficios de refactorizar**:
- Código más legible y mantenible
- Menos errores (se corrige en un solo lugar)
- Reutilización
- Más fácil de testear`,exercise:"Dado el siguiente código sin refactorizar, créalo exactamente igual y luego declara la función `esPar` que unifique la lógica: `let nums1 = [1, 2, 3, 4, 5]; let pares1 = []; for (let n of nums1) { if (n % 2 === 0) pares1.push(n); } let nums2 = [10, 15, 20, 25]; let pares2 = []; for (let n of nums2) { if (n % 2 === 0) pares2.push(n); }` Luego declara `pares1Refactor` y `pares2Refactor` usando `esPar`.",solution:`function esPar(n) { return n % 2 === 0; }
let nums1 = [1, 2, 3, 4, 5];
let pares1 = [];
for (let n of nums1) { if (n % 2 === 0) pares1.push(n); }
let nums2 = [10, 15, 20, 25];
let pares2 = [];
for (let n of nums2) { if (n % 2 === 0) pares2.push(n); }
let pares1Refactor = nums1.filter(esPar);
let pares2Refactor = nums2.filter(esPar);`,tests:[`typeof esPar === 'function'`,`pares1Refactor.length === 2`,`pares2Refactor.length === 2`,`JSON.stringify(pares1Refactor) === '[2,4]'`,`JSON.stringify(pares2Refactor) === '[10,20]'`]},{id:20,module:`Arrays y Objetos`,title:`Métodos map y filter`,theory:`**\`map()\`** transforma cada elemento de un array y devuelve un nuevo array del mismo tamaño. **\`filter()\`** selecciona elementos que cumplan una condición y devuelve un nuevo array.

\`\`\`js
const numeros = [1, 2, 3, 4, 5];

// map: transforma cada elemento
const dobles = numeros.map(n => n * 2);
console.log(dobles); // [2, 4, 6, 8, 10]

// filter: selecciona elementos
const pares = numeros.filter(n => n % 2 === 0);
console.log(pares); // [2, 4]
\`\`\`

**Ambos son inmutables** (no modifican el array original):
\`\`\`js
const original = ['a', 'b', 'c'];
const mayusculas = original.map(letra => letra.toUpperCase());
console.log(original);    // ['a', 'b', 'c'] (sin cambios)
console.log(mayusculas);  // ['A', 'B', 'C']
\`\`\`

**Chaining (encadenamiento)**:
\`\`\`js
const nums = [1, 2, 3, 4, 5, 6];
const resultado = nums
  .filter(n => n % 2 === 0)    // [2, 4, 6]
  .map(n => n * 10);           // [20, 40, 60]
\`\`\`

**Usos comunes**:
\`\`\`js
// Extraer propiedades de objetos
const usuarios = [{ nombre: 'Ana', edad: 25 }, { nombre: 'Luis', edad: 30 }];
const nombres = usuarios.map(u => u.nombre); // ['Ana', 'Luis']
const mayores = usuarios.filter(u => u.edad >= 30);

// Formatear datos
const precios = [100, 200, 300];
const conIVA = precios.map(p => p * 1.21); // [121, 242, 363]
\`\`\`

**Buenas prácticas**:
- Prefiere \`map\`/\`filter\` sobre bucles \`for\` para transformaciones
- Encadena operaciones para legibilidad, pero evita cadenas muy largas
- Dentro de \`map\`, evita efectos secundarios (no modifiques objetos externos)`,exercise:"Dado `let personas = [{nombre:'Ana', edad:17}, {nombre:'Luis', edad:22}, {nombre:'Carlos', edad:15}, {nombre:'Marta', edad:30}]`. Usa `filter` para obtener los mayores de edad y `map` para obtener un array solo con sus nombres. Guarda en `mayores`.",solution:`let personas = [{nombre:'Ana', edad:17}, {nombre:'Luis', edad:22}, {nombre:'Carlos', edad:15}, {nombre:'Marta', edad:30}];
let mayores = personas.filter(p => p.edad >= 18).map(p => p.nombre);`,tests:[`mayores.length === 2`,`mayores[0] === 'Luis'`,`mayores[1] === 'Marta'`]},{id:21,module:`Arrays y Objetos`,title:`Método reduce`,theory:`**\`reduce()\`** recorre el array acumulando un valor. Es muy versátil: puede sumar, multiplicar, agrupar, aplanar, etc.

\`\`\`js
const numeros = [1, 2, 3, 4, 5];

const suma = numeros.reduce((acumulador, actual) => acumulador + actual, 0);
console.log(suma); // 15
\`\`\`

**Parámetros**:
1. \`acumulador\` — valor acumulado de iteraciones anteriores
2. \`actual\` — elemento actual del array
3. \`indice\` (opcional) — índice del elemento
4. \`array\` (opcional) — array original
5. **Valor inicial** (segundo argumento de \`reduce\`) — 0 en el ejemplo

**Ejemplos avanzados**:
\`\`\`js
// Máximo valor
const max = [3, 7, 2, 9, 5].reduce((max, n) => n > max ? n : max, -Infinity);

// Contar ocurrencias
const frutas = ['manzana', 'pera', 'manzana', 'uva', 'pera', 'manzana'];
const conteo = frutas.reduce((acc, fruta) => {
  acc[fruta] = (acc[fruta] || 0) + 1;
  return acc;
}, {});
// { manzana: 3, pera: 2, uva: 1 }

// Aplanar array de arrays
const arrays = [[1, 2], [3, 4], [5, 6]];
const plano = arrays.reduce((acc, arr) => acc.concat(arr), []);
// [1, 2, 3, 4, 5, 6]
\`\`\`

**¿Cuándo usar reduce?**
- Sumar o promediar valores numéricos
- Agrupar objetos por una propiedad
- Convertir array en objeto
- Calcular valores complejos (máximo, mínimo, producto)

**Buenas prácticas**:
- Siempre proporciona un valor inicial para evitar errores con arrays vacíos
- Si la lógica es compleja, extrae el callback a una función con nombre
- Para sumas simples, \`reduce\` es mejor que un bucle \`for\``,exercise:"Dado `let ventas = [{producto:'A', monto:100}, {producto:'B', monto:200}, {producto:'A', monto:150}, {producto:'C', monto:300}]`. Usa `reduce` para obtener un objeto `totales` donde cada clave sea el producto y el valor sea la suma de montos.",solution:`let ventas = [{producto:'A', monto:100}, {producto:'B', monto:200}, {producto:'A', monto:150}, {producto:'C', monto:300}];
let totales = ventas.reduce((acc, v) => {
  acc[v.producto] = (acc[v.producto] || 0) + v.monto;
  return acc;
}, {});`,tests:[`totales.A === 250`,`totales.B === 200`,`totales.C === 300`]},{id:22,module:`Arrays y Objetos`,title:`Objetos literales`,theory:`Los **objetos** agrupan datos relacionados en pares **clave: valor**. Las claves son strings (o Symbols) y los valores pueden ser cualquier tipo.

\`\`\`js
let persona = {
  nombre: 'Ana',
  edad: 30,
  ciudad: 'Madrid'
};

console.log(persona.nombre);  // 'Ana'
console.log(persona['edad']); // 30 (notación de corchete)
\`\`\`

**Notación de punto vs corchete**:
\`\`\`js
let usuario = { nombre: 'Luis', 'edad-usuario': 25 };

console.log(usuario.nombre);       // punto (preferida)
console.log(usuario['edad-usuario']); // corchete (para claves con guiones)

let clave = 'nombre';
console.log(usuario[clave]);       // 'Luis' (variable como clave)
\`\`\`

**Agregar y modificar propiedades**:
\`\`\`js
let producto = { nombre: 'Laptop', precio: 1200 };
producto.disponible = true;      // agregar propiedad
producto.precio = 1100;          // modificar propiedad
delete producto.disponible;      // eliminar propiedad
\`\`\`

**Recorrer objetos**:
\`\`\`js
for (let clave in persona) {
  console.log(clave, persona[clave]);
}

// Obtener claves y valores
console.log(Object.keys(persona));   // ['nombre', 'edad', 'ciudad']
console.log(Object.values(persona)); // ['Ana', 30, 'Madrid']
\`\`\`

**Métodos en objetos** (propiedades que son funciones):
\`\`\`js
let calculadora = {
  a: 0,
  b: 0,
  sumar() { return this.a + this.b; },
  multiplicar() { return this.a * this.b; }
};
\`\`\`

**Buenas prácticas**:
- Usa nombres de clave descriptivos en camelCase
- \`const\` en objetos evita reasignar la variable, pero el contenido sí puede cambiar
- Usa notación de punto por defecto; corchete solo cuando necesites claves dinámicas`,exercise:"Crea un objeto `estudiante` con `nombre`, `edad`, `curso` y un método `presentarse()` que retorne 'Soy [nombre], tengo [edad] años y curso [curso]'. Declara `info` con el resultado de llamar a `estudiante.presentarse()`.",solution:`let estudiante = {
  nombre: 'Carlos',
  edad: 22,
  curso: 'JavaScript',
  presentarse() {
    return \`Soy \${this.nombre}, tengo \${this.edad} años y curso \${this.curso}\`;
  }
};
let info = estudiante.presentarse();`,tests:[`typeof estudiante === 'object'`,`typeof estudiante.presentarse === 'function'`,`info === 'Soy Carlos, tengo 22 años y curso JavaScript'`]},{id:23,module:`Arrays y Objetos`,title:`Destructuring`,theory:`**Destructuring** (desestructuración) extrae valores de arrays u objetos en variables de forma concisa.

\`\`\`js
// Destructuring de objetos
const persona = { nombre: 'Ana', edad: 30, ciudad: 'Madrid' };
const { nombre, edad } = persona;
console.log(nombre); // 'Ana'
console.log(edad);   // 30
\`\`\`

**Renombrar variables**:
\`\`\`js
const { nombre: nom, edad: años } = persona;
console.log(nom);  // 'Ana'
console.log(años); // 30
\`\`\`

**Valores por defecto**:
\`\`\`js
const { pais = 'Desconocido', ciudad } = persona;
console.log(pais);   // 'Desconocido' (valor por defecto)
\`\`\`

**Destructuring de arrays**:
\`\`\`js
const colores = ['rojo', 'verde', 'azul'];
const [primero, segundo] = colores;
console.log(primero); // 'rojo'
console.log(segundo); // 'verde'

// Saltar elementos
const [primer, , tercero] = colores;
console.log(tercero); // 'azul'

// Resto con spread
const [head, ...tail] = [1, 2, 3, 4];
console.log(head); // 1
console.log(tail); // [2, 3, 4]
\`\`\`

**Anidado**:
\`\`\`js
const usuario = { id: 1, datos: { nombre: 'Luis', edad: 25 } };
const { datos: { nombre } } = usuario;
console.log(nombre); // 'Luis'
\`\`\`

**En parámetros de función**:
\`\`\`js
function mostrar({ nombre, edad }) {
  console.log(\`\${nombre} tiene \${edad} años\`);
}
mostrar(persona);
\`\`\`

**Buenas prácticas**:
- Destructuring hace el código más legible al extraer solo lo necesario
- Úsalo en parámetros de función para recibir objetos con nombre
- Combina con valores por defecto para evitar undefined`,exercise:"Dado `let datos = { id: 5, nombre: 'Marta', edad: 28, pais: 'Chile', ciudad: 'Santiago' }`, extrae `nombre` (renombrado a `usuario`), `pais` y `edad`. Luego extrae los valores restantes en un objeto llamado `resto` usando spread.",solution:`let datos = { id: 5, nombre: 'Marta', edad: 28, pais: 'Chile', ciudad: 'Santiago' };
let { nombre: usuario, pais, edad, ...resto } = datos;`,tests:[`usuario === 'Marta'`,`pais === 'Chile'`,`edad === 28`,`resto.id === 5`,`resto.ciudad === 'Santiago'`]},{id:24,module:`Arrays y Objetos`,title:`Spread operator`,theory:`El **spread operator** (\`...\`) expande elementos de un array o propiedades de un objeto. Es útil para copiar, combinar y pasar argumentos.

\`\`\`js
// Spread en arrays
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5];  // [1, 2, 3, 4, 5] (copia + añade)
const copia = [...arr1];       // [1, 2, 3] (copia superficial)

// Combinar arrays
const a = [1, 2];
const b = [3, 4];
const combinado = [...a, ...b]; // [1, 2, 3, 4]
\`\`\`

**Spread en objetos** (ES2018):
\`\`\`js
const obj1 = { a: 1, b: 2 };
const obj2 = { c: 3, ...obj1 }; // { c: 3, a: 1, b: 2 }
const fusion = { ...obj1, ...obj2 }; // combina objetos

// Sobrescribir propiedades
const usuario = { nombre: 'Ana', edad: 30 };
const actualizado = { ...usuario, edad: 31 }; // { nombre: 'Ana', edad: 31 }
\`\`\`

**Rest parameters** (en funciones, recoge argumentos):
\`\`\`js
function sumarTodos(...numeros) {
  return numeros.reduce((acc, n) => acc + n, 0);
}
console.log(sumarTodos(1, 2, 3, 4)); // 10
\`\`\`

**Spread para pasar argumentos**:
\`\`\`js
const nums = [3, 7, 2];
console.log(Math.max(...nums)); // 7 (equivalente a Math.max(3, 7, 2))
\`\`\`

**Buenas prácticas**:
- Usa spread para copiar arrays en vez de métodos mutables como \`splice\`
- El spread hace copia superficial (shallow). Para objetos anidados necesitas clonación profunda
- En objetos, las propiedades que aparecen después sobrescriben a las anteriores
- Útil para crear versiones actualizadas de objetos sin mutar el original`,exercise:"Declara `base = [1, 2, 3]` y `extra = [4, 5]`. Usa spread para crear `todos` que combine ambos. Luego crea `objetoBase = {x: 10, y: 20}` y `objetoFinal = { ...objetoBase, z: 30, x: 99 }` (x se sobrescribe). Declara `maximo = Math.max(...todos)`.",solution:`let base = [1, 2, 3];
let extra = [4, 5];
let todos = [...base, ...extra];
let objetoBase = {x: 10, y: 20};
let objetoFinal = { ...objetoBase, z: 30, x: 99 };
let maximo = Math.max(...todos);`,tests:[`todos.length === 5`,`todos[0] === 1`,`todos[4] === 5`,`maximo === 5`,`objetoFinal.x === 99`,`objetoFinal.y === 20`]},{id:25,module:`DOM y Eventos`,title:`Selección de elementos`,theory:"**`document.querySelector()`** selecciona el primer elemento que coincida con un selector CSS. **`querySelectorAll()`** selecciona todos y devuelve un NodeList.\n\n```js\n// Seleccionar por etiqueta, clase o id\nconst header = document.querySelector('header');\nconst boton = document.querySelector('.btn-primary');\nconst logo = document.querySelector('#logo');\n\n// Seleccionar todos\nconst items = document.querySelectorAll('.menu-item');\nconsole.log(items.length); // número de elementos\n```\n\n**Selectores CSS avanzados**:\n```js\ndocument.querySelector('ul li:first-child');\ndocument.querySelector('input[type=\"text\"]');\ndocument.querySelector('div > p');\ndocument.querySelectorAll('.lista > li');\n```\n\n**NodeList vs Array**: `querySelectorAll` devuelve un NodeList, no un Array. Para usar `map`, `filter`, `reduce`, conviértelo primero:\n```js\nconst divs = document.querySelectorAll('div');\nconst textos = Array.from(divs).map(d => d.textContent);\n// o: const textos = [...divs].map(d => d.textContent);\n```\n\n**Buenas prácticas**:\n- **Cachea** las selecciones si usas el mismo elemento varias veces (guarda en variable)\n- Usa selectores específicos para evitar seleccionar elementos no deseados\n- `querySelector` lanza error si el selector es inválido, pero devuelve `null` si no encuentra\n- Para IDs, `getElementById` es más rápido que `querySelector('#id')`",exercise:"Dado el HTML `<ul id='lista'><li class='item'>A</li><li class='item'>B</li><li class='item'>C</li></ul>`, crea una función `contarItems` que haga querySelectorAll de '.item' y retorne la cantidad.",solution:`function contarItems() {
  return document.querySelectorAll('.item').length;
}`,tests:[`typeof contarItems === 'function'`]},{id:26,module:`DOM y Eventos`,title:`Modificación del DOM`,theory:`**\`document.createElement()\`** crea nuevos elementos HTML. **\`textContent\`** asigna o lee texto. **\`appendChild()\`** inserta un elemento como hijo.

\`\`\`js
// Crear elemento
const nuevoDiv = document.createElement('div');

// Asignar contenido
nuevoDiv.textContent = 'Hola, soy un nuevo div';

// Agregar al DOM
document.body.appendChild(nuevoDiv);
\`\`\`

**Atributos y clases**:
\`\`\`js
const img = document.createElement('img');
img.src = 'foto.jpg';
img.alt = 'Descripción';
img.className = 'imagen-perfil';
img.id = 'avatar';

const enlace = document.createElement('a');
enlace.href = 'https://ejemplo.com';
enlace.textContent = 'Visitar sitio';
\`\`\`

**Insertar en posiciones específicas**:
\`\`\`js
const lista = document.querySelector('ul');
const item = document.createElement('li');
item.textContent = 'Nuevo item';

lista.appendChild(item);           // al final
lista.prepend(item);               // al inicio
lista.insertBefore(item, ref);     // antes de ref
\`\`\`

**innerHTML** (usar con precaución):
\`\`\`js
// Más cómodo pero inseguro (riesgo XSS)
contenedor.innerHTML = '<p>Nuevo <strong>contenido</strong></p>';

// Seguro (solo texto)
contenedor.textContent = '<p>No interpreta HTML</p>';
\`\`\`

**Buenas prácticas**:
- Usa \`textContent\` en vez de \`innerHTML\` para texto seguro
- Crea primero los elementos, configúralos, y al final agrégalos al DOM
- Múltiples inserciones → usa \`DocumentFragment\` para mejor rendimiento
- Para eliminar: \`elemento.remove()\``,exercise:"Crea una función `crearLista` que reciba un array de strings y cree un `<ul>` con un `<li>` por cada string (usando `createElement`, `textContent` y `appendChild`). Retorna el `ul` creado.",solution:`function crearLista(items) {
  const ul = document.createElement('ul');
  for (let item of items) {
    const li = document.createElement('li');
    li.textContent = item;
    ul.appendChild(li);
  }
  return ul;
}`,tests:[`typeof crearLista === 'function'`]},{id:27,module:`DOM y Eventos`,title:`Eventos`,theory:`Los **eventos** permiten que el código responda a interacciones del usuario: clics, teclado, mouse, formularios, etc.

\`\`\`js
const boton = document.querySelector('button');

boton.addEventListener('click', function() {
  alert('¡Botón clickeado!');
});

// Con arrow function
boton.addEventListener('click', () => {
  console.log('Click recibido');
});
\`\`\`

**El objeto \`event\`**:
\`\`\`js
boton.addEventListener('click', (event) => {
  console.log(event.type);    // 'click'
  console.log(event.target);  // elemento que disparó el evento
  console.log(event.clientX); // coordenada X del mouse
});
\`\`\`

**Eventos comunes**:
\`\`\`js
// Ratón
elemento.addEventListener('click', fn);
elemento.addEventListener('dblclick', fn);
elemento.addEventListener('mouseenter', fn);
elemento.addEventListener('mouseleave', fn);

// Teclado
document.addEventListener('keydown', (e) => {
  console.log(e.key);     // tecla presionada
  console.log(e.code);    // código físico de la tecla
});

// Formulario
formulario.addEventListener('submit', (e) => {
  e.preventDefault();     // evita recargar la página
});
\`\`\`

**Delegación de eventos**: para manejar eventos en elementos dinámicos:
\`\`\`js
// En vez de agregar listener a cada item:
document.querySelector('ul').addEventListener('click', (e) => {
  if (e.target.tagName === 'LI') {
    console.log('Clickeaste:', e.target.textContent);
  }
});
\`\`\`

**Buenas prácticas**:
- Usa siempre \`addEventListener\`, no \`onclick\` (permite múltiples listeners)
- Elimina listeners que ya no necesitas con \`removeEventListener\`
- Usa \`e.preventDefault()\` o \`e.stopPropagation()\` cuando sea necesario
- La delegación mejora rendimiento con muchos elementos`,exercise:"Crea una función `agregarListenerMultiple` que reciba un selector CSS (`selector`) y un tipo de evento (`tipo`). Usa `querySelectorAll` para seleccionar todos los elementos que coincidan y agregar el listener especificado. El callback debe mostrar un `console.log` con el texto del elemento clickeado.",solution:`function agregarListenerMultiple(selector, tipo) {
  const elementos = document.querySelectorAll(selector);
  elementos.forEach(el => {
    el.addEventListener(tipo, (e) => console.log(e.target.textContent));
  });
}`,tests:[`typeof agregarListenerMultiple === 'function'`]},{id:28,module:`DOM y Eventos`,title:`Mini-app de notas`,theory:`Crea una mini-aplicación de notas combinando objetos, arrays, DOM y eventos. El patrón típico: **estado** (datos) + **render** (actualizar UI) + **eventos** (interacción).

\`\`\`js
// Estado
let notas = [];

// CRUD: Create, Read, Update, Delete
function agregarNota(texto) {
  const nota = { id: Date.now(), texto, fecha: new Date() };
  notas.push(nota);
  renderizarNotas();
  return nota;
}

function eliminarNota(id) {
  notas = notas.filter(n => n.id !== id);
  renderizarNotas();
}

// Render
function renderizarNotas() {
  const contenedor = document.querySelector('#lista-notas');
  contenedor.innerHTML = '';
  
  for (const nota of notas) {
    const div = document.createElement('div');
    div.className = 'nota';
    div.textContent = nota.texto;
    
    const btnEliminar = document.createElement('button');
    btnEliminar.textContent = 'X';
    btnEliminar.onclick = () => eliminarNota(nota.id);
    
    div.appendChild(btnEliminar);
    contenedor.appendChild(div);
  }
}
\`\`\`

**Buenas prácticas**:
- Separa la lógica de negocio (CRUD) de la manipulación del DOM
- Actualiza el DOM solo después de modificar el estado
- Usa IDs únicos (Date.now() o crypto.randomUUID()) para identificar cada nota
- El render debe ser **idempotente**: puede llamarse múltiples veces sin efectos secundarios
- El patrón estado → render → eventos se usa en frameworks modernos como React y Vue`,exercise:"Declara `let tareas = []`. Crea funciones `agregarTarea(texto)` (agrega con `{id, texto, completada: false}`) y `completarTarea(id)` (cambia `completada` a `true`). Crea también `obtenerPendientes` que filtre las no completadas con `filter`.",solution:`let tareas = [];
function agregarTarea(texto) {
  const tarea = { id: Date.now(), texto, completada: false };
  tareas.push(tarea);
  return tarea;
}
function completarTarea(id) {
  const tarea = tareas.find(t => t.id === id);
  if (tarea) tarea.completada = true;
}
function obtenerPendientes() {
  return tareas.filter(t => !t.completada);
}`,tests:[`typeof agregarTarea === 'function'`,`typeof completarTarea === 'function'`,`typeof obtenerPendientes === 'function'`]},{id:29,module:`Asincronía`,title:`Callbacks y Promesas`,theory:`Las **Promesas** representan un valor futuro: pueden estar **pendiente** (pending), **resuelta** (fulfilled) o **rechazada** (rejected).

\`\`\`js
const promesa = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('Operación completada');
    // reject(new Error('Algo salió mal'));
  }, 1000);
});

promesa.then(resultado => console.log(resultado));
promesa.catch(error => console.error(error));
promesa.finally(() => console.log('Siempre se ejecuta'));
\`\`\`

**Encadenar promesas**:
\`\`\`js
new Promise(resolve => resolve(5))
  .then(n => n * 2)
  .then(n => n + 1)
  .then(n => console.log(n)); // 11
\`\`\`

**Promise.all**: ejecuta varias promesas en paralelo y espera todas:
\`\`\`js
const p1 = Promise.resolve(1);
const p2 = Promise.resolve(2);
const p3 = new Promise(resolve => setTimeout(() => resolve(3), 100));

Promise.all([p1, p2, p3]).then(resultados => {
  console.log(resultados); // [1, 2, 3]
});
\`\`\`

**Promise.race**: la primera que se resuelva o rechace gana.

**Callback vs Promesa**:
\`\`\`js
// Callback (callback hell)
obtenerUsuario(1, usuario => {
  obtenerPedidos(usuario.id, pedidos => {
    obtenerDetalle(pedidos[0].id, detalle => {
      console.log(detalle);
    });
  });
});

// Promesa (mucho más plano)
obtenerUsuario(1)
  .then(usuario => obtenerPedidos(usuario.id))
  .then(pedidos => obtenerDetalle(pedidos[0].id))
  .then(detalle => console.log(detalle))
  .catch(error => console.error(error));
\`\`\``,exercise:"Crea una función `simularPeticion(exito)` que retorne una Promise. Si `exito` es true, se resuelve tras 100ms con 'Datos recibidos'. Si es false, se rechaza tras 100ms con 'Error en la petición'.",solution:`function simularPeticion(exito) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (exito) resolve('Datos recibidos');
      else reject('Error en la petición');
    }, 100);
  });
}`,tests:[`typeof simularPeticion === 'function'`]},{id:30,module:`Asincronía`,title:`Fetch API`,theory:`**\`fetch()\`** realiza peticiones HTTP. Devuelve una Promesa que se resuelve con un objeto **Response**. Para obtener los datos JSON, usa \`.json()\`.

\`\`\`js
fetch('https://api.ejemplo.com/usuarios')
  .then(response => {
    if (!response.ok) {
      throw new Error('Error HTTP: ' + response.status);
    }
    return response.json();
  })
  .then(data => console.log(data))
  .catch(error => console.error('Fetch falló:', error));
\`\`\`

**Métodos HTTP**:
\`\`\`js
// GET (por defecto)
fetch('url/api')

// POST
fetch('url/api', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ nombre: 'Ana', edad: 30 })
})
\`\`\`

**Response.ok y status codes**:
\`\`\`js
fetch(url).then(res => {
  if (res.ok) {             // status 200-299
    return res.json();
  } else if (res.status === 404) {
    console.log('No encontrado');
  } else if (res.status === 500) {
    console.log('Error del servidor');
  }
});
\`\`\`

**Errores comunes**:
- \`fetch\` solo rechaza por errores de red, NO por códigos HTTP 4xx/5xx
- Siempre verifica \`response.ok\` o \`response.status\`
- No olvides el \`return response.json()\` dentro del \`then\`
- \`response.json()\` también devuelve una Promesa`,exercise:"Crea una función `obtenerUsuarioPorId(id)` que simule una petición usando `Promise.resolve`. Debe retornar una promesa que se resuelva con `{ id, nombre: 'Usuario ' + id, email: 'usuario' + id + '@test.com' }`.",solution:`function obtenerUsuarioPorId(id) {
  return Promise.resolve({
    id,
    nombre: 'Usuario ' + id,
    email: 'usuario' + id + '@test.com'
  });
}`,tests:[`typeof obtenerUsuarioPorId === 'function'`]},{id:31,module:`Asincronía`,title:`async/await`,theory:`**\`async/await\`** es azúcar sintáctico sobre Promesas. Una función \`async\` siempre devuelve una Promesa. \`await\` pausa la ejecución hasta que la Promesa se resuelva.

\`\`\`js
async function obtenerDatos() {
  const respuesta = await fetch('url/api');
  const datos = await respuesta.json();
  return datos;
}

// Equivalente con .then()
function obtenerDatosThen() {
  return fetch('url/api').then(r => r.json());
}
\`\`\`

**Manejo de errores con try/catch**:
\`\`\`js
async function obtenerUsuario(id) {
  try {
    const res = await fetch(\`/api/usuarios/\${id}\`);
    if (!res.ok) throw new Error('Usuario no encontrado');
    const usuario = await res.json();
    return usuario;
  } catch (error) {
    console.error('Error:', error.message);
    return null;
  }
}
\`\`\`

**Ejecución paralela con Promise.all**:
\`\`\`js
async function obtenerTodo() {
  const [usuarios, productos, pedidos] = await Promise.all([
    fetch('/api/usuarios').then(r => r.json()),
    fetch('/api/productos').then(r => r.json()),
    fetch('/api/pedidos').then(r => r.json())
  ]);
  
  return { usuarios, productos, pedidos };
}
\`\`\`

**Reglas importantes**:
- \`await\` solo puede usarse dentro de funciones \`async\`
- \`async\` function siempre devuelve una Promesa (aunque retornes un valor simple)
- Si una Promesa se rechaza y no hay \`catch\`, \`await\` lanza la excepción
- Para ejecución en paralelo usa \`Promise.all\`, no \`await\` secuencial`,exercise:"Crea una función async `procesarEnCadena` que reciba un número. Usa `await` para simular tres operaciones asíncronas (cada una con `Promise.resolve` tras 0ms): primero suma 10, luego multiplica por 2, luego resta 5. Retorna el resultado final.",solution:`async function procesarEnCadena(n) {
  const paso1 = await Promise.resolve(n + 10);
  const paso2 = await Promise.resolve(paso1 * 2);
  const paso3 = await Promise.resolve(paso2 - 5);
  return paso3;
}`,tests:[`typeof procesarEnCadena === 'function'`]},{id:32,module:`Programación Avanzada`,title:`Clases y POO`,theory:`Las **clases** (ES6) son plantillas para crear objetos. Encapsulan datos (propiedades) y comportamiento (métodos).

\`\`\`js
class Persona {
  constructor(nombre, edad) {
    this.nombre = nombre;
    this.edad = edad;
  }

  saludar() {
    return \`Hola, soy \${this.nombre}\`;
  }

  cumpleanios() {
    this.edad++;
  }
}

const ana = new Persona('Ana', 30);
console.log(ana.saludar()); // 'Hola, soy Ana'
\`\`\`

**Propiedades privadas** (ES2020 con \`#\`):
\`\`\`js
class CuentaBancaria {
  #saldo = 0;  // propiedad privada

  constructor(titular) {
    this.titular = titular;
  }

  depositar(monto) {
    if (monto > 0) this.#saldo += monto;
  }

  obtenerSaldo() {
    return this.#saldo;
  }
}
\`\`\`

**Getters y Setters**:
\`\`\`js
class Rectangulo {
  constructor(ancho, alto) {
    this.ancho = ancho;
    this.alto = alto;
  }

  get area() {
    return this.ancho * this.alto;
  }

  set dimensiones({ ancho, alto }) {
    this.ancho = ancho;
    this.alto = alto;
  }
}

const r = new Rectangulo(5, 10);
console.log(r.area); // 50 (getter, sin paréntesis)
\`\`\`

**Métodos estáticos**: pertenecen a la clase, no a la instancia:
\`\`\`js
class Util {
  static formatearFecha(fecha) {
    return fecha.toISOString().split('T')[0];
  }
}
console.log(Util.formatearFecha(new Date()));
\`\`\``,exercise:"Crea una clase `Contador` con `#valor` privado inicializado en 0. Métodos: `incrementar()` (aumenta en 1), `decrementar()` (disminuye en 1), `obtenerValor()` (retorna #valor) y un getter `valorDoble` que retorne #valor * 2.",solution:`class Contador {
  #valor = 0;
  incrementar() { this.#valor++; }
  decrementar() { this.#valor--; }
  obtenerValor() { return this.#valor; }
  get valorDoble() { return this.#valor * 2; }
}`,tests:[`typeof Contador === 'function'`,`typeof new Contador().incrementar === 'function'`,`typeof new Contador().obtenerValor === 'function'`]},{id:33,module:`Programación Avanzada`,title:`Herencia y Prototipos`,theory:`La **herencia** permite que una clase (hija) herede propiedades y métodos de otra (padre) usando **\`extends\`** y **\`super\`**.

\`\`\`js
class Animal {
  constructor(nombre) {
    this.nombre = nombre;
  }

  hablar() {
    return 'Hace un sonido';
  }
}

class Perro extends Animal {
  constructor(nombre, raza) {
    super(nombre);  // llama al constructor padre
    this.raza = raza;
  }

  hablar() {  // sobrescribe (override)
    return '¡Guau!';
  }
}

const luna = new Perro('Luna', 'Labrador');
console.log(luna.hablar()); // '¡Guau!'
console.log(luna.nombre);   // 'Luna' (heredado)
\`\`\`

**\`instanceof\`**: verifica si un objeto es instancia de una clase:
\`\`\`js
console.log(luna instanceof Perro);  // true
console.log(luna instanceof Animal); // true
console.log(luna instanceof Object); // true
\`\`\`

**Cadena de prototipos**: cuándo llamar a \`super\`:
- En el constructor hijo: \`super(...)\` debe llamarse antes de usar \`this\`
- En métodos: \`super.metodoPadre()\` para invocar la versión padre

\`\`\`js
class Gato extends Animal {
  constructor(nombre, color) {
    super(nombre);
    this.color = color;
  }

  hablar() {
    return super.hablar() + ' pero específicamente ¡Miau!';
  }
}
\`\`\`

**Buenas prácticas**:
- Prefiere composición sobre herencia (\`tiene-un\` vs \`es-un\`)
- La jerarquía de herencia profunda (> 3 niveles) es difícil de mantener
- Usa \`super\` en el constructor hijo siempre, incluso si el padre no tiene parámetros
- \`instanceof\` funciona con clases que extienden de otras`,exercise:"Crea una clase `Figura` con constructor `(nombre)` y método `area()` que retorne 0. Crea `Circulo` que extienda `Figura`, reciba `radio` en el constructor, llame a `super('Círculo')` y sobreescriba `area()` retornando `Math.PI * radio * radio`.",solution:`class Figura {
  constructor(nombre) { this.nombre = nombre; }
  area() { return 0; }
}
class Circulo extends Figura {
  constructor(radio) {
    super('Círculo');
    this.radio = radio;
  }
  area() { return Math.PI * this.radio * this.radio; }
}`,tests:[`typeof Circulo === 'function'`,`new Circulo(5) instanceof Figura`]},{id:34,module:`Programación Avanzada`,title:`Closures`,theory:`Un **closure** es una función que recuerda el ámbito (scope) donde fue creada, incluso después de que ese ámbito haya terminado. Permite encapsular datos privados.

\`\`\`js
function crearContador() {
  let count = 0;  // variable privada

  return {
    incrementar() {
      count++;
      return count;
    },
    decrementar() {
      count--;
      return count;
    },
    obtenerValor() {
      return count;
    }
  };
}

const contador = crearContador();
console.log(contador.incrementar()); // 1
console.log(contador.incrementar()); // 2
console.log(contador.obtenerValor()); // 2
// count no es accesible directamente
\`\`\`

**Closures en bucles** (problema clásico):
\`\`\`js
// Problema: todas imprimen 3
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100); // 3, 3, 3
}

// Solución con closure usando let
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100); // 0, 1, 2
}

// Solución clásica con IIFE
for (var i = 0; i < 3; i++) {
  (function(j) {
    setTimeout(() => console.log(j), 100); // 0, 1, 2
  })(i);
}
\`\`\`

**Factory functions con closures**:
\`\`\`js
function crearSaludo(idioma) {
  return function(nombre) {
    if (idioma === 'es') return \`Hola, \${nombre}\`;
    if (idioma === 'en') return \`Hello, \${nombre}\`;
    return nombre;
  };
}

const saludarES = crearSaludo('es');
const saludarEN = crearSaludo('en');
console.log(saludarES('Ana')); // 'Hola, Ana'
console.log(saludarEN('Ana')); // 'Hello, Ana'
\`\`\`

**Usos prácticos**:
- Encapsulación (variables privadas)
- Memoización (cachear resultados)
- Funciones parciales (fijar argumentos)
- Módulos (patrón IIFE)`,exercise:"Crea una función `crearAcumulador` que reciba un valor inicial. Debe retornar una función que reciba un número y lo sume al acumulador, retornando el nuevo total. El acumulador debe ser privado.",solution:`function crearAcumulador(inicial) {
  let total = inicial;
  return function(n) {
    total += n;
    return total;
  };
}`,tests:[`typeof crearAcumulador === 'function'`,`typeof crearAcumulador(0) === 'function'`]},{id:35,module:`Programación Avanzada`,title:`Patrones de Diseño`,theory:`Los **patrones de diseño** son soluciones reutilizables para problemas comunes. Los más útiles en JavaScript:

**Factory**: crea objetos sin especificar la clase exacta:
\`\`\`js
function crearVehiculo(tipo) {
  switch(tipo) {
    case 'coche': return { ruedas: 4, tipo: 'Coche', arrancar() { return 'Vroom'; } };
    case 'moto': return { ruedas: 2, tipo: 'Moto', arrancar() { return 'Ring ring'; } };
    default: return { ruedas: 0, tipo: 'Desconocido', arrancar() { return '...'; } };
  }
}
\`\`\`

**Observer (o Pub/Sub)**: un objeto notifica a múltiples suscriptores cuando cambia:
\`\`\`js
class EventEmitter {
  constructor() {
    this.eventos = {};
  }

  on(evento, callback) {
    if (!this.eventos[evento]) this.eventos[evento] = [];
    this.eventos[evento].push(callback);
  }

  emit(evento, ...args) {
    const callbacks = this.eventos[evento];
    if (callbacks) callbacks.forEach(cb => cb(...args));
  }
}
\`\`\`

**Singleton**: asegura una única instancia:
\`\`\`js
class Configuracion {
  static #instancia;

  constructor() {
    if (Configuracion.#instancia) return Configuracion.#instancia;
    this.config = {};
    Configuracion.#instancia = this;
  }
}
\`\`\`

**Buenas prácticas**:
- No forces patrones donde no hacen falta. A veces una función basta
- Los patrones son guías, no reglas estrictas
- En JS, muchos patrones se implementan más simple gracias a closures, objetos literales y funciones de primera clase`,exercise:"Crea una factory function `crearEmpleado(tipo)` que retorne: si es 'developer' → `{rol:'Developer', lenguaje:'JavaScript', trabajar(){return 'Escribiendo código'}}`; si es 'manager' → `{rol:'Manager', equipo:[], trabajar(){return 'Gestionando equipo'}}`.",solution:`function crearEmpleado(tipo) {
  if (tipo === 'developer') {
    return { rol: 'Developer', lenguaje: 'JavaScript', trabajar() { return 'Escribiendo código'; } };
  }
  if (tipo === 'manager') {
    return { rol: 'Manager', equipo: [], trabajar() { return 'Gestionando equipo'; } };
  }
  return { rol: 'Desconocido', trabajar() { return 'Sin tareas'; } };
}`,tests:[`typeof crearEmpleado === 'function'`,{type:`function`,code:`crearEmpleado('developer').trabajar()`,expected:`Escribiendo código`}]},{id:36,module:`Programación Avanzada`,title:`Simulador de tienda online`,theory:`Combinamos varios conceptos (clases, arrays, métodos) para simular un carrito de compras.

\`\`\`js
class Producto {
  constructor(nombre, precio, categoria) {
    this.nombre = nombre;
    this.precio = precio;
    this.categoria = categoria;
    this.id = Date.now();
  }
}

class Carrito {
  constructor() {
    this.items = [];
  }

  agregar(producto) {
    this.items.push(producto);
  }

  eliminar(id) {
    this.items = this.items.filter(item => item.id !== id);
  }

  total() {
    return this.items.reduce((suma, item) => suma + item.precio, 0);
  }

  resumen() {
    return this.items.map(p => \`\${p.nombre}: $\${p.precio}\`);
  }

  // Descuento por categoría
  aplicarDescuento(categoria, porcentaje) {
    this.items.forEach(item => {
      if (item.categoria === categoria) {
        item.precio *= (1 - porcentaje / 100);
      }
    });
  }
}

// Uso
const carrito = new Carrito();
carrito.agregar(new Producto('Laptop', 1200, 'electrónica'));
carrito.agregar(new Producto('Mouse', 25, 'electrónica'));
carrito.aplicarDescuento('electrónica', 10);
console.log(carrito.total()); // (1200 + 25) * 0.9
\`\`\`

**Buenas prácticas**:
- Cada clase tiene una responsabilidad clara
- Los métodos modifican el estado interno del objeto
- \`reduce\` es ideal para cálculos acumulativos como totales
- Usa \`filter\` para eliminar, no modifiques el array mientras lo recorres`,exercise:"Crea una clase `Carrito` con constructor que inicialice `items = []`. Métodos: `agregar(producto)` (push), `eliminar(id)` (filter), `total()` (reduce suma precios) y `cantidad()` que retorne la longitud de items. Crea una clase `Producto` con `(nombre, precio)`.",solution:`class Producto {
  constructor(nombre, precio) {
    this.nombre = nombre;
    this.precio = precio;
    this.id = Date.now();
  }
}
class Carrito {
  constructor() { this.items = []; }
  agregar(p) { this.items.push(p); }
  eliminar(id) { this.items = this.items.filter(i => i.id !== id); }
  total() { return this.items.reduce((s, i) => s + i.precio, 0); }
  cantidad() { return this.items.length; }
}`,tests:[`typeof Carrito === 'function'`,`typeof Producto === 'function'`]},{id:37,module:`Optimización y Buenas Prácticas`,title:`Optimización de funciones`,theory:`Optimizar no es solo velocidad: es escribir código claro, eficiente y mantenible.

**\`reduce\` vs bucle for**: \`reduce\` es más declarativo y menos propenso a errores:
\`\`\`js
const nums = [1, 2, 3, 4, 5];

// Bucle for (imperativo)
let sumaFor = 0;
for (let i = 0; i < nums.length; i++) {
  sumaFor += nums[i];
}

// reduce (declarativo)
const sumaReduce = nums.reduce((acc, n) => acc + n, 0);
\`\`\`

**Early return**: simplifica la lógica eliminando anidamiento:
\`\`\`js
// Sin early return
function validarUsuario(usuario) {
  if (usuario) {
    if (usuario.nombre) {
      if (usuario.edad >= 18) {
        return true;
      }
    }
  }
  return false;
}

// Con early return
function validarUsuario(usuario) {
  if (!usuario) return false;
  if (!usuario.nombre) return false;
  if (usuario.edad < 18) return false;
  return true;
}
\`\`\`

**Cachear resultados** (memoización):
\`\`\`js
function factorial(n, cache = {}) {
  if (n in cache) return cache[n];
  if (n <= 1) return 1;
  cache[n] = n * factorial(n - 1, cache);
  return cache[n];
}
\`\`\`

**Rendimiento**:
- \`for\` clásico es el más rápido, pero \`forEach\`, \`map\`, \`reduce\` son más legibles
- Para arrays grandes, elige legibilidad primero, optimiza solo si hay cuello de botella
- Evita crear objetos/funciones innecesarias dentro de bucles
- Usa \`Set\` para búsquedas rápidas sin duplicados`,exercise:"Crea una función `maximo` que reciba un array de números y retorne el máximo (sin usar Math.max). Usa `reduce`. Luego crea `sumaPares` que sume solo los números pares de un array usando `filter` y `reduce`.",solution:`function maximo(arr) {
  return arr.reduce((max, n) => n > max ? n : max, -Infinity);
}
function sumaPares(arr) {
  return arr.filter(n => n % 2 === 0).reduce((a, b) => a + b, 0);
}`,tests:[{type:`function`,code:`maximo([3, 7, 2, 9, 5])`,expected:9},{type:`function`,code:`maximo([-5, -2, -10])`,expected:-2},{type:`function`,code:`sumaPares([1, 2, 3, 4, 5, 6])`,expected:12}]},{id:38,module:`Optimización y Buenas Prácticas`,title:`Complejidad algorítmica`,theory:`La **complejidad algorítmica** (Big O) describe cómo crece el tiempo de ejecución al aumentar el tamaño de los datos.

| Notación | Nombre | Ejemplo |
|----------|--------|--------|
| O(1) | Constante | Acceso por índice \`arr[i]\` |
| O(log n) | Logarítmica | Búsqueda binaria |
| O(n) | Lineal | Bucle simple \`for\` |
| O(n log n) | Linealítmica | Ordenación eficiente |
| O(n²) | Cuadrática | Bucles anidados |

**Ejemplos**:
\`\`\`js
// O(1) - constante
function obtenerPrimero(arr) {
  return arr[0];
}

// O(n) - lineal
function buscar(arr, objetivo) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === objetivo) return i;
  }
  return -1;
}

// O(n²) - cuadrática
function tieneDuplicados(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] === arr[j]) return true;
    }
  }
  return false;
}
\`\`\`

**Optimizar búsquedas**: usar \`Set\` o \`Map\` para O(1) en lugar de O(n):
\`\`\`js
// O(n) - array
function existeEnArray(arr, valor) {
  return arr.includes(valor);
}

// O(1) - Set
function existeEnSet(set, valor) {
  return set.has(valor);
}
\`\`\`

**Buenas prácticas**:
- Empieza con la solución más simple (O(n) suele ser suficiente)
- Optimiza solo cuando hay un problema de rendimiento medible
- Usa \`Set\`/\`Map\` para búsquedas y eliminación de duplicados
- Para arrays ordenados, búsqueda binaria (O(log n))`,exercise:"Crea una función `eliminarDuplicados` que reciba un array y retorne un nuevo array sin duplicados. Usa un `Set` para O(n) en vez de bucles anidados O(n²).",solution:`function eliminarDuplicados(arr) {
  return [...new Set(arr)];
}`,tests:[{type:`function`,code:`JSON.stringify(eliminarDuplicados([1, 2, 2, 3, 3, 3, 4]))`,expected:`[1,2,3,4]`},{type:`function`,code:`JSON.stringify(eliminarDuplicados(['a', 'b', 'a', 'c']))`,expected:`["a","b","c"]`}]},{id:39,module:`Optimización y Buenas Prácticas`,title:`Testing básico`,theory:`Los **tests unitarios** verifican que funciones individuales se comporten correctamente. El patrón **AAA**: Arrange (preparar), Act (ejecutar), Assert (verificar).

\`\`\`js
// Función a testear
function sumar(a, b) {
  return a + b;
}

// Test unitario con patrón AAA
function testSuma() {
  // Arrange (preparar)
  const a = 2, b = 3;
  const esperado = 5;

  // Act (ejecutar)
  const resultado = sumar(a, b);

  // Assert (verificar)
  if (resultado === esperado) {
    console.log('✓ testSuma pasó');
  } else {
    console.error('✗ testSuma falló:', resultado, '!=', esperado);
  }
}
\`\`\`

**Casos borde (edge cases)**:
\`\`\`js
function dividir(a, b) {
  if (b === 0) return Infinity;
  return a / b;
}

// Tests
console.log(dividir(10, 2) === 5);       // normal
console.log(dividir(10, 0) === Infinity); // división por cero
console.log(dividir(0, 10) === 0);        // cero dividido
console.log(dividir(-10, 2) === -5);      // números negativos
\`\`\`

**Tipos de tests**:
\`\`\`js
// Test de igualdad
function esMayorQue(a, b) { return a > b; }
console.assert(esMayorQue(5, 3), '5 > 3 debería ser true');

// Test de arrays
function invertir(arr) { return arr.reverse(); }
console.assert(JSON.stringify(invertir([1,2,3])) === '[3,2,1]');

// Test de objetos
function crearPersona(n) { return { nombre: n }; }
const p = crearPersona('Ana');
console.assert(p.nombre === 'Ana', 'El nombre debería ser Ana');
\`\`\`

**Buenas prácticas**:
- Un test por comportamiento (no mezcles asserts de cosas distintas)
- Prueba casos normales, casos borde y valores límite
- Los tests deben ser deterministas (mismos input → mismo resultado)
- No tests para funciones triviales (getters/setters sin lógica)`,exercise:"Crea una función `invertirArray` que reciba un array y retorne uno nuevo invertido (sin mutar el original). Luego crea una función `testInvertirArray` que verifique: (1) `[1,2,3]` invertido es `[3,2,1]`, (2) el array original no se modifica, (3) array vacío retorna array vacío. Debe devolver true si todos pasan.",solution:`function invertirArray(arr) {
  return [...arr].reverse();
}
function testInvertirArray() {
  const original = [1, 2, 3];
  const invertido = invertirArray(original);
  const t1 = JSON.stringify(invertido) === '[3,2,1]';
  const t2 = JSON.stringify(original) === '[1,2,3]';
  const t3 = JSON.stringify(invertirArray([])) === '[]';
  return t1 && t2 && t3;
}`,tests:[`typeof invertirArray === 'function'`,`typeof testInvertirArray === 'function'`]},{id:40,module:`Proyectos Finales`,title:`Planificación de proyectos`,theory:`Planificar antes de codificar ahorra tiempo y evita frustraciones. Un buen plan incluye: **objetivos**, **requisitos**, **MVP**, **tareas** y **tecnologías**.

\`\`\`js
const proyecto = {
  nombre: 'Gestor de Tareas',
  objetivo: 'App web para crear y gestionar tareas personales',
  tecnologias: ['HTML', 'CSS', 'JavaScript', 'LocalStorage'],
  mvp: [
    'Agregar tarea con texto',
    'Marcar tarea como completada',
    'Eliminar tarea'
  ],
  extras: ['Categorías', 'Filtros', 'Persistencia LocalStorage']
};
\`\`\`

**Metodología**:
1. **Definir objetivo**: ¿qué problema resuelve?
2. **Requisitos funcionales**: ¿qué debe hacer?
3. **MVP** (Producto Mínimo Viable): la versión más simple que funciona
4. **Dividir en tareas**: pequeñas, específicas, medibles
5. **Elección técnica**: herramientas adecuadas

**Ejemplo de desglose**:
\`\`\`js
const tareas = [
  { id: 1, descripcion: 'Estructura HTML básica', completada: false },
  { id: 2, descripcion: 'Estilos CSS responsivos', completada: false },
  { id: 3, descripcion: 'Lógica JS: CRUD de tareas', completada: false },
  { id: 4, descripcion: 'Persistencia LocalStorage', completada: false }
];
\`\`\`

**Proyectos sugeridos para practicar**:
- **Juego Snake** con Canvas API
- **SPA de notas** sin frameworks
- **Dashboard** con datos mock y gráficos
- **Clon de Trello** (Kanban con drag & drop)
- **Buscador de películas** con API pública

**Buenas prácticas**:
- Empieza con el MVP, luego añade funcionalidades extra
- Divide el proyecto en sprints/ciclos pequeños
- Usa control de versiones (git) desde el inicio
- Prueba cada funcionalidad antes de pasar a la siguiente
- Documenta decisiones técnicas importantes`,exercise:"Declara un objeto `miProyecto` con: `nombre` (string), `objetivo` (string), `tecnologias` (array de strings), `modulos` (array de objetos con `{nombre, tareas:[]}`) y un método `agregarModulo(nombre, tareas)` que agregue un módulo al array modulos.",solution:`let miProyecto = {
  nombre: 'Mi Proyecto Final',
  objetivo: 'Aplicación web interactiva',
  tecnologias: ['HTML', 'CSS', 'JavaScript'],
  modulos: [],
  agregarModulo(nombre, tareas) {
    this.modulos.push({ nombre, tareas });
  }
};`,tests:[`typeof miProyecto === 'object'`,`typeof miProyecto.agregarModulo === 'function'`]},{id:41,module:`JavaScript en el Mundo Real`,title:`Vite y npm scripts`,theory:`**Vite** es un bundler moderno que usamos en este proyecto. Proporciona un servidor de desarrollo con HMR (Hot Module Replacement) y build optimizado.

**Scripts comunes en package.json**:
\`\`\`bash
npm run dev      # Inicia servidor de desarrollo con HMR
npm run build    # Compila y empaqueta para producción
npm run preview  # Previsualiza la build de producción
npm test         # Ejecuta tests
\`\`\`

**Estructura de un proyecto Vite**:
\`\`\`
mi-proyecto/
├── index.html       # Entrada principal
├── package.json     # Dependencias y scripts
├── vite.config.ts   # Configuración de Vite
├── tsconfig.json    # Configuración de TypeScript
├── js/              # Código fuente
│   └── app.ts
└── dist/            # Build de producción (generado)
\`\`\`

**Ejemplo de package.json**:
\`\`\`json
{
  "name": "mi-app",
  "scripts": {
    "dev": "vite",
    "build": "tsc --noEmit && vite build",
    "preview": "vite preview"
  }
}
\`\`\`

**Buenas prácticas**:
- Usa \`node -v\` y \`npm -v\` para verificar versiones
- El script \`dev\` es para desarrollo, \`build\` para producción
- \`preview\` sirve la carpeta \`dist/\` localmente para verificar antes de subir
- Ignora \`node_modules/\` y \`dist/\` en tu repositorio (.gitignore)`,exercise:"Declara un objeto `packageInfo` con: `nombre` (string), `version` ('1.0.0'), `scripts` (objeto con 'dev', 'build', 'preview') y una función `correrScript(script)` que retorne 'Ejecutando ' + script + '...'.",solution:`let packageInfo = {
  nombre: 'mi-app',
  version: '1.0.0',
  scripts: {
    dev: 'vite',
    build: 'tsc --noEmit && vite build',
    preview: 'vite preview'
  },
  correrScript(script) {
    return 'Ejecutando ' + script + '...';
  }
};`,tests:[`typeof packageInfo === 'object'`,`packageInfo.version === '1.0.0'`,`typeof packageInfo.scripts === 'object'`,`typeof packageInfo.correrScript === 'function'`,{type:`function`,code:`packageInfo.correrScript('dev')`,expected:`Ejecutando dev...`}]},{id:42,module:`JavaScript en el Mundo Real`,title:`Despliegue en Netlify/Vercel`,theory:`**Desplegar** una app significa subirla a un servidor para que sea accesible públicamente. Servicios como Netlify y Vercel ofrecen hosting gratuito para apps estáticas.

**Pasos generales**:
1. Tener el proyecto en un repositorio de Git (GitHub, GitLab)
2. Hacer build: \`npm run build\` → genera carpeta \`dist/\`
3. Subir \`dist/\` a Netlify/Vercel (arrastrar o conectar repositorio)

**Netlify Drop** (método más rápido):
\`\`\`bash
npm run build
# Arrastrar la carpeta dist/ a https://app.netlify.com/drop
\`\`\`

**Conectar repositorio (CD continuo)**:
1. Subir el proyecto a GitHub
2. Ir a Netlify > Add new site > Import from Git
3. Elegir repositorio, rama (main)
4. Build command: \`npm run build\`
5. Publish directory: \`dist\`
6. Cada push a main despliega automáticamente

**Vercel**: similar a Netlify, detecta automáticamente Vite:
\`\`\`bash
npx vercel    # CLI interactivo
npx vercel --prod  # Desplegar a producción
\`\`\`

**Buenas prácticas**:
- Siempre ejecuta \`npm run build\` localmente antes de subir
- Verifica con \`npm run preview\` que todo funciona
- Usa variables de entorno para claves de API
- Configura un dominio personalizado para producción`,exercise:"Declara un objeto `configDespliegue` con: `plataforma` ('Netlify'), `buildCommand` ('npm run build'), `publishDir` ('dist'), y un método `desplegar()` que retorne 'Desplegando en ' + this.plataforma + '...'.",solution:`let configDespliegue = {
  plataforma: 'Netlify',
  buildCommand: 'npm run build',
  publishDir: 'dist',
  desplegar() {
    return 'Desplegando en ' + this.plataforma + '...';
  }
};`,tests:[`typeof configDespliegue === 'object'`,`configDespliegue.plataforma === 'Netlify'`,`configDespliegue.publishDir === 'dist'`,`typeof configDespliegue.desplegar === 'function'`,{type:`function`,code:`configDespliegue.desplegar()`,expected:`Desplegando en Netlify...`}]},{id:43,module:`JavaScript en el Mundo Real`,title:`Variables de entorno en frontend`,theory:`Las **variables de entorno** almacenan configuración sensible o específica del entorno (API keys, URLs). En Vite se acceden con \`import.meta.env\`.

**Archivo .env**:
\`\`\`env
# Archivo .env (NO subir a git)
VITE_API_URL=https://api.ejemplo.com
VITE_API_KEY=abc123
\`\`\`

**Acceder en código**:
\`\`\`js
const apiUrl = import.meta.env.VITE_API_URL;
const apiKey = import.meta.env.VITE_API_KEY;
\`\`\`

**Importante**: Solo las variables que empiezan con \`VITE_\` son accesibles desde el frontend. Esto es una medida de seguridad.

**Archivos .env útiles**:
| Archivo | Propósito |
|---------|-----------|
| \`.env\` | Valores por defecto (subir a git) |
| \`.env.local\` | Valores locales (NO subir a git) |
| \`.env.production\` | Valores para producción |

**Ejemplo de configuración**:
\`\`\`js
const config = {
  url: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  modo: import.meta.env.MODE  // 'development' o 'production'
};

console.log('Modo:', import.meta.env.MODE);
\`\`\`

**Buenas prácticas**:
- Nunca subas \`.env.local\` o \`.env*.local\` a git
- Usa valores por defecto en el código si la variable puede no estar definida
- Documenta las variables necesarias en un archivo \`.env.example\`
- Las variables se inyectan en tiempo de build, no en tiempo de ejecución`,exercise:"Declara un objeto `config` con: `apiUrl` ('https://api.ejemplo.com'), `modo` definido como 'development', y un método `obtenerUrl()` que retorne this.apiUrl. Declara `modoActual` como 'development' y `esProduccion` comparando si modoActual === 'production'.",solution:`let config = {
  apiUrl: 'https://api.ejemplo.com',
  modo: 'development',
  obtenerUrl() {
    return this.apiUrl;
  }
};
let modoActual = 'development';
let esProduccion = modoActual === 'production';`,tests:[`typeof config === 'object'`,`config.apiUrl === 'https://api.ejemplo.com'`,{type:`function`,code:`config.obtenerUrl()`,expected:`https://api.ejemplo.com`},`typeof esProduccion === 'boolean'`,`esProduccion === false`]},{id:44,module:`JavaScript en el Mundo Real`,title:`CI/CD con GitHub Actions`,theory:`**CI/CD** (Integración Continua / Despliegue Continuo) automatiza los tests y el despliegue cada vez que subes código a Git.

**GitHub Actions** ejecuta workflows automáticos en eventos como \`push\` o \`pull_request\`.

**Workflow básico** (\`.github/workflows/deploy.yml\`):
\`\`\`yaml
name: Deploy
on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm test
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: \${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
\`\`\`

**Explicación paso a paso**:
1. \`on: push branches: [main]\` — se activa al subir a main
2. \`checkout\` — descarga el repositorio
3. \`setup-node\` — instala Node.js 20
4. \`npm ci\` — instala dependencias (más rápido que npm install)
5. \`npm test\` — ejecuta tests (si fallan, se detiene)
6. \`npm run build\` — genera la build
7. \`actions-gh-pages\` — despliega \`dist/\` a GitHub Pages

**Secretos**: Para API keys o tokens:
- Ir a Settings > Secrets and variables > Actions
- Añadir secretos como \`API_KEY\`
- Acceder en workflow: \`\${{ secrets.API_KEY }}\`

**Buenas prácticas**:
- Siempre ejecuta tests antes del build en CI/CD
- Usa \`npm ci\` en vez de \`npm install\` en CI (más rápido y determinista)
- Mantén los workflows simples: un trabajo, pasos claros
- Los secretos nunca se muestran en los logs de Actions`,exercise:"Declara un objeto `workflow` con: `nombre` ('CI/CD'), `rama` ('main'), `pasos` (array: 'checkout', 'install', 'test', 'build', 'deploy'), y un método `ejecutar()` que retorne 'Ejecutando ' + this.nombre + ' en rama ' + this.rama + '...'.",solution:`let workflow = {
  nombre: 'CI/CD',
  rama: 'main',
  pasos: ['checkout', 'install', 'test', 'build', 'deploy'],
  ejecutar() {
    return 'Ejecutando ' + this.nombre + ' en rama ' + this.rama + '...';
  }
};`,tests:[`typeof workflow === 'object'`,`workflow.nombre === 'CI/CD'`,`workflow.pasos.length === 5`,`typeof workflow.ejecutar === 'function'`,{type:`function`,code:`workflow.ejecutar()`,expected:`Ejecutando CI/CD en rama main...`}]},{id:45,module:`Asincronía`,title:`Promesas encadenadas`,theory:`Las promesas en JavaScript permiten encadenar operaciones asincrónicas de forma legible mediante el método **.then()**. Cada \`.then()\` devuelve una nueva promesa, lo que permite secuenciar tareas.

**Encadenamiento básico:**
\`\`\`js
Promise.resolve(1)
  .then(val => val * 2)
  .then(val => val + 3)
  .then(console.log); // 5
\`\`\`

**Manejo de errores con .catch():**
El método \`.catch()\` captura cualquier error que ocurra en cualquier punto de la cadena:
\`\`\`js
Promise.reject("Error")
  .then(val => val * 2)
  .catch(err => -1); // -1
\`\`\`

**Limpieza con .finally():**
\`.finally()\` se ejecuta siempre, haya o no error:
\`\`\`js
miPromesa
  .then(console.log)
  .catch(console.error)
  .finally(() => console.log("Terminado"));
\`\`\``,exercise:"Crea una función llamada `encadenar` que devuelva una cadena de promesas. La primera promesa debe resolverse con el valor 1, luego multiplicarlo por 2 con `.then()`, luego sumarle 3 con otro `.then()`, y finalmente devolver el resultado. Incluye un `.catch()` que devuelva -1 en caso de error.",solution:`function encadenar() {
  return Promise.resolve(1)
    .then(val => val * 2)
    .then(val => val + 3)
    .catch(() => -1);
}`,tests:[`typeof encadenar === 'function'`,`typeof encadenar().then === 'function'`]},{id:46,module:`Asincronía`,title:`Promise.all, Promise.race, Promise.allSettled`,theory:`JavaScript ofrece tres métodos estáticos para trabajar con múltiples promesas:

**Promise.all()**
Espera a que **todas** las promesas se resuelvan. Si alguna falla, rechaza inmediatamente:
\`\`\`js
Promise.all([p1, p2, p3])
  .then(resultados => console.log(resultados))
  .catch(err => console.error(err));
\`\`\`

**Promise.race()**
Resuelve o rechaza con la **primera** promesa que se settlee:
\`\`\`js
Promise.race([rapida, lenta])
  .then(val => console.log(val));
\`\`\`

**Promise.allSettled()**
Espera a que **todas** terminen sin importar si fallan. Devuelve el estado de cada una:
\`\`\`js
Promise.allSettled([p1, p2])
  .then(resultados => {
    resultados.forEach(r => console.log(r.status));
  });
\`\`\``,exercise:'Crea una función llamada `procesarTareas` que reciba un array de promesas y utilice `Promise.all` para esperar a que todas se completen. Debe devolver "Todas completadas" si todas las promesas se resuelven, o "Error en tareas" si alguna falla.',solution:`function procesarTareas(tareas) {
  return Promise.all(tareas)
    .then(() => "Todas completadas")
    .catch(() => "Error en tareas");
}`,tests:[`typeof procesarTareas === 'function'`,`typeof procesarTareas([]).then === 'function'`]},{id:47,module:`Asincronía`,title:`AbortController y cancelación`,theory:`**AbortController** permite cancelar operaciones asincrónicas como peticiones fetch.

**Patrón básico:**
\`\`\`js
const controller = new AbortController();
const signal = controller.signal;

fetch(url, { signal })
  .then(response => response.json())
  .catch(err => {
    if (err.name === 'AbortError') {
      console.log('Petición cancelada');
    }
  });

controller.abort();
\`\`\`

**Usos comunes:**
- Cancelar fetch al desmontar un componente
- Evitar condiciones de carrera
- Timeout en peticiones

**Ejemplo con timeout:**
\`\`\`js
const controller = new AbortController();
setTimeout(() => controller.abort(), 5000);
fetch(url, { signal: controller.signal });
\`\`\``,exercise:'Crea una función llamada `crearPeticionCancelable` que devuelva un objeto con dos propiedades: `promesa` (una Promise que se resuelve con "Completado" tras 3 segundos, o se rechaza con "Cancelado" si se aborta) y `cancelar` (una función que llama a `controller.abort()`).',solution:`function crearPeticionCancelable() {
  const controller = new AbortController();
  return {
    promesa: new Promise((resolve, reject) => {
      const timer = setTimeout(() => resolve("Completado"), 3000);
      controller.signal.addEventListener('abort', () => {
        clearTimeout(timer);
        reject("Cancelado");
      });
    }),
    cancelar: () => controller.abort()
  };
}`,tests:[`typeof crearPeticionCancelable === 'function'`,`typeof crearPeticionCancelable().promesa === 'object'`,`typeof crearPeticionCancelable().cancelar === 'function'`]},{id:48,module:`Programación Avanzada`,title:`Patrón Singleton`,theory:`El **patrón Singleton** garantiza que una clase tenga una única instancia y proporciona un punto de acceso global a ella.

**Implementación con clase**
Se usa un campo estático privado (\`#instancia\`) para almacenar la instancia única. El constructor verifica si ya existe una instancia y la retorna en lugar de crear una nueva.

\`\`\`js
class Configuracion {
  static #instancia = null;

  constructor() {
    if (Configuracion.#instancia) {
      return Configuracion.#instancia;
    }
    this.config = {};
    Configuracion.#instancia = this;
  }

  get(key) {
    return this.config[key];
  }

  set(key, value) {
    this.config[key] = value;
  }
}
\`\`\`

**Implementación con módulo**
También se puede lograr con un objeto literal exportado como módulo:

\`\`\`js
const config = {
  valores: {},
  get(key) { return this.valores[key]; },
  set(key, value) { this.valores[key] = value; }
};
export default config;
\`\`\`

**Casos de uso**
- Configuración global de la aplicación
- Logger compartido
- Conexión a base de datos
- Cache unificado`,exercise:"Crea una `class Configuracion` que implemente el patrón Singleton. El constructor debe verificar si ya existe una instancia y retornarla en ese caso. Agrega los métodos `get(key)` y `set(key, value)` que lean y escriban desde un objeto interno `this.config`.",solution:`class Configuracion {
  static #instancia = null;

  constructor() {
    if (Configuracion.#instancia) {
      return Configuracion.#instancia;
    }
    this.config = {};
    Configuracion.#instancia = this;
  }

  get(key) {
    return this.config[key];
  }

  set(key, value) {
    this.config[key] = value;
  }
}`,tests:[`typeof Configuracion === 'function'`,{type:`function`,code:`(() => { const a = new Configuracion(); const b = new Configuracion(); return a === b; })()`,expected:!0},{type:`function`,code:`(() => { const c = new Configuracion(); c.set('tema', 'oscuro'); return c.get('tema'); })()`,expected:`oscuro`}]},{id:49,module:`Programación Avanzada`,title:`Patrón Observer`,theory:`El **patrón Observer** (o Pub/Sub) permite que objetos se suscriban a eventos y sean notificados cuando ocurren. Es ideal para comunicación desacoplada entre componentes.

**Estructura básica**
Un \`EventEmitter\` mantiene un diccionario de eventos, donde cada evento tiene un array de callbacks suscriptos.

\`\`\`js
class EventEmitter {
  constructor() {
    this.eventos = {};
  }

  on(evento, callback) {
    if (!this.eventos[evento]) {
      this.eventos[evento] = [];
    }
    this.eventos[evento].push(callback);
  }

  emit(evento, ...args) {
    const callbacks = this.eventos[evento];
    if (callbacks) {
      callbacks.forEach(cb => cb(...args));
    }
  }

  off(evento, callback) {
    const callbacks = this.eventos[evento];
    if (callbacks) {
      this.eventos[evento] = callbacks.filter(cb => cb !== callback);
    }
  }
}
\`\`\`

**Uso**
\`\`\`js
const emisor = new EventEmitter();

function alHacerClick(nombre) {
  console.log(\`Click de \${nombre}\`);
}

emisor.on('click', alHacerClick);
emisor.emit('click', 'Usuario');
emisor.off('click', alHacerClick);
\`\`\`

Múltiples suscriptores pueden escuchar el mismo evento y se ejecutarán en orden de registro.`,exercise:"Crea una `class EventEmitter` con:\n- `on(evento, callback)`: almacena el callback en un array dentro de `this.eventos[evento]`\n- `emit(evento, ...args)`: ejecuta todos los callbacks del evento con los argumentos\n- `off(evento, callback)`: elimina un callback específico del array",solution:`class EventEmitter {
  constructor() {
    this.eventos = {};
  }

  on(evento, callback) {
    if (!this.eventos[evento]) {
      this.eventos[evento] = [];
    }
    this.eventos[evento].push(callback);
  }

  emit(evento, ...args) {
    const callbacks = this.eventos[evento];
    if (callbacks) {
      callbacks.forEach(cb => cb(...args));
    }
  }

  off(evento, callback) {
    const callbacks = this.eventos[evento];
    if (callbacks) {
      this.eventos[evento] = callbacks.filter(cb => cb !== callback);
    }
  }
}`,tests:[`typeof EventEmitter === 'function'`,`const em = new EventEmitter(); typeof em.on === 'function'`,`const em = new EventEmitter(); typeof em.emit === 'function'`,`const em = new EventEmitter(); typeof em.off === 'function'`,{type:`function`,code:`(() => { const em = new EventEmitter(); let r = ''; em.on('saludo', (n) => { r = n; }); em.emit('saludo', 'hola'); return r; })()`,expected:`hola`}]},{id:50,module:`Programación Avanzada`,title:`Patrón Factory`,theory:`El **patrón Factory** es un patrón de creación que encapsula la lógica de creación de objetos sin exponer la clase concreta al cliente.

**Idea principal**
En lugar de usar \`new\` directamente, llamamos a una función factory que decide qué objeto crear según un parámetro.

**Ejemplo: fábrica de figuras**
\`\`\`js
function crearFigura(tipo) {
  if (tipo === 'circulo') {
    return {
      tipo: 'circulo',
      area(radio) {
        return Math.PI * radio ** 2;
      }
    };
  }
  if (tipo === 'rectangulo') {
    return {
      tipo: 'rectangulo',
      area(base, altura) {
        return base * altura;
      }
    };
  }
  return null;
}
\`\`\`

**Uso**
\`\`\`js
const c = crearFigura('circulo');
c.area(5); // 78.54

const r = crearFigura('rectangulo');
r.area(4, 6); // 24

const x = crearFigura('triangulo'); // null
\`\`\`

**Ventajas**
- Centraliza la lógica de creación
- Oculta la complejidad de instanciación
- Fácil de extender con nuevos tipos`,exercise:"Crea una función `crearFigura(tipo)` que retorne:\n- `'circulo'` → `{ tipo: 'circulo', area(radio) { return Math.PI * radio ** 2 } }`\n- `'rectangulo'` → `{ tipo: 'rectangulo', area(base, altura) { return base * altura } }`\n- cualquier otro valor → `null`",solution:`function crearFigura(tipo) {
  if (tipo === 'circulo') {
    return {
      tipo: 'circulo',
      area(radio) {
        return Math.PI * radio ** 2;
      }
    };
  }
  if (tipo === 'rectangulo') {
    return {
      tipo: 'rectangulo',
      area(base, altura) {
        return base * altura;
      }
    };
  }
  return null;
}`,tests:[`typeof crearFigura === 'function'`,{type:`function`,code:`crearFigura('circulo').tipo`,expected:`circulo`},{type:`function`,code:`crearFigura('rectangulo').tipo`,expected:`rectangulo`},{type:`function`,code:`crearFigura('desconocido')`,expected:null},{type:`expression`,code:`Math.abs(crearFigura('circulo').area(5) - 78.53981633974483) < 0.0001`}]},{id:51,module:`Fundamentos del Lenguaje`,title:`Ficha personal interactiva`,theory:"Los **objetos** agrupan datos relacionados en pares clave:valor. Combinados con **template literals** y **métodos**, permiten crear estructuras de datos autocontenidas.\n\n```js\nconst persona = {\n  nombre: 'Ana',\n  edad: 30,\n  pais: 'Colombia',\n  hobbies: ['leer', 'correr'],\n  mostrar() {\n    return `${this.nombre} (${this.edad}), ${this.pais} — Pasatiempos: ${this.hobbies.join(', ')}`;\n  }\n};\n\nconsole.log(persona.mostrar());\n```\n\n**Propiedades**: son variables dentro del objeto. Se acceden con `objeto.propiedad`.\n\n**Métodos**: son funciones dentro del objeto. Usan `this` para referirse al propio objeto.\n\n**Template literals** (`` ` ``) permiten interpolar variables y expresiones:\n```js\n`${nombre} (${edad})`\n```\n\n**`this`** dentro de un método apunta al objeto que lo contiene. Sin `this`, la variable buscaría en el ámbito exterior.\n\n**Buenas prácticas**: Usa objetos para agrupar datos relacionados. Nombra los métodos como verbos (`mostrar`, `calcular`, `obtener`). Prefiere template literals sobre concatenación con `+`.",exercise:"Crea un objeto `ficha` con las propiedades: `nombre` (string), `edad` (number), `pais` (string), `hobbies` (array de strings) y un método `mostrar()` que retorne un string usando template literals con el formato: `'[nombre] ([edad]), [pais] — Pasatiempos: [hobbie1], [hobbie2]'`. Usa `this.hobbies.join(', ')` para los pasatiempos.",solution:`const ficha = {
  nombre: 'Carlos',
  edad: 25,
  pais: 'México',
  hobbies: ['leer', 'programar', 'música'],
  mostrar() {
    return \`\${this.nombre} (\${this.edad}), \${this.pais} — Pasatiempos: \${this.hobbies.join(', ')}\`;
  }
};`,tests:[`typeof ficha === 'object'`,`typeof ficha.nombre === 'string'`,`typeof ficha.mostrar === 'function'`,{type:`expression`,code:`ficha.mostrar().length >= 20`}]},{id:52,module:`Control de Flujo`,title:`Juego del número secreto`,theory:`Las **condicionales** (\`if/else if/else\`) permiten tomar decisiones según el valor de una expresión. Combinadas con **\`Math.random()\`** crean juegos interactivos.

\`\`\`js
const numeroSecreto = Math.floor(Math.random() * 100) + 1;

function adivinar(intento) {
  if (intento < numeroSecreto) {
    return 'menor';
  } else if (intento > numeroSecreto) {
    return 'mayor';
  } else {
    return 'acertaste';
  }
}
\`\`\`

**\`Math.random()\`** devuelve un decimal entre 0 (incluido) y 1 (excluido).

**\`Math.floor()\`** redondea hacia abajo.

**Fórmula para rango**: \`Math.floor(Math.random() * (max - min + 1)) + min\`

Para \`min=1, max=100\`: \`Math.floor(Math.random() * 100) + 1\` → números del 1 al 100.

**Estructura if/else if/else**:
\`\`\`js
if (condicion1) {
  // se ejecuta si condicion1 es true
} else if (condicion2) {
  // se ejecuta si condicion1 es false y condicion2 es true
} else {
  // se ejecuta si todas las anteriores son false
}
\`\`\`

**Buenas prácticas**: Ordena las condiciones de la más específica a la más general. Usa \`return\` temprano para evitar anidamiento excesivo.`,exercise:"Crea una función `jugarNumeroSecreto(intento)` que: genere `numeroSecreto` con `Math.floor(Math.random()*100)+1` **dentro de la función cada vez que se llama**, y retorne `'menor'` si intento < numeroSecreto, `'mayor'` si intento > numeroSecreto, `'acertaste'` si son iguales. Luego llama a la función con argumento 50 y guarda el resultado en la variable `resultado`.",solution:`function jugarNumeroSecreto(intento) {
  const numeroSecreto = Math.floor(Math.random() * 100) + 1;
  if (intento < numeroSecreto) {
    return 'menor';
  } else if (intento > numeroSecreto) {
    return 'mayor';
  } else {
    return 'acertaste';
  }
}
const resultado = jugarNumeroSecreto(50);`,tests:[`typeof jugarNumeroSecreto === 'function'`,`['menor', 'mayor', 'acertaste'].includes(resultado)`]},{id:53,module:`Funciones`,title:`Generador de contraseñas`,theory:`Las **funciones** pueden llamarse entre sí para dividir un problema en partes pequeñas. Esta técnica se llama **composición de funciones**.

\`\`\`js
function caracterAleatorio() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const indice = Math.floor(Math.random() * chars.length);
  return chars[indice];
}

function generarPassword(longitud = 8) {
  let password = '';
  for (let i = 0; i < longitud; i++) {
    password += caracterAleatorio();
  }
  return password;
}

console.log(generarPassword());     // 'aB3xK9mQ'
console.log(generarPassword(12));   // 'F7gH2jL9pQ4w'
\`\`\`

**Parámetros por defecto**: \`longitud = 8\` asigna 8 si no se proporciona argumento.

**Acceso por índice**: \`chars[indice]\` obtiene el carácter en la posición \`indice\`.

**Buena práctica**: Divide la lógica en funciones pequeñas — \`caracterAleatorio\` tiene una sola responsabilidad (generar un carácter aleatorio), y \`generarPassword\` se enfoca en construir la cadena.

**Composición**: \`generarPassword\` delega la generación del carácter a \`caracterAleatorio\`, haciendo el código más legible y reutilizable.`,exercise:"Crea una función `caracterAleatorio()` que retorne un carácter aleatorio del charset `'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'`. Luego crea una función `generarPassword(longitud = 8)` que genere y retorne una contraseña de la longitud indicada usando `caracterAleatorio()` dentro de un bucle `for`.",solution:`function caracterAleatorio() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  return chars[Math.floor(Math.random() * chars.length)];
}

function generarPassword(longitud = 8) {
  let password = '';
  for (let i = 0; i < longitud; i++) {
    password += caracterAleatorio();
  }
  return password;
}`,tests:[`typeof generarPassword === 'function'`,{type:`function`,code:`generarPassword().length`,expected:8},{type:`function`,code:`generarPassword(12).length`,expected:12},{type:`expression`,code:`typeof generarPassword() === 'string'`}]},{id:54,module:`Arrays y Objetos`,title:`Gestor de tareas`,theory:`Las operaciones **CRUD** (Create, Read, Update, Delete) sobre arrays de objetos son la base de muchas aplicaciones. En JavaScript se implementan con métodos inmutables como \`map\`, \`filter\`, \`findIndex\` y el **spread operator**.

\`\`\`js
let tareas = [
  { id: 1, texto: 'Aprender JS', completada: false },
  { id: 2, texto: 'Hacer ejercicio', completada: true }
];

function agregarTarea(tareas, texto) {
  const nueva = { id: Date.now(), texto, completada: false };
  return [...tareas, nueva];
}

function completarTarea(tareas, id) {
  return tareas.map(t =>
    t.id === id ? { ...t, completada: true } : t
  );
}

function tareasPendientes(tareas) {
  return tareas.filter(t => !t.completada);
}
\`\`\`

**Inmutabilidad**: en lugar de modificar el array original, cada función retorna un **nuevo array**. Esto evita efectos secundarios y facilita la depuración.

**Spread \`...\`**: \`[...tareas, nuevo]\` crea un nuevo array copiando los elementos existentes y añadiendo uno nuevo.

**\`map()\`**: transforma cada elemento. Si el id coincide, reemplaza la tarea con \`{ ...t, completada: true }\`; si no, la deja igual.

**\`filter()\`**: selecciona elementos que cumplan la condición (\`!t.completada\` → no completadas).

**Buenas prácticas**: Nunca mutes el estado directamente. Cada operación CRUD debe retornar un nuevo array.`,exercise:"Crea tres funciones para un gestor de tareas: `agregarTarea(tareas, texto)` — retorna un nuevo array con la tarea agregada (objeto con `id`, `texto`, `completada: false`); `completarTarea(tareas, id)` — retorna un nuevo array con la tarea cuyo id coincida marcada como `completada: true` (usa map); `tareasPendientes(tareas)` — retorna solo las tareas no completadas (usa filter).",solution:`function agregarTarea(tareas, texto) {
  return [...tareas, { id: Date.now(), texto, completada: false }];
}

function completarTarea(tareas, id) {
  return tareas.map(t =>
    t.id === id ? { ...t, completada: true } : t
  );
}

function tareasPendientes(tareas) {
  return tareas.filter(t => !t.completada);
}`,tests:[`typeof agregarTarea === 'function'`,`typeof completarTarea === 'function'`,`typeof tareasPendientes === 'function'`]},{id:55,module:`DOM y Eventos`,title:`Mini-app de notas con persistencia`,theory:`En esta lección aprenderás a crear, agregar y eliminar elementos del DOM usando **createElement**, **appendChild** y **remove**. Construiremos una mini-app de notas donde cada nota es un elemento \`div\` con un párrafo y un botón para eliminarla.

También veremos el patrón de **persistencia con localStorage**:

\`\`\`js
localStorage.setItem('notas', JSON.stringify(misNotas));
const notas = JSON.parse(localStorage.getItem('notas'));
\`\`\`

**JSON.stringify** convierte un array/objeto a string JSON. **JSON.parse** hace la operación inversa. Este patrón permite mantener datos entre sesiones del navegador.`,exercise:"Crea las siguientes funciones:\n- `crearNota(texto)` — retorna un elemento `<div class=\"nota\"><p>texto</p><button>Eliminar</button></div>` usando createElement y textContent.\n- `guardarNotas(notas)` — guarda el array de notas en localStorage bajo la clave 'notas' usando JSON.stringify.\n- `cargarNotas()` — lee y parsea desde localStorage; si no hay datos o hay error, retorna `[]`.",solution:`function crearNota(texto) {
  const div = document.createElement('div');
  div.className = 'nota';
  const p = document.createElement('p');
  p.textContent = texto;
  const btn = document.createElement('button');
  btn.textContent = 'Eliminar';
  div.appendChild(p);
  div.appendChild(btn);
  return div;
}

function guardarNotas(notas) {
  localStorage.setItem('notas', JSON.stringify(notas));
}

function cargarNotas() {
  try {
    const data = localStorage.getItem('notas');
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}`,tests:[`typeof crearNota === 'function'`,`typeof guardarNotas === 'function'`,`typeof cargarNotas === 'function'`]},{id:56,module:`Asincronía`,title:`Buscador de películas con API`,theory:`Las APIs web se consumen con **fetch** y la sintaxis **async/await**. Permite escribir código asíncrono que se lee como si fuera síncrono.

\`\`\`js
async function buscarDatos(url) {
  const respuesta = await fetch(url);
  const datos = await respuesta.json();
  return datos;
}
\`\`\`

Para simular una API usaremos **setTimeout** dentro de una Promise, el mecanismo base de toda operación asíncrona. El filtrado se hace con **filter** e **includes** para búsqueda case-insensitive.`,exercise:`Crea una función asíncrona \`buscarPeliculas(termino)\` que:
- Espere 100ms usando setTimeout envuelto en una Promise.
- Retorne resultados mock: \`[{titulo:'El Padrino', anio:1972, genero:'Drama'}, {titulo:'Inception', anio:2010, genero:'Ciencia Ficcion'}, {titulo:'Matrix', anio:1999, genero:'Ciencia Ficcion'}]\`.
- Filtre por término (case-insensitive includes en titulo).
- Si no hay resultados, retorne 'Sin resultados'.
- Use async/await.`,solution:`const peliculas = [
  { titulo: 'El Padrino', anio: 1972, genero: 'Drama' },
  { titulo: 'Inception', anio: 2010, genero: 'Ciencia Ficcion' },
  { titulo: 'Matrix', anio: 1999, genero: 'Ciencia Ficcion' }
];

async function buscarPeliculas(termino) {
  await new Promise(resolve => setTimeout(resolve, 100));
  const filtradas = peliculas.filter(p =>
    p.titulo.toLowerCase().includes(termino.toLowerCase())
  );
  return filtradas.length > 0 ? filtradas : 'Sin resultados';
}`,tests:[`typeof buscarPeliculas === 'function'`,`typeof buscarPeliculas('test').then === 'function'`]},{id:57,module:`Programación Avanzada`,title:`Simulador de tienda con Observer`,theory:`El **patrón Observer** permite que objetos se suscriban a eventos y reaccionen cuando ocurren. Es ideal para desacoplar componentes: el carrito emite eventos y la interfaz se actualiza sin conocer los detalles internos.

\`\`\`js
class EventEmitter {
  constructor() { this.eventos = {}; }
  on(e, cb) { if (!this.eventos[e]) this.eventos[e] = []; this.eventos[e].push(cb); }
  emit(e, ...args) { const cbs = this.eventos[e]; if (cbs) cbs.forEach(cb => cb(...args)); }
  off(e, cb) { if (!this.eventos[e]) return; this.eventos[e] = this.eventos[e].filter(f => f !== cb); }
}
\`\`\`

Este patrón desacopla los componentes: el carrito emite 'actualizar' y la UI responde automáticamente.`,exercise:"Crea una clase `EventEmitter` con `on`, `emit`, `off`. Luego crea una clase `CarritoObserver` que contenga un EventEmitter interno y tenga: `items = []`, `agregarProducto(producto)` (agrega y emite 'actualizar'), `quitarProducto(id)` (elimina por id y emite), `obtenerItems()` (retorna items), `total()` (suma de precios con reduce).",solution:`class EventEmitter {
  constructor() { this.eventos = {}; }
  on(evento, callback) { if (!this.eventos[evento]) this.eventos[evento] = []; this.eventos[evento].push(callback); }
  emit(evento, ...args) { const cbs = this.eventos[evento]; if (cbs) cbs.forEach(cb => cb(...args)); }
  off(evento, callback) { if (!this.eventos[evento]) return; this.eventos[evento] = this.eventos[evento].filter(cb => cb !== callback); }
}

class CarritoObserver {
  constructor() { this.items = []; this.emitter = new EventEmitter(); }
  agregarProducto(producto) { this.items.push(producto); this.emitter.emit('actualizar'); }
  quitarProducto(id) { this.items = this.items.filter(p => p.id !== id); this.emitter.emit('actualizar'); }
  obtenerItems() { return this.items; }
  total() { return this.items.reduce((sum, p) => sum + p.precio, 0); }
}`,tests:[`typeof CarritoObserver === 'function'`,`typeof EventEmitter === 'function'`]},{id:58,module:`Optimización y Buenas Prácticas`,title:`Analizador de rendimiento de arrays`,theory:`Diferentes métodos de array tienen distinto rendimiento. Compararemos **for clásico**, **forEach**, **map**, **filter** y **reduce**.

\`\`\`js
console.time('medicion');
for (let i = 0; i < arr.length; i++) { suma += arr[i]; }
console.timeEnd('medicion');
\`\`\`

**Notación Big O**:
- \`O(1)\` — acceso por índice
- \`O(n)\` — recorrido lineal (for, forEach, filter, map, reduce)
- \`O(n²)\` — bucles anidados

**console.time** y **console.timeEnd** permiten medir duración de operaciones para tomar decisiones informadas.`,exercise:"Crea las siguientes funciones:\n- `medirTiempo(fn, arr)` — ejecuta fn(arr) envuelto en console.time/console.timeEnd('medicion'), retorna el resultado.\n- `sumaFor(arr)` — suma elementos con bucle for clásico.\n- `sumaReduce(arr)` — suma elementos con reduce.\n- `filtrarYTransformar(arr)` — filtra números pares mayores a 10 y los duplica con map.",solution:`function medirTiempo(fn, arr) {
  console.time('medicion');
  const resultado = fn(arr);
  console.timeEnd('medicion');
  return resultado;
}

function sumaFor(arr) {
  let suma = 0;
  for (let i = 0; i < arr.length; i++) {
    suma += arr[i];
  }
  return suma;
}

function sumaReduce(arr) {
  return arr.reduce((acc, n) => acc + n, 0);
}

function filtrarYTransformar(arr) {
  return arr.filter(n => n % 2 === 0 && n > 10).map(n => n * 2);
}`,tests:[`typeof medirTiempo === 'function'`,`typeof sumaFor === 'function'`,`typeof sumaReduce === 'function'`,`typeof filtrarYTransformar === 'function'`]}],t={LESSON_LIST:`lesson-list`,THEORY_AREA:`theory-area`,EXERCISE_AREA:`exercise-area`,EXERCISE_TITLE:`exercise-title`,EXERCISE_DESC:`exercise-desc`,EDITOR:`editor`,EDITOR_LOADING:`editor-loading`,RUN_BTN:`run-btn`,RESET_BTN:`reset-btn`,RESULT_AREA:`result-area`,RESULT_MSG:`result-msg`,RESULT_OUTPUT:`result-output`,SOLUTION_BTN:`solution-btn`,RESET_PROGRESS_BTN:`reset-progress-btn`,SEARCH_INPUT:`search-input`,THEME_TOGGLE:`theme-toggle`,MENU_TOGGLE:`menu-toggle`,SIDEBAR:`sidebar`,SIDEBAR_OVERLAY:`sidebar-overlay`,NEXT_LESSON_BTN:`next-lesson-btn`},n={LESSON_LIST_ITEM:`.lesson-list li`,MODULE_HEADER:`sidebar__header`,COMPLETED:`completed`,ACTIVE:`active`,HIDDEN:`hidden`,SUCCESS:`success`,ERROR:`error`,INFO:`info`,OPEN:`open`,CONTENT:`.content`};function r(e){return document.getElementById(e)}function i(){return document.querySelectorAll(n.LESSON_LIST_ITEM)}function a(e,i){let a=r(t.RESULT_AREA),o=r(t.RESULT_MSG);if(!a||!o)return;a.classList.remove(n.HIDDEN,n.SUCCESS,n.ERROR,n.INFO);let s=document.getElementById(t.NEXT_LESSON_BTN);if(s&&s.remove(),e.status===`success`){if(a.classList.add(n.SUCCESS),o.textContent=e.message,e.nextLessonId&&i){let n=document.createElement(`button`);n.id=t.NEXT_LESSON_BTN,n.className=`btn btn-next`,n.textContent=`Siguiente lección →`,n.setAttribute(`aria-label`,`Ir a la siguiente lección`),n.addEventListener(`click`,()=>i(e.nextLessonId)),a.appendChild(n)}}else e.status===`error`?(a.classList.add(n.ERROR),o.textContent=e.message):e.status===`info`?(a.classList.add(n.INFO),o.textContent=e.message):a.classList.add(n.HIDDEN)}function o(e){return e.replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`)}function s(e){return o(e).replace(/`([^`]+)`/g,`<code>$1</code>`).replace(/\*\*([^*]+)\*\*/g,`<strong>$1</strong>`).replace(/\[([^\]]+)\]\(([^)]+)\)/g,`<a href="$2" target="_blank" rel="noopener">$1</a>`)}function c(e){return`<p>${s(e).replace(/\n/g,`<br>`)}</p>`}function l(e){return`<ul>${e.map(e=>`<li>${s(e.replace(/^-\s+/,``))}</li>`).join(``)}</ul>`}function u(e){let t=e.split(/(```[\s\S]*?```)/g),n=[];for(let e of t)if(e.startsWith("```")){let t=e.replace(/```\w*\n?/,``).replace(/```$/,``);n.push(`<pre><code>${o(t)}</code></pre>`)}else{let t=e.split(`
`),r=0,i=[],a=!1;for(;r<t.length;){let e=t[r];if(e.trim()===``){a&&=(n.push(l(i)),i.length=0,!1),r++;continue}if(/^-\s+/.test(e)){i.push(e),a=!0,r++;continue}a&&=(n.push(l(i)),i.length=0,!1),n.push(c(e)),r++}a&&n.push(l(i))}return n.join(``)}var d=`aprendojs_progress`,f=`aprendojs_code_`;function p(){try{let e=localStorage.getItem(d);if(!e)return[];let t=JSON.parse(e);return Array.isArray(t)?t.filter(e=>typeof e==`number`&&Number.isInteger(e)&&e>0):[]}catch{return[]}}function m(e){localStorage.setItem(d,JSON.stringify(e))}function h(e,t=10240){try{let n=localStorage.getItem(f+e)||``;return n.length>t?n.slice(0,t):n}catch{return``}}function g(e,t){try{localStorage.setItem(f+e,t)}catch{}}function _(e){try{localStorage.removeItem(f+e)}catch{}}var v=`aprendojs_theme`;function y(e){document.documentElement.setAttribute(`data-theme`,e),localStorage.setItem(v,e);let t=document.getElementById(`theme-toggle`);t&&(t.textContent=e===`dark`?`☀️`:`🌙`)}function b(){let e=localStorage.getItem(v);if(e===`dark`||e===`light`){y(e);return}window.matchMedia(`(prefers-color-scheme: dark)`).matches&&y(`dark`)}function x(e,t,n){let r=document.getElementById(e);if(!r)return null;let i=document.getElementById(`editor-loading`);i&&(i.style.display=`none`);let a={"Ctrl-Space":`autocomplete`};n&&(a[`Ctrl-Enter`]=n);let o=CodeMirror.fromTextArea(r,{mode:`javascript`,lineNumbers:!0,indentUnit:2,autofocus:!0,extraKeys:a,hintOptions:{completeSingle:!1}});return o.on(`inputRead`,(e,t)=>{let n=t;if(n.origin!==`complete`&&n.text.length===1){let t=n.text[0];/[a-zA-Z0-9._$]/.test(t)&&e.showHint({completeSingle:!1})}}),o.on(`change`,()=>t(o)),o}var S=[],C=null,w=null,T=new Set,E=r(t.THEORY_AREA),D=r(t.EXERCISE_AREA),O=r(t.EXERCISE_TITLE),k=r(t.EXERCISE_DESC),A=r(t.RESULT_OUTPUT);function j(e){T.add(e),m(Array.from(T)),P(e)}var M=r(t.LESSON_LIST);M&&(S=e,T=new Set(p()),N());function N(){if(!M)return;M.innerHTML=``;let e={};S.forEach(t=>{let n=t.module||`General`;e[n]||(e[n]=[]),e[n].push(t)}),Object.entries(e).forEach(([e,t])=>{let r=document.createElement(`li`);r.className=n.MODULE_HEADER,r.textContent=e,r.setAttribute(`role`,`treeitem`),r.setAttribute(`aria-level`,`1`),M.appendChild(r),t.forEach(t=>{let r=document.createElement(`li`);r.textContent=t.title,r.dataset.id=String(t.id),r.setAttribute(`role`,`treeitem`),r.setAttribute(`aria-label`,`${e}: ${t.title}`),r.setAttribute(`tabindex`,`0`),T.has(t.id)&&r.classList.add(n.COMPLETED),r.addEventListener(`click`,()=>F(t.id)),r.addEventListener(`keydown`,e=>{(e.key===`Enter`||e.key===` `)&&(e.preventDefault(),F(t.id))}),M.appendChild(r)})})}function P(e){i().forEach(t=>{Number(t.dataset.id)===e&&t.classList.add(n.COMPLETED)})}function F(e){let a=S.find(t=>t.id===e);if(a){if(C=a,i().forEach(t=>{let r=Number(t.dataset.id)===e;t.classList.toggle(n.ACTIVE,r),r?t.setAttribute(`aria-current`,`true`):t.removeAttribute(`aria-current`)}),D?.classList.remove(n.HIDDEN),r(t.RESULT_AREA)?.classList.add(n.HIDDEN),E&&(E.classList.remove(n.HIDDEN),E.innerHTML=u(a.theory)),O&&(O.textContent=a.title),k&&(k.textContent=a.exercise),w){let e=h(a.id);w.setValue(e),w.focus()}requestAnimationFrame(()=>{document.querySelector(n.CONTENT)?.scrollTo(0,0)})}}var I=null;function L(){w=x(t.EDITOR,e=>{C&&(I&&clearTimeout(I),I=window.setTimeout(()=>{g(C.id,e.getValue())},500))},z)}function R(e){let t=S.findIndex(t=>t.id===e);return t===-1||t>=S.length-1?null:S[t+1].id}async function z(){if(!C||!w)return;let e=w.getValue().trim();if(!e){a({status:`error`,message:`Escribe algo de código antes de ejecutar.`},F);return}a({status:`info`,message:`Ejecutando...`},F);let t=await H(e,C.tests);if(t.passed){j(C.id);let e=R(C.id);a({status:`success`,message:e?`¡Correcto! Todos los tests pasaron.`:`🎉 ¡Felicidades! Completaste todas las lecciones.`,nextLessonId:e??void 0},F)}else{let e=t.failedIndex;a({status:`error`,message:e!==null&&C.tests[e]?`Test ${e+1} falló: \`${V(C.tests[e])}\``:`Algo no está bien. Revisa tu código e inténtalo de nuevo.`},F)}A&&(A.textContent=t.logs.length>0?t.logs.join(`
`):``)}function B(e){return typeof e==`string`?e:e.type===`function`&&e.expected!==void 0?`(${e.code}) === ${JSON.stringify(e.expected)}`:e.code}function V(e){return typeof e==`string`?e:e.code}function H(e,t){return new Promise(n=>{try{let r=new Worker(new URL(`/AprendoJS/assets/sandbox.worker-D0rJojYN.js`,``+import.meta.url),{type:`module`}),i=setTimeout(()=>{r.terminate(),n({passed:!1,failedIndex:null,logs:[`La ejecución tomó demasiado tiempo y fue cancelada.`]})},3e3);r.onmessage=e=>{clearTimeout(i),r.terminate(),n(e.data)},r.onerror=e=>{clearTimeout(i),r.terminate(),n({passed:!1,failedIndex:null,logs:[`Error en el Worker: `+e.message]})},r.postMessage({userCode:e,testExpressions:t.map(e=>B(e))})}catch{n({passed:!1,failedIndex:null,logs:[`Error al iniciar el Worker.`]})}})}var U=r(t.RUN_BTN);U&&U.addEventListener(`click`,z);var W=r(t.RESET_BTN);r(t.EDITOR),W&&W.addEventListener(`click`,()=>{C&&(w?.setValue(``),_(C.id),r(t.RESULT_AREA)?.classList.add(n.HIDDEN),A&&(A.textContent=``),w?.focus())});var G=r(t.SOLUTION_BTN);G&&G.addEventListener(`click`,()=>{!C||!w||(w.setValue(C.solution),g(C.id,C.solution),a({status:`info`,message:`Solución cargada. Intenta entender cómo funciona.`},F))});var K=r(t.RESET_PROGRESS_BTN);K&&K.addEventListener(`click`,()=>{m([]),T=new Set,i().forEach(e=>e.classList.remove(n.COMPLETED)),a({status:`idle`})});var q=r(t.THEME_TOGGLE);q&&q.addEventListener(`click`,()=>{y(document.documentElement.getAttribute(`data-theme`)===`dark`?`light`:`dark`)}),b();var J=r(t.SEARCH_INPUT);J&&J.addEventListener(`input`,()=>{let e=J.value.toLowerCase().trim(),t=i();t.forEach(t=>{if(t.classList.contains(n.MODULE_HEADER)){t.style.display=``;return}if(!e){t.style.display=``;return}let r=t.textContent?.toLowerCase()||``;t.style.display=r.includes(e)?``:`none`}),t.forEach(e=>{if(e.classList.contains(n.MODULE_HEADER))e.style.display=`none`;else if(e.style.display!==`none`){let t=e.previousElementSibling;t?.classList.contains(n.MODULE_HEADER)&&(t.style.display=``)}})});var Y=r(t.MENU_TOGGLE),X=r(t.SIDEBAR),Z=r(t.SIDEBAR_OVERLAY);function Q(e){if(!Y||!X)return;let t=e??!X.classList.contains(n.OPEN);X.classList.toggle(n.OPEN,t),Y.classList.toggle(n.OPEN,t),Y.setAttribute(`aria-expanded`,String(t)),Y.setAttribute(`aria-label`,t?`Cerrar menú de lecciones`:`Abrir menú de lecciones`),Z&&Z.classList.toggle(`active`,t)}Y&&Y.addEventListener(`click`,()=>Q()),Z&&Z.addEventListener(`click`,()=>Q(!1)),M&&M.addEventListener(`click`,()=>{window.innerWidth<=768&&Q(!1)}),document.addEventListener(`DOMContentLoaded`,L);
//# sourceMappingURL=index-CgZzw3f-.js.map