import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from "axios";

const GetContact = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [Name, setName] = useState("");
    const [Email, setEmail] = useState("");
    const [Phone, setPhone] = useState("");

    const API = "http://localhost:8080/contact";

    useEffect(() => {
        axios.get(`${API}/${id}`)
            .then((res) => {
                setName(res.data.Name)
                setEmail(res.data.Email)
                setPhone(res.data.Phone)
            })
            .catch((err) => console.log(err));
    }, [id])

    return (
        <div className="details-container">

            <div className="contact-details-card">

                {/* Avatar */}
                <div className="avatar">
                    {Name.charAt(0).toUpperCase()}
                </div>

                {/* Name */}
                <h1 className="details-name">{Name}</h1>

                {/* Info */}
                <div className="details-info">
                    <p><span>Email:</span> {Email}</p>
                    <p><span>Phone:</span> {Phone}</p>
                </div>

                {/* Button */}
                <button
                    className="back-btn"
                    onClick={() => navigate("/contact")}
                >
                    ⬅ Back
                </button>

            </div>

        </div>
    )
}

export default GetContact