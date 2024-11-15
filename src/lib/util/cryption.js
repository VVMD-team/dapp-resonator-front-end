export async function encryptFileWithApiRoute(file, signature) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("signature", signature);

  const response = await fetch("/api/encrypt-file", {
    method: "POST",
    body: formData,
  });

  const blob = await response.blob();

  return blob;
}

export async function decryptFileWithApiRoute(file, signature) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("signature", signature);

  const response = await fetch("/api/decrypt-file", {
    method: "POST",
    body: formData,
  });

  const blob = await response.blob();

  return blob;
}

export async function generateFakeCryptoSignature() {
  const randomValues = new Uint8Array(64);
  window.crypto.getRandomValues(randomValues);

  const hexSignature = Array.from(randomValues)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  return `0x${hexSignature}`;
}
