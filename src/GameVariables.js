import React, { createContext, useContext, useState } from 'react';
import { getUpdatedStats } from "./assets/actionClick";

const GameVariables = createContext();

export function GameProvider({ children }) {
  const [stats, setStats] = useState({
    meal: 100,
    sleep: 100,
    happiness: 100,
    cleanliness: 100,
    money: 100,
    items: [],
  });

  const resetGame = () => {
    setStats({
      meal: 100,
      sleep: 100,
      happiness: 100,
      cleanliness: 100,
      money: 100,
      items: [],
    });
  };


  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [playerName, setPlayerName] = useState("");

  const handleAction = (actionId) => {
    const updated = getUpdatedStats(actionId, stats);
    setStats(updated);
  };

  const updateStat = (key, value) => {
    setStats((prev) => ({ ...prev, [key]: value }));
  };

  const addItem = (itemName) => {
    setStats((prev) => {
      const items = [...prev.items];
      const index = items.findIndex((i) => i.name === itemName);
      if (index !== -1) {
        items[index].count += 1;
      } else {
        items.push({ name: itemName, count: 1 });
      }
      return { ...prev, items };
    });
  };

  const handleUseItem = (itemName) => {
    const itemEffects = {
      "Firewood": { meal: +0 },
      "Fish": { meal: -5 },
      "Berries": { meal: +20, happiness: +10 },
      "Ancient Relic": { happiness: +40 },
      "Healing Herb": { meal: +0 },
      "River Fish": { meal: +5 },
      "Supply Box": { happiness: +30 },
      "Mushrooms": { meal: +10 },
      "Rabbit Meat": { meal: +3 },
      "Soap": { cleanliness: +20 },
      "Sandwich": { meal: +15 },
      "Book": { happiness: +25 },
      "Coffee": { sleep: +30 },
    };

    const updatedStats = { ...stats };
    const effect = itemEffects[itemName];

    if (effect) {
      for (const [key, value] of Object.entries(effect)) {
        updatedStats[key] = Math.max(0, Math.min(100, (updatedStats[key] || 0) + value));
      }
    }

    updatedStats.items = updatedStats.items
      .map((i) => i.name === itemName ? { ...i, count: i.count - 1 } : i)
      .filter((i) => i.count > 0);

    setStats(updatedStats);
  };

  const handleDropItem = (itemName) => {
    const updatedStats = { ...stats };
    updatedStats.items = updatedStats.items
      .map((i) => i.name === itemName ? { ...i, count: i.count - 1 } : i)
      .filter((i) => i.count > 0);
    setStats(updatedStats);
  };

  return (
    <GameVariables.Provider
      value={{
        stats,
        setStats,
        updateStat,
        addItem,
        handleAction,
        handleUseItem,
        handleDropItem,
        selectedCharacter,
        setSelectedCharacter,
        playerName,
        setPlayerName,
        resetGame,
      }}
    >
      {children}
    </GameVariables.Provider>
  );
}

export const useGame = () => useContext(GameVariables);
