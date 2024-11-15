export default function generateFileSignatureMessage(publicKey, uid) {
  return `We use this message to securely encrypt and decrypt your files.\nWallet address: ${publicKey}\nUnique Identificator: ${uid}`;
}
