export interface ParsedError {
  message: string;
  line?: number;
}

export function parseError(err: unknown): ParsedError {
  let message = 'Error de ejecución';
  if (err instanceof SyntaxError) message = 'Error de sintaxis';
  else if (err instanceof ReferenceError) message = 'Error de referencia: variable no definida';
  else if (err instanceof TypeError) message = 'Error de tipo';
  else if (err instanceof RangeError) message = 'Error de rango';

  let line: number | undefined;
  if (err instanceof Error && err.stack) {
    const lines = err.stack.split('\n');
    for (const stackLine of lines) {
      const match = stackLine.match(/:(\d+):\d+/);
      if (match) {
        const lineNum = parseInt(match[1], 10) - 1;
        if (lineNum > 0) {
          line = lineNum;
          message += ` en línea ${lineNum}`;
        }
        break;
      }
    }
  }

  return { message, line };
}
