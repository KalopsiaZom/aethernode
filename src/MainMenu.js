import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CharacterSelection from "./CharacterSelection";
import "./MainMenu.css";
import bg1 from "./img/bg1.jpg";
import bg2 from "./img/bg2.jpg";
import bg3 from "./img/bg3.jpg";

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
      <p>lorem</p>
    </>
  ),
  Load: (
    <>
      <h2 className="text-2xl font-bold">Load</h2>
      <p>lorem</p>
    </>
  ),
  Options: (
    <>
      <h2 className="text-2xl font-bold">Options</h2>
      <p>lorem</p>
    </>
  ),
  Credits: (
    <>
      <h2 className="text-2xl font-bold">Credits</h2>
      <p>evan</p>
    </>
  ),
  "Exit Game": (
    <>
      <h2 className="text-2xl font-bold">Exit Game</h2>
      <p>Tlorem</p>
    </>
  ),
};

export default function MainMenu() {
  const [bgIndex, setBgIndex] = useState(0);
  const [dirIndex, setDirIndex] = useState(0);
  const [activeScreen, setActiveScreen] = useState("menu");
  const [fadeOverlayOpacity, setFadeOverlayOpacity] = useState(0);
  const [step, setStep] = useState("menu"); // "menu" | "char-select"

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

  const handleNewGame = () => {
    setStep("char-select");
  };

  const handleCharacterSelected = () => {
    navigate("/floor1");
  };

  const handleContinueGame = () => {
    setActiveScreen("Continue Game");
  };

  const handleLoad = () => {
    setActiveScreen("Load");
  };

  const handleOptions = () => {
    setActiveScreen("Options");
  };

  const handleCredits = () => {
    setActiveScreen("Credits");
  };

  const handleExitGame = () => {
    setActiveScreen("Exit Game");
  };

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
        >
          {option}
        </button>
      ))}
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

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Background Layer */}
      <div className="absolute inset-0 z-0">
        <img
          src={images[bgIndex]}
          alt="background"
          className={`w-full h-full object-cover animate-background ${directions[dirIndex]}`}
        />
        <div className="fade-overlay" style={{ opacity: fadeOverlayOpacity }} />
      </div>

      {/* UI Layer */}
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
