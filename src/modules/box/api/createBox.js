import { apiUrl, createBoxEndpoint } from "@/lib/constants";

export default async function createBox(boxName) {
  console.log('🚀  boxName', boxName)
  try {
    const response = await fetch(`${apiUrl}${createBoxEndpoint}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "any",
      },
      body: JSON.stringify({
        boxName
      })
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}
