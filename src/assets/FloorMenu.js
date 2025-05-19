// FloorMenu.js
import React from "react";
import { useNavigate } from 'react-router-dom';

const floors = [
  { id: "floor1", name: "Floor 1", mapUrl: "/map1.png" },
  { id: "floor2", name: "Floor 2", mapUrl: "/map2.png" },
  { id: "floor3", name: "Floor 3", mapUrl: "/map3.png" },
];

export default function FloorMenu({ onSelect, onClose }) {

    const navigate = useNavigate();
    
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.8)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        flexDirection: "column",
        color: "white",
      }}
    >
      <h2>Choose a Floor</h2>
      {floors.map((floor) => (
        <button
          key={floor.id}
          onClick={() => {
            onSelect(floor);
            navigate(`/${floor.id}`);
        }}
          style={{
            margin: "10px",
            padding: "10px 20px",
            fontSize: "18px",
            borderRadius: "8px",
            backgroundColor: "#444",
            color: "white",
            border: "2px solid #888",
            cursor: "pointer",
          }}
        >
          {floor.name}
        </button>
      ))}
      <button
        onClick={onClose}
        style={{
          marginTop: "20px",
          padding: "8px 16px",
          fontSize: "16px",
          backgroundColor: "#666",
          color: "white",
          border: "none",
          borderRadius: "6px",
        }}
      >
        Cancel
      </button>
    </div>
  );
}
