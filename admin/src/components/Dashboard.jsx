import Navbar from './Header'
import { Routes, Route } from 'react-router-dom';
import TopBar from './TopBar';
import AllBooks from "./AllBooks";
import UploadBook from "./UploadBook";
import AllUsers from "./AllUsers";
import Home from './Home';
import AllOrders from './AllOrders';

const Dashboard = () => {
    return (
        <div className='dark:bg-gray-800'>
            <Navbar />
            <TopBar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/allbooks" element={<AllBooks />} />
                <Route path="/uploadbook" element={<UploadBook />} />
                <Route path="/allusers" element={<AllUsers />} />
                <Route path="/allorders" element={<AllOrders />} />
            </Routes>
        </div>
    )
}

export default Dashboard