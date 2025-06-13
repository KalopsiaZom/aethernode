import React, { useState } from "react";
import { useGame } from "./GameVariables";
import char1 from "./assets/sprite/char1menu.gif";
import char2 from "./assets/sprite/char2menu.gif";
import char3 from "./assets/sprite/char3menu.gif";

const characters = [
  { id: "char1", name: "Character 1", image: char1 },
  { id: "char2", name: "Character 2", image: char2 },
  { id: "char3", name: "Character 3", image: char3 },
];

export default function CharacterSelection({ onBack, onSelect }) {
  const { setSelectedCharacter, setPlayerName } = useGame();
  const [nameInput, setNameInput] = useState("");

  const handleChoose = (charId) => {
    if (nameInput.trim()) {
      setSelectedCharacter(charId);
      setPlayerName(nameInput.trim());
      onSelect(); // lanjut ke floor1
    } else {
      alert("Masukkan nama terlebih dahulu.");
    }
  };

  return (
    <div className="text-white p-10">
      <h2 className="text-2xl font-bold mb-4">Select Your Character</h2>
      <input
        type="text"
        placeholder="Enter your name"
        value={nameInput}
        onChange={(e) => setNameInput(e.target.value)}
        className="mb-4 p-2 rounded text-black"
      />
      <div className="flex gap-8">
        {characters.map((char) => (
          <div key={char.id} className="text-center">
            <img
              src={char.image}
              alt={char.name}
              className="w-32 h-32 cursor-pointer border-2 border-white hover:border-yellow-300 rounded-xl"
              onClick={() => handleChoose(char.id)}
            />
            <p className="mt-2">{char.name}</p>
          </div>
        ))}
      </div>
      <button
        className="mt-8 bg-white text-black px-4 py-2 rounded"
        onClick={onBack}
      >
        Back to Menu
      </button>
    </div>
  );
}
