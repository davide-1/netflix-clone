import React from "react"
import { Route, Routes } from "react-router-dom"
import Login from "./components/Login"
import Register from "./components/Register"
import Profile from "./components/Profile"
import Home from "./components/Home"
import Navbar from "./components/Navbar"
import { AuthContextProvider } from "./context/AuthContext"
import ProtectedRoute from "./components/ProtectedRoute"

function App() {


  return (
    <>
      <AuthContextProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        </Routes>
      </AuthContextProvider>
    </>
  )
}

export default App
