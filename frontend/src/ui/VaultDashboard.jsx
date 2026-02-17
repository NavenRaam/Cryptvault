import { useState } from "react";
import UploadBox from "./UploadBox";
import SearchBar from "./SearchBar";
import ResultsList from "./ResultsList";

export default function VaultDashboard({ session }) {
  const [storage, setStorage] = useState([]);
  const [results, setResults] = useState([]);

  return (
    <div>
      <h3>Vault Unlocked</h3>

      <UploadBox
        session={session}
        storage={storage}
        setStorage={setStorage}
      />

      <SearchBar
        storage={storage}
        searchKey={session.searchKey}
        session={session}
        setResults={setResults}
      />

      <ResultsList
        results={results}
        session={session}
      />
    </div>
  );
}
