"use client";
import { Brain, Calculator } from "lucide-react";
import { useLocale, useTranslations } from 'next-intl';
import Link from "next/link";
import PageLayout from '../../components/PageLayout';
import ChatRobot from "../../components/robots/ChatRobot";
import MathRobot from "../../components/robots/MathRobot";
import WavingRobot from "../../components/robots/WavingRobot";

export default function ClientHome() {
    const t = useTranslations('common');
    const locale = useLocale();

    return (
        <PageLayout showBackButton={false}>
            <div className="flex flex-col items-center mb-12">
                <div className="w-[200px] h-[200px] mb-6">
                    <WavingRobot />
                </div>
                <h1 className="text-5xl font-bold text-[#FF6B9D] mb-4">{t('welcome')}</h1>
                <p className="text-2xl text-[#4B5563]">
                    {t('whatToDo')}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl">
                <Link
                    href={`/${locale}/math`}
                    className="group relative flex flex-col items-center p-8 bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 border-4 border-[#FFB6C1] hover:border-[#FF6B9D] hover:-translate-y-2"
                >
                    <div className="absolute -top-12 transition-transform group-hover:scale-110">
                        <MathRobot />
                    </div>
                    <Calculator className="w-16 h-16 text-[#FF6B9D] mb-4 mt-8" />
                    <h2 className="text-2xl font-bold text-[#FF6B9D] mb-2">
                        {t('math.title')}
                    </h2>
                    <p className="text-gray-600 text-center">
                        {t('math.description')}
                    </p>
                </Link>

                <Link
                    href={`/${locale}/chat`}
                    className="group relative flex flex-col items-center p-8 bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 border-4 border-[#87CEEB] hover:border-[#4DA6FF] hover:-translate-y-2"
                >
                    <div className="absolute -top-12 transition-transform group-hover:scale-110">
                        <ChatRobot />
                    </div>
                    <Brain className="w-16 h-16 text-[#4DA6FF] mb-4 mt-8" />
                    <h2 className="text-2xl font-bold text-[#4DA6FF] mb-2">
                        {t('chat.title')}
                    </h2>
                    <p className="text-gray-600 text-center">
                        {t('chat.description')}
                    </p>
                </Link>
            </div>
        </PageLayout>
    );
} 