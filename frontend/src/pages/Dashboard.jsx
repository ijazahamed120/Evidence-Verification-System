import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

import {
    FaFolderOpen,
    FaCheckCircle,
    FaExclamationTriangle,
    FaUpload,
} from "react-icons/fa";

import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
} from "chart.js";

import { Doughnut, Bar } from "react-chartjs-2";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    Title
);

function Dashboard() {
    const [recentEvidence, setRecentEvidence] = useState([]);
    const [stats, setStats] = useState({

        totalEvidence: 0,
        verified: 0,
        tampered: 0,
        todayUploads: 0,
    });

    useEffect(() => {
        const fetchRecentEvidence = async () => {

            try {

                const response = await axios.get(
                    "https://evidence-verification-system.onrender.com/api/evidence/recent"
                );

                setRecentEvidence(response.data);

            } catch (err) {

                console.log(err);

            }

        };
        fetchDashboard();

        fetchRecentEvidence();
    }, []);

    const fetchDashboard = async () => {
        try {
            const response = await axios.get(
                "https://evidence-verification-system.onrender.com/api/evidence/dashboard"
            );

            setStats(response.data);

        } catch (err) {
            console.log(err);
        }
    };

    const doughnutData = {
        labels: ["Verified", "Tampered"],
        datasets: [
            {
                data: [
                    Number(stats.verified),
                    Number(stats.tampered),
                ],
                backgroundColor: [
                    "#22c55e",
                    "#ef4444",
                ],
                borderWidth: 2,
            },
        ],
    };

    const doughnutOptions = {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "70%",
        plugins: {
            legend: {
                position: "top",
            },
        },
    };

    const barData = {
        labels: ["Today's Uploads"],
        datasets: [
            {
                label: "Uploads",
                data: [Number(stats.todayUploads)],
                backgroundColor: "#3b82f6",
                borderRadius: 8,
            },
        ],
    };

    const barOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "top",
            },
        },
    };

    return (
        <div className="dashboard-layout">

            <Sidebar />

            <div className="main-content">

                <h1 style={{ marginBottom: "25px" }}>
                    Dashboard
                </h1>

                {/* Statistics Cards */}

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
                        gap: "20px",
                        marginBottom: "30px",
                    }}
                >

                    <div
                        className="card"
                        style={{
                            background: "linear-gradient(135deg,#2563eb,#1d4ed8)",
                            color: "white",
                        }}
                    >
                        <FaFolderOpen size={35} />
                        <h3 style={{ marginTop: "15px" }}>Total Evidence</h3>
                        <h1>{stats.totalEvidence}</h1>
                    </div>

                    <div
                        className="card"
                        style={{
                            background: "linear-gradient(135deg,#22c55e,#15803d)",
                            color: "white",
                        }}
                    >
                        <FaCheckCircle size={35} />
                        <h3 style={{ marginTop: "15px" }}>Verified</h3>
                        <h1>{stats.verified}</h1>
                    </div>

                    <div
                        className="card"
                        style={{
                            background: "linear-gradient(135deg,#ef4444,#b91c1c)",
                            color: "white",
                        }}
                    >
                        <FaExclamationTriangle size={35} />
                        <h3 style={{ marginTop: "15px" }}>Tampered</h3>
                        <h1>{stats.tampered}</h1>
                    </div>

                    <div
                        className="card"
                        style={{
                            background: "linear-gradient(135deg,#f59e0b,#d97706)",
                            color: "white",
                        }}
                    >
                        <FaUpload size={35} />
                        <h3 style={{ marginTop: "15px" }}>Today's Uploads</h3>
                        <h1>{stats.todayUploads}</h1>
                    </div>

                </div>

                {/* Charts */}

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit,minmax(450px,1fr))",
                        gap: "25px",
                    }}
                >

                    {/* Doughnut Chart */}

                    <div
                        className="card"
                        style={{
                            minHeight: "420px",
                        }}
                    >

                        <h2
                            style={{
                                textAlign: "center",
                                marginBottom: "20px",
                            }}
                        >
                            Verification Status
                        </h2>

                        <div
                            style={{
                                width: "280px",
                                height: "280px",
                                margin: "20px auto",
                            }}
                        >
                            <Doughnut
                                data={doughnutData}
                                options={doughnutOptions}
                            />
                        </div>

                    </div>

                    {/* Bar Chart */}

                    <div className="card">

                        <h2
                            style={{
                                textAlign: "center",
                                marginBottom: "20px",
                            }}
                        >
                            Today's Uploads
                        </h2>

                        <div
                            style={{
                                height: "300px",
                            }}
                        >
                            <Bar
                                data={barData}
                                options={barOptions}
                            />
                        </div>

                    </div>

                </div>

                {/* Recent Uploads */}

                <div className="card" style={{ marginTop: "30px" }}>

                    <h2 style={{ marginBottom: "20px" }}>
                        Recent Uploads
                    </h2>

                    <table
                        style={{
                            width: "100%",
                            borderCollapse: "collapse",
                        }}
                    >

                        <thead>

                            <tr
                                style={{
                                    background: "#2563eb",
                                    color: "white",
                                }}
                            >
                                <th style={{ padding: "12px" }}>ID</th>
                                <th>Title</th>
                                <th>Type</th>
                                <th>Status</th>
                                <th>Uploaded</th>
                            </tr>

                        </thead>

                        <tbody>

                            {recentEvidence.map((item) => (

                                <tr key={item.id}>

                                    <td style={{ padding: "12px" }}>{item.id}</td>

                                    <td>{item.title}</td>

                                    <td>{item.evidenceType}</td>

                                    <td>

                                        {item.status === "Verified" ? (

                                            <span
                                                style={{
                                                    color: "green",
                                                    fontWeight: "bold",
                                                }}
                                            >
                                                ✅ Verified
                                            </span>

                                        ) : (

                                            <span
                                                style={{
                                                    color: "red",
                                                    fontWeight: "bold",
                                                }}
                                            >
                                                ❌ Tampered
                                            </span>

                                        )}

                                    </td>

                                    <td>
                                        {new Date(item.uploadDate).toLocaleString()}
                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            </div>

        </div>

    );
}

export default Dashboard;