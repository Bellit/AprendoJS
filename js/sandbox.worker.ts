import { parseError } from './errors';

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
    const parsed = parseError(err);
    logs.push(parsed.message);
    self.postMessage({ type: 'result', passed: false, failedIndex: null, logs, errorLine: parsed.line });
  } finally {
    console.log = originalLog;
  }
};
