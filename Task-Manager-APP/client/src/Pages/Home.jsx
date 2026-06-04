import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [updatingId, setUpdatingId] = useState(null);

    const API = "http://localhost:9000/tasks";

    // 🔹 Fetch Tasks
    const fetchTasks = async () => {
        try {
            setLoading(true);
            const res = await axios.get(API);
            setTasks(res.data);
            setError("");
        } catch (err) {
            setError("Failed to fetch tasks");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${API}/${id}`);

            setTasks(prev => prev.filter(task => task._id !== id));

            setError("");
            setSuccess("Task deleted");
            setTimeout(() => setSuccess(""), 2000);

        } catch (err) {
            setError("Delete failed");
        }
    };

    const getNextStatus = (status) => {
        if (status === "pending") return "in-progress";
        if (status === "in-progress") return "completed";
        return "pending";
    };

    const handleStatusChange = async (id, newStatus) => {
        try {
            setUpdatingId(id);

            await axios.put(`${API}/${id}`, { status: newStatus });

            setTasks(prev =>
                prev.map(task =>
                    task._id === id ? { ...task, status: newStatus } : task
                )
            );

            setError("");
            setSuccess("Status updated");
            setTimeout(() => setSuccess(""), 2000);

        } catch (err) {
            setError("Status update failed");
        } finally {
            setUpdatingId(null);
        }
    };

    return (
        <div className="container">
            <h1 className="title">All Tasks</h1>

            <button className="add-btn" onClick={() => navigate("/tasks/add")}>
                +
            </button>

            {loading && <p className="info">Loading...</p>}
            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}

            {!loading && tasks.length === 0 && (
                <p className="info">No tasks found</p>
            )}

            <div className="task-grid">
                {tasks.map((task) => (
                    <div key={task._id} className="task-card">
                        <h3>{task.title}</h3>

                        <p className={`priority ${task.priority}`}>
                            {task.priority}
                        </p>

                        <select
                            value={task.status}
                            onChange={(e) =>
                                handleStatusChange(task._id, e.target.value)
                            }
                            disabled={updatingId === task._id}
                            className="dropdown"
                        >
                            <option value="pending">Pending</option>
                            <option value="in-progress">In Progress</option>
                            <option value="completed">Completed</option>
                        </select>

                        <div className="btn-group">
                            <button
                                className="next-btn"
                                onClick={() =>
                                    handleStatusChange(
                                        task._id,
                                        getNextStatus(task.status)
                                    )
                                }
                                disabled={updatingId === task._id}
                            >
                                Next
                            </button>

                            <button
                                className="delete-btn"
                                onClick={() => handleDelete(task._id)}
                                disabled={updatingId === task._id}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;