import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { ReactNode } from 'react';

export function generateStaticParams() {
    return [{ locale: 'en' }, { locale: 'fr' }];
}

interface LocaleLayoutProps {
    children: ReactNode;
    params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
    const { locale } = await params;
    let messages;
    try {
        messages = (await import(`../../messages/${locale}.json`)).default;
    } catch {
        notFound();
    }

    return (
        <html lang={locale}>
            <body>
                <NextIntlClientProvider locale={locale} messages={messages}>
                    {children}
                </NextIntlClientProvider>
            </body>
        </html>
    );
} 