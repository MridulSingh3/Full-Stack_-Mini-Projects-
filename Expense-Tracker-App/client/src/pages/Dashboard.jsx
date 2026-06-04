// pages/Dashboard.js
import React, { useEffect, useState } from "react";
import API from "../utils/api";
import { useNavigate } from "react-router-dom";
import DonutChart from "../components/DonutCharts";

function Dashboard() {
    const [expenses, setExpenses] = useState([]);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    const fetchExpenses = async () => {
        try {
            const res = await API.get("/expenses");
            setExpenses(res.data);
        } catch (err) {
            console.error("Error fetching expenses:", err);
        }
    };

    useEffect(() => {
        fetchExpenses();
    }, []);

    const deleteExpense = async (id) => {
        try {
            await API.delete(`/expenses/${id}`);
            fetchExpenses();
        } catch (err) {
            console.error("Error deleting expense:", err);
        }
    };

    return (
        <>
            <div className="dashboard">
                {/* Header */}
                <div className="dashboard-header">
                    <h2>💰 Expense Dashboard</h2>
                    <button
                        className="add-btn"
                        onClick={() => navigate("/dashboard/add")}
                    >
                        + Add Expense
                    </button>
                </div>

                {/* Chart */}
                <div className="chart-container">
                    <DonutChart expenses={expenses} />
                </div>

                {/* List */}
                <div className="expense-list">
                    {expenses.length === 0 ? (
                        <p className="empty">No expenses found 🚫</p>
                    ) : (
                        expenses.map((exp) => (
                            <div key={exp._id} className="expense-card">
                                <div>
                                    <h4 className="title">{exp.title}</h4>
                                    <p className="category">{exp.category}</p>
                                </div>

                                <div className="right-section">
                                    <span className="amount">
                                        ₹{exp.amount}
                                    </span>
                                    <button
                                        className="delete-btn"
                                        onClick={() => deleteExpense(exp._id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
            <button className="logout-btn" onClick={handleLogout}>
                Logout
            </button>
        </>
    );
}

export default Dashboard;