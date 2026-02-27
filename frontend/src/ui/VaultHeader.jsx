import { Lock, LogOut } from "lucide-react";

// Added 'session' to the props in case you want to display user-specific info later
const VaultHeader = ({ onLock, session }) => {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-border bg-background/50 backdrop-blur-md sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full border border-border flex items-center justify-center glow-box">
          <Lock className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-display font-bold text-primary tracking-wide uppercase">
            Crypt Vault
          </h1>
          <p className="text-sm font-mono text-muted-foreground">
            {/* If your session has a specific ID or name, you can put it here */}
            Status: Securely Unlocked
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Optional: You could show session.user here if it exists */}
        
        <button
          onClick={onLock}
          className="flex items-center gap-2 text-sm font-mono text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-lg border border-border hover:border-primary/20 bg-secondary/20"
        >
          <LogOut className="w-4 h-4" />
          Lock Vault
        </button>
      </div>
    </header>
  );
};

export default VaultHeader;