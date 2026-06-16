type ChangeCallback = (cm: CodeMirror.Editor) => void;

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

  const editor = CodeMirror.fromTextArea(editorEl, {
    mode: 'javascript',
    lineNumbers: true,
    indentUnit: 2,
    autofocus: true,
    extraKeys,
    hintOptions: {
      completeSingle: false,
    },
  });

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
