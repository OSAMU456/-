'use client';

import Link from 'next/link';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import { useTranslations } from '@/lib/translations';

interface HeroSectionProps {
  locale: string;
}

export default function HeroSection({ locale }: HeroSectionProps) {
  const t = useTranslations(locale);

  return (
    <div className="bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            {t('home.hero.title')}
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            {t('home.hero.subtitle')}
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href={`/${locale}/salons`}
              className="rounded-md bg-pink-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600 transition-all duration-200"
            >
              {t('home.hero.cta')}
            </Link>
            <Link
              href={`/${locale}/about`}
              className="text-sm font-semibold leading-6 text-gray-900 hover:text-pink-600 transition-colors duration-200 flex items-center gap-1"
            >
              了解更多 <ChevronRightIcon className="h-4 w-4" />
            </Link>
          </div>
        </div>
        
        {/* Hero Image Placeholder */}
        <div className="mt-16 flow-root sm:mt-24">
          <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
            <div className="aspect-[16/10] rounded-md bg-white shadow-2xl ring-1 ring-gray-900/10 flex items-center justify-center min-h-[400px]">
              <div className="text-center">
                <div className="w-32 h-32 mx-auto bg-pink-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-16 h-16 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">美容室预约平台</h3>
                <p className="text-gray-600">专业的日式美容服务体验</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}