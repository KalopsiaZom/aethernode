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


  // Use an item and apply its effects
  const handleUseItem = (itemName) => {
    const itemEffects = {
      "Sandwich": { meal: +20 },
      "Book": { happiness: +10 },
      "Protein Shake": { meal: +10, happiness: +5 },
    };

    const updatedStats = { ...stats };
    const effect = itemEffects[itemName];

    // Apply stat effects
    if (effect) {
      for (const [key, value] of Object.entries(effect)) {
        updatedStats[key] = Math.max(0, Math.min(100, (updatedStats[key] || 0) + value));
      }
    }

    // Reduce item count
    updatedStats.items = updatedStats.items
      .map((i) => i.name === itemName ? { ...i, count: i.count - 1 } : i)
      .filter((i) => i.count > 0);

    setStats(updatedStats);
  };


  // Drop an item (remove it from inventory)
  const handleDropItem = (itemName) => {
    const updatedStats = { ...stats };

    updatedStats.items = updatedStats.items
      .map((i) => i.name === itemName ? { ...i, count: i.count - 1 } : i)
      .filter((i) => i.count > 0);

    setStats(updatedStats);
  };

  return (
    <GameVariables.Provider
      value={{ stats, updateStat, addItem, handleAction, handleUseItem, handleDropItem }}
    >
      {children}
    </GameVariables.Provider>
  );
}

export const useGame = () => useContext(GameVariables);
