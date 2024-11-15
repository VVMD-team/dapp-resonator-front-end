export function arrayBufferToFile(arrayBuffer, fileName, mimeType) {
  const blob = new Blob([arrayBuffer], { type: mimeType });
  return new File([blob], fileName, { type: mimeType });
}

export function fileToArrayBuffer(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = function (event) {
      resolve(event.target.result);
    };
    reader.onerror = function (event) {
      reject(new Error("Failed to read file: " + event.target.error.message));
    };
    reader.readAsArrayBuffer(file);
  });
}

export const byteToMegabyte = (num) => {
  const result = num / (1024 * 1024);
  return result > 1 ? result.toFixed(2) : result.toFixed(6);
}

export const timestampToDate = (timestamp) => {
  return new Date(
    timestamp._seconds * 1000 + timestamp._nanoseconds / 1000000
  ).toLocaleString();
}

export const shortenWalletAddress = (address) => {
  if (address) {
  const separator = "...";
  const frontChars = 4;
  const backChars = 3;

  return (
    address.substr(0, frontChars) +
    separator +
    address.substr(address.length - backChars)
  );
} else {
  return "xxxx...xxx";
}
}