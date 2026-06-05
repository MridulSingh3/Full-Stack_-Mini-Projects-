// pages/Register.js
import React, { useState } from "react";
import API from "../utils/api";
import { useNavigate } from "react-router-dom";


function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const res = await API.post("/api/users/register", {
                name,
                email,
                password,
            });

            localStorage.setItem("token", res.data.token);
            navigate("/dashboard");

        } catch (err) {
            setError(err.response?.data?.message || "Registration failed");
        }
    };

    return (
        <div className="register-container">
            <div className="register-card">
                <h2 className="register-title">Create Account 🚀</h2>

                {error && <p className="error">{error}</p>}

                <form onSubmit={handleRegister} className="register-form">
                    <input
                        type="text"
                        placeholder="Full Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <button type="submit" className="register-btn">
                        Register
                    </button>
                </form>

                <p className="login-text">Already have an account?</p>

                <button
                    className="login-btn-alt"
                    onClick={() => navigate("/login")}
                >
                    Login
                </button>
            </div>
        </div>
    );
}

export default Register;