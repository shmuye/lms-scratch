import app from './app.js'
import { connectDB } from './db/connectDB.js'

const PORT = process.env.PORT || 3000;

connectDB()

app.listen(PORT, (req, res) => {
    console.log(`server is running on port ${PORT}`);
});