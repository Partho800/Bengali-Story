'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import type { ThemeProviderProps } from 'next-themes/dist/types';

export function ThemeProvider({
  children,
  attribute = 'class',
  defaultTheme = 'light',
  enableSystem = false,
  disableTransitionOnChange = true,
  themes = ['light', 'dark'],
  ...props
}: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute={attribute}
      defaultTheme={defaultTheme}
      enableSystem={enableSystem}
      disableTransitionOnChange={disableTransitionOnChange}
      themes={themes}
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
