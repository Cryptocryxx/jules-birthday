import { useState } from "react";
import { motion } from "motion/react";
import { Button } from "../ui/button";

interface TriviaProps {
  onWin: () => void;
  onClose: () => void;
}

const questions = [
  {
    question: "What's my favorite color?",
    options: ["Blue", "Red", "Green", "Purple"],
    correct: 0,
  },
  {
    question: "Where did we first meet?",
    options: ["Coffee shop", "Park", "Online", "Party"],
    correct: 2,
  },
  {
    question: "What's my favorite food?",
    options: ["Pizza", "Sushi", "Pasta", "Burgers"],
    correct: 1,
  },
];

export function Trivia({ onWin, onClose }: TriviaProps) {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const question = questions[currentQ];

  const handleAnswer = (index: number) => {
    setSelected(index);
    setShowResult(true);

    if (index === question.correct) {
      setTimeout(() => {
        if (currentQ === questions.length - 1) {
          onWin();
        } else {
          setCurrentQ(currentQ + 1);
          setSelected(null);
          setShowResult(false);
        }
      }, 1500);
    }
  };

  const resetQuestion = () => {
    setSelected(null);
    setShowResult(false);
  };

  return (
    <div className="flex flex-col items-center w-full max-w-md">
      <h3 className="text-2xl font-bold text-gray-900 mb-2">Love Trivia</h3>
      <p className="text-gray-600 mb-6">Answer questions about us!</p>

      <div className="w-full mb-4">
        <p className="text-sm text-gray-500 mb-2">
          Question {currentQ + 1} of {questions.length}
        </p>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-rose-500 h-2 rounded-full transition-all"
            style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      <motion.div
        key={currentQ}
        className="w-full mb-6"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <h4 className="text-xl font-semibold text-gray-900 mb-4 text-center">
          {question.question}
        </h4>

        <div className="space-y-3">
          {question.options.map((option, index) => (
            <motion.button
              key={index}
              onClick={() => !showResult && handleAnswer(index)}
              disabled={showResult}
              className={`w-full p-4 rounded-lg border-2 text-left font-medium transition-all ${
                showResult && index === question.correct
                  ? "bg-green-100 border-green-500 text-green-900"
                  : showResult && selected === index
                  ? "bg-red-100 border-red-500 text-red-900"
                  : "bg-white border-gray-200 hover:border-rose-300 text-gray-900"
              }`}
              whileHover={{ scale: showResult ? 1 : 1.02 }}
              whileTap={{ scale: showResult ? 1 : 0.98 }}
            >
              {option}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {showResult && (
        <motion.div
          className="text-center mb-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          {selected === question.correct ? (
            <p className="text-xl font-bold text-green-600">Correct! 🎉</p>
          ) : (
            <p className="text-xl font-semibold text-red-600">Not quite! Try again 💕</p>
          )}
        </motion.div>
      )}

      <div className="flex gap-3">
        {showResult && selected !== question.correct && (
          <Button onClick={resetQuestion}>Try Again</Button>
        )}
        <Button onClick={onClose} variant="outline">
          Close
        </Button>
      </div>
    </div>
  );
}
