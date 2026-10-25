import { Locale, translations } from './translations';

export const LOCALE_STORAGE_KEY = 'bengali_story_locale';
export const LOCALE_COOKIE_NAME = 'bengali_story_locale';
export const DEFAULT_LOCALE: Locale = 'bn';
export const SUPPORTED_LOCALES: readonly Locale[] = ['bn', 'en'];

/**
 * Type guard for supported locales
 */
export function isValidLocale(val: unknown): val is Locale {
  return typeof val === 'string' && (val === 'bn' || val === 'en');
}

/**
 * Helper to safely extract cookie value on the client
 */
export function getCookieValue(cookieName: string): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(
    new RegExp(`(?:^|; )${cookieName}=([^;]*)`)
  );
  return match ? decodeURIComponent(match[1]) : null;
}

/**
 * Client-side detection of the stored locale with fallback
 */
export function getClientStoredLocale(): Locale {
  if (typeof window === 'undefined') return DEFAULT_LOCALE;

  try {
    // 1. Check localStorage first
    const local = window.localStorage.getItem(LOCALE_STORAGE_KEY);
    if (isValidLocale(local)) {
      return local;
    }

    // 2. Check cookie
    const cookie = getCookieValue(LOCALE_COOKIE_NAME);
    if (isValidLocale(cookie)) {
      return cookie;
    }
  } catch {
    // Ignore storage errors (private mode / cookies blocked)
  }

  return DEFAULT_LOCALE;
}

/**
 * Persist the selected locale in both localStorage and document.cookie
 */
export function persistLocale(locale: Locale): void {
  if (typeof window === 'undefined') return;

  try {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  } catch {
    // Ignore storage quota / access issues
  }

  try {
    // Set 1-year persistent cookie with SameSite=Lax
    document.cookie = `${LOCALE_COOKIE_NAME}=${locale}; path=/; max-age=31536000; SameSite=Lax`;
    document.documentElement.lang = locale;
  } catch {
    // Ignore cookie write errors
  }
}

/**
 * Recursively resolves a dot-separated path (e.g. 'buttons.save') from a dictionary
 */
function resolvePath(obj: any, path: string): string | undefined {
  if (!obj || typeof obj !== 'object') return undefined;
  const segments = path.split('.');
  let current: any = obj;

  for (const segment of segments) {
    if (current && typeof current === 'object' && segment in current) {
      current = current[segment];
    } else {
      return undefined;
    }
  }

  return typeof current === 'string' ? current : undefined;
}

/**
 * Pure translation resolver with fallback chain & parameter interpolation
 * Fallback chain:
 * 1. Target locale (e.g. 'bn')
 * 2. Alternate locale (e.g. 'en')
 * 3. User-provided fallback argument
 * 4. The raw key path itself
 */
export function translate(
  locale: Locale,
  path: string,
  fallback?: string,
  params?: Record<string, string | number>
): string {
  // 1. Look up in primary locale
  let text = resolvePath(translations[locale], path);

  // 2. Fall back to alternate locale
  if (text === undefined) {
    const altLocale: Locale = locale === 'bn' ? 'en' : 'bn';
    text = resolvePath(translations[altLocale], path);
  }

  // 3. Fall back to custom fallback or path
  if (text === undefined) {
    text = fallback !== undefined ? fallback : path;
  }

  // 4. Interpolate parameters if provided (e.g. {count}, {name})
  if (params && typeof text === 'string') {
    Object.entries(params).forEach(([key, val]) => {
      text = (text as string).replace(new RegExp(`\\{${key}\\}`, 'g'), String(val));
    });
  }

  return text;
}
