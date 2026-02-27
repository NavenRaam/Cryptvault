import { useState } from "react";
import UnlockVault from "./ui/UnlockVault";
import VaultDashboard from "./ui/VaultDashboard";

export default function App() {
  const [session, setSession] = useState(null);

  const handleUnlock = (sessionData) => {
    setSession(sessionData);
  };

  const handleLock = () => {
    setSession(null);
  };

  return (
    <>
      {!session ? (
        <UnlockVault onUnlock={handleUnlock} />
      ) : (
        <VaultDashboard
          session={session}
          onLock={handleLock}
        />
      )}
    </>
  );
}