import { useState } from 'react';
import axios from 'axios';

const ResetPasswordRequest = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/user/emailotp',{ email });
      console.log(response);
      console.log(response.data);
      console.log(response.data.message);
      // setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="dark:bg-gray-800 dark:text-white  max-w-md mx-auto my-20 p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-center">Request Reset Password</h2>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="dark:text-black w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-200"
      >
        Send Reset Link
      </button>
      {message && <p className="mt-4 text-center text-red-500">{message}</p>}
    </form>
  );
};

export default ResetPasswordRequest;
