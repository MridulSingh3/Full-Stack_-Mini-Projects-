import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const CreateTask = () => {
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [priority, setPriority] = useState("medium");
    const [error, setError] = useState("");

    const API = "http://localhost:9000/tasks";

    const handleCreate = async (e) => {
        e.preventDefault();

        if (title.trim().length === 0) {
            setError("Title Required");
            return;
        }
        try {
            await axios.post(API, { title, priority });
            setTitle("");
            setPriority("medium")
            navigate("/tasks");
        } catch (err) {
            console.log("error occur");
        }
    }
    return (
        <div className="form-container">
            <div className="form-card">
                <h1>Add New Task</h1>

                <form onSubmit={handleCreate} className="task-form">

                    <div className="form-group">
                        <label>Title</label>
                        <input
                            type="text"
                            placeholder="Enter task title..."
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    {error && <p className="error">{error}</p>}

                    <div className="form-group">
                        <label>Priority</label>
                        <select
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                        >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>

                    <button type="submit" className="submit-btn">
                        Add Task
                    </button>

                    <button
                        type="button"
                        className="back-btn"
                        onClick={() => navigate("/tasks")}
                    >
                        Back
                    </button>
                </form>
            </div>
        </div>
    );
}

export default CreateTask
