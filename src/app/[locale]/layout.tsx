import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { ThemeProvider } from 'next-themes';
import Header from '../components/Header/Header';

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: { locale: keyof typeof routing.locales }; // Correct type
};

export default async function LocaleLayout({
  children,
  params: { locale }
}: LocaleLayoutProps) {
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as "en" | "ka")) {
    notFound();
  }

  // Providing all messages to the client
  const messages = await getMessages();

  return (
    <html lang={locale as string} suppressHydrationWarning={true}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider defaultTheme='system' enableSystem attribute='class'>
            <Header />
            {children}
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
