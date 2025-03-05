"use client";
import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

interface Question {
  question: string;
  answer: number;
  options: number[];
}

export default function MathGame() {
  const [question, setQuestion] = useState<Question | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const generateQuestion = () => {
    setIsLoading(true);
    setShowResult(false);

    // Generate two random numbers between 1 and 10
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;

    // Randomly choose operation (for now just addition)
    const answer = num1 + num2;

    // Generate wrong options
    let options = [answer];
    while (options.length < 4) {
      const wrongAnswer =
        answer + Math.floor(Math.random() * 5) * (Math.random() < 0.5 ? 1 : -1);
      if (!options.includes(wrongAnswer) && wrongAnswer > 0) {
        options.push(wrongAnswer);
      }
    }

    // Shuffle options
    options = options.sort(() => Math.random() - 0.5);

    setQuestion({
      question: `What is ${num1} + ${num2}?`,
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

  useEffect(() => {
    generateQuestion();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center p-12">
      <h1 className="text-4xl font-bold mb-8 text-blue-600">Math Game!</h1>
      <div className="text-xl mb-4">Score: {score}</div>

      {isLoading ? (
        <Loader2 className="h-8 w-8 animate-spin" />
      ) : (
        <div className="flex flex-col items-center gap-6">
          {question && (
            <>
              <div className="text-2xl font-semibold mb-4">
                {question.question}
              </div>
              <div className="grid grid-cols-2 gap-4">
                {question.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => checkAnswer(option)}
                    disabled={showResult}
                    className="px-6 py-3 text-xl bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </>
          )}

          {showResult && (
            <div
              className={`text-xl font-bold ${
                isCorrect ? "text-green-500" : "text-red-500"
              }`}
            >
              {isCorrect ? "🎉 Correct!" : "❌ Try again!"}
            </div>
          )}

          {showResult && (
            <button
              onClick={generateQuestion}
              className="mt-4 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              Next Question
            </button>
          )}
        </div>
      )}
    </main>
  );
}
