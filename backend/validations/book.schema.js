import { z } from 'zod';

export const categoryEnum =  [

        "Fiction",
        "Science",
        "Technology",
        "History",
        "Education",
        "Biography",
        "Sport",

    ]

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
  category: z.enum(categoryEnum)

});

export const updateBookSchema = createBookSchema
                                  .omit({isbn: true})
                                  .partial()



