import Book from '../models/book.models.js'

export const creatBook = async (req, res) => {

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

    const coverImage = req.file?.path || null;

    if(!title || !description || !publishiedYear || !author || !category || !isbn || !copiesAvailable || !totalCopies || !coverImage){
        return res.status(400).json({
            message: "please fill all required fields"
        })
    }

    try {

      await Book.create()
        
    } catch (error) {

        
    }

}

export const getBooks = async (req, res) => {
   
    try {
        const books = await Book.find() 
        return res.status(200).json(books)      
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}

export const getBook = async (req, res) => {
    
    const { id } = req.params
    try {
     
    const book = Book.findById(id)
    return res.status(200).json(book)

    } catch (error) {
        
        return res.status(404).json({
            message: "Book not found"
      })  
    }       
}

export const updateBook = async (req, res) => {
    const { id } = req.params
    const { title, description, publishiedYear, author, category, isbn, totalCopies, copiesAvailable } = req.body

    return Book.findByIdAndUpdate(id, {
        title,
        description,
        publishiedYear,
        author,
        category,
        isbn,
        totalCopies,
        copiesAvailable
    }, { new: true })
}

export const deleteBook = async (req, res) => {
    const { id } = req.params

     try {
        await Book.deleteBookById(id)   
        return res.status(200).json({
            message: "Book deleted successfully"
        }) 
     } catch (error) {
        return res.status(500).json({
            message: "Internal server error"
        }) 
     }
}

     
