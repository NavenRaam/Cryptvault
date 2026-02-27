import { useState } from "react";
// Lovable UI Components (Need to be converted next)
import DoodleBackground from "./DoodleBackground"; 
import VaultHeader from "./VaultHeader";
// Your existing functional components
import UploadBox from "./UploadBox"; 
import SearchBar from "./SearchBar";
import ResultsList from "./ResultsList";

export default function VaultDashboard({ session, onLock}) {
  // --- YOUR EXISTING BACKEND STATE ---
  const [storage, setStorage] = useState([]);
  const [results, setResults] = useState([]);
   // Defaulted to true since session is active

  return (
    <div className="min-h-screen vault-gradient relative overflow-hidden">
      {/* Visual Background from Lovable */}
      <DoodleBackground />

      <div className="relative z-10 min-h-screen flex flex-col animate-fade-in">
        {/* Header with your session data if needed */}
        <VaultHeader session={session} onLock={onLock} />

        <main className="flex-1 p-6">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
            
            {/* LEFT SIDE: Your existing Upload Logic */}
            <div className="bg-card border border-border rounded-xl p-6 glow-box">
              <h3 className="text-lg font-semibold mb-4 text-primary">Secure Upload</h3>
              <UploadBox
                session={session}
                storage={storage}
                setStorage={setStorage}
              />
            </div>

            {/* RIGHT SIDE: Your existing Search & Results Logic */}
            <div className="bg-card border border-border rounded-xl p-6 glow-box flex flex-col gap-4">
              <h3 className="text-lg font-semibold text-primary">Secure Search</h3>
              
              <SearchBar
                storage={storage}
                searchKey={session.searchKey}
                session={session}
                setResults={setResults}
              />

              <div className="mt-4 flex-1 overflow-auto">
                <ResultsList
                  results={results}
                  session={session}
                />
              </div>
            </div>
            
          </div>
        </main>

        <footer className="px-6 py-3 border-t border-border bg-background/50 backdrop-blur-sm">
          <p className="text-center text-xs font-mono text-muted-foreground">
            Zero Knowledge • End-to-End Encrypted • CryptVault Active
          </p>
        </footer>
      </div>
    </div>
  );
}