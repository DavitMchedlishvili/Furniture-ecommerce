import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { ThemeProvider } from 'next-themes';
import Header from '../components/Header/Header';

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: "en" | "ka" }>; // Make params a promise
};

export default async function LocaleLayout({
  children,
  params
}: LocaleLayoutProps) {
  // Resolve the params promise
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!locale || !routing.locales.includes(locale)) {
    notFound();
  }

  // Providing all messages to the client
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning={true}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider defaultTheme="system" enableSystem attribute="class">
            <Header />
            {children}
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

