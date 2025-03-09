"use client";
import { useTranslations } from 'next-intl';
import { useEffect, useState } from "react";

interface DailyChallengeProps {
    onAnswerSubmit: (isCorrect: boolean) => void;
}

export default function DailyChallenge({ onAnswerSubmit }: DailyChallengeProps) {
    const t = useTranslations('dailyChallenge');
    const [answer, setAnswer] = useState<number | null>(null);
    const [showResult, setShowResult] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [attempts, setAttempts] = useState(0);
    const [dailyQuestion, setDailyQuestion] = useState<{ question: string; answer: number } | null>(null);
    const [shouldDisplay, setShouldDisplay] = useState(false);

    useEffect(() => {
        // Check if the challenge was already completed today
        const checkCompletion = () => {
            const today = new Date().toISOString().split('T')[0]; // Get YYYY-MM-DD
            const lastCompletion = localStorage.getItem('lastDailyChallengeDate');
            return lastCompletion === today;
        };

        // Generate a daily question based on the current date
        const generateDailyQuestion = () => {
            // Use the date as a seed for consistent daily questions
            const today = new Date();
            let seedValue = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();

            // Generate numbers using the seed
            const seededRandom = () => {
                const x = Math.sin(seedValue++) * 10000;
                return Math.floor((x - Math.floor(x)) * 10);
            };

            const num1 = seededRandom() + 1;
            const num2 = seededRandom() + 1;
            const num3 = seededRandom() + 1;

            setDailyQuestion({
                question: `What is ${num1} + ${num2} - ${num3}?`,
                answer: num1 + num2 - num3
            });
        };

        // Only show and generate a new question if not completed today
        const isCompletedToday = checkCompletion();
        setShouldDisplay(!isCompletedToday);
        if (!isCompletedToday) {
            generateDailyQuestion();
        }
    }, []);

    const handleSubmit = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (answer === null || !dailyQuestion) return;

        const correct = answer === dailyQuestion.answer;
        setIsCorrect(correct);
        setShowResult(true);
        setAttempts(prev => prev + 1);

        if (correct) {
            // Only save completion and notify parent when correct
            const today = new Date().toISOString().split('T')[0];
            localStorage.setItem('lastDailyChallengeDate', today);
            onAnswerSubmit(correct);
        } else {
            // Clear the input and hide the result after 2 seconds for another attempt
            setTimeout(() => {
                setAnswer(null);
                setShowResult(false);
            }, 2000);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (answer !== null && (!showResult || !isCorrect)) {
                handleSubmit(e as unknown as React.MouseEvent);
            }
        }
    };

    // Don't render anything if we shouldn't display
    if (!shouldDisplay) {
        return null;
    }

    return (
        <div className="bg-[#FFFBE5] p-8 rounded-3xl shadow-lg w-full">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex flex-col items-center md:items-start gap-2">
                    <h2 className="text-3xl font-bold text-[#FF6B9D]">{t('title')}</h2>
                    {dailyQuestion && (
                        <p className="text-2xl font-semibold text-gray-800">{dailyQuestion.question}</p>
                    )}
                    {attempts > 0 && !isCorrect && (
                        <p className="text-sm text-gray-600">{t('attempts', { count: attempts })}</p>
                    )}
                </div>
                {dailyQuestion && (
                    <div className="flex-1 max-w-xl">
                        <div className="h-8 mb-2">
                            {showResult && (
                                <div className={`text-xl font-bold ${isCorrect ? "text-green-600" : "text-red-600"} whitespace-nowrap text-center`}>
                                    {isCorrect ? t('correct') : t('tryAgain')}
                                </div>
                            )}
                        </div>
                        <div className="flex items-center gap-4">
                            <input
                                type="number"
                                value={answer === null ? "" : answer}
                                onChange={(e) => setAnswer(parseInt(e.target.value) || null)}
                                onKeyDown={handleKeyPress}
                                className="flex-1 px-4 py-3 text-xl border-2 border-[#FF6B9D] rounded-lg focus:outline-none focus:border-[#FF8FB1] text-gray-800 bg-white"
                                placeholder={t('enterAnswer')}
                                disabled={showResult && isCorrect}
                            />
                            <button
                                type="button"
                                onClick={handleSubmit}
                                disabled={answer === null || (showResult && isCorrect)}
                                className="px-6 py-3 text-xl bg-[#FF6B9D] text-white rounded-lg hover:bg-[#FF6B9D]/90 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                            >
                                {t('submitAnswer')}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
} 