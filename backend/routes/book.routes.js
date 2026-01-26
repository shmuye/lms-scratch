import { PERMISSIONS } from "../constants/permissions.js";
import { createBook, updateBook, deleteBook, getBook, getBooks } from "../controllers/book.controllers.js";
import { authMiddleware, permissionMiddleware } from "../middleware/index.js";
import { uploadBookCover } from "../utils/multer.js";

import express from "express";
const router = express.Router();

router.post("/",authMiddleware, permissionMiddleware(PERMISSIONS.BOOK_CREATE),uploadBookCover.single('coverImage'),createBook);
router.get("/", authMiddleware, getBooks);
router.get("/:id", authMiddleware, getBook);
router.patch("/:id", authMiddleware, permissionMiddleware(PERMISSIONS.BOOK_UPDATE), updateBook);
router.delete("/:id", authMiddleware, permissionMiddleware(PERMISSIONS.BOOK_DELETE), deleteBook);

export default router;