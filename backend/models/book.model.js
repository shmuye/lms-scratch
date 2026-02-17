import mongoose from "mongoose";
import { categoryEnum } from "../../shared/constants/bookCategory.js";

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    author: {
      type: String,
      required: true,
      trim: true,
    },

    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },

    isbn: {
      type: String,
      unique: true,
      required: true,
    },

    category: {
      type: String,
      required: true,
      enum: categoryEnum,
    },

    description: {
      type: String,
      maxlength: 200,
    },

    coverPage: {
      type: String, // image URL
      required: true,
      trim: true,
    },

    publishedYear: {
      type: Number,
    },

    totalCopies: {
      type: Number,
      required: true,
      min: 1,
    },

    copiesAvailable: {
      type: Number,
      required: true,
      min: 0,
    },

    isAvailable: {
      type: Boolean,
      default: true,
    },
  },

  { timestamps: true },
);

export default mongoose.model("Book", bookSchema);
