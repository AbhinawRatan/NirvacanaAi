// Assuming the location is src/controllers/artist/handleUpload.ts
import { Request, Response } from "express";
import { uploadImage } from "../../utils/cloud/uploadImage";
import multer from "multer";

const upload = multer({ limits: { fileSize: 50 * 1024 * 1024 } }); // Limit file size to 50MB

interface ExtendedRequest extends Request {
  user?: { uid: string }; // Assuming authentication middleware adds this
  file?: Express.Multer.File;
  body: {
    imageData?: string; // For base64 uploads
    uploadType: "profile-pic" | "banner" | "style" | "Arts" ;
  };
}

const handleUpload = async (req: ExtendedRequest, res: Response) => {
  const { uploadType } = req.body;

  try {
    let publicUrl;

    if (req.file) {
      console.log("Uploading file");
      publicUrl = await uploadImage({
        imageData: req.file.buffer,
        
        uploadType,
        fileName: req.file.originalname,
        contentType: req.file.mimetype,
        isBase64: false,
      });
    } else if (req.body.imageData) {
      console.log("Uploading base64 image");
      const defaultFileName = `image-${Date.now()}.jpg`; // For base64 uploads
      publicUrl = await uploadImage({
        imageData: req.body.imageData,
        uploadType,
        fileName: defaultFileName,
        isBase64: true,
      });
    } else {
      console.log("No image data provided");
      return res.status(400).send("No image data provided.");
    }

    console.log("Image uploaded successfully");
    res
      .status(200)
      .json({ message: "Image uploaded successfully", url: publicUrl });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).send("Failed to upload image.");
  }
};

export default handleUpload;
