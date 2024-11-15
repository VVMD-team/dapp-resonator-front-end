import { apiUrl, filesEndpoint } from "@/lib/constants";

export default async function shareFile(shareWalletPublicKey,
    fileId,
    fileBase64,
    sharedKey) {
  try {
    const response = await fetch(`${apiUrl}${filesEndpoint}/share`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "any",
      },
      body: JSON.stringify({
        shareWalletPublicKey,
        fileId,
        fileBase64,
        sharedKey,
      }),
    });
    const res = await response.json();
    return res;
  } catch (error) {
    sharedTransferErrorOpenTl.restart();
    console.error(error);
    return null;
  }
}
