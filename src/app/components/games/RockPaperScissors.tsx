import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "../ui/button";

interface RockPaperScissorsProps {
  onWin: () => void;
  onClose: () => void;
}

type Choice = "rock" | "paper" | "scissors";

export function RockPaperScissors({ onWin, onClose }: RockPaperScissorsProps) {
  const [playerChoice, setPlayerChoice] = useState<Choice | null>(null);
  const [aiChoice, setAiChoice] = useState<Choice | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [wins, setWins] = useState(0);

  const choices: Choice[] = ["rock", "paper", "scissors"];
  const emojis = { rock: "🪨", paper: "📄", scissors: "✂️" };

  const determineWinner = (player: Choice, ai: Choice): string => {
    if (player === ai) return "draw";
    if (
      (player === "rock" && ai === "scissors") ||
      (player === "paper" && ai === "rock") ||
      (player === "scissors" && ai === "paper")
    ) {
      return "win";
    }
    return "lose";
  };

  const handleChoice = (choice: Choice) => {
    const ai = choices[Math.floor(Math.random() * choices.length)];
    setPlayerChoice(choice);
    setAiChoice(ai);

    const outcome = determineWinner(choice, ai);
    setResult(outcome);

    if (outcome === "win") {
      const newWins = wins + 1;
      setWins(newWins);
      if (newWins >= 2) {
        setTimeout(() => onWin(), 2000);
      }
    }
  };

  const reset = () => {
    setPlayerChoice(null);
    setAiChoice(null);
    setResult(null);
  };

  return (
    <div className="flex flex-col items-center">
      <h3 className="text-2xl font-bold text-gray-900 mb-2">Rock Paper Scissors</h3>
      <p className="text-gray-600 mb-2">Win 2 rounds to unlock!</p>
      <p className="text-sm font-semibold text-rose-600 mb-6">Wins: {wins}/2</p>

      <AnimatePresence mode="wait">
        {!playerChoice ? (
          <motion.div
            key="choices"
            className="flex gap-4 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {choices.map((choice) => (
              <motion.button
                key={choice}
                onClick={() => handleChoice(choice)}
                className="w-24 h-24 bg-gray-100 rounded-xl flex flex-col items-center justify-center hover:bg-rose-100 transition-colors border-2 border-gray-200 hover:border-rose-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-4xl mb-1">{emojis[choice]}</span>
                <span className="text-xs font-semibold text-gray-700 capitalize">
                  {choice}
                </span>
              </motion.button>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="result"
            className="text-center mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="flex gap-8 mb-4">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">You</p>
                <div className="text-6xl">{emojis[playerChoice]}</div>
              </div>
              <div className="flex items-center text-4xl font-bold text-gray-400">VS</div>
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">Me</p>
                <div className="text-6xl">{emojis[aiChoice!]}</div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {result === "win" && (
                <p className="text-2xl font-bold text-green-600">You won this round! 🎉</p>
              )}
              {result === "lose" && (
                <p className="text-xl font-semibold text-gray-700">I won this round! 😊</p>
              )}
              {result === "draw" && (
                <p className="text-xl font-semibold text-gray-700">It's a draw!</p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex gap-3">
        {playerChoice && wins < 2 && (
          <Button onClick={reset}>Play Again</Button>
        )}
        <Button onClick={onClose} variant="outline">
          Close
        </Button>
      </div>
    </div>
  );
}
