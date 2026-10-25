'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useLanguage } from '@/components/providers/language-provider';
import { cn } from '@/lib/utils';

export interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();
  const { t } = useLanguage();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        type="button"
        aria-label="Toggle theme"
        className={cn(
          'p-2.5 rounded-xl border border-border bg-card text-foreground opacity-60 shadow-sm flex items-center justify-center',
          className
        )}
      >
        <span className="h-5 w-5 block" />
      </button>
    );
  }

  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={isDark ? t('theme.switchToLight') : t('theme.switchToDark')}
      title={isDark ? t('theme.switchToLight') : t('theme.switchToDark')}
      className={cn(
        'p-2.5 rounded-xl border border-border bg-card hover:bg-muted text-foreground transition-all duration-200 shadow-sm flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring group',
        className
      )}
    >
      {isDark ? (
        <Sun className="h-5 w-5 text-amber-400 transition-transform duration-200 group-hover:rotate-45" />
      ) : (
        <Moon className="h-5 w-5 text-foreground transition-transform duration-200 group-hover:-rotate-12" />
      )}
    </button>
  );
}
