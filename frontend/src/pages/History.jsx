import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

function History() {

    const [history, setHistory] = useState([]);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [typeFilter, setTypeFilter] = useState("All");

    const navigate = useNavigate();

    useEffect(() => {
        fetchHistory();
    }, []);

    const fetchHistory = async () => {
        try {
            const response = await axios.get(
                "https://evidence-verification-system.onrender.com/api/evidence/history"
            );

            setHistory(response.data);

        } catch (error) {
            console.log(error);
        }
    };

    const filteredHistory = history.filter((item) => {

        const matchesSearch =
            item.title.toLowerCase().includes(search.toLowerCase());

        const matchesStatus =
            statusFilter === "All" ||
            item.status === statusFilter;

        const matchesType =
            typeFilter === "All" ||
            item.evidenceType === typeFilter;

        return matchesSearch && matchesStatus && matchesType;

    });

    return (
        <div className="dashboard-layout">

            <Sidebar />

            <div className="main-content">

                <h1>Evidence History</h1>

                {/* Filters */}

                <div
                    style={{
                        display: "flex",
                        gap: "15px",
                        margin: "20px 0",
                        flexWrap: "wrap",
                    }}
                >

                    <input
                        type="text"
                        placeholder="Search by title..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        style={{
                            padding: "10px",
                            width: "250px",
                        }}
                    />

                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        style={{ padding: "10px" }}
                    >
                        <option>All</option>
                        <option>Verified</option>
                        <option>Tampered</option>
                    </select>

                    <select
                        value={typeFilter}
                        onChange={(e) => setTypeFilter(e.target.value)}
                        style={{ padding: "10px" }}
                    >
                        <option>All</option>
                        <option>Image</option>
                        <option>Video</option>
                        <option>Audio</option>
                        <option>Document</option>
                    </select>

                </div>

                {/* Table */}

                <table
                    border="1"
                    cellPadding="10"
                    style={{
                        width: "100%",
                        background: "white",
                        borderCollapse: "collapse",
                    }}
                >

                    <thead>

                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Type</th>
                            <th>File Name</th>
                            <th>Status</th>
                            <th>Uploaded</th>
                            <th>Action</th>
                        </tr>

                    </thead>

                    <tbody>

                        {filteredHistory.length === 0 ? (

                            <tr>
                                <td
                                    colSpan="7"
                                    style={{
                                        textAlign: "center",
                                        padding: "20px",
                                    }}
                                >
                                    No records found
                                </td>
                            </tr>

                        ) : (

                            filteredHistory.map((item) => (

                                <tr key={item.id}>

                                    <td>{item.id}</td>

                                    <td>{item.title}</td>

                                    <td>{item.evidenceType}</td>

                                    <td>

                                        <img
                                            src={`https://evidence-verification-system.onrender.com/uploads/${item.fileName}`}
                                            alt="Evidence"
                                            width="70"
                                            height="70"
                                            style={{
                                                objectFit: "cover",
                                                borderRadius: "8px",
                                                cursor: "pointer"
                                            }}
                                            onClick={() =>
                                                window.open(
                                                    `https://evidence-verification-system.onrender.com/uploads/${item.fileName}`,
                                                    "_blank"
                                                )
                                            }
                                        />

                                        <br />

                                        <small>{item.fileName}</small>

                                    </td>

                                    <td>

                                        {item.status === "Verified" ? (
                                            <span style={{ color: "green", fontWeight: "bold" }}>
                                                ✅ Verified
                                            </span>
                                        ) : (
                                            <span style={{ color: "red", fontWeight: "bold" }}>
                                                ❌ Tampered
                                            </span>
                                        )}

                                    </td>

                                    <td>
                                        {new Date(item.uploadDate).toLocaleString()}
                                    </td>

                                    <td>
                                        <div
                                            style={{
                                                display: "flex",
                                                gap: "10px",
                                                justifyContent: "center",
                                                alignItems: "center",
                                            }}
                                        >
                                            <button
                                                onClick={() =>
                                                    navigate(`/verify/${item.id}`)
                                                }
                                            >
                                                Verify
                                            </button>

                                            <button
                                                onClick={() =>
                                                    window.open(
                                                        `https://evidence-verification-system.onrender.com/api/auth/${item.id}`,
                                                        "_blank"
                                                    )
                                                }
                                            >
                                                📄 Report
                                            </button>
                                        </div>
                                    </td>
                                </tr>

                            ))

                        )}

                    </tbody>

                </table>

            </div>

        </div>
    );
}

export default History;