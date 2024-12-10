// HeroSection.js
import FreeBooks from "./FreeBooks"
import {Link } from 'react-router-dom'; 

const Hero = () => {
    const token = localStorage.getItem('token');
    return (
        <>
       
        <section className="text-gray-600 body-font dark:bg-gray-800">
            <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
                <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
                    <h1 className=" dark:text-white title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
                        Discover Your Next Favorite Book
                        <br className="hidden lg:inline-block dark:text-white" /> with Our Curated Collection
                    </h1>
                    <p className="mb-8 leading-relaxed dark:text-white">
                        Explore a wide range of genres and titles that cater to all book lovers. 
                        From bestsellers to hidden gems, our bookstore has something for everyone.
                    </p>
                    <div className="flex justify-center">
                        <Link to={token ? '/paidbooks' : '/signup'} className="inline-flex text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded text-lg">
                            Explore Now
                        </Link>

{token?
                        <Link to='/paidbooks' className="ml-4 inline-flex text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-700 rounded text-lg">
                            Access Paid Books
                        </Link>
:   <button className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">
Learn More
</button>
}
                    </div>
                </div>
                <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
                    <img 
                        className="object-cover object-center rounded" 
                        alt="Books Collection" 
                        src="https://plus.unsplash.com/premium_photo-1677567996070-68fa4181775a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Ym9va3N8ZW58MHx8MHx8fDA%3D" 
                    />
                </div>
            </div>
        </section>

<FreeBooks />

</>
    );
};

export default Hero;
