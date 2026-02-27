// crypto/keyDerivation.js

const enc = new TextEncoder();

async function importBaseKey(password) {
  return crypto.subtle.importKey(
    "raw",
    enc.encode(password),
    "PBKDF2",
    false,
    ["deriveKey", "deriveBits"]
  );
}

export async function deriveVaultKeys(password) {
  const baseKey = await importBaseKey(password);

  // 1️⃣ Master Key — AES-GCM (file encryption)
  const masterKey = await crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: enc.encode("cryptvault-master-key"),
      iterations: 100000,
      hash: "SHA-256",
    },
    baseKey,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );

  // 2️⃣ Search Key — HMAC (blind beacons)
  const searchKey = await crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: enc.encode("cryptvault-search-key"),
      iterations: 100000,
      hash: "SHA-256",
    },
    baseKey,
    { name: "HMAC", hash: "SHA-256", length: 256 },
    false,
    ["sign"]
  );

  // 3️⃣ Vault ID — deterministic, backend-safe
  const vaultIdBits = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt: enc.encode("cryptvault-vault-id"),
      iterations: 50000,
      hash: "SHA-256",
    },
    baseKey,
    256
  );

  const vaultId = btoa(
    String.fromCharCode(...new Uint8Array(vaultIdBits))
  );

  return { masterKey, searchKey, vaultId };
}