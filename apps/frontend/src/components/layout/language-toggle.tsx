'use client';

import * as React from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '@/components/providers/language-provider';
import { cn } from '@/lib/utils';

export interface LanguageToggleProps {
  className?: string;
  variant?: 'pill' | 'button';
}

export function LanguageToggle({
  className,
  variant = 'pill',
}: LanguageToggleProps) {
  const { toggleLocale, isBn, isEn } = useLanguage();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        type="button"
        aria-label="Toggle language"
        className={cn(
          'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border bg-card text-foreground opacity-60 text-xs font-semibold',
          className
        )}
      >
        <Globe className="h-4 w-4 text-muted-foreground" />
        <span>বাং / EN</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleLocale}
      aria-label="Toggle language between Bengali and English"
      title={
        isBn
          ? 'Switch to English (ইংরেজি করুন)'
          : 'বাংলায় পরিবর্তন করুন (Switch to Bengali)'
      }
      className={cn(
        'group inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-border bg-card hover:bg-muted text-foreground transition-all duration-200 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        className
      )}
    >
      <Globe className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />

      {/* Pill Toggle Indicator */}
      <div className="flex items-center text-xs font-bold font-outfit tracking-wider">
        <span
          className={cn(
            'px-1.5 py-0.5 rounded transition-all',
            isBn
              ? 'bg-primary text-primary-foreground font-bengali font-bold'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          বাং
        </span>
        <span className="text-muted-foreground/40 mx-0.5">/</span>
        <span
          className={cn(
            'px-1.5 py-0.5 rounded transition-all',
            isEn
              ? 'bg-primary text-primary-foreground font-outfit font-bold'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          EN
        </span>
      </div>
    </button>
  );
}
