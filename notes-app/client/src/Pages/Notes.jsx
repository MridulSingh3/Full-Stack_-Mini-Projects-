import React, { useState, useEffect } from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import pencil from "../assets/pencil.png"
import deleteIcon from "../assets/delete.png";

const Notes = () => {
    const [notes, setNotes] = useState([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const navigate = useNavigate();

    const API = "http://localhost:5000/notes";

    const fetchApi = async () => {
        const res = await axios.get(API);
        setNotes(res.data);
    }
    useEffect(() => {
        fetchApi();
    }, [])

    const deleteNotes = async (id) => {
        await axios.delete(`${API}/${id}`);
        fetchApi();
    }
    return (
        <>
            <div className="notes-container">

                <div className="notes-header">
                    <h1>Notes</h1>

                    <button
                        className="add-btn"
                        onClick={() => navigate("/notes/add")}
                    >
                        +
                    </button>
                </div>

                <div className="notes-grid">
                    {notes.map((note) => (
                        <div
                            key={note._id}
                            className="note-card"
                            onClick={() => navigate(`/notes/${note._id}`)}
                        >
                            <h3 className="note-title">{note.title}</h3>
                            <p className="note-content">{note.content}</p>

                            <div className="note-actions">
                                <button
                                    className="icon-btn"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        navigate(`/notes/${note._id}/edit`);
                                    }}
                                >
                                    <img src={pencil} alt="edit" width="18" />
                                </button>

                                <button
                                    className="icon-btn delete"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        deleteNotes(note._id);
                                    }}
                                >
                                    <img src={deleteIcon} alt="delete" width="18" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </>
    )
}

export default Notes;
