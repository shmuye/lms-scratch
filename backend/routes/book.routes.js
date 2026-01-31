import { PERMISSIONS } from "../constants/permissions.js";
import { createBook, updateBook, deleteBook, getBook, getBooks } from "../controllers/book.controllers.js";
import { authenticate, authorize } from "../middleware/index.js";
import { uploadBookCover } from "../utils/multer.js";
import { validate } from '../middleware/validate.middleware.js'
import { createBookSchema } from "../validations/book.schema.js";

import express from "express";
const router = express.Router();

router.post("/",
       authenticate, 
       authorize(PERMISSIONS.BOOK_CREATE),
       uploadBookCover.single('coverImage'),
       validate(createBookSchema),
       createBook);
router.get("/", authenticate, getBooks);
router.get("/:id", authenticate, getBook);
router.patch("/:id", authenticate, authorize(PERMISSIONS.BOOK_UPDATE), updateBook);
router.delete("/:id", authenticate, authorize(PERMISSIONS.BOOK_DELETE), deleteBook);

export default router;