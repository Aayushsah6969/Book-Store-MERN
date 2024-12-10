import axios from 'axios';
import { useEffect, useState } from 'react';

const MyOrders = () => {
    const [orders, setOrders] = useState([]);
    const [message, setMessage] = useState('');
    const token = localStorage.getItem('token'); // Assuming JWT is saved in localStorage

    // Fetch user's orders from API
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('http://localhost:3000/order/myorders', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                console.log('Orders:', response.data); // Log orders for debugging
                setOrders(response.data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };
        fetchOrders();
    }, [token]);


    // Handle canceling the order
    const cancelOrder = async (orderId) => {
        if (window.confirm('Are you sure you want to cancel this order?')) {
            try {
                await axios.put(`http://localhost:3000/order/cancelorder/${orderId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setOrders(orders.filter(order => order._id !== orderId)); // Remove order from the list
                setMessage('Order canceled successfully.');
            } catch (error) {
                console.error('Error canceling order:', error);
                setMessage('Failed to cancel the order.');
            }
        }
    };

    return (
        <>
            {message && <p className="text-center text-green-500">{message}</p>}
            {orders.length > 0 ? (
                orders.map((order) => (
                    <div
                        key={order._id}
                        className={`m-4 dark:bg-gray-600 flex justify-between items-center bg-gray-100 p-4 rounded-md shadow mb-2 ${order.deliveryStatus === 'Delivered' && order.paymentMethod === 'Paid'
                                ? 'border-2 border-green-500'
                                : 'border-2 border-red-500'
                            }`}
                    >
                        <div>
                            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Order for: {order.name}</h2>
                            <p className="dark:text-white">Order ID: {order._id}</p>
                            <p className="dark:text-white">Product: {order.productName}</p>
                            <p className="dark:text-white">Quantity: {order.quantity}</p>
                            <p className="dark:text-white">Phone: {order.phoneNumber}</p>
                            <p className="dark:text-white">Address: {order.address}</p>
                            <p className="dark:text-white">Payment Method: {order.paymentMethod}</p>
                            <p className="dark:text-white">Delivery Status: {order.deliveryStatus}</p>
                            <p className="dark:text-white font-bold">
                                Cancellation Status: {order.isCancelled ? 'Cancelled' : 'Not Cancelled'}
                            </p>
                        </div>

                        {/* Buttons for Delivery Status and Payment */}
{order.isCancelled ? "You Cancelled this Order" :                         <div className="space-x-2">
                            <button
                                className={`${order.deliveryStatus === 'Delivered' ? 'bg-green-500' : 'bg-yellow-500'
                                    } text-white p-2 rounded-lg`}
                            >
                                {order.deliveryStatus}
                            </button>

                            <button
                                className={`${order.paymentMethod === 'Paid' ? 'bg-green-500' : 'bg-red-500'
                                    } text-white p-2 rounded-lg`}
                            >
                                {order.paymentMethod === 'Paid' ? 'Paid' : 'Unpaid'}
                            </button>

                            {/* Cancel Order Button */}
                            {order.deliveryStatus !== 'Delivered' && (
                                <button
                                    onClick={() => cancelOrder(order._id)}
                                    className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition duration-200"
                                >
                                    Cancel Order
                                </button>
                            )}
                        </div>}
                    </div>
                ))
            ) : (
                <p className="text-gray-600 dark:text-white">No orders available.</p>
            )}
        </>
    );
};

export default MyOrders;
