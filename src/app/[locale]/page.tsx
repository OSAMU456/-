import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import Footer from '@/components/Footer';

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;

  return (
    <div className="min-h-screen bg-white">
      <Header locale={locale} />
      <main>
        <HeroSection locale={locale} />
        <FeaturesSection locale={locale} />
      </main>
      <Footer locale={locale} />
    </div>
  );
}