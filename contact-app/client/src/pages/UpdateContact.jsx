import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from "axios";

const UpdateContact = () => {

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

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (!Name.trim() || !Phone.trim()) {
            return alert("Fill required fields");
        }
        try {
            await axios.put(`${API}/${id}`, { Name, Email, Phone })
            navigate("/contact");
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="form-container">

            <div className="form-card">
                <h1 className="form-title">Edit Contact</h1>

                <form className="contact-form" onSubmit={handleUpdate}>

                    <input
                        className="form-input"
                        type="text"
                        placeholder="Enter Name..."
                        value={Name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <input
                        className="form-input"
                        type="text"
                        placeholder="Enter Email..."
                        value={Email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        className="form-input"
                        type="text"
                        placeholder="Enter Phone..."
                        value={Phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />

                    <div className="form-actions">

                        <button
                            className="btn cancel-btn"
                            type="button"
                            onClick={() => navigate("/contact")}
                        >
                            Cancel
                        </button>

                        <button className="btn update-btn" type="submit">
                            Update
                        </button>

                    </div>

                </form>
            </div>

        </div>
    )
}

export default UpdateContact