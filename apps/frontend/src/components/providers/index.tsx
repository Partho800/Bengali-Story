'use client';

import * as React from 'react';
import { ThemeProvider } from './theme-provider';
import { QueryProvider } from './query-provider';
import { LanguageProvider } from './language-provider';
import { AuthProvider } from './auth-provider';
import { Toaster } from '@/components/ui/sonner';
import { Locale } from '@/lib/i18n/translations';
import { DEFAULT_LOCALE } from '@/lib/i18n/utils';

export interface ProvidersProps {
  children: React.ReactNode;
  initialLocale?: Locale;
}

export function Providers({
  children,
  initialLocale = DEFAULT_LOCALE,
}: ProvidersProps) {
  return (
    <QueryProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem={false}
        disableTransitionOnChange
        themes={['light', 'dark']}
      >
        <LanguageProvider initialLocale={initialLocale}>
          <AuthProvider>
            {children}
            <Toaster position="top-right" closeButton richColors={false} />
          </AuthProvider>
        </LanguageProvider>
      </ThemeProvider>
    </QueryProvider>
  );
}

export { ThemeProvider } from './theme-provider';
export { QueryProvider } from './query-provider';
export { LanguageProvider, useLanguage } from './language-provider';
export { AuthProvider, useAuth } from './auth-provider';
