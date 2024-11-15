export const downloadFile = async (file) => {
        let decryptKey = file.sharedKey || "";
        if (!decryptKey) {
          const message = window.generateFileSignatureMessage(
            window.user.wallet.publicKey,
            file.encryptUid
          );
          const { signature } = await window.connectWallet(
            window.user.wallet.walletProvider,
            message
          );
          decryptKey = signature;
        }
        const encryptedBuffer = window.Buffer.from(file.fileBase64, "base64");
        const decryptedUint8Array = await window.decryptFile(
          encryptedBuffer,
          decryptKey
        );
        const blob = new Blob([decryptedUint8Array], {
          type: file.mimetype,
        });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = url;
        a.download = file.name;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
}