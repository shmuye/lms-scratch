import Book from '../models/book.models.js'

export const createBook = async (req, res) => {

    const { 

        title,  
        author, 
        category, 
        isbn,
        totalCopies, 
        copiesAvailable,

    } = req.body
    
    const coverImage = req.file?.path || null;

    if(
        !title || 
        !author || 
        !category || 
        !isbn || 
        copiesAvailable == null|| 
        totalCopies == null || 
        !coverImage){
        return res.status(400).json({
            message: "please fill all required fields"
        })
    }

     if (copiesAvailable > totalCopies) {
      return res.status(400).json({
        message: "Copies available cannot exceed total copies",
      })
    }

    try {

     const book =  await Book.create({
        title,  
        author, 
        category, 
        isbn,
        totalCopies, 
        copiesAvailable,
        coverPage: coverImage,
     })
     return res.status(201).json(book)
        
    } catch (error) {

        return res.status(500).json({
            message: "Internal server error",
            error: error.message 
        })
    }

}

export const getBooks = async (req, res) => {
   
    try {
        const books = await Book.find().lean() 
        return res.status(200).json(books)      
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}

export const getBook = async (req, res) => {
    
   
    try {

    const { id } = req.params
    const book = await Book.findById(id)

    if(!book) {
        return res.status(404).json({
            message: "Book not found"
        })
    }
    return res.status(200).json(book)

    } catch (error) {
        
        return res.status(400).json({
            message: "Invalid Book ID"
      })  
    }       
}

export const updateBook = async (req, res) => {

    try {

        const { id } = req.params
        const updatedBook = await Book.findByIdAndUpdate(
            id, 
            req.body,
            { new: true, runValidators: true } 
        )

    if (!updatedBook) {
        return res.status(404).json({
        message: "Book not found",
      })
    }

    return res.status(200).json(updatedBook)
        
        
    } catch (error) {

      return res.status(500).json({
      message: "Internal server error",
    })
    }
   
}

export const deleteBook = async (req, res) => {

    try {

        const { id } = req.params
        const deletedBook = await Book.findByIdAndDelete(id)

        if(!deletedBook) {
            return res.status(404).json({
                message: "Book not found"
            })
        }

        return res.status(200).json({
            message: "Book deleted successfully"
        })
        
    } catch (error) {
        
        return res.status(400).json({
            message: "Invalid Book ID"
      })  
    }       
}   

     
