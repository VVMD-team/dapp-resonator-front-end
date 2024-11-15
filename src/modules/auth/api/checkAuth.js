import { apiUrl } from "@/lib/constants";

export default async function checkAuth() {
  try {
    const response = await fetch(`${apiUrl}/check-auth`, {
      method: "GET",
      credentials: "include",
      headers: {
        "ngrok-skip-browser-warning": "any",
      },
    });

    const { authenticated } = await response.json();

    return authenticated;
  } catch (error) {
    console.log(error);
    return false;
  }
}
