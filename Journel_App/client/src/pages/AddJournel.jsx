import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function AddJournel() {
    const navigate = useNavigate();

    const [journel, setJournel] = useState({
        title: "",
        content: "",
    });

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            await API.post(
                "/create",
                journel
            );

            navigate("/journel");
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="add-container">

            <div className="add-card">

                <div className="add-header">
                    <h1>✍️ Create New Journal</h1>

                    <p>
                        Capture your thoughts, ideas,
                        memories, and experiences.
                    </p>
                </div>

                <form onSubmit={handleSubmit}>

                    <div className="input-group">
                        <label>Journal Title</label>

                        <input
                            type="text"
                            placeholder="Enter journal title..."
                            value={journel.title}
                            onChange={(e) =>
                                setJournel({
                                    ...journel,
                                    title: e.target.value,
                                })
                            }
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label>Journal Content</label>

                        <textarea
                            placeholder="Start writing your thoughts here..."
                            value={journel.content}
                            onChange={(e) =>
                                setJournel({
                                    ...journel,
                                    content: e.target.value,
                                })
                            }
                            required
                        />
                    </div>

                    <div className="btn-group">

                        <button
                            type="submit"
                            className="save-btn"
                        >
                            {
                                loading
                                    ? "Saving..."
                                    : "Save Journal"
                            }
                        </button>

                        <button
                            type="button"
                            className="cancel-btn"
                            onClick={() =>
                                navigate("/journel")
                            }
                        >
                            Cancel
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}

export default AddJournel;