import { motion } from "motion/react";
import { Lock, X } from "lucide-react";
import { useState } from "react";

interface AdminOverlayProps {
  onClose: () => void;
  onSuccess: () => void;
}

export function AdminOverlay({ onClose, onSuccess }: AdminOverlayProps) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "IkBenEenAppel") {
      onSuccess();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full relative"
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full p-4 shadow-lg">
            <Lock className="w-12 h-12 text-white" strokeWidth={2.5} />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-3xl font-bold text-center mb-2 text-gray-900">
          Admin Access
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Enter the master password
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Master Password"
              className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all ${
                error
                  ? "border-red-500 focus:ring-red-500 shake"
                  : "border-gray-200 focus:border-purple-500 focus:ring-purple-500"
              }`}
              autoFocus
            />
            {error && (
              <motion.p
                className="text-red-500 text-sm mt-2"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                Incorrect password. Try again.
              </motion.p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl"
          >
            Unlock Admin Panel
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
}
