import React, { useEffect, useRef, useState } from "react";
import { actionZones } from "../assets/actionZones";
import { getUpdatedStats } from "../assets/actionClick";
import { useGame } from "../GameVariables";
import FloorMenu from "../assets/FloorMenu";
import Inventory from "../Inventory";
import { useNavigate } from "react-router-dom";

// Character animations
import char1_idle from "../assets/sprite/char1/idle.gif";
import char1_up from "../assets/sprite/char1/up.gif";
import char1_down from "../assets/sprite/char1/down.gif";
import char1_right from "../assets/sprite/char1/right.gif";

import char2_idle from "../assets/sprite/char2/idle.gif";
import char2_up from "../assets/sprite/char2/up.gif";
import char2_down from "../assets/sprite/char2/down.gif";
import char2_right from "../assets/sprite/char2/right.gif";

import char3_idle from "../assets/sprite/char3/idle.gif";
import char3_up from "../assets/sprite/char3/up.gif";
import char3_down from "../assets/sprite/char3/down.gif";
import char3_right from "../assets/sprite/char3/right.gif";

import backgroundMusic from "../assets/sounds/background-music.mp3";

const MAP_WIDTH = 3000;
const MAP_HEIGHT = 2250;
const VIEWPORT_WIDTH = 800;
const VIEWPORT_HEIGHT = 600;
const PLAYER_SIZE = 40;
const MOVE_SPEED = 9;
const SPAWN_POINT = { x: 1600, y: 1500 };

const walls = [
  { x: 400, y: 300, width: 200, height: 40 },
  { x: 1000, y: 1200, width: 300, height: 50 },
  { x: 2200, y: 1800, width: 100, height: 300 },
];

function isColliding(rect1, rect2) {
  return !(
    rect1.x + rect1.width <= rect2.x ||
    rect1.x >= rect2.x + rect2.width ||
    rect1.y + rect1.height <= rect2.y ||
    rect1.y >= rect2.y + rect2.height
  );
}

export default function ScrollableMap() {
  const MS_PER_TICK = 1000; 
  const GAME_SECONDS_PER_TICK = 250;
  const { playerName } = useGame();
  const [gameSeconds, setGameSeconds] = useState(0);
  const [day, setDay] = useState(1);
  const [isGameOver, setIsGameOver] = useState(false);


  const navigate = useNavigate();
  const containerRef = useRef(null);
  const {
    stats,
    updateStat,
    useItem,
    dropItem,
    selectedCharacter,
    resetGame,
  } = useGame();

  const spriteMap = {
    char1: { idle: char1_idle, up: char1_up, down: char1_down, right: char1_right },
    char2: { idle: char2_idle, up: char2_up, down: char2_down, right: char2_right },
    char3: { idle: char3_idle, up: char3_up, down: char3_down, right: char3_right },
  };

  const [playerPos, setPlayerPos] = useState({
    x: stats.playerX || SPAWN_POINT.x,
    y: stats.playerY || SPAWN_POINT.y,
  });
  const [hoveredAction, setHoveredAction] = useState(null);
  const [currentZone, setCurrentZone] = useState(null);
  const [showFloorMenu, setShowFloorMenu] = useState(false);
  const [showInventory, setShowInventory] = useState(false);
  const [currentMap, setCurrentMap] = useState("/maps/map1.png");
  const [direction, setDirection] = useState("idle");
  const [showExitModal, setShowExitModal] = useState(false);
  const [chatMessage, setChatMessage] = useState("");

  const keysPressed = useRef({});

  useEffect(() => {
    function movePlayer() {
      setPlayerPos((pos) => {
        let newX = pos.x;
        let newY = pos.y;
        let newDirection = "idle";

        if (keysPressed.current["w"] || keysPressed.current["arrowup"]) {
          newY -= MOVE_SPEED;
          newDirection = "up";
        }
        if (keysPressed.current["s"] || keysPressed.current["arrowdown"]) {
          newY += MOVE_SPEED;
          newDirection = "down";
        }
        if (keysPressed.current["d"] || keysPressed.current["arrowright"]) {
          newX += MOVE_SPEED;
          newDirection = "right";
        }
        if (keysPressed.current["a"] || keysPressed.current["arrowleft"]) {
          newX -= MOVE_SPEED;
          newDirection = "right";
        }

        setDirection(newDirection);

        newX = Math.max(0, Math.min(newX, MAP_WIDTH - PLAYER_SIZE));
        newY = Math.max(0, Math.min(newY, MAP_HEIGHT - PLAYER_SIZE));

        const newPlayerRect = { x: newX, y: newY, width: PLAYER_SIZE, height: PLAYER_SIZE };

        for (const wall of walls) {
          if (isColliding(newPlayerRect, wall)) {
            const tryX = { x: newX, y: pos.y, width: PLAYER_SIZE, height: PLAYER_SIZE };
            if (!isColliding(tryX, wall)) return { x: newX, y: pos.y };
            const tryY = { x: pos.x, y: newY, width: PLAYER_SIZE, height: PLAYER_SIZE };
            if (!isColliding(tryY, wall)) return { x: pos.x, y: newY };
            return pos;
          }
        }

        const foundZone = actionZones.find((zone) => isColliding(newPlayerRect, zone)) || null;
        setCurrentZone(foundZone);

        return { x: newX, y: newY };
      });

      requestAnimationFrame(movePlayer);
    }

    movePlayer();
    return () => {};
  }, []);

  useEffect(() => {
    function onKeyDown(e) {
      keysPressed.current[e.key.toLowerCase()] = true;
      if (e.key.toLowerCase() === "m") setShowFloorMenu((prev) => !prev);
      if (e.key.toLowerCase() === "b") setShowInventory((prev) => !prev);
      e.preventDefault();
    }

    function onKeyUp(e) {
      keysPressed.current[e.key.toLowerCase()] = false;
      if (!Object.values(keysPressed.current).includes(true)) setDirection("idle");
      e.preventDefault();
    }

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    let scrollLeft = playerPos.x + PLAYER_SIZE / 2 - VIEWPORT_WIDTH / 2;
    let scrollTop = playerPos.y + PLAYER_SIZE / 2 - VIEWPORT_HEIGHT / 2;
    container.scrollLeft = Math.max(0, Math.min(scrollLeft, MAP_WIDTH - VIEWPORT_WIDTH));
    container.scrollTop = Math.max(0, Math.min(scrollTop, MAP_HEIGHT - VIEWPORT_HEIGHT));
  }, [playerPos]);

  useEffect(() => {
    if (isGameOver) return; // Stop everything when game over

    const interval = setInterval(() => {
      setGameSeconds((prev) => {
        const next = prev + GAME_SECONDS_PER_TICK;
        if (Math.floor(next / 86400) + 1 > day) {
          setDay((d) => d + 1);
        }
        return next;
      });

      // ✅ Only update stats if still alive
      updateStat("meal", Math.max(0, stats.meal - 1));
      updateStat("sleep", Math.max(0, stats.sleep - 1));
      updateStat("happiness", Math.max(0, stats.happiness - 1));
      updateStat("cleanliness", Math.max(0, stats.cleanliness - 1));
    }, MS_PER_TICK);

    return () => clearInterval(interval);
  }, [stats, day, isGameOver]);


  useEffect(() => {
    if (!isGameOver && (
      stats.meal <= 0 || stats.sleep <= 0 || stats.happiness <= 0 || stats.cleanliness <= 0
    )) {
      setIsGameOver(true);
    }
  }, [stats, isGameOver]);



function handleActionClick(actionId) {
  const result = getUpdatedStats(actionId, stats);
  const newStats = result.stats;

  Object.entries(newStats).forEach(([key, value]) => {
    if (key !== "items") updateStat(key, value);
  });

  if (result.chat) {
    setChatMessage(result.chat);
    //setTimeout(() => setChatMessage(""), 10000); if i want it to be gone i guess
  }
}

const getGreeting = (gameSeconds) => {
  const hour = Math.floor((gameSeconds % 86400) / 3600); // in-game hour

  if (hour >= 18) return "Good Night";
  if (hour >= 16) return "Good Evening";
  if (hour >= 12) return "Good Afternoon";
  if (hour >= 6) return "Good Morning";
  if (hour >= 0) return "Good Night";
  return;
};



  const currentSprites = spriteMap[selectedCharacter] || spriteMap.char1;
  const playerImage = currentSprites[direction] || currentSprites.idle;
  const isLeft = (keysPressed.current["a"] || keysPressed.current["arrowleft"]) && !keysPressed.current["d"];

  return ( //UI
    <>
      <audio src={backgroundMusic} autoPlay loop volume={0.3} />

  {playerName && !isGameOver && (
    <div style={{
      width: "100%",
      textAlign: "center",
      fontFamily: "monospace",
      fontSize: "18px",
      color: "#0ff",
      padding: "12px 20px",
      background: "#111",
      borderBottom: "2px solid #0ff",
      boxShadow: "0 2px 8px rgba(0, 255, 255, 0.2)",
      zIndex: 5,
      position: "relative",
      letterSpacing: 0.5,
    }}>
      <span style={{ fontWeight: "bold", color: "#0f0" }}>
        {getGreeting(gameSeconds)}, {playerName}!
      </span>{" "}
      | <span style={{ color: "#0ff" }}>Day {day}</span> |{" "}
      <span style={{ color: "#fff" }}>
        {String(Math.floor((gameSeconds % 86400) / 3600)).padStart(2, "0")}:
        {String(Math.floor((gameSeconds % 3600) / 60)).padStart(2, "0")}
      </span>
    </div>
  )}


{isGameOver && (
  <div style={{
    position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: "#0a0a0a", color: "white", zIndex: 9999,
    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
    fontFamily: "monospace", padding: "30px", textAlign: "center"
  }}>
    <div style={{ fontSize: "56px", fontWeight: "bold", color: "red", marginBottom: "10px", textShadow: "2px 2px #000" }}>
      GAME OVER
    </div>
    <p style={{ fontSize: "20px", marginBottom: "8px" }}>You lose!</p>
    <p style={{
      fontSize: "18px",
      backgroundColor: "#222",
      padding: "8px 16px",
      borderRadius: "8px",
      color: "#9f9",
      marginBottom: "12px"
    }}>
      Cause: {
        stats.cleanliness <= 0 ? "Bad Hygiene" :
        stats.meal <= 0 ? "Starved" :
        stats.sleep <= 0 ? "Not enough sleep" :
        "Depression"
      }
    </p>
    <p style={{ fontSize: "18px" }}>
      Survived for <strong>{day} day(s)</strong>, Nice try <strong>{playerName}</strong>!
    </p>
    <div style={{ marginTop: "16px", fontSize: "16px", lineHeight: "1.6" }}>
      <p>Meal: {stats.meal}%</p>
      <p>Sleep: {stats.sleep}%</p>
      <p>Happiness: {stats.happiness}%</p>
      <p>Cleanliness: {stats.cleanliness}%</p>
      <p>Money: ${stats.money}</p>
    </div>

    <div style={{ marginTop: "30px", display: "flex", gap: "20px" }}>
      <button
        onClick={() => {
          resetGame();
          setIsGameOver(false);
          setDay(1);
          setGameSeconds(0);
          setPlayerPos({ x: SPAWN_POINT.x, y: SPAWN_POINT.y });
        }}

        style={{
          backgroundColor: "#0a0", color: "white",
          border: "none", padding: "10px 24px", fontSize: "18px",
          borderRadius: "8px", cursor: "pointer", boxShadow: "0 0 10px #0f0"
        }}
      >
        Play Again
      </button>
      <button
        onClick={() => navigate("/")}
        style={{
          backgroundColor: "#555", color: "white",
          border: "none", padding: "10px 24px", fontSize: "18px",
          borderRadius: "8px", cursor: "pointer"
        }}
      >
        Main Menu
      </button>
    </div>
  </div>
)}



      {showFloorMenu && (
        <FloorMenu
          onSelect={(floor) => {
            setCurrentMap(floor.mapUrl);
            setPlayerPos({
              x: MAP_WIDTH / 2 - PLAYER_SIZE / 2,
              y: MAP_HEIGHT / 2 - PLAYER_SIZE / 2,
            });
            setShowFloorMenu(false);
          }}
          onClose={() => setShowFloorMenu(false)}
        />
      )}

      {showInventory && (
        <Inventory
          items={stats.items}
          onUseItem={useItem}
          onDropItem={dropItem}
          onClose={() => setShowInventory(false)}
        />
      )}

      {showExitModal && (
        <div style={{
          position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: "rgba(0,0,0,0.6)", display: "flex",
          justifyContent: "center", alignItems: "center", zIndex: 999
        }}>
          <div style={{
            backgroundColor: "#222", padding: 30, borderRadius: 12,
            boxShadow: "0 0 20px #000", color: "white", fontFamily: "monospace", textAlign: "center"
          }}>
            <h2>Exit Game</h2>
            <p>Are you sure you want to return to the main menu?</p>
            <div style={{ marginTop: 20 }}>
              <button onClick={() => navigate("/")} style={modalButton}>Yes</button>
              <button onClick={() => setShowExitModal(false)} style={{ ...modalButton, backgroundColor: "#555" }}>No</button>
            </div>
          </div>
        </div>
      )}

      <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-start", gap: 30, marginTop: 20 }}>
        <div style={{
          width: 200, backgroundColor: "#333", borderRadius: 10, padding: 15, color: "white",
          fontFamily: "monospace", fontSize: 16, userSelect: "none", height: VIEWPORT_HEIGHT,
          boxSizing: "border-box", display: "flex", flexDirection: "column", justifyContent: "center", gap: 10
        }}>
          <div>Note: Press M for Floor Menu | B for Inventory</div>
          <div>Meal: {stats.meal}</div>
          <div>Sleep: {stats.sleep}</div>
          <div>Happiness: {stats.happiness}</div>
          <div>Cleanliness: {stats.cleanliness}</div>
          <div>Money: ${stats.money}</div>
          <button onClick={() => setShowExitModal(true)} style={{ ...buttonStyle, backgroundColor: "#800" }}>
            Exit to Main Menu
          </button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div
            ref={containerRef}
            style={{
              width: VIEWPORT_WIDTH,
              height: VIEWPORT_HEIGHT,
              overflow: "scroll",
              border: "2px solid black",
              position: "relative",
              backgroundColor: "#222",
              userSelect: "none",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
            className="hide-scrollbar"
          >
            <div
              style={{
                width: MAP_WIDTH,
                height: MAP_HEIGHT,
                backgroundImage: `url(${currentMap})`,
                backgroundSize: "cover",
                position: "relative",
              }}
            >
              {walls.map((wall, i) => (
                <div
                  key={i}
                  style={{
                    position: "absolute",
                    left: wall.x,
                    top: wall.y,
                    width: wall.width,
                    height: wall.height,
                    backgroundColor: "rgba(0,0,0,0.6)",
                    border: "2px solid #900",
                    boxShadow: "0 0 10px #900",
                    pointerEvents: "none",
                  }}
                />
              ))}

              {actionZones.map((zone) => (
                <div
                  key={zone.id}
                  style={{
                    position: "absolute",
                    left: zone.x,
                    top: zone.y,
                    width: zone.width,
                    height: zone.height,
                    backgroundColor: zone.color,
                    border: `3px dashed ${zone.borderColor}`,
                    pointerEvents: "none",
                    borderRadius: 8,
                    boxShadow: `0 0 15px ${zone.borderColor}`,
                  }}
                />
              ))}

              <img
                src={playerImage}
                alt="Player"
                style={{
                  position: "absolute",
                  width: PLAYER_SIZE,
                  height: PLAYER_SIZE,
                  left: playerPos.x,
                  top: playerPos.y,
                  transform: isLeft ? "scaleX(-1)" : "scaleX(1)",
                  imageRendering: "pixelated",
                }}
              />
            </div>
          </div>

          {/* Chat box game screen */}
          <div style={{
            marginTop: 12,
            backgroundColor: "#111",
            border: "1px solid #0ff",
            borderRadius: 8,
            padding: "10px 20px",
            color: chatMessage ? "#0ff" : "#555",
            fontSize: 14,
            fontFamily: "monospace",
            textAlign: "center",
            width: VIEWPORT_WIDTH,
            maxWidth: VIEWPORT_WIDTH,
            minHeight: 24,
            transition: "color 0.3s ease",
          }}>
            {chatMessage || "No recent actions"}
          </div>
        </div>

        <div style={{ width: 220, display: "flex", flexDirection: "column", gap: "20px", marginTop: 10 }}>
          {currentZone &&
            currentZone.actions.map(({ id, label, info }) => (
              <div key={id} style={{ textAlign: "center" }}>
                <button
                  onClick={() => handleActionClick(id)}
                  onMouseEnter={() => setHoveredAction(id)}
                  onMouseLeave={() => setHoveredAction(null)}
                  style={{
                    padding: "10px 20px",
                    fontSize: 16,
                    cursor: "pointer",
                    borderRadius: 8,
                    border: "none",
                    boxShadow: hoveredAction === id ? "0 0 8px #0f0" : "none",
                    backgroundColor: hoveredAction === id ? "#0a0" : "#090",
                    color: "white",
                    userSelect: "none",
                    width: "100%",
                  }}
                >
                  {label}
                </button>
                {hoveredAction === id && (
                  <div style={{
                    marginTop: 8,
                    color: "white",
                    backgroundColor: "rgba(0,0,0,0.7)",
                    borderRadius: 8,
                    padding: "5px 10px",
                    maxWidth: 220,
                    fontSize: 14,
                  }}>
                    {info}
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>

      <style>{`.hide-scrollbar::-webkit-scrollbar { display: none; }`}</style>
    </>
  );
}

const buttonStyle = {
  marginTop: 10,
  padding: "6px 12px",
  fontSize: 14,
  borderRadius: 6,
  backgroundColor: "#444",
  color: "#fff",
  border: "none",
};

const modalButton = {
  padding: "8px 16px",
  fontSize: 16,
  margin: "0 10px",
  borderRadius: 8,
  border: "none",
  backgroundColor: "#900",
  color: "white",
  cursor: "pointer",
};
