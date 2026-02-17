export async function generateSearchToken(keyword, searchKey) {
  const enc = new TextEncoder();
  const signature = await crypto.subtle.sign(
    "HMAC",
    searchKey,
    enc.encode(keyword.toLowerCase())
  );

  return btoa(
    String.fromCharCode(...new Uint8Array(signature))
  );
}
