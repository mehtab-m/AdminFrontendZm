import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './index.css'
import Login from './pages/Login'
import ResetPassword from './pages/ResetPassword'
import Dasboard from './pages/Dashboard'
import AddCategory from './pages/AddCategory'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/resetPassword" element={<ResetPassword />} />
                <Route path="/admin-dashboard" element={<Dasboard />} />
                <Route path="/add-category" element={<AddCategory />} />
            </Routes>
        </Router>
    </>
  ) 
}

export default App
