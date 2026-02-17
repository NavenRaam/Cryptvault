import { toBase64 } from "./utils";
import { encryptFile } from "./encryptFile";
import { generateSearchToken } from "./searchToken";

export async function buildEncryptedMetadata(
  fileBuffer,
  keywords,
  masterKey,
  searchKey
) {
  const encrypted = await encryptFile(fileBuffer, masterKey);

  const searchTokens = [];
  for (const keyword of keywords) {
    const token = await generateSearchToken(keyword, searchKey);
    searchTokens.push(token);
  }

  return {
    file_id: crypto.randomUUID(),
    ciphertext: toBase64(encrypted.encryptedFile),
    encrypted_file_key: toBase64(encrypted.encryptedFileKey),
    iv_file: toBase64(encrypted.ivFile),
    iv_key: toBase64(encrypted.ivKey),
    search_tokens: searchTokens,
    version: 1,
  };
}
