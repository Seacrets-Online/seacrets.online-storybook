import '@testing-library/jest-dom/vitest';
import './style-dictionary-dist/theme.css';

if (typeof document !== 'undefined') {
  document.documentElement.setAttribute('data-theme', 'light');
}
