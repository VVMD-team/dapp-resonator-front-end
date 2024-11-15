import fetchWithToken from "@/lib/util/fetchWithToken";
import { apiUrl, filesEndpoint } from "@/lib/constants";

export default async function shareFile(
  shareWalletPublicKey,
  fileId,
  fileBase64,
  sharedKey
) {
  try {
    const response = await fetchWithToken(`${apiUrl}${filesEndpoint}/share`, {
      method: "POST",
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
