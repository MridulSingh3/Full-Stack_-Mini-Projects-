import React, { useState } from 'react';
import API from "../utils/api";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");

        try {
            const res = await API.post("/api/users/login", {
                email,
                password
            });

            localStorage.setItem("token", res.data.token);
            navigate("/dashboard");

        } catch (err) {
            setError(err.response?.data?.message || "Login failed");
        }
    }

    return (
        <div className="login-container">
            <div className="login-card">
                <h1 className="login-title">Welcome Back 👋</h1>

                {error && <p className="error">{error}</p>}

                <form onSubmit={handleSubmit} className="login-form">
                    <input
                        type="email"
                        placeholder="example@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <input
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <button type="submit" className="login-btn">
                        Login
                    </button>
                </form>

                <p className="signup-text">
                    Don’t have an account?
                </p>

                <button
                    className="signup-btn"
                    onClick={() => navigate("/register")}
                >
                    Signup
                </button>
            </div>
        </div>
    );
};

export default Login;