import { decryptFromMetadata } from "../crypto";

export default function ResultsList({ results, session }) {
  async function download(item) {
    const decrypted = await decryptFromMetadata(item, session.masterKey);
    const blob = new Blob([decrypted]);
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "decrypted_file";
    a.click();

    URL.revokeObjectURL(url);
  }

  return (
    <ul>
      {results.map(item => (
        <li key={item.file_id}>
          <button onClick={() => download(item)}>
            Decrypt & Download
          </button>
        </li>
      ))}
    </ul>
  );
}
