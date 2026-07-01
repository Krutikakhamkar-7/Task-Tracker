import { useEffect, useState } from 'react';

/**
 * Manages dark mode state, persists preference in memory for the session,
 * and toggles the `dark` class on the document root (used by Tailwind's
 * `darkMode: 'class'` strategy).
 */
const useDarkMode = () => {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDark]);

  const toggleDarkMode = () => setIsDark((prev) => !prev);

  return { isDark, toggleDarkMode };
};

export default useDarkMode;
