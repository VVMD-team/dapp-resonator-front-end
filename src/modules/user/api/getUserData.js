import { apiUrl, userDataEndpoint } from "@/lib/constants";

export default async function getUserData() {
  try {
    const response = await fetch(`${apiUrl}${userDataEndpoint}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "ngrok-skip-browser-warning": "any",
      },
    });
    if (!response.ok) {
      return null;
    }
    const res = await response.json();
    return res;
  } catch (error) {
    console.error(error);
    return null;
  }
}
