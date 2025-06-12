import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CharacterSelection from "./CharacterSelection";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import "./MainMenu.css";
import bg1 from "./img/bg1.jpg";
import bg2 from "./img/bg2.jpg";
import bg3 from "./img/bg3.jpg";
import { auth, db } from "./firebase";
import { doc, setDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { useGame } from "./GameVariables";

const images = [bg1, bg2, bg3];
const directions = ["scroll-top-right", "scroll-bottom-left"];
const menuOptions = [
  "New Game",
  "Continue Game",
  "Load",
  "Options",
  "Credits",
  "Exit Game",
];

const screenContents = {
  "New Game": (
    <>
      <h2 className="text-2xl font-bold">New Game</h2>
      <p>Start a brand new adventure!</p>
    </>
  ),
  "Continue Game": (
    <>
      <h2 className="text-2xl font-bold">Continue Game</h2>
      <p>Resume your saved progress.</p>
    </>
  ),
  Load: (
    <>
      <h2 className="text-2xl font-bold">Load</h2>
      <p>Load a previous game file.</p>
    </>
  ),
  Options: (
    <>
      <h2 className="text-2xl font-bold">Options</h2>
      <p>Adjust your preferences and settings.</p>
    </>
  ),
  Credits: (
    <>
      <h2 className="text-2xl font-bold">Credits</h2>
      <p>Developed by Evan.</p>
    </>
  ),
  "Exit Game": (
    <>
      <h2 className="text-2xl font-bold">Exit Game</h2>
      <p>Thanks for playing!</p>
    </>
  ),
};

export default function MainMenu() {
  const [bgIndex, setBgIndex] = useState(0);
  const [dirIndex, setDirIndex] = useState(0);
  const [activeScreen, setActiveScreen] = useState("menu");
  const [fadeOverlayOpacity, setFadeOverlayOpacity] = useState(0);
  const [step, setStep] = useState("menu");
  const [authScreen, setAuthScreen] = useState("login");

  const { user, setUser, setStats, loading } = useGame();
  const navigate = useNavigate();

  useEffect(() => {
    const cycleTime = 6000;
    const fadeDuration = 1000;

    const interval = setInterval(() => {
      setFadeOverlayOpacity(1);
      setTimeout(() => {
        setBgIndex((prev) => (prev + 1) % images.length);
        setDirIndex((prev) => (prev + 1) % directions.length);
        setFadeOverlayOpacity(0);
      }, fadeDuration);
    }, cycleTime);

    return () => clearInterval(interval);
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  const handleNewGame = async () => {
    if (!user) {
      alert("Please log in to start a new game.");
      return;
    }

    try {
      const defaultStats = {
        meal: 100,
        sleep: 100,
        happiness: 100,
        cleanliness: 100,
        money: 100,
        items: [],
        playerX: 1600,
        playerY: 1500,
      };

      const ref = doc(db, "saves", user.uid);
      await setDoc(ref, defaultStats); // overwrite existing save
      setStats(defaultStats); // update context
      setStep("char-select"); // go to character selection
    } catch (error) {
      console.error("Error creating new game:", error);
      alert("Failed to create new game.");
    }
  };

  const handleCharacterSelected = () => navigate("/floor1");

  const handleContinueGame = () => {
    if (!user) {
      alert("Please log in first.");
      return;
    }
    if (loading) {
      alert("Loading save data... Please wait.");
      return;
    }
    navigate("/floor1");
  };

  const handleLoad = () => setActiveScreen("Load");
  const handleOptions = () => setActiveScreen("Options");
  const handleCredits = () => setActiveScreen("Credits");
  const handleExitGame = () => setActiveScreen("Exit Game");

  const handlers = {
    "New Game": handleNewGame,
    "Continue Game": handleContinueGame,
    Load: handleLoad,
    Options: handleOptions,
    Credits: handleCredits,
    "Exit Game": handleExitGame,
  };

  const Menu = () => (
    <div className="relative z-20 flex flex-col items-start gap-4 text-white text-xl p-10">
      <h1 className="text-3xl font-bold mb-4">Aethernode</h1>
      {menuOptions.map((option) => (
        <button
          key={option}
          onClick={handlers[option]}
          className="hover:bg-white hover:text-black px-4 py-2 rounded transition-all"
          disabled={loading && option === "Continue Game"}
        >
          {option}
        </button>
      ))}
      <button
        onClick={handleLogout}
        className="mt-6 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-all"
      >
        Logout
      </button>
    </div>
  );

  const Screen = () => (
    <div className="relative z-20 text-white p-10">
      <button
        onClick={() => setActiveScreen("menu")}
        className="mb-4 bg-white text-black px-3 py-1 rounded"
      >
        Back to Menu
      </button>
      {screenContents[activeScreen] || <p>Unknown screen</p>}
    </div>
  );

  if (!user) {
    return authScreen === "login" ? (
      <LoginForm onSwitchToRegister={() => setAuthScreen("register")} />
    ) : (
      <RegisterForm onBack={() => setAuthScreen("login")} />
    );
  }

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      <div className="absolute inset-0 z-0">
        <img
          src={images[bgIndex]}
          alt="background"
          className={`w-full h-full object-cover animate-background ${directions[dirIndex]}`}
        />
        <div className="fade-overlay" style={{ opacity: fadeOverlayOpacity }} />
      </div>

      {step === "char-select" ? (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-black bg-opacity-80">
          <CharacterSelection
            onBack={() => setStep("menu")}
            onSelect={handleCharacterSelected}
          />
        </div>
      ) : activeScreen === "menu" ? (
        <Menu />
      ) : (
        <Screen />
      )}
    </div>
  );
}
