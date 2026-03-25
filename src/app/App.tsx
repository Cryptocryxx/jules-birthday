import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { TimelineCard } from "./components/TimelineCard";
import { PasswordDialog } from "./components/PasswordDialog";
import { IntroOverlay } from "./components/IntroOverlay";
import { ApologyOverlay } from "./components/ApologyOverlay";
import { AdminOverlay } from "./components/AdminOverlay";
import {
  Heart,
  Grid3x3,
  Brain,
  Hand,
  HelpCircle,
  Calculator,
  Type,
  Palette,
} from "lucide-react";

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

const DATE = "18–19.04.2026"; // Weekend range

const dateCards = [
  {
    day: "18.04.2026",
    id: 1,
    time: "09:00",
    title: "Breakfast in Stuttgart",
    description:
      "Start our day with delicious coffee and fresh pastries",
    image:
      "https://images.unsplash.com/photo-1758024708245-69a5d4b23892?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmVha2Zhc3QlMjBjb2ZmZWUlMjBjcm9pc3NhbnQlMjBTdHV0dGdhcnR8ZW58MXx8fHwxNzcxMTU0NzgxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    game: "Connect 4",
    gameIconName: "Grid3x3",
    password: "CROISSANT",
    gameDescription:
      "Let's play a quick game of Connect 4! First to get four in a row wins. Get ready for some fun and friendly competition!",
  },
  {
    day: "18.04.2026",
    id: 2,
    time: "10:30",
    title: "Pottery Workshop",
    description:
      "Let's go for Round 2 but this time without training wheels. i booked us just a timeslot to work there!",
    image:
      "https://images.unsplash.com/photo-1710835037843-0d2dacc177f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3R0ZXJ5JTIwd29ya3Nob3AlMjBoYW5kcyUyMGNsYXl8ZW58MXx8fHwxNzcxMTU0NzgxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    game: "Love Trivia",
    gameIconName: "HelpCircle",
    password: "CLAY",
    gameDescription:
      "I'm going to ask you trivia questions about us and our relationship. Let's see how well you remember our special moments! You have to get 8 out of 10 right to win. Good luck, love!",
  },
  {
    day: "18.04.2026",
    id: 3,
    time: "13:30",
    title: "Ludwigsburg Castle",
    description:
      "Walk through the stunning baroque palace gardens like royalty",
    image:
      "https://images.unsplash.com/photo-1571146696514-4abef1714e3f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxMdWR3aWdzYnVyZyUyMGNhc3RsZSUyMHBhbGFjZSUyMEdlcm1hbnl8ZW58MXx8fHwxNzcxMTU0NzgxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    game: "Battleship",
    gameIconName: "Calculator",
    password: "CASTLE",
    gameDescription:
      "Let's play a quick game of Battleship! First to sink all the opponent's ships wins. Get ready to be bombed!",
  },
  {
    day: "18.04.2026",
    id: 4,
    time: "15:00",
    title: "Lunch in my favorite place in Ludwigsburg",
    description: "Eat with me like the queen you are!",
    image:
      "https://images.unsplash.com/photo-1762928289633-c1565bc92931?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwbHVuY2glMjBlbGVnYW50JTIwZGluaW5nfGVufDF8fHx8MTc3MTE3MTEzMHww&ixlib=rb-4.1.0&q=80&w=1080",
    game: "Manipulator",
    gameIconName: "HelpCircle",
    password: "QUEEN",
    gameDescription:
      "You tell me you have a item and i tell you i have a item. We have to figure out if we have that item or not. It's a fun game of deduction and communication! Let's see how well we can read each other's minds!",
  },

  {
    day: "18.04.2026",
    id: 5,
    time: "16:30",
    title: "Golfclub",
    description:
      "Show off your golf skills and enjoy the beautiful scenery at the golf club",
    image:
      "https://mein.toubiz.de/api/v1/media/e524f0a1-c3f2-41a8-82a1-832f90158af5/view",
    game: "Mini Golf Challenge",
    gameIconName: "Type",
    password: "BIRDIE",
    gameDescription:
      "I want a revanche so lets goooo! We will play 9 holes of mini golf and the one with the lowest score wins. Get ready to putt like a pro!",
  },
  {
    day: "18.04.2026",
    id: 6,
    time: "17:30",
    title: "Monrepos",
    description:
      "Go on a romantic walk through the beatiful Monrepos",
    image:
      "data:image/jpeg;base64,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",
    game: "Durak",
    gameIconName: "Type",
    password: "ROMANTIC",
    gameDescription:
      "You know and love it. I feel like we're gonna be on that game for a while tho :)!",
  },
  {
    day: "18.04.2026",
    id: 7,
    time: "20:00",
    title: "Bar in Ludwigsburg",
    description:
      "End the perfect day with cocktails and good vibes",
    image:
      "https://images.unsplash.com/photo-1768357759091-e153626905d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2NrdGFpbCUyMGJhciUyMHJvbWFudGljJTIwZXZlbmluZ3xlbnwxfHx8fDE3NzExNTQ3ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    game: "The alphabet game",
    gameIconName: "Type",
    password: "CHEERS",
    gameDescription:
      "I think i have to explain this one in person, but it's a fun game that involves coming up with words starting with each letter of the alphabet. Let's see how far we can get!",
  },
  {
    day: "18.04.2026",
    id: 8,
    time: "19:00",
    title:
      "Making Sushi and playing BattleShip with said Sushi at Home",
    description:
      "A Fun sushi making session at home with a twist. We will make our own sushi and then play battleship with it. If you lose you have to eat a piece of sushi, if you win i eat a piece of sushi. Let's see who has the best aim and the best taste buds!",
    image:
      "https://assets.tmecosys.com/image/upload/t_web_rdp_recipe_584x480_1_5x/img/recipe/ras/Assets/64EF898D-2EDD-4B47-A456-E6A7D137AC91/Derivates/00f76cac-64f6-4573-be4f-e604a7d99143.jpg",
    game: "Same word Challenge",
    gameIconName: "Grid3x3",
    password: "SUSHI",
    gameDescription:
      "We both say a word and have to try to say the same word at the same time. It's a fun game of connection and intuition! Let's see how in sync we are!",
  },
  {
    day: "18.04.2026",
    id: 9,
    time: "20:30",
    title: "Final Destination: Movie Night at Home",
    description:
      "End our amazing weekend with a cozy movie night at home. We will watch one of our favorite movies together and enjoy some popcorn and cuddles. It's the perfect way to relax and reflect on our unforgettable weekend!",
    image:
      "data:image/jpeg;base64,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",
    game: "Monopoly", //A new Game
    gameIconName: "Palette", //A new Icon
    password: "SCARY",
    gameDescription:
      "I know it's a little time consuming but maybe you're gonna have a night where you just wanna chill and play a game with me.",
  },
  {
    day: "18.04.2026",
    id: 10,
    time: "00:00",
    title: "Special Surprise",
    description:
      "I have a little surprise planned for us to end the night. I can't wait to see your reaction! Hint: It's both hot and spicy! And it may involve Rope;)",
    image:
      "https://www.hunkemoller.com/dw/image/v2/BCHL_PRD/on/demandware.static/-/Sites-hkm-master/default/dwed70f553/images/large/150128_7.jpg?sw=453&q=100",
    game: "Chess Challenge",
    gameIconName: "Brain",
    password: "CUFFED",
    gameDescription:
      "Five Rounds of Chess! Each round i lose a piece and you get to choose which one. Let's see if you can checkmate me!",
  },
  {
    day: "19.04.2026",
    id: 11,
    time: "8:00",
    title: "Sauna & Thermal Bath",
    description:
      "Let's relax and unwind together in the warm, soothing waters",
    image:
      "https://images.unsplash.com/photo-1770625467612-737595560097?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBzYXVuYSUyMHRoZXJtYWwlMjBiYXRoJTIwc3BhfGVufDF8fHx8MTc3MTE1NDc4MXww&ixlib=rb-4.1.0&q=80&w=1080",
    game: "Uno Uno",
    gameIconName: "Hand",
    password: "RELAX",
    gameDescription:
      "Let's play a quick game of Uno! First to get rid of all their cards wins. Get ready for some fun and friendly competition!",
  },
  {
    day: "19.04.2026",
    id: 12,
    time: "14:00",
    title: "Tennis Lesson",
    description:
      "U thought this is vacation. Nope i'm gonna work you out Baby. Lets see these Smashes!",
    image:
      "https://cdn.discordapp.com/attachments/792885933150175233/1486268051983962153/image.png?ex=69c4e27d&is=69c390fd&hm=ac138f99ebd9f1af3be06f848b6fed4b56c30cbc7d794490f95ca3a74b51e812&",
    game: "Battleship",
    gameIconName: "Grid3x3",
    password: "WORK",
    gameDescription:
      "Before you are allowed to do it with Sushi i thought maybe we train first a little!",
  },
  {
    day: "19.04.2026",
    id: 13,
    time: "20:00",
    title: "Surprise Present",
    description:
      "My Mom and Uli actually also wanted to contribute something for you. So they got us this little surprise. Hint you might need to pack something nice.",
    image:
      "https://prod.superblogcdn.com/site_cuid_ckucmy84h97811nplkx3qfbgx/images/screenshot-1133-1710220427152-compressed.png",
    game: "Dailys",
    gameIconName: "Heart",
    password: "EXTRA",
    gameDescription:
      "Beat me in ALL dailys!",
  },
  {
    day: "19.04.2026",
    id: 14,
    time: "23:59",
    title: "Full Body Massage",
    description:
      "Enjoy this full body massage with an oil of your choosing. This will definitely give the weekend a happy end ;).",
    image:
      "https://images.unsplash.com/photo-1672015521020-ab4f86d5cc00?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGElMjBtYXNzYWdlJTIwb2lsJTIwcmVsYXhhdGlvbnxlbnwxfHx8fDE3NzI3MDY2Mjl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    game: "FREE",
    gameIconName: "Heart",
    password: "",
    gameDescription:
      "This is a free gift! No game needed - just enjoy!",
  },
  // Add more cards here! Just copy the structure above
];

// ============================================
// END OF EDITABLE SECTION
// ============================================

// Icon mapping
const iconMap: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  Brain,
  Hand,
  HelpCircle,
  Calculator,
  Type,
  Palette,
  Grid3x3,
  Heart,
};

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [showApology, setShowApology] = useState(false);
  const [unlockedCards, setUnlockedCards] = useState<
    Set<number>
  >(new Set());
  const [selectedCard, setSelectedCard] = useState<
    number | null
  >(null);
  const [showAdminOverlay, setShowAdminOverlay] =
    useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  // --- cookie persistence for unlocked cards ---
  const COOKIE_NAME = "jb_unlocked";

  const setCookie = (
    name: string,
    value: string,
    days = 365,
  ) => {
    const expires = new Date();
    expires.setDate(expires.getDate() + days);
    // secure + SameSite for safer defaults
    document.cookie = `${name}=${encodeURIComponent(value)}; path=/; expires=${expires.toUTCString()}; SameSite=Lax; secure`;
  };

  const getCookie = (name: string): string | null => {
    const match = document.cookie.match(
      new RegExp("(?:^|; )" + name + "=([^;]*)"),
    );
    return match ? decodeURIComponent(match[1]) : null;
  };

  // load saved unlocked cards from cookie on mount
  useEffect(() => {
    const raw = getCookie(COOKIE_NAME);
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          const nums = parsed
            .map((v: any) => Number(v))
            .filter(Number.isFinite);
          setUnlockedCards(new Set(nums));
        }
      } catch (e) {
        // invalid cookie — ignore
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // persist unlocked cards to cookie whenever they change
  useEffect(() => {
    try {
      setCookie(
        COOKIE_NAME,
        JSON.stringify(Array.from(unlockedCards)),
      );
    } catch (e) {
      // ignore write errors
    }
  }, [unlockedCards]);
  // --------------------------------------------

  const handleIntroClose = () => {
    setShowIntro(false);
    // Only show apology overlay if card 14 hasn't been unlocked yet
    if (!unlockedCards.has(14)) {
      setTimeout(() => {
        setShowApology(true);
      }, 2000);
    }
  };

  const handleApologyAccept = () => {
    setShowApology(false);
    // Scroll to card 14
    setTimeout(() => {
      const card14Element = document.getElementById("card-14");
      if (card14Element) {
        card14Element.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }, 300);
  };

  const handleCardClick = (cardId: number) => {
    // If it's the free card (14), unlock it immediately
    if (cardId === 14 && !unlockedCards.has(cardId)) {
      setUnlockedCards((prev) => new Set([...prev, cardId]));
      return;
    }

    if (!unlockedCards.has(cardId)) {
      setSelectedCard(cardId);
    }
  };

  const handleGameWin = () => {
    if (selectedCard !== null) {
      setUnlockedCards(
        (prev) => new Set([...prev, selectedCard]),
      );
      setSelectedCard(null);
    }
  };

  const handleMasterUnlock = () => {
    // Unlock all cards
    const allCardIds = dateCards.map((card) => card.id);
    setUnlockedCards(new Set(allCardIds));
    setSelectedCard(null);
  };

  const handleCloseGame = () => {
    setSelectedCard(null);
  };

  const handleAdminSuccess = () => {
    setIsAdminMode(true);
    setShowAdminOverlay(false);
  };

  const toggleCardLock = (cardId: number) => {
    setUnlockedCards((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(cardId)) {
        newSet.delete(cardId);
      } else {
        newSet.add(cardId);
      }
      return newSet;
    });
  };

  const selectedCardData = dateCards.find(
    (c) => c.id === selectedCard,
  );
  const allUnlocked = unlockedCards.size === dateCards.length;

  // Show celebration message when all unlocked, then auto-hide after 3 seconds
  useEffect(() => {
    if (allUnlocked) {
      setShowCelebration(true);
      const timer = setTimeout(() => {
        setShowCelebration(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [allUnlocked]);

  // compute unique days from card data (preserves order)
  const days = Array.from(new Set(dateCards.map((c) => c.day)));

  return (
    <>
      <AnimatePresence>
        {showIntro && (
          <IntroOverlay onStart={handleIntroClose} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showApology && (
          <ApologyOverlay onAccept={handleApologyAccept} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showAdminOverlay && (
          <AdminOverlay
            onClose={() => setShowAdminOverlay(false)}
            onSuccess={handleAdminSuccess}
          />
        )}
      </AnimatePresence>

      {/* Admin Badge */}
      {isAdminMode && (
        <motion.button
          onClick={() => setIsAdminMode(false)}
          className="fixed top-4 left-4 z-40 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white px-4 py-2 rounded-full shadow-lg font-bold text-sm cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Admin
        </motion.button>
      )}

      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-rose-100 to-red-100 py-12 sm:py-20 px-4">
        <div
          className={`max-w-4xl sm:max-w-6xl mx-auto transition-all duration-500 px-4 sm:px-0 ${showIntro || showApology ? "blur-sm" : "blur-0"}`}
        >
          {/* Header */}
          <motion.div
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl sm:text-5xl font-bold text-gray-900 mb-4">
              The Ultimate Weekend!
            </h1>
            <div className="flex justify-center mb-6">
              <div className="px-8 py-3 rounded-2xl bg-gradient-to-r from-rose-100 to-pink-100 shadow-lg border border-rose-300">
                <span className="text-xl sm:text-3xl font-bold text-rose-700">
                  {DATE}
                </span>
              </div>
            </div>

            <p className="text-base sm:text-lg text-gray-500 flex items-center justify-center gap-2">
              Win each game to unlock the next part of our
              weekend
              <motion.button
                onClick={() => setShowAdminOverlay(true)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className="cursor-pointer"
              >
                <Heart className="w-6 h-6 text-rose-500 fill-rose-500" />
              </motion.button>
            </p>
            <div className="mt-3 text-xs sm:text-sm text-gray-500">
              {unlockedCards.size} of {dateCards.length}{" "}
              unlocked
            </div>
          </motion.div>

          {/* Timeline grouped by day */}
          <div className="space-y-8 sm:space-y-12 pb-12 sm:pb-20">
            {days.map((day) => {
              const cardsForDay = dateCards.filter(
                (c) => c.day === day,
              );
              return (
                <div key={day} className="pt-4">
                  <div className="flex items-center justify-center mb-16">
                    <div className="flex-1 h-px bg-rose-200" />

                    <span
                      className="px-6 py-2 mx-4 rounded-full bg-white border border-rose-300 shadow-md 
                                  text-2xl sm:text-3xl font-semibold text-rose-600 tracking-wide"
                    >
                      {day}
                    </span>

                    <div className="flex-1 h-px bg-rose-200" />
                  </div>

                  <div className="relative space-y-8 pb-8">
                    {cardsForDay.map((card, idx) => {
                      const IconComponent =
                        iconMap[card.gameIconName];
                      return (
                        <div
                          key={card.id}
                          id={`card-${card.id}`}
                        >
                          <TimelineCard
                            {...card}
                            gameName={card.game}
                            gameIcon={
                              <IconComponent className="w-5 h-5" />
                            }
                            isLocked={
                              !unlockedCards.has(card.id)
                            }
                            onClick={() =>
                              handleCardClick(card.id)
                            }
                            index={idx}
                            isAdminMode={isAdminMode}
                            onToggleLock={() =>
                              toggleCardLock(card.id)
                            }
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* All unlocked message */}
          <AnimatePresence>
            {showCelebration && (
              <motion.div
                className="fixed bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 bg-white rounded-full shadow-2xl px-4 sm:px-8 py-3 sm:py-4 border-2 border-rose-300 z-50"
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
              >
                <p className="text-base sm:text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-rose-500 fill-rose-500" />
                  All unlocked! You're amazing! I can't wait for
                  our perfect weekend! 🎉
                  <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-rose-500 fill-rose-500" />
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Game Dialog */}
      <PasswordDialog
        isOpen={selectedCard !== null}
        gameName={selectedCardData?.game || ""}
        onWin={handleGameWin}
        onClose={handleCloseGame}
        password={selectedCardData?.password || ""}
        gameDescription={
          selectedCardData?.gameDescription || ""
        }
        onMasterUnlock={handleMasterUnlock}
      />
    </>
  );
}