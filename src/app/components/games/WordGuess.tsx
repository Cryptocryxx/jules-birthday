import { useState } from "react";
import { motion } from "motion/react";
import { Button } from "../ui/button";

interface WordGuessProps {
  onWin: () => void;
  onClose: () => void;
}

const words = [
  { word: "LOVE", hint: "What I feel for you" },
  { word: "KISS", hint: "What I want to give you" },
  { word: "HEART", hint: "What you stole from me" },
];

export function WordGuess({ onWin, onClose }: WordGuessProps) {
  const [currentWord] = useState(words[Math.floor(Math.random() * words.length)]);
  const [guessed, setGuessed] = useState<string[]>([]);
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const maxWrong = 6;

  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  const handleGuess = (letter: string) => {
    if (guessed.includes(letter)) return;

    const newGuessed = [...guessed, letter];
    setGuessed(newGuessed);

    if (!currentWord.word.includes(letter)) {
      setWrongGuesses(wrongGuesses + 1);
    }

    // Check if won
    const won = currentWord.word.split("").every((l) => newGuessed.includes(l));
    if (won) {
      setTimeout(() => onWin(), 1500);
    }
  };

  const displayWord = currentWord.word
    .split("")
    .map((letter) => (guessed.includes(letter) ? letter : "_"))
    .join(" ");

  const isGameOver = wrongGuesses >= maxWrong;
  const isWon = currentWord.word.split("").every((l) => guessed.includes(l));

  return (
    <div className="flex flex-col items-center w-full max-w-md">
      <h3 className="text-2xl font-bold text-gray-900 mb-2">Word Guess</h3>
      <p className="text-gray-600 mb-6">Guess the word letter by letter!</p>

      <div className="mb-4">
        <p className="text-sm text-gray-600">Hint: {currentWord.hint}</p>
      </div>

      <motion.div
        className="text-5xl font-bold text-gray-900 mb-6 tracking-wider"
        key={displayWord}
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
      >
        {displayWord}
      </motion.div>

      <div className="mb-6">
        <p className="text-sm text-gray-600">
          Wrong guesses: {wrongGuesses}/{maxWrong}
        </p>
        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
          <div
            className="bg-red-500 h-2 rounded-full transition-all"
            style={{ width: `${(wrongGuesses / maxWrong) * 100}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2 mb-6">
        {letters.map((letter) => (
          <motion.button
            key={letter}
            onClick={() => handleGuess(letter)}
            disabled={guessed.includes(letter) || isGameOver || isWon}
            className={`w-10 h-10 rounded-lg font-semibold ${
              guessed.includes(letter)
                ? currentWord.word.includes(letter)
                  ? "bg-green-500 text-white"
                  : "bg-red-500 text-white"
                : "bg-gray-200 text-gray-900 hover:bg-rose-200"
            }`}
            whileHover={{ scale: guessed.includes(letter) ? 1 : 1.1 }}
            whileTap={{ scale: guessed.includes(letter) ? 1 : 0.95 }}
          >
            {letter}
          </motion.button>
        ))}
      </div>

      {isWon && (
        <motion.div
          className="text-center mb-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <p className="text-2xl font-bold text-green-600">You got it! 🎉</p>
        </motion.div>
      )}

      {isGameOver && !isWon && (
        <motion.div
          className="text-center mb-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <p className="text-xl font-semibold text-red-600">
            Game over! The word was: {currentWord.word}
          </p>
        </motion.div>
      )}

      <Button onClick={onClose} variant="outline">
        Close
      </Button>
    </div>
  );
}
