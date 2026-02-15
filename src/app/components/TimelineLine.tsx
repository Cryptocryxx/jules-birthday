import { motion } from "motion/react";

interface TimelineLineProps {
  totalCards: number;
}

export function TimelineLine({ totalCards }: TimelineLineProps) {
  return (
    <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 flex flex-col items-center pointer-events-none">
      {/* Main line */}
      <motion.div
        className="w-1 bg-gradient-to-b from-rose-200 via-rose-300 to-rose-400 rounded-full"
        initial={{ height: 0 }}
        animate={{ height: "100%" }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        style={{ transformOrigin: "top" }}
      />
    </div>
  );
}
