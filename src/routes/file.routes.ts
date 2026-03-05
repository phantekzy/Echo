import { Router, type Request, type Response } from "express";
import multer from "multer";

const router = Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
});

router.post(
  "/upload",
  upload.single("file"),
  async (req: Request, res: Response): Promise<any> => {},
);
