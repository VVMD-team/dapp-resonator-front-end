import crypto from "crypto";

export default function handler(req, res) {
  const randomBytes = crypto.randomBytes(64);

  const hexSignature = randomBytes.toString("hex");

  res.status(200).json({ signature: `0x${hexSignature}` });
}
