import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Button } from "../ui/button";

interface ColorMatchProps {
  onWin: () => void;
  onClose: () => void;
}

const colors = [
  { name: "Red", hex: "#ef4444" },
  { name: "Blue", hex: "#3b82f6" },
  { name: "Green", hex: "#22c55e" },
  { name: "Yellow", hex: "#eab308" },
  { name: "Purple", hex: "#a855f7" },
  { name: "Pink", hex: "#ec4899" },
];

export function ColorMatch({ onWin, onClose }: ColorMatchProps) {
  const [displayColor, setDisplayColor] = useState(colors[0]);
  const [textColor, setTextColor] = useState(colors[1]);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState<boolean | null>(null);

  const generateRound = () => {
    const display = colors[Math.floor(Math.random() * colors.length)];
    const text = colors[Math.floor(Math.random() * colors.length)];
    setDisplayColor(display);
    setTextColor(text);
    setShowResult(null);
  };

  useEffect(() => {
    generateRound();
  }, []);

  const handleAnswer = (matches: boolean) => {
    const actualMatch = displayColor.name === textColor.name;
    const correct = matches === actualMatch;

    setShowResult(correct);

    if (correct) {
      const newScore = score + 1;
      setScore(newScore);

      if (newScore >= 5) {
        setTimeout(() => onWin(), 1500);
      } else {
        setTimeout(() => generateRound(), 1000);
      }
    } else {
      setTimeout(() => generateRound(), 1500);
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-md">
      <h3 className="text-2xl font-bold text-gray-900 mb-2">Color Match</h3>
      <p className="text-gray-600 mb-2">Does the word match the color?</p>
      <p className="text-sm font-semibold text-rose-600 mb-6">Score: {score}/5</p>

      <motion.div
        key={`${displayColor.name}-${textColor.name}`}
        className="mb-8 text-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div
          className="text-7xl font-bold mb-4"
          style={{ color: displayColor.hex }}
        >
          {textColor.name}
        </div>
      </motion.div>

      {showResult === null ? (
        <div className="flex gap-4 mb-6">
          <Button
            onClick={() => handleAnswer(true)}
            className="w-32 h-16 text-lg bg-green-500 hover:bg-green-600"
          >
            Match ✓
          </Button>
          <Button
            onClick={() => handleAnswer(false)}
            className="w-32 h-16 text-lg bg-red-500 hover:bg-red-600"
          >
            No Match ✗
          </Button>
        </div>
      ) : (
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {showResult ? (
            <p className="text-2xl font-bold text-green-600">Correct! 🎉</p>
          ) : (
            <p className="text-xl font-semibold text-red-600">Wrong! Try again 💕</p>
          )}
        </motion.div>
      )}

      <Button onClick={onClose} variant="outline">
        Close
      </Button>
    </div>
  );
}
