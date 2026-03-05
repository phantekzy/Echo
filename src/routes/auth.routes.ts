import { Router, type Request, type Response } from "express";
import { RegisterSchema } from "../types/index.js";
import { AuthService } from "../services/auth.service.js";

const router = Router();
router.post("/register", async (req: Request, res: Response) => {
  try {
    const body = RegisterSchema.parse(req.body);
    const result = await AuthService.register(body);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});
