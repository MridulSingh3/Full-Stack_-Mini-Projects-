import { useState, useEffect } from "react";
import axios from "axios";
import pencil from "../assets/pencil.png";
import deleteIcon from "../assets/delete.png";
import { useNavigate } from "react-router-dom";

const Contact = () => {
    const navigate = useNavigate();
    const [contacts, setContacts] = useState([]);

    const API = "http://localhost:8080/contact";

    const fetchContact = async () => {
        try {
            const res = await axios.get(API);
            setContacts(res.data);
        } catch (err) {
            console.log("Error Occurred");
        }
    };

    useEffect(() => {
        fetchContact();
    }, []);

    const handleDelete = async (id) => {
        await axios.delete(`${API}/${id}`);
        fetchContact();
    };

    return (
        <div className="container">

            {/* Header */}
            <header className="header">
                <h1 className="title">My Contacts</h1>
                <button
                    className="add-btn"
                    onClick={() => navigate("/contact/add")}
                >
                    +
                </button>
            </header>

            {/* Contact List */}
            <section className="contact-grid">
                {contacts.map((contact) => (
                    <article
                        key={contact._id}
                        className="contact-card"
                        onClick={() => navigate(`/contact/${contact._id}`)}
                    >
                        {/* Contact Info */}
                        <div className="contact-info">
                            <h2 className="contact-name">{contact.Name}</h2>
                            <p className="contact-email">{contact.Email}</p>
                            <p className="contact-phone">{contact.Phone}</p>
                        </div>

                        {/* Actions */}
                        <div className="contact-actions">
                            <button
                                className="edit-btn"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    navigate(`/contact/${contact._id}/edit`);
                                }}
                            >
                                <img src={pencil} alt="edit" width="20" />
                            </button>

                            <button
                                className="delete-btn"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleDelete(contact._id);
                                }}
                            >
                                <img src={deleteIcon} alt="delete" width="20" />
                            </button>
                        </div>

                    </article>
                ))}
            </section>

        </div>
    );
};

export default Contact;