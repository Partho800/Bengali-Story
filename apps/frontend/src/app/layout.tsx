import type { Metadata, Viewport } from 'next';
import { cookies } from 'next/headers';
import { Hind_Siliguri, Outfit } from 'next/font/google';
import { Providers } from '@/components/providers';
import { LOCALE_COOKIE_NAME, DEFAULT_LOCALE, isValidLocale } from '@/lib/i18n/utils';
import { Locale } from '@/lib/i18n/translations';
import './globals.css';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800'],
});

const hindSiliguri = Hind_Siliguri({
  subsets: ['bengali'],
  variable: '--font-hind-siliguri',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#242424' },
  ],
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'Bengali Story - বাংলা গল্প প্রকাশনা প্ল্যাটফর্ম',
  description: 'আধুনিক বাংলা গল্প ও উপন্যাস পড়ার উন্মুক্ত ডিজিটাল প্ল্যাটফর্ম',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const rawLocale = cookieStore.get(LOCALE_COOKIE_NAME)?.value;
  const initialLocale: Locale = isValidLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;

  return (
    <html
      lang={initialLocale}
      suppressHydrationWarning
      className={`${outfit.variable} ${hindSiliguri.variable}`}
    >
      <body className="font-sans antialiased min-h-screen bg-background text-foreground transition-colors duration-200">
        <Providers initialLocale={initialLocale}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
