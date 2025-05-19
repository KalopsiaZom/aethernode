const ACTION_EFFECTS = {
  eat: {
    stats: { meal: +20, happiness: +5, money: -10 },
  },
  sleep: {
    stats: { sleep: +25, cleanliness: -5 },
  },
  play: {
    stats: { happiness: +20, sleep: -10 },
  },
  run: {
    stats: { happiness: +10, meal: -15, cleanliness: -10 },
  },
  picnic: {
    stats: { happiness: +15, meal: +10 },
    item: "Sandwich",
  },
  read: {
    stats: { happiness: +8, sleep: +5 },
    item: "Book",
  },
  lift: {
    stats: { happiness: +12, meal: -20, cleanliness: -15 },
    item: "Protein Shake",
  },
  cardio: {
    stats: { happiness: +15, meal: -25 },
  },
  stretch: {
    stats: { happiness: +10, cleanliness: -5 },
  },
  clean: {
    stats: { cleanliness: +25, happiness: -5 },
  },
  shower: {
    stats: { cleanliness: +40, meal: -5 },
  },
};

export function getUpdatedStats(actionId, oldStats) {
  const newStats = { ...oldStats };
  const action = ACTION_EFFECTS[actionId];

  if (!action) return newStats;

  // Update stats
  for (const [key, change] of Object.entries(action.stats)) {
    const current = newStats[key];
    const updated = current + change;

    if (key === "money") {
      newStats[key] = Math.max(0, updated);
    } else {
      newStats[key] = Math.max(0, Math.min(100, updated));
    }
  }

  // Make sure items array exists and is an array
  if (!Array.isArray(newStats.items)) {
    newStats.items = [];
  }

  // Add item if applicable
  if (action.item && !newStats.items.includes(action.item)) {
    newStats.items = [...newStats.items, action.item];
  }

  return newStats;
}
