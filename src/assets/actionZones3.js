export const actionZones3 = [
    {
    //map 3
    id: "rivercross",
    x: 200,
    y: 300,
    width: 50,
    height: 350,
    color: "rgba(0,128,255,0.3)",
    borderColor: "#0080ff",
    actions: [
      { id: "fetchWater", label: "Fetch water", info: "Fetch some water to you." },
      { id: "fishRiver", label: "Fish the river", info: "Fish some other fishes in this river." },
      { id: "skipStones", label: "Skipping stones", info: "Some little game that make you happy." },
    ],
  },
  {
    id: "chestarea",
    x: 518,
    y: 300,
    width: 100,
    height: 100,
    color: "rgba(0,200,100,0.3)",
    borderColor: "#00cc55",
    actions: [
      { id: "storeItems", label: "Organize items", info: "Organize some items that are in the chest (why not)." },
      { id: "findSupplies", label: "Find supplies", info: "Search the chest." },
      { id: "repairHut", label: "Clean the chest", info: "Chest clean chest happy." },
    ],
  },
  {
    id: "forestclearing",
    x: 750,
    y: 200,
    width: 220,
    height: 300,
    color: "rgba(255,0,0,0.3)",
    borderColor: "#cc0000",
    actions: [
      { id: "gatherMushrooms", label: "Gather some mushrooms", info: "Get em mushrooms." },
      { id: "huntSmallGame", label: "Hunt some rabbits", info: "Hunt them for their meat." },
      { id: "exploreClearing", label: "Explore", info: "Explore the forest." },
    ],
  },
];
