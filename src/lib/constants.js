export const walletTypes = {
  METAMASK: "METAMASK",
  TRUST_WALLET: "TRUST_WALLET",
  PHANTOM: "PHANTOM",
  RABBY_WALLET: "RABBY_WALLET",
};

export const etheriumWallets = [
  walletTypes.METAMASK,
  walletTypes.TRUST_WALLET,
  walletTypes.RABBY_WALLET,
];

export const solanaWallets = [walletTypes.PHANTOM];

export const authMessage =
  "Please sign this message to authenticate with our service.";

export const defaultDuration = 0.35; // seconds

// export const apiUrl = "https://gelding-nice-noticeably.ngrok-free.app";
export const apiUrl = "https://dapp-resonator-back-end.vercel.app";
//export const apiUrl = "http://localhost:8000";
// export const apiUrl = "https://resonator.ngrok.io";

export const filesEndpoint = "/files";
export const userDataEndpoint = "/user";
export const balanceEndpoint = "/user/balance";
export const boxEndpoint = "/box";
export const createBoxEndpoint = "/box/create";
