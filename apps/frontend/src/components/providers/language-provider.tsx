'use client';

import * as React from 'react';
import { Locale } from '@/lib/i18n/translations';
import {
  DEFAULT_LOCALE,
  getClientStoredLocale,
  persistLocale,
  translate,
  isValidLocale,
  LOCALE_STORAGE_KEY,
  LOCALE_COOKIE_NAME,
} from '@/lib/i18n/utils';

export interface LanguageContextType {
  locale: Locale;
  setLocale: (newLocale: Locale) => void;
  toggleLocale: () => void;
  isBn: boolean;
  isEn: boolean;
  t: (
    path: string,
    fallback?: string,
    params?: Record<string, string | number>
  ) => string;
}

const LanguageContext = React.createContext<LanguageContextType | undefined>(
  undefined
);

export interface LanguageProviderProps {
  children: React.ReactNode;
  initialLocale?: Locale;
}

export function LanguageProvider({
  children,
  initialLocale = DEFAULT_LOCALE,
}: LanguageProviderProps) {
  // Initialize with initialLocale (passed from server cookie or default) to avoid SSR hydration mismatch
  const [locale, setLocaleState] = React.useState<Locale>(initialLocale);
  const [mounted, setMounted] = React.useState(false);

  // After mount, verify if localStorage or client cookie has a user preference
  React.useEffect(() => {
    setMounted(true);
    const stored = getClientStoredLocale();
    setLocaleState((current) => (stored !== current ? stored : current));
    document.documentElement.lang = stored;
  }, []);

  const setLocale = React.useCallback((newLocale: Locale) => {
    if (!isValidLocale(newLocale)) return;
    setLocaleState(newLocale);
    persistLocale(newLocale);
  }, []);

  const toggleLocale = React.useCallback(() => {
    const next: Locale = locale === 'bn' ? 'en' : 'bn';
    setLocale(next);
  }, [locale, setLocale]);

  const t = React.useCallback(
    (
      path: string,
      fallback?: string,
      params?: Record<string, string | number>
    ): string => {
      return translate(locale, path, fallback, params);
    },
    [locale]
  );

  const value = React.useMemo<LanguageContextType>(
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

export function useLanguage(): LanguageContextType {
  const context = React.useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
