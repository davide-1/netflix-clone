import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

export default function Register() {
    const [rememberLogin, setRememberLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [error, setError] = useState("");

    const { user, signUp } = UserAuth();
    const navigate = useNavigate();



    const handleFormSubmit = async (e) => {
        e.preventDefault()
        setError("");
       
        try {
            await signUp(email, password);
            navigate("/");
        } catch (err) {
            setError(err.message);
        }       
    };


    return (
        <>
            <div className="w-full h-screen">
                <img
                    className="hidden sm:block absolute w-full h-full object-cover"
                    src="https://assets.nflxext.com/ffe/siteui/vlv3/826348c2-cdcb-42a0-bc11-a788478ba5a2/f5a613af-ff99-444d-8305-e4cecd6d6cf6/US-en-20240729-POP_SIGNUP_TWO_WEEKS-perspective_WEB_591dffe8-33f4-4fb4-a734-9ff362a96145_small.jpg"
                    alt="///" />
                <div className="bg-black/70 fixed top-0 left-0 w-full h-screen" />

                <div className="fixed w-full px-4 py-24 z-20">
                    <div className="max-w-[450px] h-[500px] mx-auto bg-black/60 rounded-lg">
                        <div className="max-w-[320px] mx-auto py-16">
                            <h1 className="text-3xl font-nsans-bold">Sign Up</h1>

                            <form
                            onSubmit={handleFormSubmit}
                             className="w-full flex flex-col py-4">
                                <input
                                className="p-3 my-2 bg-transparent border border-gray-500 rounded"
                                 type="email"
                                 placeholder="Email or mobile number"
                                 autoComplete="email"
                                 value={email}
                                 onChange={(e) => setEmail(e.target.value)}
                                 />
                                <input
                                className="p-3 my-2 bg-transparent border border-gray-500 rounded"
                                 type="password"
                                 placeholder="Password"
                                 autoComplete="current-password"
                                 value={password}
                                 onChange={(e) => setPassword(e.target.value)}
                                 />
                                 <button className="bg-red-600 py-3 my-6 rounded font-nsans-bold ">Sign In</button>
                                 <div className="flex justify-between items-center">
                                 {error && <p className="text-red-600">{error}</p>}
                                    <p>
                                        <input 
                                        className="mr-2 text-white"
                                        type="checkbox" 
                                        checked={rememberLogin}
                                        onChange={(e) => setRememberLogin(!rememberLogin)}
                                        />
                                        Remember me
                                    </p>
                                    <p className="text-gray-600">
                                        Need Help?
                                    </p>
                                 </div>
                                 <p className="my-4">
                                     <span className="text-gray-600 mr-2">Already subscribed to Netflix?</span>
                                     <Link to="/login">Sign In</Link>
                                 </p>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}