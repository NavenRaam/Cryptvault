import { generateSearchToken } from "../crypto";

export default function SearchBar({ storage, searchKey, session, setResults }) {
  async function onSearch(e) {
    const keyword = e.target.value.trim();
    if (!keyword) {
      setResults([]);
      return;
    }

    const token = await generateSearchToken(keyword, searchKey); // ✅ FIXED

    const res = await fetch("http://127.0.0.1:8000/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        session_id: session.sessionId,
        search_token: token
      })
    });

    const data = await res.json();
    setResults(data.results);
  }

  return (
    <input
      placeholder="Search encrypted files"
      onChange={onSearch}
      style={{ marginTop: "10px", width: "100%" }}
    />
  );
}
