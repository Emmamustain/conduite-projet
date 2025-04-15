import { NextIntlClientProvider } from 'next-intl';
import { Comic_Neue } from "next/font/google";
import { notFound } from 'next/navigation';
import { ReactNode } from 'react';

const comicSans = Comic_Neue({
    weight: ['400', '700'],
    variable: "--font-comic-sans",
    subsets: ["latin"],
});


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
        <html lang={locale} className={`${comicSans.variable}`}>
            <body className="font-comic-sans">
                <NextIntlClientProvider locale={locale} messages={messages}>
                    {children}
                </NextIntlClientProvider>
            </body>
        </html>
    );
}