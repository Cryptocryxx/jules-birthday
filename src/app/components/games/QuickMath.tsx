import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface QuickMathProps {
  onWin: () => void;
  onClose: () => void;
}

export function QuickMath({ onWin, onClose }: QuickMathProps) {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [answer, setAnswer] = useState("");
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [showResult, setShowResult] = useState<boolean | null>(null);

  const generateQuestion = () => {
    setNum1(Math.floor(Math.random() * 20) + 1);
    setNum2(Math.floor(Math.random() * 20) + 1);
    setAnswer("");
    setShowResult(null);
  };

  useEffect(() => {
    generateQuestion();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const userAnswer = parseInt(answer);
    const correctAnswer = num1 + num2;

    if (userAnswer === correctAnswer) {
      setShowResult(true);
      const newCorrect = correctAnswers + 1;
      setCorrectAnswers(newCorrect);

      if (newCorrect >= 3) {
        setTimeout(() => onWin(), 1500);
      } else {
        setTimeout(() => generateQuestion(), 1500);
      }
    } else {
      setShowResult(false);
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-md">
      <h3 className="text-2xl font-bold text-gray-900 mb-2">Quick Math</h3>
      <p className="text-gray-600 mb-2">Solve 3 problems correctly!</p>
      <p className="text-sm font-semibold text-rose-600 mb-6">
        Correct: {correctAnswers}/3
      </p>

      <motion.div
        key={`${num1}-${num2}`}
        className="text-center mb-6"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="text-6xl font-bold text-gray-900 mb-6">
          {num1} + {num2} = ?
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="number"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Your answer"
            className="text-center text-2xl h-16"
            autoFocus
          />

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600"
            disabled={!answer}
          >
            Submit
          </Button>
        </form>
      </motion.div>

      {showResult !== null && (
        <motion.div
          className="text-center mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {showResult ? (
            <p className="text-2xl font-bold text-green-600">Correct! 🎉</p>
          ) : (
            <p className="text-xl font-semibold text-red-600">Try again! 💕</p>
          )}
        </motion.div>
      )}

      <Button onClick={onClose} variant="outline">
        Close
      </Button>
    </div>
  );
}
