import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

export default function Navbar() {
     const { user, logout } = UserAuth();
     const navigate = useNavigate();

     const handleLogout = async () => {
        try {
            await logout();
            navigate("/");
        }catch (err) {
            console.log(err);
        }
     }


    return (
        <div className="absolute w-full p-4 flex items-center justify-between z-50">
            <Link to="/">
                <h1 className="uppercase text-red-600 font-nsans-bold cursor-pointer text-5xl">Netflix</h1>
            </Link>

            {
                user?.email ? (
                    <div>
                    <Link to="/profile">
                        <button className="pr-4">Profile</button>
                    </Link>
    
                  
                        <button onClick={handleLogout} className=" bg-red-600 px-6 py-2 rounded cursor-pointer">Logout</button>
                    
                </div>
                ) : (
                    <div>
                    <Link to="/login">
                        <button className="pr-4">Login</button>
                    </Link>
    
                    <Link to="/register">
                        <button className=" bg-red-600 px-6 py-2 rounded cursor-pointer">Sign Up</button>
                    </Link>
                </div>
                )
            }
        </div>
    )
}