export async function decryptFile(
  encryptedFile,
  encryptedFileKey,
  masterKey,
  ivFile,
  ivKey
) {
  try {
    const fileKeyBuffer = await crypto.subtle.decrypt(
      { name: "AES-GCM", iv: ivKey },
      masterKey,
      encryptedFileKey
    );

    const fileCryptoKey = await crypto.subtle.importKey(
      "raw",
      fileKeyBuffer,
      "AES-GCM",
      false,
      ["decrypt"]
    );

    return await crypto.subtle.decrypt(
      { name: "AES-GCM", iv: ivFile },
      fileCryptoKey,
      encryptedFile
    );
  } catch (err) {
    throw new Error("Decryption failed: Invalid key or corrupted data");
  }
}
