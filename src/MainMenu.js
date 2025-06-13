import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import CharacterSelection from "./CharacterSelection";
import "./MainMenu.css";
import bg1 from "./img/bg1.jpg";
import bg2 from "./img/bg2.jpg";
import bg3 from "./img/bg3.jpg";
import { useGame } from "./GameVariables";

const images = [bg1, bg2, bg3];
const directions = ["scroll-top-right", "scroll-bottom-left"];

const screenContents = {
  Options: (
    <>
      <h2 className="text-2xl font-bold">Options</h2>
      <p>Adjust your preferences and settings.</p>
    </>
  ),
  Credits: (
    <>
      <h2 className="text-2xl font-bold">Credits</h2>
      <p>Developed by: </p>
      <p>- Yustinus Evan Kusuma</p>
      <p>- Bryant Marchianno Jefferson</p>
      <p>- Ivan Michael Lawrence</p>
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
  const [goToFloor1, setGoToFloor1] = useState(false);

  const { resetGame } = useGame();


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

  const handlePlay = () => {
    resetGame();
    setStep("char-select");
  };

  const handleCharacterSelected = () => {
    setGoToFloor1(true);
  };

  const Menu = () => (
    <div className="relative z-20 flex flex-col items-start gap-4 text-white text-xl p-10">
      <h1 className="text-3xl font-bold mb-4">Aethernode</h1>
      <button
        onClick={handlePlay}
        className="hover:bg-white hover:text-black px-4 py-2 rounded transition-all"
      >
        Play
      </button>
      <button
        onClick={() => setActiveScreen("Options")}
        className="hover:bg-white hover:text-black px-4 py-2 rounded transition-all"
      >
        Options
      </button>
      <button
        onClick={() => setActiveScreen("Credits")}
        className="hover:bg-white hover:text-black px-4 py-2 rounded transition-all"
      >
        Credits
      </button>
      <button
        onClick={() => setActiveScreen("Exit Game")}
        className="hover:bg-white hover:text-black px-4 py-2 rounded transition-all"
      >
        Exit Game
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

  if (goToFloor1) return <Navigate to="/floor1" replace />;

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
