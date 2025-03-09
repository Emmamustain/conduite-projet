"use client";
import { useTranslations } from 'next-intl';

interface WelcomeProgressProps {
    userName?: string;
    progress: number;
}

export default function WelcomeProgress({ userName = "Math Star", progress }: WelcomeProgressProps) {
    const t = useTranslations('math.welcome');

    return (
        <div className="w-full max-w-6xl mx-auto mb-12 pt-8">
            <div className="flex items-center gap-4 mb-6 justify-center">
                <div className="text-5xl">😎</div>
                <h1 className="text-4xl font-bold text-[#1a1a1a]">
                    {t('title', { name: userName })}
                </h1>
            </div>

            <div className="relative w-full h-4 bg-gray-100 rounded-full overflow-hidden">
                <div
                    className="absolute left-0 top-0 h-full bg-[#FF6B9D] transition-all duration-500"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>

            <p className="text-gray-600 mt-4 text-lg text-center">
                {t('progress', { progress })}
            </p>
        </div>
    );
} 