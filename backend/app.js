import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";
import fs from "fs";
import cors from "cors";
import morgan from "morgan";

dotenv.config();

import authRoutes from "./routes/auth.routes.js";
import bookRoutes from "./routes/book.routes.js";
import userRoutes from "./routes/user.routes.js";

const app = express();

// ✅ Ensure uploads folders exist
const ensureUploadFolders = () => {
  const basePath = path.join(process.cwd(), "uploads");

  const folders = [
    basePath,
    path.join(basePath, "coverImages"),
    path.join(basePath, "avatars"),
  ];

  folders.forEach((folder) => {
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder, { recursive: true });
      console.log(`📁 Created folder: ${folder}`);
    }
  });
};

ensureUploadFolders();

// middleware

// Allow frontend origin depending on environment. Set FRONTEND_URL_PROD for production
// and FRONTEND_URL_DEV for local development in your .env or Render/Vercel env settings.
const FRONTEND_URL =
  process.env.NODE_ENV === "production"
    ? process.env.FRONTEND_URL_PROD || process.env.FRONTEND_URL
    : process.env.FRONTEND_URL_DEV || process.env.FRONTEND_URL;

app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type"],
  }),
);
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

//routes
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/users", userRoutes);

// If running in production and there is a built frontend in ../frontend/dist,
// serve it as static files. This allows deploying a single service that
// serves both API and frontend (optional).
if (process.env.NODE_ENV === "production") {
  const clientDist = path.join(process.cwd(), "../frontend/dist");
  if (fs.existsSync(clientDist)) {
    app.use(express.static(clientDist));
    app.get("/*", (_req, res) => {
      res.sendFile(path.join(clientDist, "index.html"));
    });
  }
}

export default app;
