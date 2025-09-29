import { notFound } from 'next/navigation';

const locales = ['zh', 'ja', 'en'];

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({
  children,
  params
}: LocaleLayoutProps) {
  const { locale } = await params;
  
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale)) notFound();

  return (
    <html lang={locale}>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}