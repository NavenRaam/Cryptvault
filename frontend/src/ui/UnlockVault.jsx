import { useState } from "react";

export default function UnlockVault({ onUnlock }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [restricted, setRestricted] = useState(false);

  function unlock() {
    if (!username || !password) return;
    onUnlock({ username, password, restricted });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0b0f14]">
      <div className="w-full max-w-md bg-[#111827] p-8 rounded-2xl shadow-xl border border-gray-800">
        <h1 className="text-2xl font-semibold text-center text-gray-100">
          CryptVault
        </h1>

        <p className="text-sm text-gray-400 text-center mt-1 mb-6">
          Zero-Knowledge Secure Vault
        </p>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-[#0b0f14] border border-gray-700 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-[#0b0f14] border border-gray-700 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        <label className="flex items-center gap-2 text-sm text-gray-400 mt-4">
          <input
            type="checkbox"
            checked={restricted}
            onChange={() => setRestricted(!restricted)}
            className="accent-cyan-500"
          />
          Restrict vault to this device
        </label>

        <button
          onClick={unlock}
          className="w-full mt-6 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 transition font-medium text-gray-900"
        >
          Unlock Vault
        </button>

        <p className="text-xs text-gray-500 text-center mt-4">
          Files are encrypted locally. The server never sees your data.
        </p>
      </div>
    </div>
  );
}
