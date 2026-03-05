import { Router, type Request, type Response } from "express";
import multer from "multer";
import { FileUploadSchema } from "../types/index.js";

const router = Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
});

router.post(
  "/upload",
  upload.single("file"),
  async (req: Request, res: Response): Promise<any> => {
    try {
      if (!req.file) return res.status(400).json({ error: "No file provided" });
      const { orgId } = FileUploadSchema.parse(req.body);
    } catch (error) {}
  },
);
