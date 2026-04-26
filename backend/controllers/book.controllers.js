import Book from "../models/book.model.js";
import Borrow from "../models/borrow.model.js";

export const createBook = async (req, res) => {
  console.log(req.body);
  console.log(req.file);
  try {
    const {
      title,
      author,
      category,
      isbn,
      totalCopies,
      copiesAvailable,
      description,
    } = req.body;

    if (!req.file) {
      return res.status(400).json({
        message: "Cover image is required",
      });
    }
    console.log(copiesAvailable, totalCopies);
    // 3. Business rule
    if (copiesAvailable > totalCopies) {
      return res.status(400).json({
        message: "Copies available cannot exceed total copies",
      });
    }

    // 4. Create book
    const book = await Book.create({
      title,
      author,
      category,
      isbn,
      totalCopies,
      copiesAvailable,
      description,
      coverPage: `${req.protocol}://${req.get("host")}/uploads/coverImages/${req.file.filename}`,
    });

    return res.status(201).json({
      message: "Book created successfully",
      book,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getBooks = async (req, res) => {
  try {
    const { search } = req.query;
    const query = {};

    if (search) {
      query.title = { $regex: search, $options: "i" }; // case-insensitive
    }

    const books = await Book.find(query).lean();
    return res.status(200).json(books);
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const getBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);

    if (!book) {
      return res.status(404).json({
        message: "Book not found",
      });
    }
    return res.status(200).json(book);
  } catch (error) {
    return res.status(400).json({
      message: "Invalid Book ID",
    });
  }
};

export const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    if (req.file) {
      updateData.coverPage = `${req.protocol}://${req.get(
        "host",
      )}/uploads/coverImages/${req.file.filename}`;
    }
    const updatedBook = await Book.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedBook) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    return res.status(200).json(updatedBook);
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBook = await Book.findByIdAndDelete(id);

    if (!deletedBook) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    return res.status(200).json({
      message: "Book deleted successfully",
    });
  } catch (error) {
    return res.status(400).json({
      message: "Invalid Book ID",
    });
  }
};

export const borrowBook = async (req, res) => {
  try {
    const userId = req.user.id;
    const bookId = req.params.id;

    // 1. Check if book exists and is available
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    if (!book.isAvailable || book.copiesAvailable < 1) {
      return res.status(400).json({ message: "No copies available to borrow" });
    }

    const activeBorrow = await Borrow.findOne({
      user: userId,
      status: "Borrowed",
    });

    if (activeBorrow) {
      return res.status(400).json({
        message:
          "You have already borrowed a book. Return it before borrowing another.",
      });
    }

    const borrowDate = new Date();
    const dueDate = new Date(borrowDate);
    dueDate.setDate(borrowDate.getDate() + 14); // 2 weeks from borrow date

    const borrowRecord = await Borrow.create({
      user: userId,
      book: bookId,
      borrowDate,
      dueDate,
    });

    // 2. Update book availability
    book.copiesAvailable -= 1;
    if (book.copiesAvailable === 0) {
      book.isAvailable = false;
    }
    await book.save();

    return res.status(200).json({
      message: "Book borrowed successfully",
      borrowRecord,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const requestReturn = async (req, res) => {
  try {
    const userId = req.user.id;
    const bookId = req.params.id;

    const borrowRecord = await Borrow.findOne({
      user: userId,
      book: bookId,
      status: "Borrowed",
    });

    if (!borrowRecord) {
      return res.status(404).json({
        message: "No active borrow record found",
      });
    }

    borrowRecord.status = "Return Requested";
    await borrowRecord.save();

    return res.status(200).json({
      message: "Return request submitted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const approveReturn = async (req, res) => {
  try {
    const bookId = req.params.id;

    const borrowRecord = await Borrow.findOne({
      book: bookId,
      status: "Return Requested",
    });

    if (!borrowRecord) {
      return res.status(404).json({
        message: "No return request found",
      });
    }

    const now = new Date();
    let status = "Returned";

    if (now > borrowRecord.dueDate) {
      status = "Overdue";
    }

    borrowRecord.returnDate = now;
    borrowRecord.status = status;
    await borrowRecord.save();

    await Book.findByIdAndUpdate(bookId, {
      $inc: { copiesAvailable: 1 },
      isAvailable: true,
    });

    return res.status(200).json({
      message: "Return approved successfully",
      borrowRecord,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

// GET /borrows/return-requests
export const getReturnRequests = async (req, res) => {
  try {
    const borrows = await Borrow.find({
      status: "Return Requested",
    })
      .populate("book", "title author coverPage")
      .populate("user", "name email");

    return res.status(200).json(borrows);
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const getAllBorrows = async (req, res) => {
  try {
    const borrows = await Borrow.find()
      .populate("book", "title author coverPage isbn category")
      .populate("user", "name email");

    return res.status(200).json(borrows);
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
