import fetchWithToken from "@/lib/util/fetchWithToken";
import { apiUrl, filesEndpoint } from "@/lib/constants";

export default async function getLasUploadedFiles() {
  try {
    const response = await fetchWithToken(
      `${apiUrl}${filesEndpoint}/last-uploaded`,
      {
        method: "GET",
        headers: {
          "ngrok-skip-browser-warning": "any",
        },
      }
    );
    if (!response.ok) {
      return null;
    }
    const { files } = await response.json();
    return files;
  } catch (error) {
    console.error(error);
    return null;
  }
}
