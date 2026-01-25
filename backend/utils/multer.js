import multer from "multer";
import path from "path";
import fs from "fs";

const createStorage = (folderName) => {
  const uploadPath = path.join("uploads", folderName);

  // ensure folder exists
  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
  }

  return multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      const uniqueName =
        Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, uniqueName + path.extname(file.originalname));
    },
  });
};

export const uploadBookCover = multer({
  storage: createStorage("coverImages"),
});

export const uploadAvatar = multer({
  storage: createStorage("avatars"),
});
