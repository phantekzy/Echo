import { Router, type Request, type Response } from "express";

const router = Router();
router.post("/register", async (req: Request, res: Response) => {
  try {
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});
