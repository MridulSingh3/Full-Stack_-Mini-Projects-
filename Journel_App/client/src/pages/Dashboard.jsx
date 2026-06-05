import { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";

function Dashboard() {
    const navigate = useNavigate();

    const [journels, setJournels] = useState([]);
    const [search, setSearch] = useState("");

    const { logout } = useContext(AuthContext);

    const fetchJournels = async () => {
        const res = await API.get("/");
        setJournels(res.data);
    };

    useEffect(() => {
        fetchJournels();
    }, []);

    const deleteJournel = async (id) => {
        await API.delete(`/${id}`);
        fetchJournels();
    };

    const handleUpdate = (id) => {
        navigate(`/update/${id}`);
    };

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const filteredJournels = journels.filter((journal) =>
        journal.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="dashboard">

            <nav className="navbar">
                <h1>📖 My Journal</h1>

                <div className="nav-buttons">
                    <Link className="add-btn" to="/add">
                        + New Journal
                    </Link>

                    <button
                        className="logout-btn"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </div>
            </nav>

            <div className="hero">
                <h2>Welcome Back 👋</h2>
                <p>
                    Capture your thoughts, ideas, and memories
                    in one beautiful place.
                </p>
            </div>

            <div className="stats">
                <div className="stat-card">
                    <h3>{journels.length}</h3>
                    <p>Total Journals</p>
                </div>

                <div className="stat-card">
                    <h3>
                        {
                            journels.reduce(
                                (acc, curr) =>
                                    acc +
                                    curr.content.split(" ").length,
                                0
                            )
                        }
                    </h3>
                    <p>Words Written</p>
                </div>

                <div className="stat-card">
                    <h3>∞</h3>
                    <p>Ideas Stored</p>
                </div>
            </div>

            <div className="search-box">
                <input
                    type="text"
                    placeholder="🔍 Search journals..."
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                />
            </div>

            <div className="journals-grid">
                {filteredJournels.map((journal) => (
                    <div
                        key={journal._id}
                        className="journal-card"
                    >
                        <h3>{journal.title}</h3>

                        <p>
                            {journal.content.length > 120
                                ? journal.content.slice(
                                    0,
                                    120
                                ) + "..."
                                : journal.content}
                        </p>

                        <div className="card-buttons">
                            <button
                                className="edit-btn"
                                onClick={() =>
                                    handleUpdate(journal._id)
                                }
                            >
                                Edit
                            </button>

                            <button
                                className="delete-btn"
                                onClick={() =>
                                    deleteJournel(
                                        journal._id
                                    )
                                }
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}

export default Dashboard;