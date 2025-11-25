import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './index.css'
import Login from './pages/Login'
import ResetPassword from './pages/ResetPassword'
import Dasboard from './pages/Dashboard'
import AddCategory from './pages/AddCategory'
import ProtectedRoute from './components/ProtectedRoute'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <Router>
                <ToastContainer position="top-right" autoClose={5000} />
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/resetPassword" element={<ResetPassword />} />
                <Route path="/admin-dashboard" element={ <ProtectedRoute>
                                                                <Dasboard />
                                                         </ProtectedRoute>} />
                <Route path="/add-category" element={<ProtectedRoute>
                                                                <AddCategory />
                                                         </ProtectedRoute>} />
            </Routes>
        </Router>
    </>
  ) 
}

export default App
