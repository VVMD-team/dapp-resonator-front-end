import { apiUrl, filesEndpoint } from "@/lib/constants";

export default async function deleteFile(fileId) {
  try {
    const response = await fetch(`${apiUrl}${filesEndpoint}/delete`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "any",
      },
      body: JSON.stringify({
        fileId,
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
