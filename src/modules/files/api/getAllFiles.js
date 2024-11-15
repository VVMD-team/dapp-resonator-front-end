import { apiUrl, filesEndpoint } from "@/lib/constants";

export default async function getAllFiles() {
  try {
    const response = await fetch(`${apiUrl}${filesEndpoint}/all`, {
      method: "GET",
      credentials: "include",
      headers: {
        "ngrok-skip-browser-warning": "any",
      },
    });
    const { files } = await response.json();
    return files;
  } catch (error) {
    console.error(error);
    return null;
  }
}
