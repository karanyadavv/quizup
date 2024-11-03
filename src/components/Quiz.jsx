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

  console.log("Questions data:", questions);

  useEffect(() => {
    if (questions?.[currentQuestionIndex]) {
      const allAnswers = [
        questions[currentQuestionIndex].correct_answer,
        ...questions[currentQuestionIndex].incorrect_answers,
      ];
      console.log(allAnswers);
      const shuffled = [...allAnswers].sort(() => Math.random() - 0.5);
      setShuffledAnswers(shuffled);
    }
  }, [currentQuestion]);

  const handleUserAnswer = (event) => {
    if (event.target.value === questions[currentQuestionIndex].correct_answer) {
      correctAnswerRef.current++;
      console.log(correctAnswerRef.current);
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
      Quiz
      {currentQuestion && <div>{decode(currentQuestion.question)}</div>}
      {currentQuestion &&
        shuffledAnswers.map((answer, index) => {
          return (
            <button
              key={index}
              onClick={handleUserAnswer}
              value={answer}
              className="flex justify-center items-center"
            >
              {decode(answer)}
            </button>
          );
        })}
      {!currentQuestion && <div>Result: {correctAnswerRef.current}</div>}
      <button onClick={handleContinue}>Continue</button>
    </>
  );
}
