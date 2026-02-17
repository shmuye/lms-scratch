import z from "zod";
import { categoryEnum } from "../constants/bookCategory.js";

export const createBookSchema = z.object({
  title: z.string().min(3).max(100),
  author: z.string().min(3).max(100),

  description: z.string().max(200).optional(),

  coverPage: z
    .any()
    .refine((file) => file instanceof File, "Cover image is required"),

  copiesAvailable: z.coerce.number().int().min(0),
  totalCopies: z.coerce.number().int().min(1),

  isbn: z.string().min(10).max(13),

  publishedYear: z
    .number()
    .int()
    .min(0)
    .max(new Date().getFullYear())
    .optional(),

  category: z.enum(categoryEnum),
});

export const updateBookSchema = createBookSchema.omit({ isbn: true }).partial();
