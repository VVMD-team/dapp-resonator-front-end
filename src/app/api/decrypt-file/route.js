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

async function decryptFileSync(fileData, signature) {
  const { keyBuffer, ivBuffer } = signatureToKeyIV(signature);

  const decipher = crypto.createDecipheriv("aes-256-cbc", keyBuffer, ivBuffer);

  const decryptedData = Buffer.concat([
    decipher.update(fileData),
    decipher.final(),
  ]);

  return decryptedData;
}

export const POST = async (req) => {
  const formData = await req.formData();

  const file = formData.get("file");
  const signature = formData.get("signature");

  if (!file || !signature) {
    return NextResponse.json({ error: "No files received. " }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  const decryptedBuffer = await decryptFileSync(buffer, signature);

  const blob = new Blob([decryptedBuffer], {
    type: file.type,
  });

  try {
    return new NextResponse(blob, { status: 200, statusText: "OK" });
  } catch (error) {
    console.log("Error occured ", error);
    return NextResponse.json({ Message: "Failed", status: 500 });
  }
};
