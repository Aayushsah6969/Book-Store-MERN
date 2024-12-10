// Footer.js

import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-gray-300 py-10">
            <div className="container mx-auto px-6">
                <div className="flex flex-wrap justify-between">
                    {/* Logo Section */}
                    <div className="w-full md:w-1/3 mb-6">
                        <h2 className="text-white text-2xl font-bold">BookStore</h2>
                        <p className="mt-2">
                            Discover a world of books at your fingertips. 
                            Your next adventure is just a page away!
                        </p>
                    </div>

                    {/* Links Section */}
                    <div className="w-full md:w-1/3 mb-6">
                        <h3 className="text-white text-lg font-semibold">Quick Links</h3>
                        <ul className="mt-2">
                            <li><a href="/" className="hover:text-blue-400">Home</a></li>
                            <li><a href="/about" className="hover:text-blue-400">About Us</a></li>
                            <li><a href="/books" className="hover:text-blue-400">Books</a></li>
                            <li><a href="/contact" className="hover:text-blue-400">Contact</a></li>
                        </ul>
                    </div>

                    {/* Contact Section */}
                    <div className="w-full md:w-1/3 mb-6">
                        <h3 className="text-white text-lg font-semibold">Contact Us</h3>
                        <p className="mt-2">Email: <a href="mailto:info@bookstore.com" className="hover:text-blue-400">info@bookstore.com</a></p>
                        <p>Phone: <span className="hover:text-blue-400">(123) 456-7890</span></p>
                    </div>
                </div>

                {/* Social Media Icons */}
                <div className="flex justify-center mt-8">
                    <a href="#" className="mx-3 hover:text-blue-400"><FaFacebook size={24} /></a>
                    <a href="#" className="mx-3 hover:text-blue-400"><FaTwitter size={24} /></a>
                    <a href="#" className="mx-3 hover:text-blue-400"><FaInstagram size={24} /></a>
                    <a href="#" className="mx-3 hover:text-blue-400"><FaLinkedin size={24} /></a>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className="border-t border-gray-700 mt-10 pt-4 text-center">
                <p className="text-sm">© 2024 BookStore. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
