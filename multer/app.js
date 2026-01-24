import express from 'express';
import multer from 'multer';
import path from 'path';

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Images/');
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

app.get('/upload', (req, res) => {
    
    return res.render('uploads');

 })

 app.post('/upload',upload.single('image'), (req, res) => {
    return res.send('File uploaded successfully')
 });

 app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
 });
                                    
