import axios from 'axios';
import { useState, useEffect } from 'react';

const AllUsers = () => {
  const [searchTerm, setSearchTerm] = useState(''); // State for search term
  const [users, setUsers] = useState([]); // Correct naming convention for array
  const token = localStorage.getItem('token');  // Assuming JWT is saved in localStorage

  useEffect(() => {
    const GetUser = async () => {
      try {
        const response = await axios.get('http://localhost:3000/user/getusers', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    GetUser();
  }, [token]); // Adding token as a dependency

  // Make user admin
  const onMakeAdmin = async (id) => {
    try {
      // API call to update user as admin
      const response = await axios.put(
        `http://localhost:3000/user/updateuser/${id}`,
        { isAdmin: true },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(response.data.message); // Show success message

      // Update users state directly without page reload
      setUsers(users.map(user => user._id === id ? { ...user, isAdmin: true } : user));
    } catch (error) {
      console.error("Error:", error.message);
      alert("Failed to update user. Please try again.");
    }
  };

  // Delete user
  const onDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3000/user/deleteuser/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert(response.data.message); // Show success message

      // Update users state directly after deletion
      setUsers(users.filter((user) => user._id !== id));
    } catch (error) {
      console.error("Error:", error.message);
      alert("Failed to delete user. Please try again.");
    }
  };

  // Filter users based on search term (by name)
  const filteredUsers = users.filter((user) =>
    user.fullname.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {/* Search Bar */}
      <div className="m-4">
        <input
          type="text"
          placeholder="Search users..." // Updated placeholder
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Update search term
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>
      {filteredUsers.length > 0 ? (
        filteredUsers.map((user) => (
          <div className="m-4 flex items-center justify-between p-4 border-b border-gray-200 mx-10" key={user._id}>
            <div className="flex-1 inline-block">
              <h2 className="text-lg font-semibold dark:text-white">{user.fullname}</h2>
              <p className="text-sm text-gray-600 dark:text-white">{user.email}</p>
            </div>
            <div className="flex items-center justify-center mx-4">
              <span className={`text-sm ${user.isAdmin ? 'text-green-500' : 'text-red-500'}`}>
                <span className="text-black font-bold dark:text-white">Status:</span> {user.isAdmin ? 'Admin' : 'User'}
              </span>
            </div>
            {user.isAdmin ? (
              <h2 className="font-bold text-xl dark:text-white">Admin Here</h2>
            ) : (
              <div className="flex space-x-2">
                <button
                  onClick={() => onMakeAdmin(user._id)} // Pass user._id to onMakeAdmin
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Make Admin
                </button>
                <button
                  onClick={() => onDelete(user._id)} // Pass user._id to onDelete
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))
      ) : (
        <p className="text-gray-600 dark:text-white">No users found.</p>
      )}
    </>
  );
};

export default AllUsers;
