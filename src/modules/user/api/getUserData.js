import fetchWithToken from "@/lib/util/fetchWithToken";
import { apiUrl, userDataEndpoint } from "@/lib/constants";

export default async function getUserData() {
  try {
    const response = await fetchWithToken(`${apiUrl}${userDataEndpoint}`, {
      method: "GET",
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
