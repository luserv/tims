'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';

import IconMobileMenu from '@/components/icons/icon-mobile-menu.svg';
import IconClose from '@/components/icons/icon-close.svg';

function SunIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="h-9 w-9" />;

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="rounded-md p-2 text-foreground hover:bg-muted transition-colors duration-200 cursor-pointer"
      aria-label={theme === 'dark' ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}
    >
      {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}

export function Navbar() {
  const t = useTranslations('nav');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);

  const navItems = [
    { name: t('home'), href: '/' },
    { name: t('timeline'), href: '/timeline' },
    { name: t('club'), href: '/club' },
    { name: t('studentCouncil'), href: '/consejo-estudiantil' },
  ];

  return (
    <nav className="flex items-center justify-between py-3">
      <Link href="/" className="font-bold tracking-tight text-primary hover:opacity-80 transition-opacity leading-tight">
        <span className="hidden sm:block text-sm">{t('brand')}</span>
        <span className="sm:hidden text-lg">TIMS</span>
      </Link>

      {/* Desktop */}
      <div className="hidden md:flex items-center gap-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="px-3 py-2 rounded-md text-sm font-medium text-foreground hover:bg-muted hover:text-primary transition-colors duration-200"
          >
            {item.name}
          </Link>
        ))}
        <LanguageSwitcher />
        <ThemeToggle />
        <Button asChild variant="outline" size="sm" className="ml-2">
          <Link href="/login?callbackUrl=/admin">{t('login')}</Link>
        </Button>
      </div>

      {/* Mobile controls */}
      <div className="md:hidden flex items-center gap-1">
        <LanguageSwitcher />
        <ThemeToggle />
        <button
          className="rounded-md p-2 text-foreground hover:bg-muted transition-colors duration-200 focus:outline-none cursor-pointer"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
        >
          {isMenuOpen ? <IconClose className="w-5 h-5" /> : <IconMobileMenu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 md:hidden border-b border-border bg-background/95 backdrop-blur-sm shadow-md">
          <div className="mx-auto max-w-6xl px-4 py-2 flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-3 py-2 rounded-md text-sm font-medium text-foreground hover:bg-muted hover:text-primary transition-colors duration-200"
                onClick={closeMenu}
              >
                {item.name}
              </Link>
            ))}
            <div className="py-2 border-t border-border mt-1">
              <Button asChild variant="outline" size="sm" className="w-full">
                <Link href="/login?callbackUrl=/admin" onClick={closeMenu}>
                  {t('login')}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
