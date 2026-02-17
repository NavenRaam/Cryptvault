export async function encryptFile(fileBuffer, masterKey) {
  const fileKey = crypto.getRandomValues(new Uint8Array(32));
  const ivFile = crypto.getRandomValues(new Uint8Array(12));
  const ivKey = crypto.getRandomValues(new Uint8Array(12));

  const fileCryptoKey = await crypto.subtle.importKey(
    "raw",
    fileKey,
    "AES-GCM",
    false,
    ["encrypt"]
  );

  const encryptedFile = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv: ivFile },
    fileCryptoKey,
    fileBuffer
  );

  const encryptedFileKey = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv: ivKey },
    masterKey,
    fileKey
  );

  return {
    encryptedFile,
    encryptedFileKey,
    ivFile,
    ivKey,
  };
}
