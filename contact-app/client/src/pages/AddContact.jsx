import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddContact = () => {
    const [Name, setName] = useState("");
    const [Email, setEmail] = useState("");
    const [Phone, setPhone] = useState("");

    const API = "http://localhost:8080/contact";
    const navigate = useNavigate();

    const handleCreate = async (e) => {
        e.preventDefault();

        if (!Name.trim() || !Phone.trim()) {
            return alert("Fill the required fields");
        }

        try {
            await axios.post(API, { Name, Email, Phone });
            navigate("/contact");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="form-container">

            <div className="form-card">
                <h1 className="form-title">Add Contact</h1>

                <form className="contact-form" onSubmit={handleCreate}>

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
                            Create
                        </button>

                    </div>

                </form>
            </div>

        </div>
    );
};

export default AddContact;