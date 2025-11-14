import express from 'express';
import dotenv from 'dotenv';
import {connectDB} from "./db/connectDB.js";

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

// middleware

app.use(express.json());

//routes

app.get('/', (req, res) => {
    res.send('Hello World');
});

connectDB();

app.listen(PORT, (req, res) => {
    console.log(`server is running on port ${PORT}`);
});