import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import {connectDB} from "./db/connectDB.js";
import authRoutes from './routes/auth.routes.js'
import bookRoutes from './routes/book.routes.js';

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

// middleware

app.use(express.json());
app.use(cookieParser());

//routes
app.use('/auth', authRoutes);
app.use('/books', bookRoutes);

connectDB();

export default app