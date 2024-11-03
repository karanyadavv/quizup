import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function QuizForm() {
  const [numberOfQuestions, setNumberOfQuestions] = useState(5);
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();
  const [difficulty, setDifficulty] = useState("");
  const [type, setType] = useState("");

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

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
  };

  const handleSelectedDifficulty = (e) => {
    setDifficulty(e.target.value);
  };

  const handleType = (e) => {
    setType(e.target.value);
  };

  const fetchQuestions = async () => {
    setIsLoading(true);
    setError("");

    let url = `https://opentdb.com/api.php?amount=${numberOfQuestions}`;

    if (selectedCategory) {
      url += `&category=${selectedCategory}`;
    }
    if (difficulty) {
      url += `&difficulty=${difficulty}`;
    }
    if (type) {
      url += `&type=${type}`;
    }

    try {
      const res = await fetch(url);
      const data = await res.json();
      if (data.response_code === 0) {
        navigate("/quiz", { state: data.results });
      } else {
        setError(
          "Couldn't find questions with those filters. Getting random questions instead..."
        );
        const randomRes = await fetch(
          `https://opentdb.com/api.php?amount=${numberOfQuestions}`
        );
        const randomData = await randomRes.json();

        if (randomData.response_code === 0) {
          navigate("/quiz", { state: randomData.results });
        } else {
          setError("Failed to fetch questions. Please try again.");
        }
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-20 justify-center items-center h-screen font-inter">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Create Your Quiz
        </h1>

        <div className="flex justify-center items-center gap-20">
          <div>
            <label
              htmlFor="number"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Number of Questions:
            </label>
            <input
              type="number"
              name="number"
              value={numberOfQuestions}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-black-500 focus:ring-black-500 sm:text-sm p-2 border"
              onChange={handleNumberOfQuestions}
            />
          </div>
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Select Category:
            </label>
            <select
              name="category"
              value={selectedCategory}
              onChange={handleSelectedCategory}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-black-500 focus:ring-black-500 sm:text-sm p-2 border"
            >
              <option value="">Any category</option>
              {category?.map((item) => {
                return (
                  <option value={item.id} key={item.id}>
                    {item.name}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className="flex justify-center items-center ">
          <div>
            <label
              htmlFor="difficulty"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Select a difficulty:
            </label>
            <select
              name="difficulty"
              id="difficulty"
              value={difficulty}
              onChange={handleSelectedDifficulty}
              className="block w-full md:w-[240px] rounded-md border-gray-300 shadow-sm focus:border-black-500 focus:ring-black-500 sm:text-sm p-2 border"
            >
              <option value="">Any difficulty</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          <div className="md:ml-[60px]">
            <label
              htmlFor="type"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Select a type:
            </label>
            <select
              name="type"
              id="type"
              value={type}
              onChange={handleType}
              className="block w-full md:w-[312px] rounded-md border-gray-300 shadow-sm focus:border-black-500 focus:ring-black-500 sm:text-sm p-2 border"
            >
              <option value="">Any type</option>
              <option value="multiple">Multiple choice</option>
              <option value="boolean">True or False</option>
            </select>
          </div>
        </div>
        <div className="flex justify-center items-center">
          {error && (
            <div className="text-red-500 text-center mt-2">{error}</div>
          )}
          <button
            onClick={fetchQuestions}
            disabled={isLoading}
            className="bg-[#31cd63] text-white w-[200px] h-[50px] font-bold rounded-md"
          >
            {isLoading ? "Loading..." : "START QUIZ"}
          </button>
        </div>
      </div>
    </>
  );
}
