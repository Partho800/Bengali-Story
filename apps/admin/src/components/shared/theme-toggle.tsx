'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

export function ThemeToggle({ className = '' }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        type="button"
        aria-label="Toggle theme"
        className={`p-2 rounded-lg border border-border bg-card text-foreground opacity-60 ${className}`}
      >
        <span className="w-5 h-5 block" />
      </button>
    );
  }

  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label="Toggle theme"
      className={`p-2.5 rounded-xl border border-border bg-card hover:bg-muted text-foreground transition-all duration-200 shadow-sm flex items-center justify-center ${className}`}
      title={isDark ? 'লাইট মোডে পরিবর্তন করুন (Switch to Light Mode)' : 'ডার্ক মোডে পরিবর্তন করুন (Switch to Dark Mode)'}
    >
      {isDark ? (
        <Sun className="h-5 w-5 text-amber-400 transition-transform hover:rotate-45" />
      ) : (
        <Moon className="h-5 w-5 text-foreground transition-transform hover:-rotate-12" />
      )}
    </button>
  );
}
