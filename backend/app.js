import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import path from 'path';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js'
import bookRoutes from './routes/book.routes.js';


dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(path.join( process.cwd(), 'uploads')));

//routes
app.use('/auth', authRoutes);
app.use('/books', bookRoutes);



export default app