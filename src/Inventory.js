import React, { useState, useEffect } from "react";
import { useGame } from "./GameVariables";
//import selectedItemImg from "./img/bg1.jpg";

export default function InventoryUI() {
  const { stats, handleUseItem, handleDropItem } = useGame();
  const [selectedItem, setSelectedItem] = useState(null);


  const itemImages = {
    "Firewood": require("./img/bg1.jpg"),
    "Berries": require("./img/bg2.jpg"),
    "Fish": require("./img/bg3.jpg"),
  };

    const itemDescriptions = {
    "Firewood": "A nice chopped firewood. (Sellable item)",
    "Berries": "Reading essays. (+20 meal, +10 happiness)",
    "Fish": "Sadly you can't eat this since it's raw. (Sellable item)",
    };



  const handleClick = (item) => {
    setSelectedItem(item);
  };

  useEffect(() => {
    if (selectedItem && !stats.items.some((item) => item.name === selectedItem)) {
        setSelectedItem(null);
    }
  }, [stats.items, selectedItem]);


  return (
    <div style={styles.overlay}>
      <div style={styles.inventoryContainer}>
        <div style={styles.gridContainer}>
        {stats.items.length === 0 ? (
        <p style={styles.emptyText}>Inventory is empty.</p>
        ) : (
        stats.items.map((itemObj, index) => (
            <div
            key={index}
            style={styles.itemBox}
            onClick={() => handleClick(itemObj.name)}
            >
            <img
                src={itemImages[itemObj.name]}
                alt={itemObj.name}
                style={styles.itemImage}
            />
            <span style={styles.itemCount}>x{itemObj.count}</span>
            </div>
        ))
        )}
        </div>

        {selectedItem && (
        <div style={styles.itemDetail}>
            <img
                src={itemImages[selectedItem]}
                alt={selectedItem}
                style={styles.detailImage}
            />
            <h3>{selectedItem}</h3>
            <p>{itemDescriptions[selectedItem] || "No description available."}</p>
            <button
                style={styles.useButton}
                onClick={() => handleUseItem(selectedItem)}
                disabled={!stats.items.find((i) => i.name === selectedItem)}
            >
            Use
            </button>
            <button
                style={styles.dropButton}
                onClick={() => handleDropItem(selectedItem)}
                disabled={!stats.items.find((i) => i.name === selectedItem)}
            >
            Drop
            </button>
        </div>
        )}

      </div>
    </div>
  );
}
const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },
  inventoryContainer: {
    display: "flex",
    backgroundColor: "#2c2c2c",
    padding: "20px",
    borderRadius: "12px",
    color: "#fff",
    boxShadow: "0 0 10px #000",
  },
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(5, 64px)",
    gridGap: "12px",
    marginRight: "24px",
  },
  itemBox: {
    width: "64px",
    height: "64px",
    backgroundColor: "#3a3a3a",
    borderRadius: "8px",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    boxShadow: "0 2px 4px rgba(0,0,0,0.3)",
  },
  itemImage: {
    width: "48px",
    height: "48px",
    objectFit: "contain",
  },
  itemCount: {
    position: "absolute",
    bottom: "4px",
    right: "6px",
    backgroundColor: "#000",
    padding: "2px 6px",
    fontSize: "12px",
    borderRadius: "6px",
  },
  itemDetail: {
    minWidth: "200px",
    padding: "16px",
    backgroundColor: "#1f1f1f",
    borderRadius: "8px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.5)",
  },
  detailImage: {
    width: "96px",
    height: "96px",
    objectFit: "contain",
    marginBottom: "10px",
  },
  useButton: {
    marginTop: "10px",
    padding: "8px 12px",
    backgroundColor: "#2ecc71",
    border: "none",
    borderRadius: "6px",
    color: "#fff",
    cursor: "pointer",
    width: "100%",
  },
  dropButton: {
    marginTop: "8px",
    padding: "8px 12px",
    backgroundColor: "#e74c3c",
    border: "none",
    borderRadius: "6px",
    color: "#fff",
    cursor: "pointer",
    width: "100%",
  },
  emptyText: {
    color: "#aaa",
  },
};
