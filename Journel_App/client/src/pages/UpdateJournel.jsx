import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";

function UpdateJournel() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [journel, setJournel] = useState({
        title: "",
        content: "",
    });

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchJournel = async () => {
            try {
                const { data } = await API.get(`/${id}`);

                setJournel({
                    title: data.title,
                    content: data.content,
                });
            } catch (error) {
                console.log(error);
            }
        };

        fetchJournel();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            await API.put(
                `/${id}`,
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
        <div className="update-container">

            <div className="update-card">

                <div className="update-header">
                    <h1>📝 Edit Journal</h1>

                    <p>
                        Refine your thoughts, update your ideas,
                        and improve your story.
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
                            placeholder="Update your journal..."
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
                            className="update-btn"
                        >
                            {
                                loading
                                    ? "Updating..."
                                    : "Update Journal"
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

export default UpdateJournel;