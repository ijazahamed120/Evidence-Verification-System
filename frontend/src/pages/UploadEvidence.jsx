import { useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

function UploadEvidence() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [evidenceType, setEvidenceType] = useState("");
    const [file, setFile] = useState(null);
    const [hash, setHash] = useState("");

    const handleUpload = async () => {
        if (!title || !description || !evidenceType || !file) {
            alert("Please fill all fields");
            return;
        }

        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("evidenceType", evidenceType);
        formData.append("evidence", file);

        try {
            const response = await axios.post(
                "https://evidence-verification-system.onrender.com/api/auth/upload",
                formData
            );

            console.log("Upload Response:", response.data);

            setHash(response.data.hash);

            alert("Evidence Uploaded Successfully");

            // Clear form
            setTitle("");
            setDescription("");
            setEvidenceType("");
            setFile(null);
        } catch (error) {
            console.error(error);
            alert("Upload Failed");
        }
    };

    return (
        <div className="dashboard-layout">
            <Sidebar />

            <div className="main-content">
                <h1>Upload Evidence</h1>

                <div className="card">
                    <input
                        type="text"
                        placeholder="Evidence Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        style={{
                            width: "100%",
                            padding: "12px",
                            marginBottom: "15px",
                        }}
                    />

                    <textarea
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        style={{
                            width: "100%",
                            padding: "12px",
                            height: "120px",
                            marginBottom: "15px",
                        }}
                    />

                    <select
                        value={evidenceType}
                        onChange={(e) => setEvidenceType(e.target.value)}
                        style={{
                            width: "100%",
                            padding: "12px",
                            marginBottom: "15px",
                        }}
                    >
                        <option value="">Select Evidence Type</option>
                        <option value="Image">Image</option>
                        <option value="Video">Video</option>
                        <option value="Audio">Audio</option>
                        <option value="Document">Document</option>
                    </select>

                    <input
                        type="file"
                        onChange={(e) => setFile(e.target.files[0])}
                    />

                    <br />
                    <br />

                    <button onClick={handleUpload}>
                        Upload Evidence
                    </button>

                    {hash && (
                        <div style={{ marginTop: "20px" }}>
                            <h3>SHA-256 Hash</h3>

                            <p
                                style={{
                                    wordBreak: "break-all",
                                    background: "#f1f5f9",
                                    padding: "10px",
                                }}
                            >
                                {hash}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default UploadEvidence;