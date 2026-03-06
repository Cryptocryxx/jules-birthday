import { motion } from "motion/react";
import { Gift } from "lucide-react";

interface ApologyOverlayProps {
  onAccept: () => void;
}

export function ApologyOverlay({ onAccept }: ApologyOverlayProps) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-gradient-to-br from-white via-rose-50 to-pink-50 rounded-3xl shadow-2xl p-8 sm:p-12 max-w-lg w-full relative overflow-hidden border-4 border-rose-200"
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-rose-200 rounded-full blur-3xl opacity-30 -z-10" />
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-pink-200 rounded-full blur-3xl opacity-30 -z-10" />

        {/* Gift Icon */}
        <motion.div
          className="flex justify-center mb-6"
          animate={{ 
            rotate: [0, -10, 10, -10, 10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatDelay: 1
          }}
        >
          <div className="bg-gradient-to-br from-rose-400 to-pink-500 rounded-full p-6 shadow-xl">
            <Gift className="w-16 h-16 text-white" strokeWidth={2.5} />
          </div>
        </motion.div>

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-rose-600 via-pink-600 to-red-600 bg-clip-text text-transparent">
          My Apologies!
        </h1>

        {/* Message */}
        <div className="text-center space-y-4 mb-8">
          <p className="text-lg sm:text-xl text-gray-700 leading-relaxed">
            Please accept the gift I've prepared for you. To make up for my inability to control myself when seeing you{" "}
            <span className="italic text-rose-600">(or pictures of you lol)</span>
          </p>
        </div>

        {/* Button */}
        <motion.button
          onClick={onAccept}
          className="w-full bg-gradient-to-r from-rose-500 via-pink-500 to-red-500 hover:from-rose-600 hover:via-pink-600 hover:to-red-600 text-white font-bold py-4 px-8 rounded-2xl shadow-lg text-lg transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Take me to it 💝
        </motion.button>

        {/* Floating hearts animation */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-rose-400 opacity-50"
            style={{
              left: `${20 + i * 20}%`,
              bottom: -20,
            }}
            animate={{
              y: [-20, -300],
              opacity: [0.5, 0],
              scale: [0.5, 1.5],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeOut",
            }}
          >
            ❤️
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
