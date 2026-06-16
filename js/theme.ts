const THEME_KEY = 'aprendojs_theme';

export function setTheme(theme: 'dark' | 'light'): void {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem(THEME_KEY, theme);
  const toggle = document.getElementById('theme-toggle');
  if (toggle) {
    toggle.textContent = theme === 'dark' ? '☀️' : '🌙';
  }
}

export function loadTheme(): void {
  const saved = localStorage.getItem(THEME_KEY);
  if (saved === 'dark' || saved === 'light') {
    setTheme(saved);
    return;
  }
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    setTheme('dark');
  }
}
