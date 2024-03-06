import express from "express";
import multer from "multer";
import handleUpload from "../controllers/artist/handleUploads";

const artistsRouter = express.Router();

const upload = multer({
  limits: { fileSize: 50 * 1024 * 1024 }, 
});



artistsRouter.post("/upload", upload.single('imageFile'), handleUpload);

export default artistsRouter;
