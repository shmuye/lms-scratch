import Book from '../models/book.model.js'

export const createBook = async (req, res) => {
  try {
    const {
      title,
      author,
      category,
      isbn,
      totalCopies,
      copiesAvailable,
    } = req.body;

    // 1. Validate body
    if (
      !title ||
      !author ||
      !category ||
      !isbn ||
      totalCopies == null ||
      copiesAvailable == null
    ) {
      return res.status(400).json({
        message: "Please fill all required fields",
      });
    }

    // 2. Validate file
    if (!req.file) {
      return res.status(400).json({
        message: "Cover image is required",
      });
    }

    // 3. Business rule
    if (copiesAvailable > totalCopies) {
      return res.status(400).json({
        message: "Copies available cannot exceed total copies",
      });
    }

    // 4. Create book
    const book = await Book.create({
      title,
      author,
      category,
      isbn,
      totalCopies,
      copiesAvailable,
      coverPage: `/uploads/coverImages/${req.file.filename}`,
    });

    return res.status(201).json({
      message: "Book created successfully",
      book,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

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


    

     
