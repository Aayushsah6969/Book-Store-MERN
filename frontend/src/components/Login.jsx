import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const response = await axios.post('http://localhost:3000/user/login', formData);
      console.log(response.data); // For debugging

      // If login is successful, save the token to localStorage
      if (response.data.token) {
        // Create an object with the desired user data
        const userData = {
          fullname: response.data.user.fullname,
          _id: response.data.user._id,
          email: response.data.user.email
        };
        
        

        // Store the user data as a JSON string
        localStorage.setItem('Book-User-Data', JSON.stringify(userData));

        localStorage.setItem('token', response.data.token);
        setSuccess(true); // Show success message
        setFormData({ email: '', password: '' }); // Reset form
        navigate('/'); // Redirect to login page after 2 seconds
        window.location.reload();

      } else {
        setError('Login failed. Please check your credentials.');
      }
    } catch (err) {
      console.error(err);
      setError(err.response.data.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-800">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg dark:bg-gray-600">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6 dark:text-white">Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">Login successful!</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-white" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-white" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
              placeholder="Enter your password"
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-blue-600"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </form>
        <p className="text-center text-gray-500 mt-2 dark:text-white">Forgot Password? <a className='text-green-600' href="/requestresetpassword">Reset Now</a></p>
        <p className="text-center text-gray-500 mt-4 dark:text-white">
          Dont have an account? <a className='text-red-600' href="/signup">Register now</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
