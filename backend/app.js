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

app.use(
  cors({
    // origin: process.env.FRONTEND_URL_PROD,
    origin: process.env.FRONTEND_URL_DEV,
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

export default app;
