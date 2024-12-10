import Book from '../models/book.model.js';

//get all books from database.
export const getBook =async (req, res)=>{
    try {
        const book = await Book.find();
        res.status(200).json(book);
    } catch (error) {
        console.log("Error:",error.message);
        res.status(500).json(error);
    }
};
//get one particular book
export const getOneBook = async (req, res) => {
    const { id } = req.params; // Access id correctly
    try {
        const book = await Book.findById(id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json(book);
    } catch (error) {
        console.log("Error:", error.message);
        res.status(500).json({ message: error.message });
    }
};


export const uploadBook = async (req, res) => {
    const { name, price, category, description } = req.body;
    const image = req.file.path; // Multer stores the uploaded image URL in req.file.path

    const book = new Book({ name, price, category, description, image });

    try {
        const newBook = await book.save();
        res.status(201).json({ message: "Book uploaded successfully", book: newBook });
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ error: error.message });
    }
};


export const updatebook = async(req, res)=>{
    try {
        const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body,{new:true});
        if(!updatedBook) return res.status(404).json({message: "Book not found"});
        res.status(200).json({message:"Book Updated Successfully", book:updatedBook})
    } catch (error) {
        console.log("Error:",error.message);
        res.status(500).json("Error: ",error);
    }
};

export const deleteBook = async(req, res)=>{
    try {
        const deletedBook = await Book.findByIdAndDelete(req.params.id);
        if(!deletedBook) return res.status(404).json({message: "Book not found"});
        res.status(200).json({message:"Book Deleted Successfully", book:deletedBook})
    } catch (error) {
        console.log("Error:",error.message);
        res.status(500).json("Error: ",error);
    }
 
};