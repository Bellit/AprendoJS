/// <reference types="vite/client" />

declare namespace CodeMirror {
  interface EditorConfiguration {
    mode?: string | { name: string };
    lineNumbers?: boolean;
    theme?: string;
    indentUnit?: number;
    autofocus?: boolean;
    extraKeys?: Record<string, (() => void) | string>;
    value?: string;
    hintOptions?: HintOptions;
  }

  interface Editor {
    getValue(): string;
    setValue(value: string): void;
    focus(): void;
    refresh(): void;
    lineCount(): number;
    getOption(option: string): unknown;
    setOption(option: string, value: unknown): void;
    on(event: string, callback: (...args: unknown[]) => void): void;
    off(event: string, callback: (...args: unknown[]) => void): void;
    showHint(options?: { completeSingle?: boolean }): void;
    addLineClass(line: number, where: string, cls: string): void;
    removeLineClass(line: number, where: string, cls: string): void;
  }

  interface EditorChange {
    origin?: string;
    text: string[];
    removed?: string[];
    from?: { line: number; ch: number };
    to?: { line: number; ch: number };
  }

  interface HintOptions {
    completeSingle?: boolean;
  }

  function fromTextArea(
    textArea: HTMLTextAreaElement,
    config?: EditorConfiguration
  ): Editor;

  let version: string;
}
