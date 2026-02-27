import { fromBase64 } from "./utils";

export async function decryptFile(
  encryptedFileB64,
  encryptedFileKeyB64,
  ivFileB64,
  ivKeyB64,
  masterKey
) {
  const encryptedFile = fromBase64(encryptedFileB64);
  const encryptedFileKey = fromBase64(encryptedFileKeyB64);
  const ivFile = fromBase64(ivFileB64);
  const ivKey = fromBase64(ivKeyB64);

  // 🔓 Decrypt file key
  const fileKeyRaw = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv: ivKey },
    masterKey,
    encryptedFileKey
  );

  const fileKey = await crypto.subtle.importKey(
    "raw",
    fileKeyRaw,
    "AES-GCM",
    false,
    ["decrypt"]
  );

  // 🔓 Decrypt file
  const decryptedBuffer = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv: ivFile },
    fileKey,
    encryptedFile
  );

  return decryptedBuffer;
}