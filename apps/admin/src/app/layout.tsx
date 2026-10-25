import type { Metadata } from 'next';
import { Hind_Siliguri, Outfit } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { LanguageProvider } from '@/lib/i18n/context';
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

export const metadata: Metadata = {
  title: 'Admin Panel - Bengali Story',
  description: 'এডমিন ড্যাশবোর্ড ও কন্টেন্ট মডারেশন',
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="bn"
      suppressHydrationWarning
      className={`${outfit.variable} ${hindSiliguri.variable}`}
    >
      <body className="font-sans antialiased min-h-screen bg-background text-foreground transition-colors duration-200">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <LanguageProvider defaultLocale="bn">
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
