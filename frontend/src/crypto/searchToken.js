// frontend/src/crypto/searchToken.js
import { toBase64 } from "./utils";

export async function generateSearchToken(keywords, searchKey) {
  if (!Array.isArray(keywords)) {
    throw new Error("keywords must be an array");
  }

  const encoder = new TextEncoder();

  const tokens = await Promise.all(
    keywords.map(async (keyword) => {
      const normalized = String(keyword).toLowerCase();

      const mac = await crypto.subtle.sign(
        "HMAC",
        searchKey,
        encoder.encode(normalized)
      );

      return toBase64(mac);
    })
  );

  return tokens;
}