import { useEffect } from "react";
import { useState } from "react";

export default function QuizForm() {
  const [numberOfQuestions, setNumberOfQuestions] = useState(5);
  const [ category, setCategory ] = useState([]);
  const [ selectedCategory, setSelectedCategory ] = useState("");
  const [questions, setQuestions] = useState([]);
  const [difficulty, setDifficulty] = useState("easy" | "medium" | "hard");

  const handleNumberOfQuestions = (e) => {
    setNumberOfQuestions(e.target.value);
  };

  useEffect(() => {
    const fetchCategory = async () => {
      const res = await fetch("https://opentdb.com/api_category.php");
      const data = await res.json();
      setCategory(data.trivia_categories);
    };
    fetchCategory();
  }, []);

  const handleSelectedCategory = (e) => {
    setSelectedCategory(e.target.value);
    console.log("hey",e.target.value)
  }

  const fetchQuestions = async () => {
    const res = await fetch(
      `https://opentdb.com/api.php?amount=${numberOfQuestions}&category=${selectedCategory}&difficulty=hard&type=multiple`
    );
    const data = await res.json();
    setQuestions(data.results);
    console.log(data.response_code);
    console.log(questions);
  };


  return (
    <>
      <div>Enter details:</div>
      <label htmlFor="number">Number of Questions</label>
      <input
        type="number"
        name="number"
        value={numberOfQuestions}
        className="border black"
        onChange={handleNumberOfQuestions}
      />

      <label htmlFor="category">Select Category:</label>
      <select name="category" value={selectedCategory} onChange={handleSelectedCategory}>
      <option value="">Any category</option>
        {category?.map((item) => {
          return (
            <option value={item.id} key={item.id}>
              {item.name}
            </option>
          );
        })}
      </select>

      <label htmlFor="difficulty">Select a difficulty:</label>
      <select name="difficulty" id="difficulty">
        <option value="">Any difficulty</option>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>

      <label htmlFor="type">Select a type:</label>
      <select name="type" id="type">
        <option value="">Any type</option>
        <option value="">Multiple choice</option>
        <option value="">True or False</option>
      </select>

      <button onClick={fetchQuestions}>Start Quiz</button>
    </>
  );
}
