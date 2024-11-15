import { apiUrl, createBoxEndpoint } from "@/lib/constants";

export default async function createBox(boxName) {
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
    alert(JSON.stringify(data))
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}
