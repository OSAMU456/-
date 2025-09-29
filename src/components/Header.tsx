'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useTranslations } from '@/lib/translations';

interface HeaderProps {
  locale: string;
}

export default function Header({ locale }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = useTranslations(locale);
  const router = useRouter();

  const navigation = [
    { name: t('nav.home'), href: `/${locale}` },
    { name: t('nav.salons'), href: `/${locale}/salons` },
    { name: t('nav.booking'), href: `/${locale}/booking` },
  ];

  const languages = [
    { code: 'zh', name: '中文' },
    { code: 'ja', name: '日本語' },
    { code: 'en', name: 'English' },
  ];

  const switchLanguage = (newLocale: string) => {
    router.push(`/${newLocale}`);
  };

  return (
    <header className="bg-white shadow-sm">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href={`/${locale}`} className="-m-1.5 p-1.5">
            <span className="text-2xl font-bold text-pink-600">{t('title')}</span>
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <Link key={item.name} href={item.href} className="text-sm font-semibold text-gray-900 hover:text-pink-600">
              {item.name}
            </Link>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-6">
          <div className="relative">
            <select
              value={locale}
              onChange={(e) => switchLanguage(e.target.value)}
              className="rounded-md border border-gray-300 bg-white py-1.5 px-3 text-sm text-gray-900 focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500"
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>
          <Link href={`/${locale}/login`} className="text-sm font-semibold text-gray-900 hover:text-pink-600">
            {t('nav.login')}
          </Link>
        </div>
      </nav>
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden">
          <div className="fixed inset-0 z-10"></div>
          <div className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <Link href={`/${locale}`} className="-m-1.5 p-1.5">
                <span className="text-xl font-bold text-pink-600">{t('title')}</span>
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-pink-50"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
                <div className="py-6">
                  <Link
                    href={`/${locale}/login`}
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold text-gray-900 hover:bg-pink-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t('nav.login')}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}