import { useLocation } from "react-router-dom"

export default function Quiz(){
  const location  = useLocation();
  const questions = location.state;
  return(
    <>
    Hello from quiz
    {questions?.map((question, index)=>{
      return(
        <div key={index}>{question.question}</div>
      )
    })}
    </>
  )
}