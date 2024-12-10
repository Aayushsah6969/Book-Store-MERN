import Dashboard from "./components/Dashboard";
import Login from "./components/Login"
import {Routes, Route} from 'react-router-dom';
import Unauthorized from "./components/Unauthorized";
import { ThemeProvider } from "./ThemeContext";


function App() {
  const token = localStorage.getItem('token');
 
  return (
   <ThemeProvider>
    <Routes>
     <Route path="/" element={<Login />} />
     <Route path="/dashboard/*" element={token? <Dashboard /> : <Unauthorized/>} />
    </Routes>
   </ThemeProvider>
  )
}

export default App
