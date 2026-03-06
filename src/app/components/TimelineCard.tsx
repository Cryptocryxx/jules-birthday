import { motion } from "motion/react";
import { Lock, Unlock, Trophy, Clock, Key } from "lucide-react";
import { useState } from "react";

interface TimelineCardProps {
  id: number;
  time: string;
  title: string;
  description: string;
  image: string;
  isLocked: boolean;
  gameName: string;
  gameIcon: React.ReactNode;
  onClick: () => void;
  index: number;
  password?: string;
  isAdminMode?: boolean;
  onToggleLock?: () => void;
}

export function TimelineCard({
  id,
  time,
  title,
  description,
  image,
  isLocked,
  gameName,
  gameIcon,
  onClick,
  index,
  password = "",
  isAdminMode = false,
  onToggleLock,
}: TimelineCardProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <motion.div
      className="relative flex flex-col items-center gap-4 w-full max-w-md mx-auto"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      {/* Timeline dot with card number */}
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: index * 0.1 + 0.2, type: "spring" }}
      >
        <div className={`w-12 h-12 ${isLocked ? 'bg-gradient-to-br from-gray-400 to-gray-600' : 'bg-gradient-to-br from-rose-400 to-rose-600'} rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
          {isLocked ? <Lock className="w-6 h-6" /> : id}
        </div>
      </motion.div>

      {/* Card */}
      <motion.div
        className="w-full cursor-pointer"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onClick}
      >
        <div className="relative bg-white rounded-xl shadow-lg overflow-hidden border-2 border-gray-100 hover:border-rose-300 transition-all">
          {/* Time badge */}
          <div className="absolute top-3 right-3 z-10 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center gap-1.5 shadow-md border border-gray-200">
            <Clock className="w-4 h-4 text-rose-500" />
            <span className="text-sm font-bold text-gray-900">{time}</span>
          </div>

          {/* Admin Controls */}
          {isAdminMode && (
            <div className="absolute top-14 right-3 z-10 flex flex-col gap-2">
              {/* Lock button - toggle locked/unlocked state */}
              <motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleLock?.();
                }}
                className={`${isLocked ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'} text-white rounded-full p-2 shadow-lg`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {isLocked ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
              </motion.button>
              
              {/* Key button - show password */}
              {password && (
                <motion.button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowPassword(!showPassword);
                  }}
                  className="bg-indigo-500 hover:bg-indigo-600 text-white rounded-full p-2 shadow-lg"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Key className="w-4 h-4" />
                </motion.button>
              )}
            </div>
          )}

          {/* Password display */}
          {isAdminMode && showPassword && password && (
            <div className="absolute top-3 left-3 z-10 bg-indigo-600 text-white rounded-lg px-3 py-2 shadow-lg text-sm font-mono">
              {password}
            </div>
          )}

          {/* Image with lock overlay */}
          <div className="relative h-48 overflow-hidden">
            <img
              src={image}
              alt={title}
              className={`w-full h-full object-cover transition-all ${
                isLocked ? "blur-md brightness-50" : ""
              }`}
            />
            
            {/* Lock overlay */}
            {isLocked && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="mb-3"
                >
                  {id === 14 ? (
                    <div className="text-5xl font-bold text-white">FREE</div>
                  ) : (
                    <Lock className="w-12 h-12 text-white" strokeWidth={2.5} />
                  )}
                </motion.div>
                
                {/* Game badge */}
                <div className="bg-white/95 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2 shadow-lg">
                  <div className="text-rose-500">
                    {gameIcon}
                  </div>
                  <span className="text-sm font-semibold text-gray-900">
                    {id === 14 ? "Click to claim!" : gameName}
                  </span>
                </div>
              </div>
            )}

            {/* Unlocked indicator */}
            {!isLocked && (
              <motion.div
                className="absolute top-3 left-3 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full p-2 shadow-lg"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <Trophy className="w-5 h-5 text-white" />
              </motion.div>
            )}
          </div>

          {/* Content */}
          <div className="p-5">
            <h3 className={`text-xl font-bold text-gray-900 mb-2 ${isLocked ? "blur-sm" : ""}`}>
              {isLocked ? "Locked" : title}
            </h3>
            <p className={`text-sm text-gray-600 ${isLocked ? "blur-sm" : ""}`}>
              {isLocked ? "Win the game to unlock!" : description}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}