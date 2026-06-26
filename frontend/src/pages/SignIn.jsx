import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function SignIn() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {

        e.preventDefault();

        try {

            const response = await axios.post(
                "http://localhost:5000/api/auth/login",
                {
                    email,
                    password,
                }
            );

            // Store login session
            localStorage.setItem("isLoggedIn", "true");

            // Store user details
            localStorage.setItem(
                "user",
                JSON.stringify(response.data.user)
            );

            alert(response.data.message);

            navigate("/dashboard");

        } catch (err) {

            if (err.response) {
                alert(err.response.data.message);
            } else {
                alert("Server Error");
            }

        }

    };

    return (
        <div className="container">

            <form className="auth-card" onSubmit={handleLogin}>

                <h1>🔐 Secure Evidence System</h1>

                <input
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button type="submit">
                    Login
                </button>

                <p>
                    Don't have an account?{" "}
                    <Link to="/signup">
                        Sign Up
                    </Link>
                </p>

            </form>

        </div>
    );
}

export default SignIn;