import express from "express";
import "dotenv/config";
import authRoutes from "./routes/auth.routes.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());
