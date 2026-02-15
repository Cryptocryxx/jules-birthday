import { useState } from "react";
import { motion } from "motion/react";
import { X, Circle } from "lucide-react";
import { Button } from "../ui/button";

interface TicTacToeProps {
  onWin: () => void;
  onClose: () => void;
}

type Cell = "X" | "O" | null;

export function TicTacToe({ onWin, onClose }: TicTacToeProps) {
  const [board, setBoard] = useState<Cell[]>(Array(9).fill(null));
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);

  const checkWinner = (squares: Cell[]): Cell => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const makeAIMove = (currentBoard: Cell[]) => {
    const availableMoves = currentBoard
      .map((cell, idx) => (cell === null ? idx : null))
      .filter((idx) => idx !== null) as number[];

    if (availableMoves.length === 0) return;

    // AI makes a random move (intentionally easy to beat)
    const randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
    
    setTimeout(() => {
      const newBoard = [...currentBoard];
      newBoard[randomMove] = "O";
      setBoard(newBoard);
      
      const gameWinner = checkWinner(newBoard);
      if (gameWinner) {
        setGameOver(true);
        setWinner(gameWinner === "X" ? "player" : "ai");
      } else if (!newBoard.includes(null)) {
        setGameOver(true);
        setWinner("draw");
      } else {
        setIsPlayerTurn(true);
      }
    }, 500);
  };

  const handleCellClick = (index: number) => {
    if (!isPlayerTurn || board[index] || gameOver) return;

    const newBoard = [...board];
    newBoard[index] = "X";
    setBoard(newBoard);
    setIsPlayerTurn(false);

    const gameWinner = checkWinner(newBoard);
    if (gameWinner) {
      setGameOver(true);
      setWinner("player");
      setTimeout(() => onWin(), 1500);
    } else if (!newBoard.includes(null)) {
      setGameOver(true);
      setWinner("draw");
    } else {
      makeAIMove(newBoard);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsPlayerTurn(true);
    setGameOver(false);
    setWinner(null);
  };

  return (
    <div className="flex flex-col items-center">
      <h3 className="text-2xl font-bold text-gray-900 mb-2">Tic Tac Toe</h3>
      <p className="text-gray-600 mb-6">Beat me to unlock this card!</p>

      <div className="grid grid-cols-3 gap-3 mb-6">
        {board.map((cell, idx) => (
          <motion.button
            key={idx}
            onClick={() => handleCellClick(idx)}
            className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors disabled:cursor-not-allowed"
            disabled={!isPlayerTurn || !!cell || gameOver}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {cell === "X" && <X className="w-12 h-12 text-rose-500" strokeWidth={3} />}
            {cell === "O" && <Circle className="w-12 h-12 text-blue-500" strokeWidth={3} />}
          </motion.button>
        ))}
      </div>

      {gameOver && (
        <motion.div
          className="text-center mb-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          {winner === "player" && (
            <p className="text-2xl font-bold text-green-600">You won! 🎉</p>
          )}
          {winner === "ai" && (
            <p className="text-xl font-semibold text-gray-700">I won! Try again 😊</p>
          )}
          {winner === "draw" && (
            <p className="text-xl font-semibold text-gray-700">It's a draw! Try again</p>
          )}
        </motion.div>
      )}

      <div className="flex gap-3">
        {gameOver && winner !== "player" && (
          <Button onClick={resetGame} variant="outline">
            Play Again
          </Button>
        )}
        <Button onClick={onClose} variant="outline">
          Close
        </Button>
      </div>
    </div>
  );
}
