import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { decode } from "html-entities";
import CloseButtonSVG from "./CloseButtonSVG";

export default function Quiz() {
  const location = useLocation();
  const questions = location.state;
  const DATA_LENGTH = questions.length;
  let correctAnswerRef = useRef(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [shuffledAnswers, setShuffledAnswers] = useState([]);
  const [isCorrect, setIsCorrect] = useState(false);

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
      setIsCorrect(true);
    } else {
      console.log("incorrect answer");
      setIsCorrect(false);
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
              {shuffledAnswers.map((answer, index) => {
                return (
                  <>
                    {/* <div className="w-full h-14 py-3 px-4 text-left bg-[#f4f3f6] rounded-md duration-200">
                      <input
                        type="radio"
                        id="answer"
                        name="answer"
                        //className="opacity-0"
                      />
                      <label
                        htmlFor="answer"
                        key={index}
                        value={answer}
                        className=""
                      >
                        {decode(answer)}
                      </label>
                    </div> */}
                    <button
                      key={index}
                      onClick={handleUserAnswer}
                      value={answer}
                      className={`w-full h-14 py-3 px-4 text-left bg-[#f4f3f6] rounded-md duration-200 ${
                        isCorrect
                          ? "active:bg-green-500 active:text-white"
                          : "active:bg-red-500"
                      }`}
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
          className="bg-[#31cd63] text-white w-5/6 md:w-[200px] h-14 font-bold rounded-md"
        >
          {currentQuestionIndex < DATA_LENGTH ? "CONTINUE" : "OKAY"}
        </button>
      </div>
    </>
  );
}
