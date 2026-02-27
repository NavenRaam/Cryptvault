import { useState, useCallback } from "react";
import { Lock, Eye, EyeOff, ShieldCheck } from "lucide-react";
import { deriveVaultKeys } from "../crypto/keyDerivation";

export default function UnlockVault({ onUnlock }) {
  const [passphrase, setPassphrase] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [error, setError] = useState("");

  const handleUnlock = useCallback(async () => {
    if (!passphrase.trim()) {
      setError("Enter your vault passphrase");
      return;
    }

    try {
      setIsUnlocking(true);
      setError("");

      // Derive keys (REAL crypto, not simulation)
      const session = await deriveVaultKeys(passphrase);

      // Optional UI delay for animation smoothness
      setTimeout(() => {
        onUnlock(session);
      }, 600);

    } catch (err) {
      console.error(err);
      setError("Failed to unlock vault");
      setIsUnlocking(false);
    }
  }, [passphrase, onUnlock]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 relative z-10">
      <div
        className={`flex flex-col items-center transition-all duration-700 ${
          isUnlocking
            ? "scale-0 opacity-0 rotate-12"
            : "scale-100 opacity-100"
        }`}
      >
        {/* Vault Icon */}
        <div className="relative mb-8">
          <div className="w-24 h-24 rounded-full border border-border flex items-center justify-center glow-box">
            <Lock className="w-10 h-10 text-foreground glow-text" />
          </div>

          {/* Scan line effect */}
          <div className="absolute inset-0 rounded-full overflow-hidden">
            <div className="absolute left-0 right-0 h-px bg-primary/40 animate-scan-line" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2 glow-text text-primary">
          CRYPT VAULT
        </h1>

        <p className="text-muted-foreground font-mono text-sm mb-8 tracking-widest uppercase">
          Zero Knowledge Encryption
        </p>

        {/* Input */}
        <div className="w-full max-w-sm space-y-4">
          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              value={passphrase}
              onChange={(e) => {
                setPassphrase(e.target.value);
                setError("");
              }}
              onKeyDown={(e) => e.key === "Enter" && handleUnlock()}
              placeholder="Enter vault passphrase..."
              className="w-full bg-secondary border border-border rounded-lg px-4 py-3 pr-12 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/30 focus:glow-box transition-all"
            />

            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showPass ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>

          {error && (
            <p className="text-destructive text-xs font-mono animate-fade-in">
              {error}
            </p>
          )}

          <button
            onClick={handleUnlock}
            className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold tracking-wide hover:glow-btn transition-all duration-300 flex items-center justify-center gap-2"
          >
            <ShieldCheck className="w-4 h-4" />
            UNLOCK VAULT
          </button>

          <p className="text-center text-muted-foreground text-xs font-mono">
            Your data never leaves your device unencrypted
          </p>
        </div>
      </div>
    </div>
  );
}