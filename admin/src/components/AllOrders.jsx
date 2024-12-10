import axios from 'axios';
import { useEffect, useState } from 'react';

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [deliveryStatus, setDeliveryStatus] = useState({});
  const [message, setMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState(''); // Search term for filtering

  const token = localStorage.getItem('token'); // Assuming JWT is saved in localStorage

  // Fetch orders from API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:3000/order/allorders', {
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log(response.data);
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
    fetchOrders();
  }, [token]);

  // Handle delivery status change
  const handleStatusChange = (orderId, status) => {
    setDeliveryStatus({ ...deliveryStatus, [orderId]: status });
  };

  // Handle saving delivery status
  const saveDeliveryStatus = async (order) => {
    try {
      await axios.put(
        `http://localhost:3000/order/updateOrder/${order._id}`,
        { deliveryStatus: deliveryStatus[order._id] || order.deliveryStatus },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessage('Delivery status updated successfully!');
      window.location.reload();
    } catch (error) {
      console.error('Error updating status:', error);
      setMessage('Failed to update the status.');
    }
  };

  // Handle marking payment as paid
  const markAsPaid = async (order) => {
    if (window.confirm('Are you sure you want to mark this order as paid?')) {
      try {
        await axios.put(
          `http://localhost:3000/order/updateOrder/${order._id}`,
          { paymentMethod: 'Paid' },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setMessage('Order marked as paid.');
        window.location.reload();
      } catch (error) {
        console.error('Error marking payment:', error);
        setMessage('Failed to mark as paid.');
      }
    }
  };

  // Filter orders based on search term (email, orderID, user name, or product name)
  const filteredOrders = orders.filter(
    (order) =>
      order.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {/* Search Bar */}
      <div className="m-4">
        <input
          type="text"
          placeholder="Search orders by email, order ID, name, or product name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Update search term
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>
  
      {message && <p className="text-center text-green-500">{message}</p>}
  
      {filteredOrders.length > 0 ? (
        filteredOrders.map((order) => {
          // Define the border color based on the conditions
          const isPaidAndDelivered = order.deliveryStatus === 'Delivered' && order.paymentMethod === 'Paid';
          let borderColor = 'border-blue-500'; // Default blue border
  
          if (order.isCancelled) {
            borderColor = 'border-red-500'; // Red border for cancelled orders
          } else if (isPaidAndDelivered) {
            borderColor = 'border-green-500'; // Green border for paid and delivered orders
          }
  
          return (
            <div
              key={order._id}
              className={`m-4 flex justify-between items-center bg-gray-100 p-4 rounded-md shadow mb-2 dark:bg-gray-600 border-4 ${borderColor}`}
            >
              <div>
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Order for: {order.name}</h2>
                <p className="dark:text-white">Order ID: {order._id}</p>
                <p className="dark:text-white">Email: {order.email}</p>
                <p className="dark:text-white">Phone Number: {order.phoneNumber}</p>
                <p className="dark:text-white">Product ID: {order.productID}</p>
                <p className="dark:text-white">Product: {order.productName}</p>
                <p className="dark:text-white">Quantity: {order.quantity}</p>
                <p className="dark:text-white">totalPrice: {order.totalPrice}</p>
                <p className="dark:text-white">Address: {order.address}</p>
                <p className="dark:text-white">Payment Method: {order.paymentMethod}</p>
                <p className="dark:text-white">Delivery Status: {order.deliveryStatus}</p>
                <p className="dark:text-white font-bold">
                  Cancellation Status: {order.isCancelled ? 'Cancelled' : 'Not Cancelled'}
                </p>
  
                <p className="dark:text-white">Ordered At: {new Date(order.createdAt).toLocaleString()}</p>
              </div>
  
              {/* Select options for delivery status */}
            {order.isCancelled ? "This order has been cancelled" :   <div className="space-x-2">
                <select
                  value={deliveryStatus[order._id] || order.deliveryStatus}
                  onChange={(e) => handleStatusChange(order._id, e.target.value)}
                  className="border rounded-md p-2 dark:text-black"
                >
                  <option value="Pending">Pending</option>
                  <option value="Dispatched">Dispatched</option>
                  <option value="Delivered">Delivered</option>
                </select>
                <button
                  onClick={() => saveDeliveryStatus(order)}
                  className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition duration-200"
                >
                  Save Status
                </button>
  
                {/* Button to mark payment as paid */}
                {order.paymentMethod !== 'Paid' && (
                  <button
                    onClick={() => markAsPaid(order)}
                    className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 transition duration-200"
                  >
                    Mark as Paid
                  </button>
                )}
              </div>}
            </div>
          );
        })
      ) : (
        <p className="text-gray-600 dark:text-white">No orders available.</p>
      )}
    </>
  );
  
};

export default AllOrders;
