const ACTION_EFFECTS = {
  //house
  eat: {
    stats: { meal: +20, happiness: +5, money: -15 },
    message: "Eating... +20 meal, +5 happiness, -15 money",
  },
  sleep: {
    stats: { sleep: +50, cleanliness: -5 },
    message: "Sleeping... +50 sleep, -5 cleanliness",
  },
  play: {
    stats: { happiness: +25, sleep: -10 },
    message: "Playing... +25 happiness, -10 sleep",
  },
  //forest
  gatherWood: {
    stats: { happiness: +5, meal: -5, cleanliness: -15 },
    item: "Firewood",
    message: "Gathering wood in the forest... +5 happiness, -5 meal, -15 cleanliness (got Firewood)",
  },

  forageBerries: {
    stats: { meal: +20, happiness: +10 },
    item: "Berries",
    message: "Foraging for berries... +20 meal, +10 happiness (got Berries)",
  },

  meditate: {
    stats: { happiness: +25, sleep: +10 },
    message: "Meditating under a tree... +25 happiness, +10 sleep",
  },
  //lake
  fish: {
    stats: { meal: +25, happiness: +10, cleanliness: -10 },
    item: "Fish",
    message: "Fishing by the river... +25 meal, +10 happiness, -10 cleanliness (got Fish)",
  },

  washClothes: {
    stats: { cleanliness: +30, happiness: +5, meal: -10 },
    message: "Washing clothes at the river... +30 cleanliness, +5 happiness, -10 meal",
  },

  swim: {
    stats: { happiness: +20, cleanliness: +10, sleep: +5 },
    message: "Swimming in the lake... +20 happiness, +10 cleanliness, +5 sleep",
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
