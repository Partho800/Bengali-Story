'use client';

import * as React from 'react';
import Link from 'next/link';
import { BookOpen, Globe, Heart, Shield, FileText, Mail, HelpCircle } from 'lucide-react';
import { useLanguage } from '@/components/providers/language-provider';
import { ROUTES } from '@/lib/constants';

export function Footer() {
  const { t, locale, isBn } = useLanguage();

  const categories = [
    { href: `${ROUTES.categories}/romance`, label: t('categoriesList.romance') },
    { href: `${ROUTES.categories}/thriller`, label: t('categoriesList.thriller') },
    { href: `${ROUTES.categories}/horror`, label: t('categoriesList.horror') },
    { href: `${ROUTES.categories}/scifi`, label: t('categoriesList.scifi') },
    { href: `${ROUTES.categories}/social`, label: t('categoriesList.social') },
    { href: `${ROUTES.categories}/poetry`, label: t('categoriesList.poetry') },
  ];

  return (
    <footer className="border-t border-border bg-card text-card-foreground transition-colors duration-200">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
          {/* 1. Platform Introduction */}
          <div className="sm:col-span-2 space-y-4">
            <Link
              href={ROUTES.home}
              className="inline-flex items-center gap-2.5 transition-opacity hover:opacity-90"
              aria-label={t('common.siteName')}
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
                <BookOpen className="h-5 w-5" />
              </div>
              <span className="font-outfit text-xl font-black tracking-tight text-foreground">
                Bengali<span className="text-primary font-bold">Story</span>
              </span>
            </Link>

            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              {t('home.heroSubtitle')}
            </p>

            <div className="flex items-center gap-2 text-xs text-muted-foreground pt-1">
              <Globe className="h-3.5 w-3.5 text-primary" />
              <span>
                {isBn
                  ? 'ডিফল্ট ভাষা: বাংলা | ফন্ট: Hind Siliguri'
                  : 'Default Language: Bengali | Font: Outfit'}
              </span>
            </div>
          </div>

          {/* 2. Quick Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground font-outfit">
              {t('common.explore')}
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link
                  href={ROUTES.stories}
                  className="hover:text-foreground transition-colors"
                >
                  {t('nav.stories')}
                </Link>
              </li>
              <li>
                <Link
                  href={ROUTES.categories}
                  className="hover:text-foreground transition-colors"
                >
                  {t('nav.categories')}
                </Link>
              </li>
              <li>
                <Link
                  href={ROUTES.authors}
                  className="hover:text-foreground transition-colors"
                >
                  {t('nav.authors')}
                </Link>
              </li>
              <li>
                <Link
                  href={ROUTES.rankings}
                  className="hover:text-foreground transition-colors"
                >
                  {t('nav.rankings')}
                </Link>
              </li>
              <li>
                <Link
                  href={ROUTES.write}
                  className="hover:text-foreground transition-colors font-medium text-primary"
                >
                  {t('nav.write')}
                </Link>
              </li>
            </ul>
          </div>

          {/* 3. Story Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground font-outfit">
              {t('nav.categories')}
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {categories.map((cat) => (
                <li key={cat.href}>
                  <Link
                    href={cat.href}
                    className="hover:text-foreground transition-colors"
                  >
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 4. Company, About & Legal */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground font-outfit">
              {t('nav.about')}
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link
                  href={ROUTES.about}
                  className="hover:text-foreground transition-colors"
                >
                  {t('nav.about')}
                </Link>
              </li>
              <li>
                <Link
                  href={ROUTES.contact}
                  className="hover:text-foreground transition-colors"
                >
                  {t('nav.contact')}
                </Link>
              </li>
              <li>
                <Link
                  href={ROUTES.terms}
                  className="hover:text-foreground transition-colors"
                >
                  {t('nav.terms')}
                </Link>
              </li>
              <li>
                <Link
                  href={ROUTES.privacy}
                  className="hover:text-foreground transition-colors"
                >
                  {t('nav.privacy')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* 5. Bottom Copyright Bar */}
        <div className="mt-12 border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>{t('common.copyright')}</p>
          <div className="flex items-center gap-4">
            <span className="font-outfit">Theme: #ffffff &amp; #242424</span>
            <span className="text-border">|</span>
            <span className="font-outfit uppercase">Locale: {locale}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
