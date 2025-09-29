'use client';

import { 
  UserGroupIcon, 
  ClockIcon, 
  MapPinIcon 
} from '@heroicons/react/24/outline';
import { useTranslations } from '@/lib/translations';

interface FeaturesSectionProps {
  locale: string;
}

export default function FeaturesSection({ locale }: FeaturesSectionProps) {
  const t = useTranslations(locale);

  const features = [
    {
      name: t('home.features.professional.title'),
      description: t('home.features.professional.description'),
      icon: UserGroupIcon,
    },
    {
      name: t('home.features.convenient.title'),
      description: t('home.features.convenient.description'),
      icon: ClockIcon,
    },
    {
      name: t('home.features.location.title'),
      description: t('home.features.location.description'),
      icon: MapPinIcon,
    },
  ];

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-pink-600">更好的服务</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {t('home.features.title')}
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            我们为中国游客提供最贴心的美容服务预约体验，让您在福岡的旅程更加美丽动人。
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-3 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-lg bg-pink-600">
                    <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}