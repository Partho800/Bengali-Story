'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  BookOpen,
  PenTool,
  Search,
  Menu,
  X,
  LogIn,
  LogOut,
  User as UserIcon,
  LayoutDashboard,
  Bookmark,
  ChevronDown,
} from 'lucide-react';
import { useLanguage } from '@/components/providers/language-provider';
import { useAuth } from '@/components/providers/auth-provider';
import { LanguageToggle } from './language-toggle';
import { ThemeToggle } from './theme-toggle';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { ROUTES } from '@/lib/constants';

export function Header() {
  const { t } = useLanguage();
  const { user, isAuthenticated, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');

  // Close mobile drawer upon route change
  React.useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`${ROUTES.search}?q=${encodeURIComponent(searchQuery.trim())}`);
      setMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { href: ROUTES.stories, label: t('nav.stories') },
    { href: ROUTES.categories, label: t('nav.categories') },
    { href: ROUTES.authors, label: t('nav.authors') },
    { href: ROUTES.rankings, label: t('nav.rankings') },
    { href: ROUTES.write, label: t('nav.write') },
  ];

  const userInitials = React.useMemo(() => {
    if (!user?.name) return 'U';
    return user.name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
  }, [user?.name]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/85 backdrop-blur-md transition-colors duration-200">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: Brand Logo & Navigation */}
        <div className="flex items-center gap-6 lg:gap-8">
          <Link
            href={ROUTES.home}
            className="flex items-center gap-2.5 transition-opacity hover:opacity-90"
            aria-label={t('common.siteName')}
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
              <BookOpen className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-outfit text-xl font-black tracking-tight leading-none text-foreground">
                Bengali<span className="text-primary font-bold">Story</span>
              </span>
              <span className="text-[10px] text-muted-foreground font-medium font-bengali leading-tight mt-0.5">
                {t('common.tagline')}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'rounded-xl px-3 py-1.5 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-muted text-foreground font-semibold'
                      : 'text-muted-foreground hover:bg-muted/70 hover:text-foreground'
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right Section: Search, Toggles & Auth Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Desktop Search Button */}
          <Link
            href={ROUTES.search}
            className="hidden sm:flex items-center gap-2 rounded-xl border border-border bg-card/60 px-3 py-1.5 text-xs text-muted-foreground hover:bg-muted hover:text-foreground transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label={t('nav.search')}
          >
            <Search className="h-3.5 w-3.5" />
            <span className="hidden xl:inline">{t('common.searchPlaceholder')}</span>
            <span className="xl:hidden">{t('nav.search')}</span>
          </Link>

          {/* Bilingual Switcher */}
          <LanguageToggle />

          {/* Theme Switcher */}
          <ThemeToggle />

          {/* Auth Section */}
          {isAuthenticated && user ? (
            /* Authenticated User Dropdown */
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  aria-label={user.name || t('nav.profile')}
                  className="flex items-center gap-2 rounded-full p-0.5 border border-border hover:ring-2 hover:ring-primary/40 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200"
                >
                  <Avatar className="h-8 w-8">
                    {user.avatarUrl && (
                      <AvatarImage src={user.avatarUrl} alt={user.name} />
                    )}
                    <AvatarFallback>{userInitials}</AvatarFallback>
                  </Avatar>
                  <ChevronDown className="h-3.5 w-3.5 text-muted-foreground hidden sm:inline-block mr-1" />
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-56 rounded-2xl p-1.5">
                <DropdownMenuLabel className="font-normal px-2.5 py-2">
                  <div className="flex flex-col space-y-0.5">
                    <p className="text-sm font-bold text-foreground leading-tight">
                      {user.name}
                    </p>
                    <p className="text-xs text-muted-foreground leading-none">
                      @{user.username}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />

                <DropdownMenuItem asChild>
                  <Link
                    href={ROUTES.authorProfile(user.username)}
                    className="cursor-pointer gap-2.5 rounded-lg py-2"
                  >
                    <UserIcon className="h-4 w-4 text-muted-foreground" />
                    <span>{t('nav.profile')}</span>
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link
                    href={ROUTES.library}
                    className="cursor-pointer gap-2.5 rounded-lg py-2"
                  >
                    <Bookmark className="h-4 w-4 text-muted-foreground" />
                    <span>{t('nav.library')}</span>
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link
                    href={ROUTES.dashboard}
                    className="cursor-pointer gap-2.5 rounded-lg py-2"
                  >
                    <LayoutDashboard className="h-4 w-4 text-muted-foreground" />
                    <span>{t('nav.dashboard')}</span>
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link
                    href={ROUTES.write}
                    className="cursor-pointer gap-2.5 rounded-lg py-2"
                  >
                    <PenTool className="h-4 w-4 text-muted-foreground" />
                    <span>{t('writer.studio')}</span>
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  onClick={logout}
                  className="cursor-pointer gap-2.5 rounded-lg py-2 text-destructive focus:bg-destructive/10 focus:text-destructive"
                >
                  <LogOut className="h-4 w-4" />
                  <span>{t('nav.logout')}</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            /* Guest Login CTA */
            <Link href={ROUTES.login} className="hidden sm:inline-flex">
              <Button size="sm" className="gap-1.5 rounded-xl shadow-sm">
                <LogIn className="h-3.5 w-3.5" />
                <span>{t('nav.login')}</span>
              </Button>
            </Link>
          )}

          {/* Mobile Menu Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex md:hidden p-2 rounded-xl border border-border bg-card text-foreground hover:bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label={mobileMenuOpen ? t('nav.closeMenu') : t('nav.menu')}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-card px-4 py-4 space-y-4 transition-colors duration-200 shadow-xl animate-in slide-in-from-top-2">
          {/* Mobile Search Form */}
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('common.searchPlaceholder')}
              className="w-full rounded-xl border border-border bg-muted/60 pl-9 pr-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
          </form>

          {/* Navigation Links */}
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'rounded-xl px-3.5 py-2 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-muted text-foreground font-semibold'
                      : 'text-muted-foreground hover:bg-muted/70 hover:text-foreground'
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Authenticated Links or Guest Login on Mobile */}
          <div className="pt-3 border-t border-border space-y-2">
            {isAuthenticated && user ? (
              <div className="space-y-2">
                <div className="flex items-center gap-3 px-2 py-1">
                  <Avatar className="h-9 w-9">
                    {user.avatarUrl && (
                      <AvatarImage src={user.avatarUrl} alt={user.name} />
                    )}
                    <AvatarFallback>{userInitials}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-foreground">
                      {user.name}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      @{user.username}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col space-y-1 pt-1">
                  <Link
                    href={ROUTES.authorProfile(user.username)}
                    className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
                  >
                    <UserIcon className="h-4 w-4" />
                    <span>{t('nav.profile')}</span>
                  </Link>
                  <Link
                    href={ROUTES.library}
                    className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
                  >
                    <Bookmark className="h-4 w-4" />
                    <span>{t('nav.library')}</span>
                  </Link>
                  <Link
                    href={ROUTES.dashboard}
                    className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    <span>{t('nav.dashboard')}</span>
                  </Link>
                  <Link
                    href={ROUTES.write}
                    className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
                  >
                    <PenTool className="h-4 w-4" />
                    <span>{t('writer.studio')}</span>
                  </Link>

                  <button
                    type="button"
                    onClick={logout}
                    className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-sm text-destructive hover:bg-destructive/10 text-left font-medium"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>{t('nav.logout')}</span>
                  </button>
                </div>
              </div>
            ) : (
              <Link href={ROUTES.login} className="block w-full">
                <Button className="w-full gap-2 rounded-xl shadow-sm">
                  <LogIn className="h-4 w-4" />
                  <span>{t('nav.login')}</span>
                </Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
