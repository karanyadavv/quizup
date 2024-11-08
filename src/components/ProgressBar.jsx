export default function ProgressBar({ currentQuestionIndex, DATA_LENGTH }) {
  return (
    <>
      <div className="flex gap-2 items-center">
        <div className="border bg-[#f4f3f6] rounded-lg w-80 h-4 relative overflow-hidden md:w-90">
          <div
            className="absolute bg-[#31cd63]"
            style={{ transform: `translateX(${10 - 100}%)` }}
          ></div>
        </div>
        <span className="text-sm text-gray-500">
          {currentQuestionIndex + 1}/{DATA_LENGTH}
        </span>
      </div>
    </>
  );
}
