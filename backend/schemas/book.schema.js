import { z } from 'zod';

export const createBookSchema = z.object({

  title: z.string().min(1).max(100),
  author: z.string().min(1).max(100),
  copiesAvailable: z.number().min(0),
  totalCopies: z.number().min(1),
  ispn: z.string().min(10).max(13).unique(),
  publishedYear: z.number().min(0).max(new Date().getFullYear()),
  category: z.string().min(1).max(50),

});



