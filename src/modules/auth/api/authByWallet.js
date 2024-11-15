import { apiUrl } from "@/lib/constants";
import { authTokenStorageKey } from "@/lib/constants";

export default async function authByWallet(publicKey, signature, walletType) {
  const formData = new FormData();
  formData.append("walletPublicKey", publicKey);
  formData.append("signature", signature);
  formData.append("walletType", walletType);
  try {
    const response = await fetch(`${apiUrl}/auth/wallet`, {
      method: "POST",
      body: formData,
    });
    const data = await response.json();

    const token = data?.authorization;

    if (token) {
      localStorage.setItem(authTokenStorageKey, token);
    }

    return data?.user;
  } catch (error) {
    console.error(error);
    return null;
  }
}
