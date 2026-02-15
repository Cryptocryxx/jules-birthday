import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import { TicTacToe } from "./games/TicTacToe";
import { MemoryGame } from "./games/MemoryGame";
import { RockPaperScissors } from "./games/RockPaperScissors";
import { Trivia } from "./games/Trivia";
import { QuickMath } from "./games/QuickMath";
import { WordGuess } from "./games/WordGuess";
import { ColorMatch } from "./games/ColorMatch";

interface GameDialogProps {
  isOpen: boolean;
  gameType: string;
  onWin: () => void;
  onClose: () => void;
}

export function GameDialog({ isOpen, gameType, onWin, onClose }: GameDialogProps) {
  const renderGame = () => {
    switch (gameType) {
      case "Tic Tac Toe":
        return <TicTacToe onWin={onWin} onClose={onClose} />;
      case "Memory Match":
        return <MemoryGame onWin={onWin} onClose={onClose} />;
      case "Rock Paper Scissors":
        return <RockPaperScissors onWin={onWin} onClose={onClose} />;
      case "Love Trivia":
        return <Trivia onWin={onWin} onClose={onClose} />;
      case "Quick Math":
        return <QuickMath onWin={onWin} onClose={onClose} />;
      case "Word Guess":
        return <WordGuess onWin={onWin} onClose={onClose} />;
      case "Color Match":
        return <ColorMatch onWin={onWin} onClose={onClose} />;
      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Dialog */}
          <motion.div
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-2xl px-4"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="bg-white rounded-2xl shadow-2xl p-8 relative">
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Game content */}
              <div className="flex justify-center">
                {renderGame()}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
