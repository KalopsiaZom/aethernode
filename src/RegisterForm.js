// RegisterForm.js
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import { useGame } from "./GameVariables";

export default function RegisterForm({ onBack }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { setUser } = useGame();

  const handleRegister = async () => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      setUser(result.user);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="absolute inset-0 z-30 flex items-center justify-center bg-black bg-opacity-80 text-white">
      <div className="bg-gray-900 p-6 rounded">
        <h2 className="text-xl mb-4">Register</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-2 p-2 w-full text-black"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-2 p-2 w-full text-black"
        />
        {error && <p className="text-red-500">{error}</p>}
        <button
          onClick={handleRegister}
          className="bg-white text-black px-4 py-2 rounded mt-2 w-full"
        >
          Register
        </button>
        <button
          onClick={onBack}
          className="text-blue-400 mt-3 underline text-sm"
        >
          Back to Login
        </button>
      </div>
    </div>
  );
}
