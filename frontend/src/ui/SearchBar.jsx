import { useState } from "react";
import { Search, FileText, Download, Radar } from "lucide-react";
import { generateSearchToken } from "../crypto/searchToken";
import { decryptFile } from "../crypto";

export default function BlindBeaconSearch({ session, setResults }) {
  const [query, setQuery] = useState("");
  const [localResults, setLocalResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;

    try {
      setIsSearching(true);

      // 🔐 Generate blind beacon token
      const [searchToken] = await generateSearchToken(
        [query],
        session.searchKey
      );

      const res = await fetch("http://127.0.0.1:8000/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          vault_id: session.vaultId,
          search_token: searchToken,
        }),
      });

      if (!res.ok) {
        throw new Error("Search failed");
      }

      const data = await res.json();

      setLocalResults(data.results);
      setResults?.(data.results); // optional external state
    } catch (err) {
      console.error("Blind search error:", err);
      setLocalResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <Radar className="w-5 h-5 text-primary glow-text" />
        <h2 className="text-lg font-display font-semibold text-primary">
          Blind Beacon Search
        </h2>
      </div>

      <p className="text-muted-foreground text-xs font-mono mb-4">
        Search encrypted files without revealing keywords
      </p>

      {/* Search bar */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          placeholder="Enter search keyword..."
          className="w-full bg-secondary border border-border rounded-lg pl-10 pr-4 py-3 font-mono text-sm"
        />
      </div>

      <button
        onClick={handleSearch}
        disabled={isSearching}
        className="w-full bg-secondary border border-border py-2.5 rounded-lg font-display text-sm hover:bg-accent transition-all flex items-center justify-center gap-2 disabled:opacity-50"
      >
        {isSearching ? (
          <>
            <div className="w-3 h-3 border border-primary/50 border-t-primary rounded-full animate-spin" />
            Scanning vault...
          </>
        ) : (
          <>
            <Radar className="w-4 h-4" />
            Search Vault
          </>
        )}
      </button>

      {/* Results */}
      {localResults.length > 0 && (
        <div className="mt-4 space-y-2 flex-1 overflow-y-auto">
          <p className="text-xs font-mono text-muted-foreground mb-2">
            {localResults.length} file
            {localResults.length !== 1 && "s"} found
          </p>

          {localResults.map((file) => (
            <div
              key={file.file_id}
              className="bg-secondary rounded-lg px-3 py-3 group hover:bg-accent transition-colors"
            >
              <div className="flex items-start gap-3">
                <FileText className="w-4 h-4 text-muted-foreground mt-0.5" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-mono truncate">
                    Encrypted File
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Version {file.version}
                  </p>
                </div>

                {/* Download will be wired next */}
                <button
                  onClick={async () => {
                    try {
                      const decryptedBuffer = await decryptFile(
                        file.ciphertext,
                        file.encrypted_file_key,
                        file.iv_file,
                        file.iv_key,
                        session.masterKey
                      );

                      const blob = new Blob(
                        [decryptedBuffer],
                        { type: file.mime_type }
                      );
                      const url = URL.createObjectURL(blob);

                      const a = document.createElement("a");
                      a.href = url;
                      a.download = file.file_name;
                      a.click();

                      URL.revokeObjectURL(url);
                    } catch (err) {
                      alert("Wrong password or corrupted file");
                      console.error(err);
                    }
                  }}
                  className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-primary p-1"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty state */}
      {localResults.length === 0 && !isSearching && (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Radar className="w-8 h-8 text-muted-foreground/30 mx-auto mb-2 animate-pulse-glow" />
            <p className="text-xs text-muted-foreground font-mono">
              No matching encrypted files
            </p>
          </div>
        </div>
      )}
    </div>
  );
}