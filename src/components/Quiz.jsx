import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"


export default function Quiz(){
  const location  = useLocation();
  const questions = location.state;
  const DATA_LENGTH = questions.length;
  const [ currentQuestionIndex, setCurrentQuestionIndex ] = useState(0);
  const [ shuffledAnswers, setShuffledAnswers ] = useState([]);

  const currentQuestion = questions?.[currentQuestionIndex];

  console.log('Questions data:', questions); 

  useEffect(()=>{
    if(questions?.[currentQuestionIndex]){
      const allAnswers = [questions[currentQuestionIndex].correct_answer,...questions[currentQuestionIndex].incorrect_answers];
      console.log(allAnswers);
      const shuffled = [...allAnswers].sort(()=> Math.random() - 0.5);
      setShuffledAnswers(shuffled);

    }
  },[currentQuestion])


  const handleUserAnswer = (event) => {
    if(event.target.value === questions[currentQuestionIndex].correct_answer){
      console.log("correct answer")
    }else{
      console.log("incorrect answer");
    }
  }
  const handleContinue = ()=> {
    setCurrentQuestionIndex((prev)=>{
      if(prev === DATA_LENGTH + 1){
        return;
      }else{
        return prev + 1;
      }
    })
  }
  return(
    <>
    Hello from quiz
    {currentQuestion && (
      <div>{currentQuestion.question}</div>
    )}
    { currentQuestion && (
      shuffledAnswers.map((answer, index)=>{
        return (
        <button key={index} onClick={handleUserAnswer} value={answer} className="flex justify-center items-center">
          {answer}
        </button>
        )
      })
    )
    }
    <button onClick={handleContinue}>Continue</button>
    </>
  )
}