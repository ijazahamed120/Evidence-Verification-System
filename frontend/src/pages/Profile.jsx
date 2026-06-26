import Sidebar from "../components/Sidebar";

function Profile() {

    const user = JSON.parse(localStorage.getItem("user"));

    return (
        <div className="dashboard-layout">

            <Sidebar />

            <div className="main-content">

                <h1 style={{ marginBottom: "25px" }}>
                    My Profile
                </h1>

                <div
                    className="card"
                    style={{
                        maxWidth: "700px",
                        padding: "35px",
                    }}
                >

                    <h2 style={{ marginBottom: "25px" }}>
                        👤 User Information
                    </h2>

                    <p style={{ marginBottom: "15px", fontSize: "18px" }}>
                        <strong>User ID :</strong> {user?.id}
                    </p>

                    <p style={{ marginBottom: "15px", fontSize: "18px" }}>
                        <strong>Name :</strong> {user?.name}
                    </p>

                    <p style={{ marginBottom: "15px", fontSize: "18px" }}>
                        <strong>Email :</strong> {user?.email}
                    </p>

                    <p style={{ marginBottom: "15px", fontSize: "18px" }}>
                        <strong>Role :</strong> Investigator
                    </p>

                    <p style={{ marginBottom: "15px", fontSize: "18px" }}>
                        <strong>Status :</strong>

                        <span
                            style={{
                                color: "green",
                                fontWeight: "bold",
                            }}
                        >
                            {" "}🟢 Active
                        </span>

                    </p>

                </div>

            </div>

        </div>
    );
}

export default Profile;