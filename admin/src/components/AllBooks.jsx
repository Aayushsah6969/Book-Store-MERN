import axios from 'axios';
import { useEffect, useState } from 'react';

const AllBooks = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // State for search term
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentBook, setCurrentBook] = useState(null); // Holds the book details being edited
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    image: ''
  });

  // Fetch books from API
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:3000/book/getbook');
        setBooks(response.data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };
    fetchBooks();
  }, []);

  // Handle opening the edit modal
  const onEdit = (book) => {
    setIsModalOpen(true);
    setCurrentBook(book);
    setFormData({
      name: book.name,
      price: book.price,
      category: book.category,
      image: book.image,
    });
  };

  // Handle closing the edit modal
  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentBook(null);
  };

  // Handle form change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle saving edited book
  const handleSaveChanges = async () => {
    const token = localStorage.getItem('token');  // Assuming JWT is saved in localStorage

    try {
      await axios.put(`http://localhost:3000/book/updatebook/${currentBook._id}`, formData,{
        headers: { Authorization: `Bearer ${token}` }
      });
      setBooks(books.map((book) => (book._id === currentBook._id ? { ...book, ...formData } : book)));
      closeModal();
      alert('Book updated successfully!');
    } catch (error) {
      console.error('Error updating book:', error);
      alert('Failed to update the book');
    }
  };

  // Handle delete book with confirmation
  const onDelete = async (id) => {
    const token = localStorage.getItem('token');  // Assuming JWT is saved in localStorage

    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await axios.delete(`http://localhost:3000/book/deletebook/${id}`,{
          headers: { Authorization: `Bearer ${token}` }
        });
        setBooks(books.filter((book) => book._id !== id));
        alert('Book deleted successfully!');
      } catch (error) {
        console.error('Error deleting book:', error);
        alert('Failed to delete the book');
      }
    }
  };

// Filter books based on search term (name or category)
const filteredBooks = books.filter((book) =>
  book.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  book.category.toLowerCase().includes(searchTerm.toLowerCase())
);


  return (
    <>
      {/* Search Bar */}
      <div className="m-4">
        <input
          type="text"
          placeholder="Search books..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Update search term
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>

      {filteredBooks.length > 0 ? 
      (
        filteredBooks.map((book) => (
          <div key={book._id} className="m-4 dark:bg-gray-600 flex justify-between items-center bg-gray-100 p-4 rounded-md shadow mb-2">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">{book.name}</h2>
            <p className='dark:text-white'>Price: {book.price}</p>
            <p className='dark:text-white'>Category: {book.category}</p>
            <img src={book.image} className="w-16 h-auto" alt={book.name} />
            <div className="space-x-2">
              <button
                onClick={() => onEdit(book)} // Open modal and pass book
                className="bg-blue-500 dark:text-white hover:bg-blue-700 text-white font-bold py-1 px-3 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(book._id)} // Pass book id to onDelete
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded dark:text-white"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-600 dark:text-white">No books available.</p>
      )}

      {/* Edit Book Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-1/2 dark:bg-gray-800">
            <h2 className="text-2xl font-semibold mb-4 dark:text-white">Edit Book</h2>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-white" htmlFor="name">
                Book Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-white" htmlFor="price">
                Price
              </label>
              <input
                id="price"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-white" htmlFor="category">
                Category
              </label>
              <input
                id="category"
                name="category"
                type="text"
                value={formData.category}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-white" htmlFor="image">
                Image URL
              </label>
              <input
                id="image"
                name="image"
                type="text"
                
                value={formData.image}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="flex justify-end space-x-4">
              <button
                onClick={closeModal}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveChanges}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AllBooks;
