// components/AddExpense.js
import React, { useState } from "react";
import API from "../utils/api";
import { useNavigate } from "react-router-dom";

function AddExpense() {
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("food");
    const [error, setError] = useState("");

    const handleAdd = async (e) => {
        e.preventDefault();
        setError("");

        if (!title || !amount) {
            return setError("All fields are required");
        }

        try {
            await API.post("/expenses", {
                title,
                amount,
                category,
            });

            navigate("/dashboard");

        } catch (err) {
            setError(err.response?.data?.message || "Failed to add expense");
        }
    };

    return (
        <div className="add-container">
            <div className="add-card">
                <h2>Add Expense 💸</h2>

                {error && <p className="error">{error}</p>}

                <form onSubmit={handleAdd} className="add-form">
                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <input
                        type="number"
                        placeholder="Amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />

                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="food">Food</option>
                        <option value="travel">Travel</option>
                        <option value="shopping">Shopping</option>
                        <option value="others">Others</option>
                    </select>

                    <button type="submit" className="add-btn">
                        Add Expense
                    </button>
                </form>

                <button
                    className="back-btn"
                    onClick={() => navigate("/dashboard")}
                >
                    ← Back to Dashboard
                </button>
            </div>
        </div>
    );
}

export default AddExpense;