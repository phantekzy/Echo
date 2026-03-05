import { Router, type Request, type Response } from "express";
import multer from "multer";
import { FileUploadSchema } from "../types/index.js";
import { FileService } from "../services/file.service.js";

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
      // normally in production i get it from jwt
      const userId = Number(req.body.userId);
      const savedFile = await FileService.uploadFile(req.file, orgId, userId);
      res.status(200).json({
        message: "File uploaded and secured",
        file: savedFile,
      });
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  },
);

router.get(
  "/:id/download",
  async (req: Request, res: Response): Promise<any> => {},
);
