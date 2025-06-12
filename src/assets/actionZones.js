//for map 1
export const actionZones = [
  {
    id: "house",
    x: 1500,
    y: 800,
    width: 300,
    height: 300,
    color: "rgba(0,128,255,0.3)",
    borderColor: "#0080ff",
    actions: [
      { id: "eat", label: "Eat", info: "Restore your energy by eating healthy food." },
      { id: "sleep", label: "Sleep", info: "Recover your stamina by getting some rest." },
      { id: "play", label: "Play Game", info: "Have fun playing games to boost morale." },
    ],
  },
  {
    id: "park",
    x: 600,
    y: 1600,
    width: 350,
    height: 250,
    color: "rgba(0,200,100,0.3)",
    borderColor: "#00cc55",
    actions: [
      { id: "run", label: "Run", info: "Jog around the park to stay fit." },
      { id: "picnic", label: "Picnic", info: "Enjoy a relaxing picnic with friends." },
      { id: "read", label: "Read", info: "Read a book under the trees." },
    ],
  },
  {
    id: "gym",
    x: 2300,
    y: 400,
    width: 280,
    height: 300,
    color: "rgba(255,0,0,0.3)",
    borderColor: "#cc0000",
    actions: [
      { id: "lift", label: "Lift", info: "Strength training for muscle growth." },
      { id: "cardio", label: "Cardio", info: "Boost endurance with cardio exercises." },
      { id: "stretch", label: "Stretch", info: "Improve flexibility and prevent injuries." },
    ],
  },
];
