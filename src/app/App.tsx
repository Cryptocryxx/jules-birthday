import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { TimelineCard } from "./components/TimelineCard";
import { TimelineLine } from "./components/TimelineLine";
import { PasswordDialog } from "./components/PasswordDialog";
import { IntroOverlay } from "./components/IntroOverlay";
import { Heart, Grid3x3, Brain, Hand, HelpCircle, Calculator, Type, Palette } from "lucide-react";

// ============================================
// EDIT YOUR DATE ITINERARY HERE! 
// ============================================
// Just copy this structure to add more cards:
// {
//   id: [unique number],
//   time: "HH:MM", // 24-hour format
//   title: "Activity Name",
//   description: "Description of the activity",
//   image: "image-url-from-unsplash",
//   game: "Game Name",
//   gameIconName: "IconName", // Use: Brain, Hand, HelpCircle, Calculator, Type, Palette, Grid3x3
// },

const DATE = "19.04.2026"; // Change the date here

const dateCards = [
  {
    id: 1,
    time: "07:00",
    title: "Sauna & Thermal Bath",
    description: "Let's relax and unwind together in the warm, soothing waters",
    image: "https://images.unsplash.com/photo-1770625467612-737595560097?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBzYXVuYSUyMHRoZXJtYWwlMjBiYXRoJTIwc3BhfGVufDF8fHx8MTc3MTE1NDc4MXww&ixlib=rb-4.1.0&q=80&w=1080",
    game: "Uno Uno",
    gameIconName: "Hand",
    password: "RELAX",
    gameDescription: "Let's play a quick game of Uno! First to get rid of all their cards wins. Get ready for some fun and friendly competition!"
  },
  {
    id: 2,
    time: "09:30",
    title: "Breakfast in Stuttgart",
    description: "Start our day with delicious coffee and fresh pastries",
    image: "https://images.unsplash.com/photo-1758024708245-69a5d4b23892?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmVha2Zhc3QlMjBjb2ZmZWUlMjBjcm9pc3NhbnQlMjBTdHV0dGdhcnR8ZW58MXx8fHwxNzcxMTU0NzgxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    game: "Connect 4",
    gameIconName: "Grid3x3",
    password: "CROISSANT",
    gameDescription: "Let's play a quick game of Connect 4! First to get four in a row wins. Get ready for some fun and friendly competition!"
  },
  {
    id: 3,
    time: "11:30",
    title: "Pottery Workshop",
    description: "Let's create something beautiful with our own hands in Stuttgart",
    image: "https://images.unsplash.com/photo-1710835037843-0d2dacc177f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3R0ZXJ5JTIwd29ya3Nob3AlMjBoYW5kcyUyMGNsYXl8ZW58MXx8fHwxNzcxMTU0NzgxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    game: "Love Trivia",
    gameIconName: "HelpCircle",
    password: "CLAY",
    gameDescription: "I'm going to ask you trivia questions about us and our relationship. Let's see how well you remember our special moments! You have to get 8 out of 10 right to win. Good luck, love!"
  },
  {
    id: 4,
    time: "14:30",
    title: "Ludwigsburg Castle",
    description: "Walk through the stunning baroque palace gardens like royalty",
    image: "https://images.unsplash.com/photo-1571146696514-4abef1714e3f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxMdWR3aWdzYnVyZyUyMGNhc3RsZSUyMHBhbGFjZSUyMEdlcm1hbnl8ZW58MXx8fHwxNzcxMTU0NzgxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    game: "Battleship",
    gameIconName: "Calculator",
    password: "CASTLE",
    gameDescription: "Let's play a quick game of Battleship! First to sink all the opponent's ships wins. Get ready to be bombed!"
  },
    {
    id: 5,
    time: "15:30",
    title: "Lunch in my favorite place in Ludwigsburg",
    description: "Eat with me like the queen you are!",
    image: "https://images.unsplash.com/photo-1762928289633-c1565bc92931?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwbHVuY2glMjBlbGVnYW50JTIwZGluaW5nfGVufDF8fHx8MTc3MTE3MTEzMHww&ixlib=rb-4.1.0&q=80&w=1080",
    game: "Manipulator",
    gameIconName: "HelpCircle",
    password: "QUEEN",
    gameDescription: "You tell me you have a item and i tell you i have a item. We have to figure out if we have that item or not. It's a fun game of deduction and communication! Let's see how well we can read each other's minds!"
  },
  
  {
    id: 6,
    time: "17:30",
    title: "Golfclub & Monrepos",
    description: "Explore the beatiful Monrepos and hit a few balls",
    image: "https://images.unsplash.com/photo-1631213611148-aa45cfbb9472?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xmJTIwY291cnNlJTIwcHV0dGluZyUyMGdyZWVufGVufDF8fHx8MTc3MTE3MTEzMHww&ixlib=rb-4.1.0&q=80&w=1080",
    game: "Mini Golf Challenge",
    gameIconName: "Calculator",
    password: "BIRDIE",
    gameDescription: "I want a revanche so lets goooo! We will play 9 holes of mini golf and the one with the lowest score wins. Get ready to putt like a pro!"
  },
  {
    id: 7,
    time: "19:00",
    title: "Movie Night and Games at Home",
    description: "Cozy evening with sushi, a horror movie with popcorn and cuddles, and fun games",
    image: "https://images.unsplash.com/photo-1748501342013-9cf3ff19e304?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3ZpZSUyMG5pZ2h0JTIwc3VzaGklMjBob21lJTIwY296eXxlbnwxfHx8fDE3NzExNTQ3ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    game: "Same word Challenge",
    gameIconName: "Grid3x3",
    password: "CUDDLE",
    gameDescription: "We both say a word and have to try to say the same word at the same time. It's a fun game of connection and intuition! Let's see how in sync we are!"
  },
  {
    id: 8,
    time: "22:00",
    title: "Bar in Ludwigsburg",
    description: "End the perfect day with cocktails and good vibes",
    image: "https://images.unsplash.com/photo-1768357759091-e153626905d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2NrdGFpbCUyMGJhciUyMHJvbWFudGljJTIwZXZlbmluZ3xlbnwxfHx8fDE3NzExNTQ3ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    game: "The alphabet game",
    gameIconName: "Type",
    password: "CHEERS",
    gameDescription: "I think i have to explain this one in person, but it's a fun game that involves coming up with words starting with each letter of the alphabet. Let's see how far we can get!"
  },
    {
    id: 9,
    time: "00:00",
    title: "Special Surprise",
    description: "I have a little surprise planned for us to end the night. I can't wait to see your reaction! Hint: It's both sweet and sour and may involve a rope ;)",
    image: "https://images.unsplash.com/photo-1768357759091-e153626905d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2NrdGFpbCUyMGJhciUyMHJvbWFudGljJTIwZXZlbmluZ3xlbnwxfHx8fDE3NzExNTQ3ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    game: "Chess Challenge",
    gameIconName: "Brain",
    password: "CUFFED",
    gameDescription: "Five Rounds of Chess! Each round i lose a piece and you get to choose which one. Let's see if you can checkmate me!"
  },
  // Add more cards here! Just copy the structure above
];

// ============================================
// END OF EDITABLE SECTION
// ============================================

// Icon mapping
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Brain,
  Hand,
  HelpCircle,
  Calculator,
  Type,
  Palette,
  Grid3x3,
};

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [unlockedCards, setUnlockedCards] = useState<Set<number>>(new Set());
  const [selectedCard, setSelectedCard] = useState<number | null>(null);

  const handleCardClick = (cardId: number) => {
    if (!unlockedCards.has(cardId)) {
      setSelectedCard(cardId);
    }
  };

  const handleGameWin = () => {
    if (selectedCard) {
      setUnlockedCards(new Set([...unlockedCards, selectedCard]));
      setSelectedCard(null);
    }
  };

  const handleCloseGame = () => {
    setSelectedCard(null);
  };

  const selectedCardData = dateCards.find((c) => c.id === selectedCard);
  const allUnlocked = unlockedCards.size === dateCards.length;

  return (
    <>
      <AnimatePresence>
        {showIntro && <IntroOverlay onStart={() => setShowIntro(false)} />}
      </AnimatePresence>

      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-rose-100 to-red-100 py-20 px-4">
        <div className={`max-w-6xl mx-auto transition-all duration-500 ${showIntro ? 'blur-sm' : 'blur-0'}`}>
          {/* Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              The Ultimate Date!
            </h1>
            <p className="text-xl text-gray-600 mb-2">
              {DATE}
            </p>
            <p className="text-lg text-gray-500 flex items-center justify-center gap-2">
              Win each game to unlock the next part of our day
              <Heart className="w-6 h-6 text-rose-500 fill-rose-500" />
            </p>
            <div className="mt-4 text-sm text-gray-500">
              {unlockedCards.size} of {dateCards.length} unlocked
            </div>
          </motion.div>

          {/* Timeline */}
          <div className="relative space-y-16 pb-20">
            <TimelineLine totalCards={dateCards.length} />

            {dateCards.map((card, index) => {
              const IconComponent = iconMap[card.gameIconName];
              return (
                <TimelineCard
                  key={card.id}
                  {...card}
                  gameName={card.game}
                  gameIcon={<IconComponent className="w-5 h-5" />}
                  isLocked={!unlockedCards.has(card.id)}
                  onClick={() => handleCardClick(card.id)}
                  index={index}
                />
              );
            })}
          </div>

          {/* All unlocked message */}
          {allUnlocked && (
            <motion.div
              className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-white rounded-full shadow-2xl px-8 py-4 border-2 border-rose-300"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <p className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Heart className="w-6 h-6 text-rose-500 fill-rose-500" />
                All unlocked! You're amazing! I can't wait for our perfect day! 🎉
                <Heart className="w-6 h-6 text-rose-500 fill-rose-500" />
              </p>
            </motion.div>
          )}
        </div>
      </div>

      {/* Game Dialog */}
      <PasswordDialog
        isOpen={selectedCard !== null}
        gameName={selectedCardData?.game || ""}
        onWin={handleGameWin}
        onClose={handleCloseGame}
        password={selectedCardData?.password || ""}
        gameDescription={selectedCardData?.gameDescription || ""}
      />
    </>
  );
}