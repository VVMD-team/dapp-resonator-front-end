import { apiUrl, filesEndpoint } from "@/lib/constants";
export default async function getFileById(fileId) {
  try {
    const response = await fetch(
      `${apiUrl}${filesEndpoint}/file?id=${fileId}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "ngrok-skip-browser-warning": "any",
        },
      }
    );
    if (!response.ok) {
      return null;
    }
    const { file } = await response.json();
    return file;
  } catch (error) {
    console.error(error);
    return null;
  }
}
