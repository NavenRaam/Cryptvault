import { useState, useRef } from "react";
import { Upload, File, CheckCircle, X } from "lucide-react";
import { buildEncryptedMetadata } from "../crypto/metadata";

export default function UploadBox({ session, storage, setStorage }) {
  const [uiFiles, setUiFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef(null);

  const formatSize = (bytes) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / 1048576).toFixed(1) + " MB";
  };

  const handleFiles = async (fileList) => {
    console.log("masterKey:", session.masterKey);
    console.log("searchKey:", session.searchKey);
    const files = Array.from(fileList);

  for (const file of files) {
    setUploading(true);

    try {
      const buffer = await file.arrayBuffer();
      const keywords = file.name.split(".")[0].split("_");

      const encryptedObject = await buildEncryptedMetadata(
        buffer,
        keywords,
        session.masterKey,
        session.searchKey,
        file.name,
        file.type
      );

      const res = await fetch("http://127.0.0.1:8000/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          vault_id: session.vaultId,
          data: encryptedObject,   // ✅ SEND FULL OBJECT
        }),
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`Upload failed: ${errText}`);
      }

      setStorage((prev) => [...prev, encryptedObject]);

      setUiFiles((prev) => [
        ...prev,
        {
          id: encryptedObject.file_id,
          name: file.name,
          size: formatSize(file.size),
        },
      ]);
    } catch (err) {
      console.error("Upload error:", err);
      alert("Upload failed. Check console.");
    } finally {
      setUploading(false);
    }
  }
};

  const removeFile = (id) => {
    setUiFiles((prev) => prev.filter((f) => f.id !== id));
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <Upload className="w-5 h-5 text-primary glow-text" />
        <h2 className="text-lg font-semibold text-primary">Store Files</h2>
      </div>

      <p className="text-muted-foreground text-xs font-mono mb-4">
        Files are encrypted client-side before storage
      </p>

      {/* Drop zone */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          if (e.dataTransfer.files.length)
            handleFiles(e.dataTransfer.files);
        }}
        onClick={() => inputRef.current?.click()}
        className={`border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ${
          isDragging
            ? "border-primary/50 bg-glow-soft glow-box"
            : "border-border hover:border-primary/20 hover:bg-secondary/50"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          className="hidden"
          onChange={(e) => e.target.files && handleFiles(e.target.files)}
        />

        <Upload
          className={`w-8 h-8 mb-3 transition-colors ${
            isDragging ? "text-primary glow-text" : "text-muted-foreground"
          }`}
        />
        <p className="text-sm text-foreground">Drop files or click to browse</p>
        <p className="text-xs text-muted-foreground font-mono mt-1">
          End-to-end encrypted
        </p>
      </div>

      {/* Upload indicator */}
      {uploading && (
        <div className="mt-4 flex items-center gap-2 text-xs font-mono text-muted-foreground animate-fade-in">
          <div className="w-3 h-3 border border-primary/50 border-t-primary rounded-full animate-spin" />
          Encrypting & uploading...
        </div>
      )}

      {/* Uploaded file list (UI only) */}
      {uiFiles.length > 0 && (
        <div className="mt-4 space-y-2 flex-1 overflow-y-auto">
          {uiFiles.map((file) => (
            <div
              key={file.id}
              className="flex items-center gap-3 bg-secondary rounded-lg px-3 py-2 animate-fade-in group"
            >
              <File className="w-4 h-4 text-muted-foreground" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-mono truncate">{file.name}</p>
                <p className="text-xs text-muted-foreground">{file.size}</p>
              </div>
              <CheckCircle className="w-4 h-4 text-primary/60" />
              <button
                onClick={() => removeFile(file.id)}
                className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}