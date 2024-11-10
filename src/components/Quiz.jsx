import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { decode } from "html-entities";
import CloseButtonSVG from "./CloseButtonSVG";
import ProgressBar from "./ProgressBar";
import reward from "../assets/result.svg";

export default function Quiz() {
  const navigate = useNavigate();
  const location = useLocation();
  const questions = location.state;
  const DATA_LENGTH = questions.length;
  let correctAnswerRef = useRef(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [shuffledAnswers, setShuffledAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

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

  const showClosePopup = () => {
    setShowPopup(true);
  };

  const closeClosePopup = () => {
    setShowPopup(false);
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <>
      {currentQuestion && <CloseButtonSVG onClick={showClosePopup} />}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 space-x-2 rounded shadow-lg max-w-md w-full">
            <h2 className="text-lg font-bold mb-4">
              Are you sure you want to cancel?
            </h2>
            <button
              className="mt-4 bg-white text-black border border-black py-1.5 px-4 rounded hover:bg-gray-500 hover:bg-opacity-50"
              onClick={closeClosePopup}
            >
              Cancel
            </button>
            <button
              className="mt-4 bg-red-500 w-20 text-white py-2 px-4 rounded hover:bg-gray-500 hover:bg-opacity-80"
              onClick={handleCancel}
            >
              Yes
            </button>
          </div>
        </div>
      )}
      <div className="min-h-screen flex flex-col items-center justify-center p-4 space-y-8 mt-2 font-inter relative h-screen">
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
                );
              })}
            </div>
          </div>
        )}

        {!currentQuestion && (
          <div className="w-5/6 h-14 md:w-[250px]">
            <img src={reward} alt="reward" />
            <div className="flex justify-center items-center font-bold text-xl py-4 px-4 gap-24 bg-[#f4f3f6] text-zinc-600 rounded-md duration-200">
              RESULT:
              <span className="flex justify-center items-center text-center bg-slate-500 rounded-full w-8 h-8 text-white relative">
                <span className="absolute left-2.5 top-0.5 text-md">
                  {correctAnswerRef.current}
                </span>
              </span>
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
