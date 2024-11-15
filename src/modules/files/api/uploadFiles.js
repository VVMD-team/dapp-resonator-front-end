import fetchWithToken from "@/lib/util/fetchWithToken";
import { apiUrl } from "@/lib/constants";

export default async function uploadFiles(formData) {
  try {
    const response = await fetchWithToken(`${apiUrl}/upload-files`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Upload failed. Response not ok.");
    }

    const data = await response.json();

    return data?.files;
  } catch (error) {
    console.error(error);
    return null;
  }
}
