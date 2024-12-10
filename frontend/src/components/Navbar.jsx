import { Link, useNavigate } from 'react-router-dom';
import { IoSunny } from "react-icons/io5";
import { ThemeContext } from '../ThemeContext';
import { useContext, useState } from 'react';
import { CgProfile } from "react-icons/cg";
import { FiShoppingCart } from "react-icons/fi";
import { LuMoon } from "react-icons/lu";

const Navbar = () => {
    const navigate = useNavigate();
    const { theme, toggleTheme } = useContext(ThemeContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const token = localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('Book-User-Data');
        navigate('/');
        window.location.reload();
    };

    const handleToggleMenu = () => {
        setIsMenuOpen(prev => !prev);
    };

    const storedUserData = localStorage.getItem('Book-User-Data');
    const user = JSON.parse(storedUserData);

    return (
        <nav className="bg-white shadow-lg sticky top-0 z-50 dark:bg-gray-800">
            <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                {/* Logo Section */}
                <div className="flex-shrink-0">
                    <Link to='/' className="text-2xl font-bold text-gray-800 dark:text-white">BookStore</Link>
                </div>


                {/* Theme Toggle Button */}
                <div>
                    <button
                        className="mx-4 inline-flex items-center bg-gray-300 border-0 py-1 px-1 focus:outline-none hover:bg-gray-200  text-base rounded-full"
                        onClick={toggleTheme}
                    >
                        {theme === 'dark' ? <IoSunny className='flex justify-center align-middle m-2' /> : <LuMoon className='flex justify-center align-middle m-2'/>} 
                    </button>
                </div>

                {/* Profile and Logout Section */}
                {token ? (
                    <div className='relative flex items-center space-x-2'>
                        <button
                            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                            onClick={handleLogout}
                        >
                            LogOut
                        </button>
                        <CgProfile 
                            className='text-gray-600 dark:text-white text-4xl cursor-pointer hover:text-black-700 transition' 
                            onClick={handleToggleMenu}
                        />
                        {isMenuOpen && (
                            <div className="absolute right-0 mt-60 w-48 bg-gray-300 shadow-lg rounded-md p-4 z-10">
                                <h4 className="text-lg font-semibold">{user.fullname}</h4>
                                <Link to="/" className="block text-gray-700 hover:bg-gray-100 rounded-md p-2">Settings</Link>
                                <Link to="/" className="block text-gray-700 hover:bg-gray-100 rounded-md p-2">Profile</Link>
                            </div>
                        )}
                       <a href='/myorders'> <FiShoppingCart  className='text-gray-600 dark:text-white text-4xl cursor-pointer hover:text-black-700 transition' /></a>
                    </div>
                ) : (
                    <div className='mx-2'>
                        <Link to='/login' className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                            LogIn
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
