import { apiUrl } from "@/lib/constants";

export default async function authByWallet(publicKey, signature, walletType) {
  const formData = new FormData();
  formData.append("walletPublicKey", publicKey);
  formData.append("signature", signature);
  formData.append("walletType", walletType);
  try {
    const response = await fetch(`${apiUrl}/auth/wallet`, {
      method: "POST",
      body: formData,
      credentials: "include",
    });
    const data = await response.json();
    return data?.user;
  } catch (error) {
    console.error(error);
    return null;
  }
}
