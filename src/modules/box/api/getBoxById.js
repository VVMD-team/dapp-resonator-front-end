import { apiUrl, boxEndpoint } from "@/lib/constants";
export default async function getBoxById(boxId) {
  try {
    const response = await fetch(
      `${apiUrl}${boxEndpoint}?id=${boxId}`,
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
    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
