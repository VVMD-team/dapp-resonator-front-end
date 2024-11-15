import generateFileSignatureMessage from "@/lib/util/generateFileSignatureMessage";
import { Buffer } from "buffer";

export async function encryptFileWithApiRoute(file, signature) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("signature", signature);

  const response = await fetch("/api/encrypt-file", {
    method: "POST",
    body: formData,
  });

  const blob = await response.blob();

  return blob;
}

export async function decryptFileWithApiRoute(file, signature) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("signature", signature);

  const response = await fetch("/api/decrypt-file", {
    method: "POST",
    body: formData,
  });

  const blob = await response.blob();

  return blob;
}

export async function generateFakeCryptoSignatureWithApiRoute() {
  const response = await fetch("/api/fake-signature", {
    method: "GET",
  });

  const data = await response.json();

  return data?.signature;
}
export async function recryptFileWithApiRoute(
  file,
  specificFakeSignature,
  userPublicKey,
  userWalletProvider,
  signMessageAsync
) {
  let decryptKey = file.sharedKey || "";

  if (!decryptKey) {
    const message = generateFileSignatureMessage(
      userPublicKey,
      file.encryptUid
    );

    const { signature } = await signMessageAsync(userWalletProvider, message);

    decryptKey = signature;
  }

  function base64ToFile(base64, filename) {
    const arr = base64.split(",");
    const mime = arr[0].match(/:(.*?);/)[1]; // Extract MIME type
    const bstr = atob(arr[1]); // Decode Base64
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  }

  const decryptedBlob = await decryptFileWithApiRoute(
    base64ToFile(file.fileBase64, file.name),
    signature
  );

  const fakeSignature =
    specificFakeSignature || (await generateFakeCryptoSignatureWithApiRoute());

  function blobToBase64(blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result.split(",")[1]); // Extract the Base64 part
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }

  const reEncryptedBlob = await encryptFileWithApiRoute(
    decryptedBlob,
    fakeSignature
  );

  const reEncryptedFileBase64 = await blobToBase64(reEncryptedBlob);

  return {
    ...file,
    sharedKey: fakeSignature,
    fileBase64: reEncryptedFileBase64,
  };
}
