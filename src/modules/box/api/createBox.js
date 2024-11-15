import { apiUrl, createBoxEndpoint } from "@/lib/constants";

export default async function createBox(boxName) {
  try {
    const response = await fetch(`${apiUrl}${createBoxEndpoint}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "ngrok-skip-browser-warning": "any",
      },
      body: {
        boxName
      }
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}
