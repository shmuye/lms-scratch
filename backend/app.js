import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes.js'
import bookRoutes from './routes/book.routes.js';
import path from 'path';

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

// middleware

app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(path.join( process.cwd(), 'uploads')));

//routes
app.use('/auth', authRoutes);
app.use('/books', bookRoutes);



export default app