import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const Register = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
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

            await axios.post(`${API}/register`, form);

            navigate("/login");
        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Registration failed"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-container">
            <div className="register-card">

                <div className="register-header">
                    <h1>🚀 Join My Journal</h1>

                    <p>
                        Create your account and start documenting
                        your ideas, goals, achievements, and memories.
                    </p>
                </div>

                {error && (
                    <div className="error-box">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>

                    <div className="input-group">
                        <label>Full Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter your name"
                            value={form.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

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
                            placeholder="Create a strong password"
                            value={form.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button
                        className="register-btn"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? "Creating Account..." : "Create Account"}
                    </button>

                    <button
                        type="button"
                        className="login-btn"
                        onClick={() => navigate("/login")}
                    >
                        Already Have an Account?
                    </button>

                </form>

                <div className="footer-text">
                    Begin your journey of growth and reflection ✨
                </div>

            </div>
        </div>
    );
};

export default Register;