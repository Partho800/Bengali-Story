'use client';

import Link from 'next/link';
import { Container } from '@/components/layout/container';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useLanguage } from '@/components/providers/language-provider';
import { ROUTES } from '@/lib/constants';

export default function HomePage() {
  const { t, locale } = useLanguage();

  return (
    <Container size="md" className="py-16 sm:py-20 flex flex-col items-center text-center justify-center space-y-8">
      {/* Status Pill */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-muted border border-border text-xs text-muted-foreground shadow-sm">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span>{t('home.badge')}</span>
        <span className="text-border">|</span>
        <span className="font-outfit font-semibold uppercase">{locale}</span>
      </div>

      {/* Hero Title & Subtitle */}
      <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-foreground leading-tight">
        {t('home.heroTitle')}
      </h1>

      <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl leading-relaxed">
        {t('home.heroSubtitle')}
      </p>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
        <Link href={ROUTES.stories}>
          <Button size="lg" className="rounded-xl shadow-md">
            {t('home.ctaRead')}
          </Button>
        </Link>
        <Link href={ROUTES.write}>
          <Button size="lg" variant="outline" className="rounded-xl">
            {t('home.ctaWrite')}
          </Button>
        </Link>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-2xl pt-4">
        <div className="p-4 rounded-xl border border-border bg-card/60 text-center shadow-sm">
          <span className="text-sm font-medium text-foreground">{t('home.statsStories')}</span>
        </div>
        <div className="p-4 rounded-xl border border-border bg-card/60 text-center shadow-sm">
          <span className="text-sm font-medium text-foreground">{t('home.statsWriters')}</span>
        </div>
        <div className="p-4 rounded-xl border border-border bg-card/60 text-center shadow-sm">
          <span className="text-sm font-medium text-foreground">{t('home.statsReaders')}</span>
        </div>
      </div>

      {/* 3 Key Feature Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full text-left pt-6">
        <Card className="hover:border-primary/40 transition-colors">
          <CardHeader className="space-y-2.5">
            <CardTitle className="text-base font-bold">
              {t('home.card1Title')}
            </CardTitle>
            <CardDescription className="text-xs leading-relaxed">
              {t('home.card1Desc')}
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="hover:border-primary/40 transition-colors">
          <CardHeader className="space-y-2.5">
            <CardTitle className="text-base font-bold">
              {t('home.card2Title')}
            </CardTitle>
            <CardDescription className="text-xs leading-relaxed">
              {t('home.card2Desc')}
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="hover:border-primary/40 transition-colors">
          <CardHeader className="space-y-2.5">
            <CardTitle className="text-base font-bold">
              {t('home.card3Title')}
            </CardTitle>
            <CardDescription className="text-xs leading-relaxed">
              {t('home.card3Desc')}
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </Container>
  );
}
