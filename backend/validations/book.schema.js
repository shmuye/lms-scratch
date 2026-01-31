import { z } from 'zod';

export const createBookSchema = z.object({

  title: z.string().min(3).max(100),
  author: z.string().min(3).max(100),

  copiesAvailable: z.number().int().min(0),
  totalCopies: z.number().int().min(1),

  isbn: z.string().min(10).max(13),
  publishedYear: z.number()
                  .int()
                  .min(0)
                  .max(new Date().getFullYear()),
  category: z
            .string()
            .min(1)
            .max(50),

});

export const updateBookSchema = createBookSchema.partial()



