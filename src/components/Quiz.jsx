import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { decode } from "html-entities";
import CloseButtonSVG from "./CloseButtonSVG";
import ProgressBar from "./ProgressBar";

export default function Quiz() {
  const location = useLocation();
  const questions = location.state;
  const DATA_LENGTH = questions.length;
  let correctAnswerRef = useRef(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [shuffledAnswers, setShuffledAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);

  const currentQuestion = questions?.[currentQuestionIndex];

  useEffect(() => {
    if (questions?.[currentQuestionIndex]) {
      const allAnswers = [
        questions[currentQuestionIndex].correct_answer,
        ...questions[currentQuestionIndex].incorrect_answers,
      ];
      const shuffled = [...allAnswers].sort(() => Math.random() - 0.5);
      setShuffledAnswers(shuffled);
      setSelectedAnswer(null);
      setIsAnswerChecked(false);
    }
  }, [currentQuestion, questions]);

  const handleUserAnswer = (answer) => {
    if (isAnswerChecked) return;

    setSelectedAnswer(answer);
    setIsAnswerChecked(true);
    if (answer === questions[currentQuestionIndex].correct_answer) {
      correctAnswerRef.current++;
    }
  };

  const handleContinue = () => {
    if (!isAnswerChecked) return;
    setCurrentQuestionIndex((prev) => {
      if (prev === DATA_LENGTH - 1) {
        return prev + 1;
      } else {
        return prev + 1;
      }
    });
  };

  const getAnswerButtonClass = (answer) => {
    if (!isAnswerChecked) {
      return "bg-[#f4f3f6] hover:bg-[#e8e7ea]";
    }

    if (answer === currentQuestion.correct_answer) {
      return "bg-green-500 text-white";
    }

    if (
      answer === selectedAnswer &&
      answer !== currentQuestion.correct_answer
    ) {
      return "bg-red-500 text-white";
    }

    return "bg-[#f4f3f6] opacity-50";
  };

  return (
    <>
      <CloseButtonSVG />
      <div className="min-h-screen flex flex-col items-center justify-center p-4 space-y-10 mt-2 font-inter relative h-screen">
        {currentQuestion && (
          <div className="fixed top-20 left-10 md:left-[750px] right-0">
            <ProgressBar
              currentQuestionIndex={currentQuestionIndex}
              dataLength={DATA_LENGTH}
            />
          </div>
        )}
        {currentQuestion && (
          <div className="w-full max-w-2xl p-6 mb-6">
            <p className="text-xl text-[#2e3270] mb-6 font-bold">
              {decode(currentQuestion.question)}
            </p>

            <div className="grid grid-cols-1 gap-4">
              {shuffledAnswers.map((answer, index) => {
                return (
                  <>
                    <button
                      key={index}
                      onClick={() => handleUserAnswer(answer)}
                      disabled={isAnswerChecked}
                      className={`w-full h-14 py-3 px-4 text-left bg-[#f4f3f6] rounded-md duration-200 ${getAnswerButtonClass(
                        answer
                      )}`}
                    >
                      {decode(answer)}
                    </button>
                  </>
                );
              })}
            </div>
          </div>
        )}

        {!currentQuestion && (
          <div className="w-5/6 h-14 md:w-[200px]">
            <div className="flex py-3 px-4 text-left bg-[#f4f3f6] rounded-md duration-200">
              RESULT: <span>{correctAnswerRef.current}</span>
            </div>
          </div>
        )}
        <button
          onClick={handleContinue}
          disabled={!isAnswerChecked && currentQuestion}
          className={`w-5/6 md:w-[200px] h-14 font-bold rounded-md fixed bottom-16 left-10 md:left-[850px] right-0 ${
            !isAnswerChecked && currentQuestion
              ? "bg-gray-400 text-white cursor-not-allowed"
              : "bg-[#31cd63] text-white hover:bg-[#2bb959]"
          }`}
        >
          {currentQuestionIndex < DATA_LENGTH ? "CONTINUE" : "OKAY"}
        </button>
      </div>
    </>
  );
}
