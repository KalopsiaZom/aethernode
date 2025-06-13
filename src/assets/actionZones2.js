export const actionZones2 = [
  //map 2
    {
      id: "door",
      x: 330,
      y: 270,
      width: 120,
      height: 100,
      color: "rgba(150,150,255,0.3)",
      borderColor: "#99f",
      actions: [
        { id: "enter-house", label: "Enter House", info: "Go inside the house." }
    ],
  },
  {
    id: "courtyard",
    x: 520,
    y: 50,
    width: 500,
    height: 380,
    color: "rgba(0,128,255,0.3)",
    borderColor: "#0080ff",
    actions: [
      { id: "pray", label: "Pray", info: "Pray to the temple." },
      { id: "cleanShrine", label: "Cleaning the shrine and building", info: "Clean your surroundings." },
      { id: "findRelic", label: "Search the pots", info: "Go around and search the pots." },
    ],
  },
  {
    id: "circlearea",
    x: 1400,
    y: 100,
    width: 450,
    height: 400,
    color: "rgba(0,200,100,0.3)",
    borderColor: "#00cc55",
    actions: [
      { id: "relaxFountain", label: "Relax on the fountain", info: "Relax while you're at it." },
      { id: "washFace", label: "Wash your face", info: "With some weird water magic, it can wash your face." },
      { id: "makeWish", label: "Make a wish", info: "Make a wish on the circle area because why not." },
    ],
  },
  {
    id: "garden",
    x: 1200,
    y: 900,
    width: 400,
    height: 400,
    color: "rgba(255,0,0,0.3)",
    borderColor: "#cc0000",
    actions: [
      { id: "meditateGarden", label: "Meditate", info: "Meditate around the mystic forest." },
      { id: "collectHerbs", label: "Collect herbs", info: "Collect some herbs." },
      { id: "findCoin", label: "Find coin", info: "Finding any coins that maybe magically appeared in this mystic forest." },
    ],
  },
];
