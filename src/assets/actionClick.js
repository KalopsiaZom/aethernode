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
  //map 2
  //courtyard
  pray: {
    stats: { happiness: +30, sleep: +10 },
    message: "Praying at the temple... +30 happiness, +10 sleep",
  },

  cleanShrine: {
    stats: { cleanliness: +25, happiness: +10, money: +15 },
    message: "Cleaning the shrine... +25 cleanliness, +10 happiness, +15 money",
  },

  findRelic: {
    stats: { happiness: +15, money: +50, meal: -10, cleanliness: -40, sleep: -10 },
    item: "Ancient Relic",
    message: "Found a hidden relic! +15 happiness, +50 money, -10 meal, -40 cleanliness, -10 sleep (got Ancient Relic)",
  },
  //circlearea
  relaxFountain: {
    stats: { happiness: +20, sleep: +15 },
    message: "Relaxing by the fountain... +20 happiness, +15 sleep",
  },

  washFace: {
    stats: { cleanliness: +20, happiness: +5 },
    message: "Washing your face at the fountain... +20 cleanliness, +5 happiness",
  },

  makeWish: {
    stats: { happiness: +25, money: -10 },
    message: "Making a wish... +25 happiness, -10 money (threw a coin)",
  },
  //garden
  meditateGarden: {
    stats: { happiness: +30, sleep: +20 },
    message: "Meditating in the garden... +30 happiness, +20 sleep",
  },

  collectHerbs: {
    stats: { meal: +10, happiness: +5 },
    item: "Healing Herb",
    message: "Collecting healing herbs... +10 meal, +5 happiness (got Healing Herb)",
  },

  findCoin: {
    stats: { money: +30, happiness: +10, cleanliness: -30, sleep: -10 },
    message: "Found some coins hidden under a rock... +30 money, +10 happiness, -30 cleanliness, -10 sleep",
  },
  //map 3
  //river crossing
  fetchWater: {
    stats: { cleanliness: +20, happiness: +5 },
    message: "Fetching fresh water from the river... +20 cleanliness, +5 happiness",
  },

  fishRiver: {
    stats: { meal: -10, happiness: +10, sleep: -5 },
    item: "River Fish",
    message: "Fishing in the river... -10 meal, +10 happiness, -5 sleep (got River Fish)",
  },

  skipStones: {
    stats: { happiness: +15, sleep: -5 },
    message: "Skipping stones on the river... +15 happiness, -5 sleep",
  },
  //chest area
  storeItems: {
    stats: { cleanliness: -5, happiness: +10, sleep: -5 },
    message: "Organizing items in the hut... -5 cleanliness, +10 happiness, -5 sleep",
  },

  findSupplies: {
    stats: { meal: +5, money: +20, cleanliness: -10 },
    item: "Supply Box",
    message: "Found useful supplies! +5 meal, +20 money, -10 cleanliness (got Supply Box)",
  },

  repairHut: {
    stats: { happiness: +10, money: -15 },
    message: "Cleaning the storage... +10 happiness, -15 money",
  },
  //forest clearing
  gatherMushrooms: {
    stats: { meal: +5, happiness: +5, sleep: -5 },
    item: "Mushrooms",
    message: "Gathering wild mushrooms... +5 meal, +5 happiness, -5 sleep (got Mushrooms)",
  },

  huntSmallGame: {
    stats: { meal: +5, cleanliness: -10 },
    item: "Rabbit Meat",
    message: "Hunting small game... +5 meal, -10 cleanliness (got Rabbit Meat)",
  },

  exploreClearing: {
    stats: { happiness: +20, sleep: -15, cleanliness: -10 },
    message: "Exploring the forest clearing... +20 happiness, -15 sleep, -10 cleanliness",
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
