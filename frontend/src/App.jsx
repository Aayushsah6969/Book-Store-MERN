import Footer from "./components/Footer";
import FreeBooks from "./components/FreeBooks";
import Hero from "./components/Hero"
import Navbar from "./components/Navbar"
import { Routes, Route } from 'react-router-dom';
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import PaidBooks from "./components/PaidBooks";
import { ThemeProvider } from "./ThemeContext";
import ResetPasswordRequest from "./components/ResetPasswordRequest";
import ResetPassword from "./components/ResetPassword";
import OTPInput from "./components/OTPInput";
import OneBook from "./components/OneBook";
import MyOrders from "./components/MyOrders";

function App() {
const token = localStorage.getItem('token');

  return (
   
    <ThemeProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/requestresetpassword" element={<ResetPasswordRequest/>} />
        <Route path="/resetpassword" element={<ResetPassword/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/otpinput" element={<OTPInput/>} />
        <Route path="/shop/:id" element={<OneBook/>} />
        <Route path="/myorders" element={<MyOrders/>} />
        {token ?<Route path="/paidbooks" element={<PaidBooks/>} />:<Route path="/books" element={<FreeBooks/>} />}
      </Routes>
      <Footer/>
    </ThemeProvider>
 
  )
}

export default App
