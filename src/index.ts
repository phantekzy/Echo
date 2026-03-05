import express from "express";
import "dotenv/config";
import authRoutes from "./routes/auth.routes.js";
import fileRoutes from "./routes/file.routes.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/auth", authRoutes);
app.use("/api/files", fileRoutes);
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Echo is live om https://localhost:${PORT}`);
});
