import crypto from "crypto";
import { NextResponse } from "next/server";

function signatureToKeyIV(signature) {
  const hexSignature = signature.slice(2);

  const key = hexSignature.slice(0, 64);
  const iv = hexSignature.slice(64, 96);
  const keyBuffer = Buffer.from(key, "hex");
  const ivBuffer = Buffer.from(iv, "hex");

  return { keyBuffer, ivBuffer };
}

async function encryptFileSync(fileData, signature) {
  const { keyBuffer, ivBuffer } = signatureToKeyIV(signature);

  const cipher = crypto.createCipheriv("aes-256-cbc", keyBuffer, ivBuffer);

  const encryptedData = Buffer.concat([
    cipher.update(fileData),
    cipher.final(),
  ]);

  return encryptedData;
}

export const POST = async (req) => {
  const formData = await req.formData();

  const file = formData.get("file");
  const signature = formData.get("signature");

  if (!file || !signature) {
    return NextResponse.json({ error: "No files received." }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  const encryptedBuffer = await encryptFileSync(buffer, signature);

  const blob = new Blob([encryptedBuffer], {
    type: file.type,
  });

  try {
    return new NextResponse(blob, { status: 200, statusText: "OK" });
  } catch (error) {
    console.log("Error occured ", error);
    return NextResponse.json({ Message: "Failed", status: 500 });
  }
};
