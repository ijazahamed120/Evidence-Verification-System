import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Sidebar from "../components/Sidebar";

function VerifyEvidence() {
    const { id } = useParams();

    const [file, setFile] = useState(null);
    const [result, setResult] = useState(null);

    const handleVerify = async () => {
        if (!file) {
            alert("Please select a file");
            return;
        }

        const formData = new FormData();
        formData.append("evidence", file);

        try {
            const response = await axios.post(
                `https://evidence-verification-system.onrender.com/api/auth/${id}`,
                formData
            );

            console.log("Response:", response.data);

            setResult(response.data);

            alert(JSON.stringify(response.data));

        } catch (error) {
            console.log(error);

            if (error.response) {
                console.log(error.response.data);
                alert(error.response.data.message);
            } else {
                alert(error.message);
            }
        }
    };

    return (
        <div className="dashboard-layout">
            <Sidebar />

            <div className="main-content">

                <h1>Verify Evidence</h1>

                <div className="card">

                    <h3>Evidence ID : {id}</h3>

                    <br />

                    <input
                        type="file"
                        onChange={(e) => setFile(e.target.files[0])}
                    />

                    <br /><br />

                    <button onClick={handleVerify}>
                        Verify Evidence
                    </button>

                </div>

                {result && (

                    <div
                        className="card"
                        style={{ marginTop: "20px" }}
                    >

                        <h2>Verification Result</h2>

                        <br />

                        <p>
                            <strong>Status :</strong> {result.status}
                        </p>

                        <br />

                        <p>
                            <strong>Hash Match :</strong> {result.match}
                        </p>

                        <br />

                        <p>
                            <strong>SHA-256 :</strong>
                        </p>

                        <p
                            style={{
                                wordBreak: "break-all"
                            }}
                        >
                            {result.hash}
                        </p>

                    </div>

                )}

            </div>

        </div>
    );
}

export default VerifyEvidence;