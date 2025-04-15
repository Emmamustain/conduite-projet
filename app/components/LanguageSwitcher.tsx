'use client';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';

export default function LanguageSwitcher() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    const switchLocale = () => {
        const newLocale = locale === 'en' ? 'fr' : 'en';
        const newPathname = pathname.replace(`/${locale}`, `/${newLocale}`);
        router.push(newPathname);
    };

    return (
        <button
            onClick={switchLocale}
            className="absolute right-2 -top-2 px-4 py-2 rounded-lg bg-white shadow-md hover:shadow-lg transition-all flex items-center gap-2 text-gray-800 hover:text-[#FF6B9D]"
        >
            {locale === 'en' ? (
                <>
                    <span className="text-lg">🇬🇧</span>
                    <span className="text-sm font-semibold">EN</span>
                </>
            ) : (
                <>
                    <span className="text-lg">🇫🇷</span>
                    <span className="text-sm font-semibold">FR</span>
                </>
            )}
        </button>
    );
} 