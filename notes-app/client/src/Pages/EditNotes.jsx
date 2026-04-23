import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from "axios";

const EditNotes = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const API = "http://localhost:5000/notes";

    useEffect(() => {
        axios.get(`${API}/${id}`)
            .then((res) => {
                setTitle(res.data.title)
                setContent(res.data.content)
            })
            .catch((err) => console.log(err));
    }, [id])

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`${API}/${id}`, { title, content })
            navigate("/notes");
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="edit-container">

            <div className="edit-card">
                <h1>Edit Note</h1>

                <form onSubmit={handleUpdate}>
                    <input
                        className="edit-input"
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <textarea
                        className="edit-textarea"
                        placeholder="Content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />

                    <div className="edit-actions">
                        <button type="button" className="cancel-btn"
                            onClick={() => navigate("/notes")}
                        >
                            Cancel
                        </button>

                        <button type="submit" className="update-btn">
                            Update
                        </button>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default EditNotes;