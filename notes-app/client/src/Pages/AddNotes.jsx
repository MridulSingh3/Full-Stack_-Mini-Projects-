import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const AddNotes = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const API = "http://localhost:5000/notes";
    const navigate = useNavigate();

    const handleCreate = async (e) => {
        e.preventDefault();

        if (!title.trim()) {
            return alert("Title required");
        }

        try {
            await axios.post(API, { title, content });
            navigate("/notes");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="add-container">

            <div className="add-card">
                <h1>Add Note</h1>

                <form onSubmit={handleCreate}>

                    <input
                        className="add-input"
                        type="text"
                        placeholder="Enter title..."
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <textarea
                        className="add-textarea"
                        placeholder="Write your note..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />

                    <div className="add-actions">
                        <button
                            type="button"
                            className="cancel-btn"
                            onClick={() => navigate("/notes")}
                        >
                            Cancel
                        </button>

                        <button type="submit" className="create-btn">
                            Create
                        </button>
                    </div>

                </form>
            </div>

        </div>
    )
}

export default AddNotes;