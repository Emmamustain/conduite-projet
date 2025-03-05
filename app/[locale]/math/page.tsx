"use client";
import { Loader2 } from "lucide-react";
import { useTranslations } from 'next-intl';
import { useEffect, useState } from "react";
import DailyChallenge from "../../components/DailyChallenge";
import PageLayout from "../../components/PageLayout";
import WelcomeProgress from "../../components/WelcomeProgress";

interface Question {
    question: string;
    answer: number;
    options: number[];
}

type Operation = 'add' | 'subtract' | 'multiply' | 'divide';

export default function MathGame() {
    const t = useTranslations('math');
    const [question, setQuestion] = useState<Question | null>(null);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState<boolean>(false);
    const [isCorrect, setIsCorrect] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [selectedOperation, setSelectedOperation] = useState<Operation | null>(null);
    const [dailyChallengeCompleted, setDailyChallengeCompleted] = useState(false);

    const generateQuestion = () => {
        setIsLoading(true);
        setShowResult(false);

        const num1 = Math.floor(Math.random() * 10) + 1;
        const num2 = Math.floor(Math.random() * 10) + 1;

        let answer: number;
        let operator: string;

        switch (selectedOperation) {
            case 'add':
                answer = num1 + num2;
                operator = '+';
                break;
            case 'subtract':
                answer = num1 - num2;
                operator = '-';
                break;
            case 'multiply':
                answer = num1 * num2;
                operator = '×';
                break;
            case 'divide':
                answer = num1;
                operator = '÷';
                break;
            default:
                answer = 0;
                operator = '';
        }

        const questionText = t('question', {
            num1: selectedOperation === 'divide' ? (num1 * num2) : num1,
            num2,
            operator
        });

        let options = [answer];
        while (options.length < 4) {
            const wrongAnswer =
                answer + Math.floor(Math.random() * 5) * (Math.random() < 0.5 ? 1 : -1);
            if (!options.includes(wrongAnswer) && wrongAnswer > 0) {
                options.push(wrongAnswer);
            }
        }

        options = options.sort(() => Math.random() - 0.5);

        setQuestion({
            question: questionText,
            answer: answer,
            options: options,
        });

        setIsLoading(false);
    };

    const checkAnswer = (selectedAnswer: number) => {
        if (!question) return;

        const correct = selectedAnswer === question.answer;
        setIsCorrect(correct);
        setShowResult(true);

        if (correct) {
            setScore(score + 1);
        }
    };

    const selectOperation = (operation: Operation) => {
        setSelectedOperation(operation);
        generateQuestion();
    };

    useEffect(() => {
        if (selectedOperation) {
            generateQuestion();
        }
    }, [selectedOperation]);

    return (
        <PageLayout>
            <WelcomeProgress progress={65} />

            <h1 className="text-4xl font-bold mb-8 text-[#1a1a1a]">{t('title')}</h1>

            {!selectedOperation ? (
                <div className="flex flex-col items-center gap-6 w-full max-w-6xl">
                    <div className="text-2xl font-semibold mb-6 text-[#1a1a1a]">{t('chooseOperation')}</div>
                    <div className="w-full grid grid-cols-2 gap-8 mb-8">
                        <button
                            onClick={() => selectOperation('add')}
                            className="h-40 rounded-xl bg-[#4ADE80] text-white p-6 flex flex-col items-center justify-center hover:opacity-90 transition-opacity"
                        >
                            <span className="text-4xl block mb-2">+</span>
                            <span className="text-2xl font-semibold">{t('operations.addition')}</span>
                        </button>
                        <button
                            onClick={() => selectOperation('subtract')}
                            className="h-40 rounded-xl bg-[#EAB308] text-white p-6 flex flex-col items-center justify-center hover:opacity-90 transition-opacity"
                        >
                            <span className="text-4xl block mb-2">−</span>
                            <span className="text-2xl font-semibold">{t('operations.subtraction')}</span>
                        </button>
                        <button
                            onClick={() => selectOperation('multiply')}
                            className="h-40 rounded-xl bg-[#EF4444] text-white p-6 flex flex-col items-center justify-center hover:opacity-90 transition-opacity"
                        >
                            <span className="text-4xl block mb-2">×</span>
                            <span className="text-2xl font-semibold">{t('operations.multiplication')}</span>
                        </button>
                        <button
                            onClick={() => selectOperation('divide')}
                            className="h-40 rounded-xl bg-[#3B82F6] text-white p-6 flex flex-col items-center justify-center hover:opacity-90 transition-opacity"
                        >
                            <span className="text-4xl block mb-2">÷</span>
                            <span className="text-2xl font-semibold">{t('operations.division')}</span>
                        </button>
                    </div>
                    <div className="mt-8">
                        <DailyChallenge onAnswerSubmit={(correct) => setDailyChallengeCompleted(true)} />
                    </div>
                </div>
            ) : (
                <>
                    <div className="text-xl mb-4 text-[#FF6B9D]">{t('score', { score })}</div>
                    <button
                        onClick={() => setSelectedOperation(null)}
                        className="mb-6 px-6 py-3 text-lg bg-[#FF8FB1] text-white rounded-lg hover:bg-[#FF8FB1]/90 transition-colors font-semibold"
                    >
                        {t('changeOperation')}
                    </button>

                    {isLoading ? (
                        <Loader2 className="h-8 w-8 animate-spin text-[#FF6B9D]" />
                    ) : (
                        <div className="flex flex-col items-center gap-6">
                            {question && (
                                <>
                                    <div className="text-2xl font-semibold mb-4 text-[#FF6B9D]">
                                        {question.question}
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        {question.options.map((option, index) => (
                                            <button
                                                key={index}
                                                onClick={() => checkAnswer(option)}
                                                disabled={showResult}
                                                className="px-6 py-3 text-xl bg-[#FF6B9D] text-white rounded-lg hover:bg-[#FF6B9D]/90 disabled:opacity-50"
                                            >
                                                {option}
                                            </button>
                                        ))}
                                    </div>
                                </>
                            )}

                            {showResult && (
                                <div
                                    className={`text-xl font-bold ${isCorrect ? "text-green-500" : "text-red-500"}`}
                                >
                                    {isCorrect ? t('correct') : t('tryAgain')}
                                </div>
                            )}

                            {showResult && (
                                <button
                                    onClick={generateQuestion}
                                    className="mt-4 px-6 py-3 bg-[#FF6B9D] text-white rounded-lg hover:bg-[#FF6B9D]/90"
                                >
                                    {t('nextQuestion')}
                                </button>
                            )}
                        </div>
                    )}
                </>
            )}

        </PageLayout>
    );
} 