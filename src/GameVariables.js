import React, { createContext, useContext, useState } from 'react';

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

  const updateStat = (key, value) => {
    setStats((prev) => ({ ...prev, [key]: value }));
  };

  const addItem = (item) => {
    setStats((prev) => ({ ...prev, items: [...prev.items, item] }));
  };

  return (
    <GameVariables.Provider value={{ stats, updateStat, addItem }}>
      {children}
    </GameVariables.Provider>
  );
}

export const useGame = () => useContext(GameVariables);
