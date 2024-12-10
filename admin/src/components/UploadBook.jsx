import { useState } from 'react';
import axios from 'axios';

const UploadBook = () => {
  // State to handle form inputs
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    description: '',
    image: null,
  });

  // State to handle success or error messages
  const [message, setMessage] = useState('');

  // Handle form change
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] }); // Handle file upload
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if file size is less than 5MB
    if (formData.image && formData.image.size > 5 * 1024 * 1024) {
      setMessage('File size should be less than 5MB.');
      return;
    }

    const form = new FormData(); // Use FormData to handle file upload
    form.append('name', formData.name);
    form.append('price', formData.price);
    form.append('category', formData.category);
    form.append('description', formData.description);
    form.append('image', formData.image); // Attach the file

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:3000/book/uploadbook', form, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data', // Make sure the content type is multipart/form-data
        },
      });
      console.log(response.data);
      setMessage('Book uploaded successfully!');
      setFormData({ name: '', price: '', category: '', description: '', image: null });
    } catch (error) {
      console.error('Error uploading the book:', error.response?.data || error.message); // Better error logging
      setMessage('Error uploading the book.');
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 dark:bg-gray-700 p-10 w-full">
      <h2 className="text-2xl font-bold mb-5 dark:text-white">Upload a New Book</h2>
      {message && <p className="mb-4 text-blue-500">{message}</p>}
      <form onSubmit={handleSubmit}>
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
            placeholder="Enter book name"
            required
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
            placeholder="Enter price"
            required
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
            placeholder="Enter category"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-white" htmlFor="description">
            Description
          </label>
          <input
            id="description"
            name="description"
            type="text"
            value={formData.description}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter description"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-white" htmlFor="image">
            Upload Image
          </label>
          <input
            id="image"
            name="image"
            type="file" // Change to file type
            onChange={handleChange} // Handle file change
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Upload Book
        </button>
      </form>
    </div>
  );
};

export default UploadBook;
