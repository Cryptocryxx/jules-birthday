import { motion } from "motion/react";
import { Heart, Gamepad2, Gift } from "lucide-react";
import { Button } from "./ui/button";

interface IntroOverlayProps {
  onStart: () => void;
}

export function IntroOverlay({ onStart }: IntroOverlayProps) {
  return (
    <motion.div
      className="fixed inset-0 bg-gradient-to-br from-pink-500 via-rose-500 to-red-500 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="bg-white rounded-3xl shadow-2xl p-6 sm:p-12 w-full max-w-lg sm:max-w-2xl text-center"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
      >
        {/* Icon */}
        <motion.div
          className="flex justify-center gap-4 mb-6"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-14 h-14 sm:w-20 sm:h-20 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full flex items-center justify-center">
            <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-white fill-white" />
          </div>
          <div className="w-14 h-14 sm:w-20 sm:h-20 bg-gradient-to-br from-rose-400 to-red-500 rounded-full flex items-center justify-center">
            <Gamepad2 className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </div>
          <div className="w-14 h-14 sm:w-20 sm:h-20 bg-gradient-to-br from-red-400 to-pink-500 rounded-full flex items-center justify-center">
            <Gift className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </div>
        </motion.div>

        {/* Title */}
        <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-6">
          Happyyyy Birthdayyy Juleees!
        </h1>

        {/* Description */}
        <div className="space-y-4 text-base sm:text-lg text-gray-700 mb-8">
          <p>
            I've planned <span className="font-bold">THE ULTIMATE WEEKEND!</span>
          </p>

          {/* Twist Box */}
          <div className="bg-rose-50 border-2 border-rose-400 rounded-xl p-3 sm:p-4 my-4 sm:my-6">
            <p className="text-rose-700 font-semibold">
              But because you're so selfish and not here there's a Twist..
            </p>
          </div>

          <p>
            that means that you have to work for you're present. You need to beat me in <span className="font-bold text-rose-600">7 different games</span> to unlock each part of our amazing weekend together!
          </p>

          <p>
            If you don't manage to beat me in one game before the weekend we're not gonna do it. <span className="font-bold text-rose-600">Have fun!</span>
          </p>
        </div>

        {/* Start Button */}
        <Button
          onClick={onStart}
          className="bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 hover:from-pink-600 hover:via-rose-600 hover:to-red-600 text-white text-lg sm:text-xl px-6 sm:px-12 py-3 sm:py-7 rounded-full shadow-lg"
        >
          Let's gooooo!
        </Button>
      </motion.div>
    </motion.div>
  );
}