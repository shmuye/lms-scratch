import Book from '../models/book.models.js'

const creatBook = async (req, res) => {

    const { 

        title, 
        description, 
        publishiedYear, 
        author, 
        category, 
        isbn,
        totalCopies, 
        copiesAvailable,

    } = req.body

    if(!title || !description || !publishiedYear || !author || !category || !isbn){
        return res.status(400).json({
            message: "please fill all required fields"
        })
    }

    try {


        
    } catch (error) {

        
    }

}