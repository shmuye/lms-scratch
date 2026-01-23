import { createBook, updateBook, deleteBook, getBook, getBooks } from "../controllers/book.controllers";
import { authMiddleware, permissionMiddleware } from "../middleware";

const express = require("express");
const router = express.Router();

router.post("/",authMiddleware, permissionMiddleware(['BOOK_CREATE']),createBook);
router.get("/", authMiddleware, getBooks);
router.get("/:id", authMiddleware, getBook);
router.patch("/:id", authMiddleware, permissionMiddleware(['BOOK_UPDATE']), updateBook);
router.delete("/:id", authMiddleware, permissionMiddleware(['BOOK_DELETE']), deleteBook);

export default router;