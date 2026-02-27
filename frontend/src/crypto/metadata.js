// frontend/src/crypto/metadata.js
import { encryptFile } from "./encryptFile";
import { generateSearchToken } from "./searchToken";
import { toBase64 } from "./utils";

export async function buildEncryptedMetadata(
  fileBuffer,
  keywords,
  masterKey,
  searchKey,
  fileName,
  mimeType
) {
  // 🔐 Encrypt file + file key
  const {
    encryptedFile,
    encryptedFileKey,
    ivFile,
    ivKey,
  } = await encryptFile(fileBuffer, masterKey);

  // 🔎 Generate blind search tokens
  const search_tokens = await generateSearchToken(keywords, searchKey);

  // 📦 FINAL OBJECT (MUST MATCH BACKEND EXACTLY)
  return {
    file_id: crypto.randomUUID(),
    version: 1,

    // 🔐 encrypted data
    ciphertext: toBase64(encryptedFile),
    encrypted_file_key: toBase64(encryptedFileKey),
    iv_file: toBase64(ivFile),
    iv_key: toBase64(ivKey),

    // 🔎 searchable
    search_tokens,

    // 📎 PLAINTEXT METADATA (SAFE)
    filename: fileName,
    mime_type: mimeType,
  };
}