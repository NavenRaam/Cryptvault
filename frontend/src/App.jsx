import { useState } from "react";
import UnlockVault from "./ui/UnlockVault";
import VaultDashboard from "./ui/VaultDashboard";

export default function App() {
  const [session, setSession] = useState(null);

  return (
    <div>
      {!session ? (
        <UnlockVault onUnlock={setSession} />
      ) : (
        <VaultDashboard session={session} />
      )}
    </div>
  );
}
