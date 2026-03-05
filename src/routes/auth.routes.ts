import { Router, type Request, type Response } from "express";
import { LoginSchema, RegisterSchema } from "../types/index.js";
import { AuthService } from "../services/auth.service.js";
import z from "zod";

const router = Router();
router.post("/register", async (req: Request, res: Response) => {
  try {
    const body = RegisterSchema.parse(req.body);
    const result = await AuthService.register(body);
    res.status(201).json(result);
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({
        error: "Validation Failed",
        details: err.issues.map((issue) => issue.message),
      });
    }
    res.status(400).json({ error: err.message });
  }
});

router.post("/login", async (req: Request, res: Response) => {
  try {
    const body = LoginSchema.parse(req.body);
    const result = await AuthService.login(body);
    res.json(result);
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({
        error: "Login Error",
        details: err.issues.map((issue) => issue.message),
      });
    }
    res.status(401).json({ error: err.message });
  }
});

export default router;
