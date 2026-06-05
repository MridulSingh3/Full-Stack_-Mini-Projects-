import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const API = "http://localhost:8080/api/user";

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            setError("");

            const res = await axios.post(`${API}/login`, form);

            login(
                {
                    _id: res.data._id,
                },
                res.data.token
            );

            navigate("/journel");
        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Invalid email or password"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">

                <div className="login-header">
                    <h1>📖 My Journal</h1>

                    <p>
                        Your private space to think, write,
                        reflect, and grow every day.
                    </p>
                </div>

                {error && (
                    <div className="error-box">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>

                    <div className="input-group">
                        <label>Email Address</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={form.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            value={form.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="login-btn"
                        disabled={loading}
                    >
                        {loading ? "Logging In..." : "Login"}
                    </button>

                    <button
                        type="button"
                        className="register-btn"
                        onClick={() => navigate("/register")}
                    >
                        Create New Account
                    </button>
                </form>

                <div className="footer-text">
                    Start writing your journey today ✨
                </div>

            </div>
        </div>
    );
};

export default Login;