// PaidBooks.jsx
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const PaidBooks = () => {
  // Initialize Books as an empty array to avoid undefined issues
  const [Books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:3000/book/getbook");
       // console.log(response.data); // For debugging
        setBooks(response.data); 
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  // Filter only free books
  const paidBooks = Books.filter((book) => book.price !== 0);
  const token = localStorage.getItem('token');

  return (
    <section className="text-gray-600 body-font dark:bg-gray-800">
      <div className="container px-5 py-8 mx-auto">

        {token && (
                    <div className="flex-grow mx-4 mt-3">
                        <input
                            type="text"
                            placeholder="Search for books..."
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                        />
                    </div>
                )}
        <div className="flex flex-col text-center w-full mb-20">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900 dark:text-white">
            Featured Paid Books
          </h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base dark:text-white">
            Explore our curated selection of must-read books, perfect for every book lover.
            From timeless classics to modern bestsellers, we have something for everyone.
          </p>
        </div>
      
        <div className="flex flex-wrap -m-4">
          {paidBooks.length > 0 ? (
            paidBooks.map((book) => (
              <Link to={`/shop/${book._id}`} className="lg:w-1/3 sm:w-1/2 p-4" key={book._id}>
                <div className="flex relative">
                  <img
                    alt={book.name}
                    className="absolute inset-0 w-full h-full object-cover object-center"
                    src={book.image}
                  />
                  <div className="px-8 py-10 relative z-10 w-full border-4 border-gray-200 bg-white opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <h2 className="tracking-widest text-sm title-font font-medium text-blue-500 mb-1">
                      {book.category}
                    </h2>
                    <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                      {book.title}
                    </h1>
                    <p className="leading-relaxed">
                      {book.price === 0 ? 'Free' : `$${book.price}`}
                    </p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p>No free books available.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default PaidBooks;
