"use client";
import { useLocale, useTranslations } from 'next-intl';
import Link from "next/link";
import { ReactNode } from "react";
import LanguageSwitcher from "./LanguageSwitcher";

interface ClientLayoutProps {
    children: ReactNode;
    showBackButton?: boolean;
}

export default function ClientLayout({ children, showBackButton = true }: ClientLayoutProps) {
    const t = useTranslations('common');
    const locale = useLocale();

    return (
        <>
            {showBackButton && (
                <Link
                    href={`/${locale}/home`}
                    className="absolute left-8 top-8 px-4 py-2 text-gray-600 hover:text-gray-800 flex items-center gap-2 transition-colors"
                >
                    <span className="text-2xl">←</span>
                    <span>{t('back')}</span>
                </Link>
            )}
            <LanguageSwitcher />
            {children}
        </>
    );
} 