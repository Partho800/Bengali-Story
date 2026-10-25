'use client';

import * as React from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/context';

export function LanguageToggle({ className = '' }: { className?: string }) {
  const { toggleLocale, isBn } = useLanguage();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        type="button"
        aria-label="Toggle language"
        className={`px-3 py-1.5 rounded-xl border border-border bg-card text-foreground opacity-60 text-xs font-semibold flex items-center gap-1.5 ${className}`}
      >
        <Globe className="w-4 h-4 text-muted-foreground" />
        <span>বাং / EN</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleLocale}
      aria-label="Toggle language between Bengali and English"
      className={`px-3 py-1.5 rounded-xl border border-border bg-card hover:bg-muted text-foreground transition-all duration-200 shadow-sm flex items-center gap-2 group ${className}`}
      title={isBn ? 'Switch to English (ইংরেজি করুন)' : 'বাংলায় পরিবর্তন করুন (Switch to Bengali)'}
    >
      <Globe className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
      <div className="flex items-center text-xs font-bold font-outfit tracking-wider">
        <span
          className={`px-1.5 py-0.5 rounded transition-all ${
            isBn
              ? 'bg-primary text-primary-foreground font-bengali font-bold'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          বাং
        </span>
        <span className="text-muted-foreground/40 mx-0.5">/</span>
        <span
          className={`px-1.5 py-0.5 rounded transition-all ${
            !isBn
              ? 'bg-primary text-primary-foreground font-outfit font-bold'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          EN
        </span>
      </div>
    </button>
  );
}
