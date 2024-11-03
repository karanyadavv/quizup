import { Route, Routes } from "react-router-dom";
import QuizForm from "./components/QuizForm";
import Quiz from "./components/Quiz";

function App() {
  return (
    <>
      <div className="text-3xl font-bold underline flex justify-center items-center">
        Quizup
      </div>
      <Routes>
        <Route path="/" element={<QuizForm />} />
        <Route path="/quiz" element={<Quiz />} />
      </Routes>
    </>
  );
}

export default App;
