import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { decode } from "html-entities";

export default function Quiz() {
  const location = useLocation();
  const questions = location.state;
  const DATA_LENGTH = questions.length;
  let correctAnswerRef = useRef(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [shuffledAnswers, setShuffledAnswers] = useState([]);

  const currentQuestion = questions?.[currentQuestionIndex];

  useEffect(() => {
    if (questions?.[currentQuestionIndex]) {
      const allAnswers = [
        questions[currentQuestionIndex].correct_answer,
        ...questions[currentQuestionIndex].incorrect_answers,
      ];
      const shuffled = [...allAnswers].sort(() => Math.random() - 0.5);
      setShuffledAnswers(shuffled);
    }
  }, [currentQuestion]);

  const handleUserAnswer = (event) => {
    if (event.target.value === questions[currentQuestionIndex].correct_answer) {
      correctAnswerRef.current++;
      console.log("correct answer");
    } else {
      console.log("incorrect answer");
    }
  };
  const handleContinue = () => {
    setCurrentQuestionIndex((prev) => {
      if (prev === DATA_LENGTH + 1) {
        return;
      } else {
        return prev + 1;
      }
    });
  };

  function CloseButtonSVG() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="#f4f3f6"
        strokeWidth={1}
        stroke="black"
        className="size-8 top-4 right-8 md:top-14 md:right-80 absolute cursor-pointer"
      >
        <path
          fillRule="evenodd"
          d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
          clipRule="evenodd"
        />
      </svg>
    );

    function CheckMarkSVG() {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-6"
        >
          <path
            fillRule="evenodd"
            d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
            clipRule="evenodd"
          />
        </svg>
      );
    }
  }
  return (
    <>
      <CloseButtonSVG />
      <div className="min-h-screen flex flex-col items-center justify-center p-4 gap-40 mt-2 font-inter">
        {currentQuestion && (
          <div className="flex gap-2 items-center">
            <div className="border bg-[#f4f3f6] rounded-lg w-80 h-4 relative overflow-hidden md:w-90">
              <div
                className="absolute bg-[#31cd63]"
                style={{ transform: `translateX(${10 - 100}%)` }}
              ></div>
            </div>
            <span className="text-sm text-gray-500">1/{DATA_LENGTH}</span>
          </div>
        )}
        {currentQuestion && (
          <div className="w-full max-w-2xl p-6 mb-6">
            <p className="text-xl text-[#2e3270] mb-6 font-bold">
              {decode(currentQuestion.question)}
            </p>

            <div className="grid grid-cols-1 gap-4">
              {shuffledAnswers.map((answer, index) => (
                <button
                  key={index}
                  onClick={handleUserAnswer}
                  value={answer}
                  className="w-full h-14 py-3 px-4 text-left bg-[#f4f3f6] rounded-md duration-200"
                >
                  {decode(answer)}
                </button>
              ))}
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
          className="bg-[#31cd63] text-white w-5/6 md:w-[200px] h-14 font-bold rounded-md"
        >
          {currentQuestionIndex < DATA_LENGTH ? "CONTINUE" : "OKAY"}
        </button>
      </div>
    </>
  );
}
