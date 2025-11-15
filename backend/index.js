import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import {connectDB} from "./db/connectDB.js";
import authRoutes from './routes/auth.routes.js'

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

// middleware

app.use(express.json());
app.use(cookieParser());

//routes
app.use('/auth', authRoutes);
app.get('/', (req, res) => {
    res.send('Hello World');
});

connectDB();

app.listen(PORT, (req, res) => {
    console.log(`server is running on port ${PORT}`);
});