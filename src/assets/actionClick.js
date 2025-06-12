// actionclick.js

const ACTION_EFFECTS = {
  eat: {
    stats: { meal: +20, happiness: +5, money: -10 },
    message: "Eating... +20 meal, +5 happiness, -10 money",
  },
  sleep: {
    stats: { sleep: +25, cleanliness: -5 },
    message: "Sleeping... +25 sleep, -5 cleanliness",
  },
  play: {
    stats: { happiness: +20, sleep: -10 },
    message: "Playing... +20 happiness, -10 sleep",
  },
  run: {
    stats: { happiness: +10, meal: -15, cleanliness: -10 },
    message: "Running... +10 happiness, -15 meal, -10 cleanliness",
  },
  picnic: {
    stats: { happiness: +15, meal: +10 },
    item: "Sandwich",
    message: "Picnic time! +15 happiness, +10 meal (got Sandwich)",
  },
  read: {
    stats: { happiness: +8, sleep: +5 },
    item: "Book",
    message: "Reading... +8 happiness, +5 sleep (got Book)",
  },
  lift: {
    stats: { happiness: +12, meal: -20, cleanliness: -15 },
    item: "Protein Shake",
    message: "Lifting weights... +12 happiness, -20 meal, -15 cleanliness (got Protein Shake)",
  },
  cardio: {
    stats: { happiness: +15, meal: -25 },
    message: "Cardio workout... +15 happiness, -25 meal",
  },
  stretch: {
    stats: { happiness: +10, cleanliness: -5 },
    message: "Stretching... +10 happiness, -5 cleanliness",
  },
  clean: {
    stats: { cleanliness: +25, happiness: -5 },
    message: "Cleaning... +25 cleanliness, -5 happiness",
  },
  shower: {
    stats: { cleanliness: +40, meal: -5 },
    message: "Showering... +40 cleanliness, -5 meal",
  },
};

export function getUpdatedStats(actionId, oldStats) {
  const newStats = { ...oldStats };
  const action = ACTION_EFFECTS[actionId];

  if (!action) return { stats: newStats, chat: "" };

  for (const [key, change] of Object.entries(action.stats)) {
    const current = newStats[key];
    const updated = current + change;

    if (key === "money") {
      newStats[key] = Math.max(0, updated);
    } else {
      newStats[key] = Math.max(0, Math.min(100, updated));
    }
  }

  if (!Array.isArray(newStats.items)) {
    newStats.items = [];
  }

  if (action.item) {
    const existingItem = newStats.items.find((i) => i.name === action.item);
    if (existingItem) {
      existingItem.count += 1;
    } else {
      newStats.items.push({ name: action.item, count: 1 });
    }
  }

  return { stats: newStats, chat: action.message };
}


export function getActionMessage(actionId) {
  return ACTION_EFFECTS[actionId]?.message || "";
}
