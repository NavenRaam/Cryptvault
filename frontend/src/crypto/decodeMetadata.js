import { fromBase64 } from "./utils";
import { decryptFile } from "./decryptFile";

export async function decryptFromMetadata(meta, masterKey) {
  return decryptFile(
    fromBase64(meta.ciphertext),
    fromBase64(meta.encrypted_file_key),
    masterKey,
    fromBase64(meta.iv_file),
    fromBase64(meta.iv_key)
  );
}
