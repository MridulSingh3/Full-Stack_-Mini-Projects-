import { Link } from "react-router-dom";
import API from "../services/api";
import { useEffect, useState } from "react";

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("All");

    const fetchApi = async () => {
        const res = await API.get("/");
        setTasks(res.data);
    }
    useEffect(() => {
        fetchApi();
    }, []);

    const deleteTask = async (id) => {
        const confirmDelete = window.confirm("Delete this task?")

        if (!confirmDelete) {
            return;
        }
        await API.delete(`/${id}`);
        fetchApi();
    }

    const filteredTasks = tasks.filter((task) => {
        const searchMatch = task.title.toLowerCase().includes(search.toLowerCase());

        const statusMatch = status == "All" ? true : task.status === status;

        return searchMatch && statusMatch;
    })
    return (
        <>
            <div className="dashboard-container">
                <h1 className="dashboard-title">
                    Task Manager
                </h1>

                <Link to="/add">
                    <button className="add-btn">
                        Add Task
                    </button>
                </Link>

                <div className="controls">
                    <input
                        type="text"
                        placeholder="Search task..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option>All</option>
                        <option>Pending</option>
                        <option>In Progress</option>
                        <option>Completed</option>
                    </select>
                </div>

                <div className="task-grid">
                    {filteredTasks.map((task) => (
                        <div className="task-card" key={task._id}>
                            <h3>{task.title}</h3>

                            <p>{task.description}</p>

                            <p className={`status ${task.status === "Pending"
                                    ? "pending"
                                    : task.status === "In Progress"
                                        ? "progress"
                                        : "completed"
                                }`}>
                                {task.status}
                            </p>

                            <p>
                                Priority: {task.priority}
                            </p>

                            <div className="btn-group">
                                <Link to={`/edit/${task._id}`}>
                                    <button className="edit-btn">
                                        Edit
                                    </button>
                                </Link>

                                <button
                                    className="delete-btn"
                                    onClick={() =>
                                        deleteTask(task._id)
                                    }
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Dashboard
