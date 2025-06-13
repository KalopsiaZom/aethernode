export const actionZones = [
  {
    //map 1
    id: "house",
    x: 1550,
    y: 1480,
    width: 100,
    height: 100,
    color: "rgba(0,128,255,0.3)",
    borderColor: "#0080ff",
    actions: [
      { id: "eat", label: "Eat", info: "Restore your energy by eating healthy food." },
      { id: "sleep", label: "Sleep", info: "Recover your stamina by getting some rest." },
      { id: "play", label: "Play Game", info: "Have fun playing games to boost morale." },
    ],
  },
  {
    id: "forest",
    x: 900,
    y: 900,
    width: 450,
    height: 400,
    color: "rgba(0,200,100,0.3)",
    borderColor: "#00cc55",
    actions: [
      { id: "gatherWood", label: "Gather Wood", info: "Chop down some woods." },
      { id: "forageBerries", label: "Get Berries", info: "Pick up some berries." },
      { id: "meditate", label: "Meditate", info: "Meditate under bunch of trees." },
    ],
  },
  {
    id: "lake",
    x: 2100,
    y: 1400,
    width: 50,
    height: 400,
    color: "rgba(255,0,0,0.3)",
    borderColor: "#cc0000",
    actions: [
      { id: "fish", label: "Fishing", info: "Fish some fishes in the lake." },
      { id: "washClothes", label: "Wash your clothes", info: "Wash your clothes at the lake to make it cleaner." },
      { id: "swim", label: "Swimming", info: "Going for a swim." },
    ],
  },
  {
    id: "market",
    x: 900,
    y: 1900,
    width: 320,
    height: 100,
    color: "rgba(255,215,0,0.3)",
    borderColor: "#ffd700",
    actions: [
      { id: "sell", label: "Open Market", info: "Buy and sell your items here." }
    ],
  },
];
