'use client';

import * as React from 'react';
import { Locale, translations } from './translations';

export const LOCALE_STORAGE_KEY = 'bengali_story_admin_locale';
export const LOCALE_COOKIE_NAME = 'bengali_story_admin_locale';

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  isBn: boolean;
  isEn: boolean;
  t: (path: string, fallback?: string) => string;
}

const LanguageContext = React.createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({
  children,
  defaultLocale = 'bn',
}: {
  children: React.ReactNode;
  defaultLocale?: Locale;
}) {
  const [locale, setLocaleState] = React.useState<Locale>(defaultLocale);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    try {
      const savedLocale = localStorage.getItem(LOCALE_STORAGE_KEY) as Locale | null;
      if (savedLocale === 'bn' || savedLocale === 'en') {
        setLocaleState(savedLocale);
        document.documentElement.lang = savedLocale;
      }
    } catch {
      // Ignore
    } finally {
      setMounted(true);
    }
  }, []);

  const setLocale = React.useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    try {
      localStorage.setItem(LOCALE_STORAGE_KEY, newLocale);
      document.cookie = `${LOCALE_COOKIE_NAME}=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
      document.documentElement.lang = newLocale;
    } catch {
      // Ignore
    }
  }, []);

  const toggleLocale = React.useCallback(() => {
    setLocale(locale === 'bn' ? 'en' : 'bn');
  }, [locale, setLocale]);

  const t = React.useCallback(
    (path: string, fallback?: string): string => {
      const keys = path.split('.');
      let current: any = translations[locale];

      for (const key of keys) {
        if (current && typeof current === 'object' && key in current) {
          current = current[key];
        } else {
          return fallback || path;
        }
      }

      return typeof current === 'string' ? current : fallback || path;
    },
    [locale]
  );

  const value = React.useMemo(
    () => ({
      locale,
      setLocale,
      toggleLocale,
      isBn: locale === 'bn',
      isEn: locale === 'en',
      t,
    }),
    [locale, setLocale, toggleLocale, t]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = React.useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
