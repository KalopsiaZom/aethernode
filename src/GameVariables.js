import React, { createContext, useContext, useEffect, useState } from 'react';
import { getUpdatedStats } from "./assets/actionClick";
import { auth, db } from "./firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const GameVariables = createContext();

export function GameProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // ✅ Added loading state
  const [stats, setStats] = useState({
    meal: 100,
    sleep: 100,
    happiness: 100,
    cleanliness: 100,
    money: 100,
    items: [],
  });

  const [selectedCharacter, setSelectedCharacter] = useState(null);

  // Load save data 
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        const ref = doc(db, "saves", firebaseUser.uid);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          setStats(snap.data());
        }
      }
      setLoading(false);
    });
    return unsub;
  }, []);

  // Save to Firestore 
  useEffect(() => {
    if (user) {
      const ref = doc(db, "saves", user.uid);
      setDoc(ref, stats);
    }
  }, [stats, user]);

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
      "Sandwich": { meal: +20 },
      "Book": { happiness: +10 },
      "Protein Shake": { meal: +10, happiness: +5 },
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
    saveProgressToFirebase(); // ✅ Save immediately
  };

  const handleDropItem = (itemName) => {
    const updatedStats = { ...stats };
    updatedStats.items = updatedStats.items
      .map((i) => i.name === itemName ? { ...i, count: i.count - 1 } : i)
      .filter((i) => i.count > 0);
    setStats(updatedStats);
    saveProgressToFirebase(); // ✅ Save immediately
  };

  const saveProgressToFirebase = async (playerPos = null) => {
    if (user) {
      const ref = doc(db, "saves", user.uid);
      const payload = { ...stats };
      if (playerPos) {
        payload.playerX = playerPos.x;
        payload.playerY = playerPos.y;
      }
      await setDoc(ref, payload);
    }
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
        user,
        setUser,
        firebaseUser: user,
        saveProgressToFirebase,
        loading, // ✅ Expose loading to others
      }}
    >
      {children}
    </GameVariables.Provider>
  );
}

export const useGame = () => useContext(GameVariables);
