self.onmessage = (e: MessageEvent) => {
  const { userCode, testExpressions } = e.data as { userCode: string; testExpressions: string[] };

  const logs: string[] = [];
  const originalLog = console.log;
  console.log = (...args: unknown[]) => {
    logs.push(args.map(String).join(' '));
  };

  try {
    const testCode = testExpressions.map((t, i) => `if (!(${t})) { return ${i}; }`).join(' ') + '; return -1;';
    const fn = new Function(userCode + ';' + testCode);
    const failedIndex = fn();

    self.postMessage({
      type: 'result',
      passed: failedIndex === -1,
      failedIndex: failedIndex === -1 ? null : failedIndex,
      logs,
    });
  } catch (err) {
    let msg = 'Error de ejecución';
    if (err instanceof SyntaxError) msg = 'Error de sintaxis';
    else if (err instanceof ReferenceError) msg = 'Error de referencia: variable no definida';
    else if (err instanceof TypeError) msg = 'Error de tipo';
    else if (err instanceof RangeError) msg = 'Error de rango';

    if (err instanceof Error && err.stack) {
      const lines = err.stack.split('\n');
      for (const line of lines) {
        const match = line.match(/:(\d+):\d+/);
        if (match) {
          const lineNum = parseInt(match[1], 10) - 1;
          if (lineNum > 0) {
            msg += ` en línea ${lineNum}`;
          }
          break;
        }
      }
    }
    logs.push(msg);
    self.postMessage({ type: 'result', passed: false, failedIndex: null, logs });
  } finally {
    console.log = originalLog;
  }
};
