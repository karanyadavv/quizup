import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { decode } from "html-entities";

export default function Quiz() {
  const location = useLocation();
  const questions = location.state;
  const DATA_LENGTH = questions.length;
  let CORRECT_ANSWERS = 0;
  let correctAnswerRef = useRef(CORRECT_ANSWERS);
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
  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center p-4 font-inter">
        <div className="flex gap-2 items-center">
          <div className="border bg-[#f4f3f6] rounded-lg w-80 h-4 md:w-90"></div>
          <span className="text-sm text-gray-500">1/{DATA_LENGTH}</span>
        </div>

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
                  className="w-full py-3 px-4 text-left bg-[#f4f3f6] rounded-md duration-200"
                >
                  {decode(answer)}
                </button>
              ))}
            </div>
          </div>
        )}
        <button
          onClick={handleContinue}
          className="bg-[#31cd63] text-white w-[200px] h-[50px] font-bold rounded-md"
        >
          CONTINUE
        </button>
      </div>
    </>
  );
}
