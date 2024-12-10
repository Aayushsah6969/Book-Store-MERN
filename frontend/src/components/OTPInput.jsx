import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const OTPInput = () => {
  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState('');  // Assume email is passed in or collected earlier
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:3000/user/verify-otp', { otp, email });
      const { token } = response.data;
      // Redirect to reset password page with the token
      navigate(`/reset-password?token=${token}`);
    } catch (error) {
      setMessage(error.response?.data?.message || "OTP verification failed");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-700">
      <div className="bg-white dark:bg-gray-500 p-6 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-xl font-semibold mb-4 dark:text-black">Enter OTP</h2>
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter OTP"
          className="w-full p-2 mb-4 border border-gray-300 rounded-md dark:bg-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSubmit}
          className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-600 transition duration-200"
        >
          Proceed
        </button>
        {message && <p className="mt-4 text-center text-red-500">{message}</p>}
      </div>
    </div>
  );
};

export default OTPInput;
