// LoginForm.js
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import { useGame } from "./GameVariables";

export default function LoginForm({ onSwitchToRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { setUser } = useGame();

  const handleLogin = async () => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      setUser(result.user);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="absolute inset-0 z-30 flex items-center justify-center bg-black bg-opacity-80 text-white">
      <div className="bg-gray-900 p-6 rounded">
        <h2 className="text-xl mb-4">Login</h2>
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
          onClick={handleLogin}
          className="bg-white text-black px-4 py-2 rounded mt-2 w-full"
        >
          Login
        </button>
        <button
          onClick={onSwitchToRegister}
          className="text-blue-400 mt-3 underline text-sm"
        >
          Don’t have an account? Register
        </button>
      </div>
    </div>
  );
}
