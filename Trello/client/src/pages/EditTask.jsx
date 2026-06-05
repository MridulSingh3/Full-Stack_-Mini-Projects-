import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";

function EditTask() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [task, setTask] = useState({
        title: "",
        description: "",
        status: "",
        priority: "",
    });

    useEffect(() => {
        fetchTask();
    }, []);

    const fetchTask = async () => {
        const res = await API.get(`/${id}`);
        setTask(res.data);
    };

    const handleChange = (e) => {
        setTask({
            ...task,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        await API.put(`/${id}`, task);

        navigate("/");
    };

    return (
        <div className="add-task-container">
            <form
                className="task-form"
                onSubmit={handleSubmit}
            >
                <h1>Edit Task</h1>

                <div className="form-group">
                    <label>Task Title</label>

                    <input
                        type="text"
                        name="title"
                        placeholder="Enter task title"
                        value={task.title}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Description</label>

                    <textarea
                        name="description"
                        placeholder="Enter task description"
                        value={task.description}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Status</label>

                    <select
                        name="status"
                        value={task.status}
                        onChange={handleChange}
                    >
                        <option>Pending</option>
                        <option>In Progress</option>
                        <option>Completed</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Priority</label>

                    <select
                        name="priority"
                        value={task.priority}
                        onChange={handleChange}
                    >
                        <option>Low</option>
                        <option>Medium</option>
                        <option>High</option>
                    </select>
                </div>

                <button
                    type="submit"
                    className="save-btn"
                >
                    Update Task
                </button>
            </form>
        </div>
    );
}

export default EditTask;