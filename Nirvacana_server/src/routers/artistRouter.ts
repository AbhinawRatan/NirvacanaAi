import express from "express";
import multer from "multer";
import handleUpload from "../controllers/artist/handleUploads";
import { textGeneration } from "../controllers/artist/TextGeneration"; // Adjust the path as necessary

const usersRouter = express.Router();

const upload = multer({
  limits: { fileSize: 50 * 1024 * 1024 }, // Limit file size
});

// Existing route for file upload
usersRouter.post("/upload", upload.single('imageFile'), handleUpload);

// New route for text generation
usersRouter.post("/generate-text", (req, res) => textGeneration.generateText(req, res));

export default usersRouter;
