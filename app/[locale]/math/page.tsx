"use client";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import PageLayout from "../../components/PageLayout";
import EmotionalRobot from "../../components/robots/EmotionalRobot";

interface Question {
  question: string;
  answer: string;
  num1?: number;
  num2?: number;
  options?: number[];
  isComparison?: boolean;
}

type Operation = "add" | "subtract" | "multiply" | "compare";

export default function MathGame() {
  const t = useTranslations("math");
  const [question, setQuestion] = useState<Question | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedOperation, setSelectedOperation] = useState<Operation | null>(
    null
  );
  const [selectedSign, setSelectedSign] = useState<string | null>(null);
  const [robotEmotion, setRobotEmotion] = useState<
    "neutral" | "happy" | "sad" | "surprise"
  >("happy");

  const generateQuestion = () => {
    setIsLoading(true);
    setShowResult(false);
    setRobotEmotion("happy");
    setSelectedSign(null);

    const num1 = Math.floor(Math.random() * 100);
    const num2 = Math.floor(Math.random() * 100);

    if (selectedOperation === "compare") {
      let answer;
      if (num1 > num2) {
        answer = ">";
      } else if (num1 < num2) {
        answer = "<";
      } else {
        answer = "=";
      }
      setQuestion({
        question: t("comparison.question"),
        answer,
        num1,
        num2,
        isComparison: true
      });
      setIsLoading(false);
      return;
    }

    let answer: number;
    let operator: string;
    let questionNum1 = num1;
    let questionNum2 = num2;

    switch (selectedOperation) {
      case "add":
        questionNum1 = Math.floor(Math.random() * 10) + 1;
        questionNum2 = Math.floor(Math.random() * 10) + 1;
        answer = questionNum1 + questionNum2;
        operator = "+";
        break;
      case "subtract":
        questionNum1 = Math.floor(Math.random() * 10) + 1;
        questionNum2 = Math.floor(Math.random() * 10) + 1;
        answer = questionNum1 - questionNum2;
        operator = "-";
        break;
      case "multiply":
        questionNum1 = Math.floor(Math.random() * 3) + 1;
        questionNum2 = Math.floor(Math.random() * 3) + 1;
        answer = questionNum1 * questionNum2;
        operator = "×";
        break;
      default:
        answer = 0;
        operator = "";
    }

    const questionText = t("question", {
      num1: questionNum1,
      num2: questionNum2,
      operator,
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
      answer: answer.toString(),
      options,
    });

    setIsLoading(false);
  };

  const checkAnswer = (selectedAnswer: string | number) => {
    if (!question) return;

    if (question.isComparison) {
      setSelectedSign(selectedAnswer.toString());
    }

    const correct = selectedAnswer.toString() === question.answer;
    setIsCorrect(correct);
    setShowResult(true);

    if (correct) {
      setRobotEmotion("surprise");
      setScore(score + 1);
    } else {
      setRobotEmotion("sad");
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

  // Get robot message based on emotion
  const getRobotMessage = () => {
    if (!showResult) return t("robotMessages.thinking");

    if (isCorrect) {
      return t("robotMessages.correct");
    } else {
      return t("robotMessages.incorrect");
    }
    
    // Default message when no result is showing
    return t("robotMessages.thinking");  };

  return (
    <PageLayout showBackButton={false}>
      <h1 className="text-4xl font-[900] mb-2 text-[#085cb1]">{t("title")}</h1>
      
      {selectedOperation && (
        <div className="text-2xl mb-6 text-[#FF6B9D] font-bold">
          {t("score", { score })}
        </div>
      )}

      {!selectedOperation ? (
        <div className="flex flex-col items-center gap-6 w-full max-w-6xl">
          <div className="text-2xl font-semibold mb-6 text-[#4B5563]">
            {t("chooseOperation")}
          </div>
          <div className="w-full max-w-md grid grid-cols-2 gap-8 mb-8">
            <button
              onClick={() => selectOperation("add")}
              className="w-44 h-44 rounded-full bg-[#4ADE80] text-white p-6 flex flex-col items-center justify-center hover:scale-105 transition-transform duration-300 shadow-lg"
            >
              <span className="text-6xl mb-2">+</span>
              <span className="text-xl font-semibold">
                {t("operations.addition")}
              </span>
            </button>
            <button
              onClick={() => selectOperation("subtract")}
              className="w-44 h-44 rounded-full bg-[#FFD700] text-white p-6 flex flex-col items-center justify-center hover:scale-105 transition-transform duration-300 shadow-lg"
            >
              <span className="text-6xl mb-2">−</span>
              <span className="text-xl font-semibold">
                {t("operations.subtraction")}
              </span>
            </button>
            <button
              onClick={() => selectOperation("multiply")}
              className="w-44 h-44 rounded-full bg-[#EF4444] text-white p-6 flex flex-col items-center justify-center hover:scale-105 transition-transform duration-300 shadow-lg"
            >
              <span className="text-6xl mb-2">×</span>
              <span className="text-xl font-semibold">
                {t("operations.multiplication")}
              </span>
            </button>
            <button
              onClick={() => selectOperation("compare")}
              className="w-44 h-44 rounded-full bg-[#9333EA] text-white p-6 flex flex-col items-center justify-center hover:scale-105 transition-transform duration-300 shadow-lg"
            >
              <span className="text-6xl mb-2">&lt;&gt;</span>
              <span className="text-xl font-semibold">
                {t("operations.comparison")}
              </span>
            </button>
          </div>
        </div>
      ) : (
        <div className="relative w-full">
          <button
            onClick={() => setSelectedOperation(null)}
            className="absolute -top-28 left-0 px-6 py-3 text-lg bg-[#FFD700] text-white rounded-full hover:bg-[#FFD700]/90 transition-colors font-semibold hover:scale-105"
          >
            {t("changeOperation")}
          </button>
          
          {isLoading ? (
            <Loader2 className="h-8 w-8 animate-spin text-[#FF6B9D]" />
          ) : (
            <div className="flex flex-col items-center gap-6">
              {/* Robot with emotion and speech bubble */}
              <div className="relative mb-8">
                <div className="mb-4 transition-all duration-300">
                  <EmotionalRobot emotion={robotEmotion} size={200} />
                </div>

                {/* Speech bubble */}
                <div className="absolute right-[-200px] top-16 bg-white p-4 rounded-xl shadow-md max-w-[200px] border-2 border-[#FFB6C1] before:content-[''] before:absolute before:left-[-10px] before:top-[20px] before:border-t-[10px] before:border-r-[10px] before:border-b-[10px] before:border-t-transparent before:border-r-white before:border-b-transparent">
                  <p className="text-[#1a1a1a] text-sm font-medium">
                    {getRobotMessage()}
                  </p>
                </div>
              </div>

              {question && (
                <>
                  <div className="text-2xl font-semibold mb-4 text-[#4B5563]">
                    {question.isComparison ? (
                      <div className="flex items-center gap-10 justify-center">
                        <span className="text-4xl font-bold">{question.num1}</span>
                        {selectedSign ? (
                          <div className={`w-14 h-14 text-2xl rounded-full shadow-md flex items-center justify-center font-bold
                            ${selectedSign === "<" ? "bg-[#FF6B9D] text-white" : 
                              selectedSign === "=" ? "bg-[#FFD700] text-white" : 
                              "bg-[#3B82F6] text-white"}`}>
                            {selectedSign === "<" ? "<" : 
                             selectedSign === "=" ? "=" : 
                             ">"}
                          </div>
                        ) : (
                          <span className="w-14 h-14 bg-gray-100 rounded-lg flex items-center justify-center text-2xl">?</span>
                        )}
                        <span className="text-4xl font-bold">{question.num2}</span>
                      </div>
                    ) : (
                      question.question
                    )}
                  </div>
                  <div className={`grid ${question.isComparison ? 'grid-cols-3' : 'grid-cols-2'} gap-4`}>
                    {question.isComparison ? (
                      <>
                        <button
                          onClick={() => checkAnswer("<")}
                          disabled={showResult}
                          className="w-20 h-20 text-2xl bg-[#FF6B9D] text-white rounded-full shadow-md hover:shadow-xl hover:scale-110 transition-all duration-300 disabled:opacity-50 flex items-center justify-center font-bold"
                        >
                          &lt;
                        </button>
                        <button
                          onClick={() => checkAnswer("=")}
                          disabled={showResult}
                          className="w-20 h-20 text-2xl bg-[#FFD700] text-white rounded-full shadow-md hover:shadow-xl hover:scale-110 transition-all duration-300 disabled:opacity-50 flex items-center justify-center font-bold"
                        >
                          =
                        </button>
                        <button
                          onClick={() => checkAnswer(">")}
                          disabled={showResult}
                          className="w-20 h-20 text-2xl bg-[#3B82F6] text-white rounded-full shadow-md hover:shadow-xl hover:scale-110 transition-all duration-300 disabled:opacity-50 flex items-center justify-center font-bold"
                        >
                          &gt;
                        </button>
                      </>
                    ) : (
                      question.options?.map((option, index) => {
                        // Get color class based on index
                        let colorClass = "";
                        switch (index % 6) {
                          case 0:
                            colorClass = "bg-[#FF6B9D]"; // Pink
                            break;
                          case 1:
                            colorClass = "bg-[#FFD700]"; // Yellow
                            break;
                          case 2:
                            colorClass = "bg-[#3B82F6]"; // Blue
                            break;
                          case 3:
                            colorClass = "bg-[#4ADE80]"; // Green
                            break;
                          case 4:
                            colorClass = "bg-[#F97316]"; // Orange
                            break;
                          case 5:
                            colorClass = "bg-[#8B5CF6]"; // Purple
                            break;
                        }
                        
                        return (
                          <button
                            key={index}
                            onClick={() => checkAnswer(option)}
                            disabled={showResult}
                            className={`w-20 h-20 text-2xl ${colorClass} text-white rounded-full shadow-md hover:shadow-xl hover:scale-110 transition-all duration-300 disabled:opacity-50 flex items-center justify-center font-bold`}
                          >
                            {option}
                          </button>
                        );
                      })
                    )}
                  </div>
                </>
              )}

              {showResult && (
                <>
                  {isCorrect ? (
                    <div className="text-xl font-bold text-green-500">
                      {question?.isComparison
                        ? t("comparison.correct", { num1: question.num1, num2: question.num2, symbol: question.answer })
                        : t("correct")}
                    </div>
                  ) : (
                    <div className="text-xl font-bold text-red-500">
                      {question?.isComparison ? t("comparison.incorrect") : t("incorrect")}
                    </div>
                  )}

                  <button
                    onClick={isCorrect ? generateQuestion : () => setShowResult(false)}
                    className="mt-4 px-6 py-3 bg-[#FF6B9D] text-white rounded-lg hover:bg-[#FF6B9D]/90"
                  >
                    {isCorrect ? t("nextQuestion") : t("tryAgain")}
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      )}
    </PageLayout>
  );
}
