import React, { useState } from "react";
import FirebaseAuthService from "../../services/fireauth-service";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navi =useNavigate()
    const handleLogin = async () => {
        
            await FirebaseAuthService.login(email, password).then((e) => {
                navi('/admin')
            }).catch((e) => {
                console.log(e.code);
                switch (e.code) {
                    case "auth/invalid-credential":
                        setMessage("Invalid email or password");            
                        break;
                    case "auth/user-not-found":
                        setMessage("User not found.");
                        break;
                    case "auth/too-many-requests":
                        setMessage("Can not login try again in a few minutes.");
                        break;
                    default:
                        setMessage(e.message);
                }
            })
           
        
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="shadow-lg rounded-lg p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold text-[#758b6b] text-center mb-6">Login</h2>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 mb-4 border border-[#758b6b] rounded focus:outline-none focus:ring-2 focus:ring-[#758b6b]"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 mb-4 border border-[#758b6b] rounded focus:outline-none focus:ring-2 focus:ring-[#758b6b]"
                />
                <button
                    onClick={handleLogin}
                    className="w-full bg-[#758b6b] text-white py-3 rounded hover:bg-[#5f7154] transition"
                >
                    Login
                </button>
                <p className="text-red-500 mt-2 text-center">{message}</p>
            </div>
        </div>
    );
};

export default Login;
