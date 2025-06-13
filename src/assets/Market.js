import React, { useState } from "react";
import { useGame } from "../GameVariables";

const itemValues = {
    Firewood: 20,
    Fish: 10,
    Berries: 5,
    "Ancient Relic": 50,
    "Healing Herb": 30,
    "River Fish": 15,
    "Supply Box": 40,
    Mushrooms: 5,
    "Rabbit Meat": 15,
    Soap: 15,
    Sandwich: 5,
    Book: 20,
    Coffee: 5,
};

const shopStock = [
  { name: "Sandwich", price: 25 },
  { name: "Book", price: 40 },
  { name: "Coffee", price: 50 },
  { name: "Soap", price: 35 },
];

export default function Market({ onClose }) {
  const { stats, addItem, updateStat } = useGame();
  const [tab, setTab] = useState("buy");

  const handleBuy = (item) => {
    if (stats.money >= item.price) {
      addItem(item.name);
      updateStat("money", stats.money - item.price);
    } else {
      alert("Not enough money!");
    }
  };

  const handleSellAll = () => {
    let totalEarned = 0;
    const remainingItems = [];

    stats.items.forEach((item) => {
      const value = itemValues[item.name] || 10;
      totalEarned += value * item.count;
    });

    updateStat("items", []);
    updateStat("money", stats.money + totalEarned);
    alert(`You earned $${totalEarned} from selling your items.`);
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.container}>
        <h2 style={{ marginBottom: 10 }}>Market</h2>

        <div style={styles.tabs}>
          <button onClick={() => setTab("buy")} style={tab === "buy" ? styles.activeTab : styles.tab}>Buy</button>
          <button onClick={() => setTab("sell")} style={tab === "sell" ? styles.activeTab : styles.tab}>Sell</button>
        </div>

        {tab === "buy" ? (
          <div>
            {shopStock.map((item, i) => (
              <div key={i} style={styles.itemRow}>
                <span>{item.name}</span>
                <span>${item.price}</span>
                <button onClick={() => handleBuy(item)} style={styles.buyBtn}>Buy</button>
              </div>
            ))}
          </div>
        ) : (
          <div>
            {stats.items.length > 0 ? (
              <>
                {stats.items.map((item, i) => (
                  <div key={i} style={styles.itemRow}>
                    <span>{item.name} x{item.count}</span>
                    <span>${(itemValues[item.name] || 10) * item.count}</span>
                  </div>
                ))}
                <button onClick={handleSellAll} style={{ ...styles.buyBtn, marginTop: 10 }}>Sell All</button>
              </>
            ) : (
              <p>You have no items to sell.</p>
            )}
          </div>
        )}

        <button onClick={onClose} style={{ marginTop: 20, ...styles.buyBtn }}>Close</button>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.7)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  container: {
    backgroundColor: "#222",
    padding: 30,
    borderRadius: 12,
    color: "white",
    fontFamily: "monospace",
    width: 400,
    maxHeight: "80vh",
    overflowY: "auto",
  },
  tabs: {
    display: "flex",
    gap: 10,
    marginBottom: 20,
  },
  tab: {
    padding: "6px 12px",
    backgroundColor: "#444",
    border: "none",
    color: "white",
    cursor: "pointer",
    borderRadius: 6,
  },
  activeTab: {
    padding: "6px 12px",
    backgroundColor: "#0f0",
    border: "none",
    color: "black",
    cursor: "pointer",
    borderRadius: 6,
  },
  itemRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 10,
    alignItems: "center",
  },
  buyBtn: {
    backgroundColor: "#0a0",
    border: "none",
    color: "white",
    padding: "6px 12px",
    cursor: "pointer",
    borderRadius: 6,
  },
};
