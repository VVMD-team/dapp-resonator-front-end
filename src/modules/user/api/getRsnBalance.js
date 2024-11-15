import fetchWithToken from "@/lib/util/fetchWithToken";
import { apiUrl, userDataEndpoint } from "@/lib/constants";

export default async function getRsnBalance() {
  try {
    const response = await fetchWithToken(
      `${apiUrl}${userDataEndpoint}/balance`,
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
    const { rsnAmount } = await response.json();
    return rsnAmount;
  } catch (error) {
    console.error(error);
    return null;
  }
}
