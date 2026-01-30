import { z } from 'zod';

export const registerSchema = z.object({

    name: z.string().min(3).max(30),
    email: z.email(),
    password: z.string().min(8).max(15),

});

export const loginSchema = z.object({
    
    email: z.email(),
    password: z.string().min(8).max(100),

});

export const refreshTokenSchema = z.object({
  body: z.object({
    refreshToken: z.string(),
  }),
});import { z } from 'zod';
  