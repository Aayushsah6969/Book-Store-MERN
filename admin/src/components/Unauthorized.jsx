
const Unauthorized = () => {
    const handleclick = () => {
        // Redirect to login page
        window.location.href = '/'
    }

  return (
    <div>Unauthorized
            <button onClick={handleclick}  className=" bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-blue-600"
               >Login</button>
    </div>
    
  )
}

export default Unauthorized