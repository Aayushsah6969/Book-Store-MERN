// Navbar.js
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { ThemeContext } from '../ThemeContext';
import { IoSunny } from "react-icons/io5";
import { LuMoon } from "react-icons/lu";

const Navbar = () => {

    const { theme, toggleTheme } = useContext(ThemeContext);


    const HandleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/'
    }

    return (
        <nav className="bg-white shadow-lg sticky top-0 z-50 dark:bg-gray-800 ">
            <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                <div className="flex-shrink-0">
                    <Link to='/dashboard' className="text-2xl font-bold text-gray-800 dark:text-white">BookStore</Link>
                </div>
                <div>
                <button
                        className="mx-4 inline-flex items-center bg-gray-300 border-0 py-1 px-1 focus:outline-none hover:bg-gray-200  text-base rounded-full"
                        onClick={toggleTheme}
                    >
                        {theme === 'dark' ? <IoSunny className='flex justify-center align-middle m-2' /> : <LuMoon className='flex justify-center align-middle m-2'/>} 
                    </button>
                    <button
                        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                        onClick={HandleLogout}
                    > LogOut </button>
            
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
