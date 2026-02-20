import z from "zod";
import { categoryEnum } from "../constants/bookCategory.js";

export const createBookSchema = z.object({
  title: z.string().min(3).max(100),
  author: z.string().min(3).max(100),

  description: z.string().max(200).optional(),
  coverPage: z.any(),

  copiesAvailable: z.coerce.number().int().min(0),
  totalCopies: z.coerce.number().int().min(1),

  isbn: z.string().min(10).max(13),

  publishedYear: z.coerce
    .number()
    .int()
    .min(0)
    .max(new Date().getFullYear())
    .optional(),

  category: z.enum(categoryEnum),
});

export const updateBookSchema = createBookSchema.omit({ isbn: true }).partial();
