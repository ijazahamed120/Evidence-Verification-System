import { Link, useLocation, useNavigate } from "react-router-dom";

import {
    FaHome,
    FaUpload,
    FaSearch,
    FaHistory,
    FaUser,
    FaSignOutAlt,
    FaShieldAlt,
} from "react-icons/fa";

function Sidebar() {

    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        localStorage.removeItem("isLoggedIn");
        navigate("/");
    };

    const activeStyle = {
        background: "#2563eb",
        color: "white",
        fontWeight: "bold",
    };

    return (
        <div className="sidebar">

            <h2
                style={{
                    textAlign: "center",
                    marginBottom: "30px",
                }}
            >
                <FaShieldAlt /> EvidenceSys
            </h2>

            <Link
                to="/dashboard"
                style={location.pathname === "/dashboard" ? activeStyle : {}}
            >
                <FaHome /> Dashboard
            </Link>

            <Link
                to="/upload"
                style={location.pathname === "/upload" ? activeStyle : {}}
            >
                <FaUpload /> Upload Evidence
            </Link>

            <Link
                to="/verify"
                style={location.pathname === "/verify" ? activeStyle : {}}
            >
                <FaSearch /> Verify Evidence
            </Link>

            <Link
                to="/history"
                style={location.pathname === "/history" ? activeStyle : {}}
            >
                <FaHistory /> History
            </Link>

            <Link
                to="/profile"
                style={location.pathname === "/profile" ? activeStyle : {}}
            >
                <FaUser /> Profile
            </Link>

            <button onClick={handleLogout}>
                <FaSignOutAlt /> Logout
            </button>

        </div>
    );
}

export default Sidebar;