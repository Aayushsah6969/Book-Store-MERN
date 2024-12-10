import {Link} from 'react-router-dom';

const TopBar = () => {
  return (
   <>
   <div className="flex flex-wrap justify-center bg-gray-300 p-4 text-white my-3 dark:bg-gray-800">
    <div className="flex space-x-4">
      <Link to='uploadbook' className="bg-blue-500 hover:bg-blue-700 cursor-pointer text-white font-bold py-2 px-4 rounded">
       Upload Books
      </Link>
      <Link to='allbooks' className="bg-blue-500 hover:bg-blue-700 cursor-pointer text-white font-bold py-2 px-4 rounded">
       ALL Books
      </Link>
      <Link to='allusers' className="bg-blue-500 hover:bg-blue-700 cursor-pointer text-white font-bold py-2 px-4 rounded">
       ALL Users
      </Link>
      <Link to='allorders' className="bg-blue-500 hover:bg-blue-700 cursor-pointer text-white font-bold py-2 px-4 rounded">
       ALL Orders
      </Link>
    </div>
  </div>
   </>
  )
}

export default TopBar