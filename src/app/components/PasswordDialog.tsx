import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Lock, CheckCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface PasswordDialogProps {
  isOpen: boolean;
  gameName: string;
  gameDescription: string;
  password: string;
  onWin: () => void;
  onClose: () => void;
  onMasterUnlock?: () => void; // New callback for master password
}

export function PasswordDialog({
  isOpen,
  gameName,
  gameDescription,
  password,
  onWin,
  onClose,
  onMasterUnlock,
}: PasswordDialogProps) {
  const [inputPassword, setInputPassword] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const MASTER_PASSWORD = "IKBENEENAPPEL";
    
    // Check for master password first
    if (inputPassword === MASTER_PASSWORD) {
      setSuccess(true);
      setError(false);
      setTimeout(() => {
        if (onMasterUnlock) {
          onMasterUnlock(); // Unlock all cards
        }
        setInputPassword("");
        setSuccess(false);
      }, 1500);
    } else if (
      inputPassword.toUpperCase() === password.toUpperCase()
    ) {
      setSuccess(true);
      setError(false);
      setTimeout(() => {
        onWin();
        setInputPassword("");
        setSuccess(false);
      }, 1500);
    } else {
      setError(true);
      setTimeout(() => setError(false), 500);
    }
  };

  const handleClose = () => {
    setInputPassword("");
    setError(false);
    setSuccess(false);
    onClose();
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
            onClick={handleClose}
          />

          {/* Dialog */}
          <motion.div
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-lg px-4"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
          >
            <div className="bg-white rounded-2xl shadow-2xl p-8 relative">
              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Content */}
              <div className="text-center space-y-6">
                {/* Icon */}
                <motion.div
                  className="flex justify-center"
                  animate={
                    error ? { x: [-10, 10, -10, 10, 0] } : {}
                  }
                  transition={{ duration: 0.4 }}
                >
                  {success ? (
                    <CheckCircle className="w-16 h-16 text-green-500" />
                  ) : (
                    <Lock className="w-16 h-16 text-rose-500" />
                  )}
                </motion.div>

                {/* Title */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {gameName}
                  </h2>
                  <p className="text-gray-600">
                    {gameDescription}
                  </p>
                </div>

                {/* Success Message */}
                {success && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-green-50 border border-green-200 rounded-lg p-4"
                  >
                    <p className="text-green-700 font-semibold">
                      🎉 Correct! Unlocking...
                    </p>
                  </motion.div>
                )}

                {/* Password Form */}
                {!success && (
                  <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                  >
                    <div>
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Enter the password to unlock:
                      </label>
                      <Input
                        id="password"
                        type="text"
                        value={inputPassword}
                        onChange={(e) =>
                          setInputPassword(e.target.value)
                        }
                        placeholder="Type password here..."
                        className={`text-center text-lg uppercase ${
                          error
                            ? "border-red-500 animate-shake"
                            : ""
                        }`}
                        autoFocus
                      />
                      {error && (
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-red-500 text-sm mt-2"
                        >
                          Incorrect password! Try again.
                        </motion.p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 hover:from-pink-600 hover:via-rose-600 hover:to-red-600 text-white"
                    >
                      Unlock
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}