// src/utils/cloud/uploadImage.ts
import { storage } from "../../configs/firebase";

type UploadImageParams = {
  imageData: string | Buffer;
  uploadType: "profile-pic" | "banner" | "style" | "Arts";
  fileName: string; // Original file name
  contentType?: string;
  isBase64?: boolean;
};

export const uploadImage = async ({
  imageData,
  uploadType,
  fileName,
  contentType = "image/jpeg",
  isBase64 = false,
}: UploadImageParams): Promise<string> => {
  const timestamp = Date.now();
  const fullPath = `${uploadType}/${timestamp}-${fileName}`;


  const imageBuffer = isBase64
    ? Buffer.from(imageData as string, "base64")
    : (imageData as Buffer);
  console.log("Image buffer created");

  const bucket = storage.bucket(`${process.env.PROJECT_ID}.appspot.com`);
  console.log("Storage bucket retrieved");

  const file = bucket.file(fullPath);
  console.log("File created");

  await new Promise<void>((resolve, reject) => {
    const stream = file.createWriteStream({
      metadata: { contentType },
    });
    stream.on("error", reject);
    stream.on("finish", resolve);
    stream.end(imageBuffer);
  });

  console.log("File uploaded");

  await file.makePublic().catch((err) => {
    console.error("Error making the file public:", err);
    throw err;
  });

  console.log("File made public");

  const publicUrl = `https://storage.googleapis.com/${bucket.name}/${encodeURIComponent(fullPath)}`;
  return publicUrl;
};
