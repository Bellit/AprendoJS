function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function renderInline(text: string): string {
  const escaped = escapeHtml(text);
  return escaped
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
}

function renderParagraph(text: string): string {
  return `<p>${renderInline(text).replace(/\n/g, '<br>')}</p>`;
}

function renderList(lines: string[]): string {
  const items = lines.map(l => `<li>${renderInline(l.replace(/^-\s+/, ''))}</li>`).join('');
  return `<ul>${items}</ul>`;
}

export function renderTheory(text: string): string {
  const parts = text.split(/(```[\s\S]*?```)/g);
  const result: string[] = [];

  for (const part of parts) {
    if (part.startsWith('```')) {
      const code = part.replace(/```\w*\n?/, '').replace(/```$/, '');
      result.push(`<pre><code>${escapeHtml(code)}</code></pre>`);
    } else {
      const lines = part.split('\n');
      let i = 0;
      const blockLines: string[] = [];
      let inList = false;

      while (i < lines.length) {
        const line = lines[i];

        if (line.trim() === '') {
          if (inList) {
            result.push(renderList(blockLines));
            blockLines.length = 0;
            inList = false;
          }
          i++;
          continue;
        }

        if (/^-\s+/.test(line)) {
          blockLines.push(line);
          inList = true;
          i++;
          continue;
        }

        if (inList) {
          result.push(renderList(blockLines));
          blockLines.length = 0;
          inList = false;
        }

        result.push(renderParagraph(line));
        i++;
      }

      if (inList) {
        result.push(renderList(blockLines));
      }
    }
  }

  return result.join('');
}
