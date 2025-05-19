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

  // Handle action click and update stats/items
  function handleAction(actionId) {
    const updated = getUpdatedStats(actionId, stats);
    setStats(updated);
  }

  // Update individual stat
  const updateStat = (key, value) => {
    setStats((prev) => ({ ...prev, [key]: value }));
  };

  // Add an item
  const addItem = (item) => {
    setStats((prev) => ({ ...prev, items: [...prev.items, item] }));
  };

  // Use an item and apply its effects
  const handleuseItem = (item) => {
    const itemEffects = {
      "Sandwich": { meal: +20 },
      "Book": { happiness: +10 },
      "Protein Shake": { meal: +10, happiness: +5 },
    };

    const updatedStats = { ...stats };
    const effect = itemEffects[item];

    if (effect) {
      for (const [key, value] of Object.entries(effect)) {
        updatedStats[key] = Math.max(0, Math.min(100, (updatedStats[key] || 0) + value));
      }
    }

    // Remove one instance of the used item
    const index = updatedStats.items.findIndex((i) => i === item);
    if (index !== -1) {
      updatedStats.items.splice(index, 1);
    }

    setStats(updatedStats);
  };

  // Drop an item (remove it from inventory)
  const handledropItem = (item) => {
    const updatedStats = { ...stats };
    const index = updatedStats.items.findIndex((i) => i === item);
    if (index !== -1) {
      updatedStats.items.splice(index, 1);
    }

    setStats(updatedStats);
  };

  return (
    <GameVariables.Provider
      value={{ stats, updateStat, addItem, handleAction, handleuseItem, handledropItem }}
    >
      {children}
    </GameVariables.Provider>
  );
}

export const useGame = () => useContext(GameVariables);
