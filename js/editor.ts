import { CSS_CLASSES } from './constants';

type ChangeCallback = (cm: CodeMirror.Editor) => void;

let editorInstance: CodeMirror.Editor | null = null;

export function syncEditorTheme(): void {
  if (editorInstance) {
    editorInstance.refresh();
  }
}

export function clearErrorHighlights(): void {
  if (!editorInstance) return;
  const lineCount = editorInstance.lineCount();
  for (let i = 0; i < lineCount; i++) {
    editorInstance.removeLineClass(i, 'background', CSS_CLASSES.ERROR_LINE);
  }
}

export function highlightErrorLine(lineNum: number): void {
  clearErrorHighlights();
  if (!editorInstance) return;
  const line = Math.max(0, Math.min(lineNum - 1, editorInstance.lineCount() - 1));
  editorInstance.addLineClass(line, 'background', CSS_CLASSES.ERROR_LINE);
}

export function initEditor(
  textareaId: string,
  onChange: ChangeCallback,
  onRun?: () => void
): CodeMirror.Editor | null {
  const editorEl = document.getElementById(textareaId) as HTMLTextAreaElement | null;
  if (!editorEl) return null;

  const loadingEl = document.getElementById('editor-loading');
  if (loadingEl) loadingEl.style.display = 'none';

  const extraKeys: Record<string, string | (() => void)> = {
    'Ctrl-Space': 'autocomplete',
  };
  if (onRun) {
    extraKeys['Ctrl-Enter'] = onRun;
  }

  editorInstance = CodeMirror.fromTextArea(editorEl, {
    mode: 'javascript',
    lineNumbers: true,
    indentUnit: 2,
    autofocus: true,
    extraKeys,
    hintOptions: {
      completeSingle: false,
    },
  });
  const editor = editorInstance;

  editor.on('inputRead', (_cm: unknown, change: unknown) => {
    const ch = change as CodeMirror.EditorChange;
    if (ch.origin !== 'complete' && ch.text.length === 1) {
      const char = ch.text[0];
      if (/[a-zA-Z0-9._$]/.test(char)) {
        (_cm as CodeMirror.Editor).showHint({ completeSingle: false });
      }
    }
  });

  editor.on('change', () => onChange(editor));

  return editor;
}
