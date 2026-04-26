import { PERMISSIONS } from "../constants/permissions.js";
import {
  createBook,
  updateBook,
  deleteBook,
  getBook,
  getBooks,
  borrowBook,
  approveReturn,
  requestReturn,
  getReturnRequests,
  getAllBorrows,
} from "../controllers/book.controllers.js";
import { authenticate, authorize } from "../middleware/index.js";
import { uploadBookCover } from "../utils/multer.js";
import { validate } from "../middleware/validate.middleware.js";
import { createBookSchema } from "../../shared/validations/book.schema.js";
import { updateBookSchema } from "../../shared/validations/book.schema.js";

import express from "express";
const router = express.Router();

router.post(
  "/",
  authenticate,
  authorize(PERMISSIONS.BOOK_CREATE),
  uploadBookCover.single("coverPage"),
  validate(createBookSchema),
  createBook,
);

router.get("/", getBooks);
router.get("/:id", authenticate, getBook);

router.patch(
  "/:id",
  authenticate,
  authorize(PERMISSIONS.BOOK_UPDATE),
  uploadBookCover.single("coverPage"),
  validate(updateBookSchema),
  updateBook,
);

router.delete(
  "/:id",
  authenticate,
  authorize(PERMISSIONS.BOOK_DELETE),
  deleteBook,
);

router.post("/:id/borrow", authenticate, authorize(), borrowBook);
router.post("/:id/return-request", authenticate, authorize(), requestReturn);
router.post("/:id/return-approve", authenticate, authorize(), approveReturn);
router.get(
  "/borrows/return-requests",
  authenticate,
  authorize(PERMISSIONS.BOOK_UPDATE),
  getReturnRequests,
);
router.get(
  "/borrows",
  authenticate,
  authorize(PERMISSIONS.BOOK_UPDATE),
  getAllBorrows,
);

export default router;
