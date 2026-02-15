import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Heart, Star, Sparkles, Moon, Sun, Cloud, Zap, Coffee } from "lucide-react";
import { Button } from "../ui/button";

interface MemoryGameProps {
  onWin: () => void;
  onClose: () => void;
}

const icons = [Heart, Star, Sparkles, Moon, Sun, Cloud, Zap, Coffee];

export function MemoryGame({ onWin, onClose }: MemoryGameProps) {
  const [cards, setCards] = useState<number[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);

  useEffect(() => {
    initGame();
  }, []);

  const initGame = () => {
    const cardPairs = [...Array(8)].flatMap((_, i) => [i, i]);
    const shuffled = cardPairs.sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setFlipped([]);
    setMatched([]);
    setMoves(0);
  };

  const handleCardClick = (index: number) => {
    if (flipped.length === 2 || flipped.includes(index) || matched.includes(index)) {
      return;
    }

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(moves + 1);
      const [first, second] = newFlipped;
      
      if (cards[first] === cards[second]) {
        setMatched([...matched, first, second]);
        setFlipped([]);
        
        if (matched.length + 2 === cards.length) {
          setTimeout(() => onWin(), 1000);
        }
      } else {
        setTimeout(() => setFlipped([]), 1000);
      }
    }
  };

  const isFlipped = (index: number) => flipped.includes(index) || matched.includes(index);
  const Icon = (index: number) => icons[cards[index]];

  return (
    <div className="flex flex-col items-center">
      <h3 className="text-2xl font-bold text-gray-900 mb-2">Memory Match</h3>
      <p className="text-gray-600 mb-4">Find all matching pairs!</p>
      <p className="text-sm text-gray-500 mb-6">Moves: {moves}</p>

      <div className="grid grid-cols-4 gap-3 mb-6">
        {cards.map((_, index) => {
          const IconComponent = Icon(index);
          return (
            <motion.button
              key={index}
              onClick={() => handleCardClick(index)}
              className="w-16 h-16 rounded-lg flex items-center justify-center"
              style={{
                backgroundColor: isFlipped(index) ? "#fff" : "#e5e7eb",
                border: isFlipped(index) ? "2px solid #fb7185" : "2px solid #e5e7eb",
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isFlipped(index) ? (
                <motion.div
                  initial={{ rotateY: 90 }}
                  animate={{ rotateY: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <IconComponent className="w-8 h-8 text-rose-500" />
                </motion.div>
              ) : (
                <div className="w-8 h-8 bg-gray-300 rounded" />
              )}
            </motion.button>
          );
        })}
      </div>

      {matched.length === cards.length && (
        <motion.div
          className="text-center mb-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <p className="text-2xl font-bold text-green-600">Perfect! You won! 🎉</p>
        </motion.div>
      )}

      <div className="flex gap-3">
        <Button onClick={initGame} variant="outline">
          Reset
        </Button>
        <Button onClick={onClose} variant="outline">
          Close
        </Button>
      </div>
    </div>
  );
}
