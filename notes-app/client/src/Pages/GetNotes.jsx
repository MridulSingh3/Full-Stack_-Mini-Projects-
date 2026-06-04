import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from "axios";

const GetNotes = () => {
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

    return (
        <div className="note-view-container">

            <div className="note-view-card">

                <h1 className="note-view-title">{title}</h1>

                <div className="note-divider"></div>

                <p className="note-view-content">{content}</p>

                <button
                    className="back-btn"
                    onClick={() => navigate("/notes")}
                >
                    ⬅ Back
                </button>

            </div>

        </div>
    )
}

export default GetNotes;