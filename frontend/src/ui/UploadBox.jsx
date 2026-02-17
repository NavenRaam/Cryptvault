import { buildEncryptedMetadata } from "../crypto";

export default function UploadBox({ storage, setStorage, session }) {
  async function upload(e) {
    const file = e.target.files[0];
    if (!file) return;

    const buffer = await file.arrayBuffer();
    const keywords = file.name.split(".")[0].split("_");

    const encryptedObject = await buildEncryptedMetadata(
      buffer,
      keywords,
      session.masterKey,
      session.searchKey
    );

    

    await fetch("http://127.0.0.1:8000/upload", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        session_id: session.sessionId,
        data: encryptedObject
      })                                 
    });

    setStorage([...storage, encryptedObject]);
  }

  return (
    <div>
      <input type="file" onChange={upload} />
      <p style={{ fontSize: "12px", opacity: 0.6 }}>
        Files are encrypted locally before storage.
      </p>
    </div>
  );
}
