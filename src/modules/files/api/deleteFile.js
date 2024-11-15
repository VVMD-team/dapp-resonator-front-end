import fetchWithToken from "@/lib/util/fetchWithToken";
import { apiUrl, filesEndpoint } from "@/lib/constants";

export default async function deleteFile(fileId) {
  try {
    const response = await fetchWithToken(`${apiUrl}${filesEndpoint}/delete`, {
      method: "DELETE",
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
    //errorOpenTl.restart();
    console.error(error);
    return null;
  }
}
