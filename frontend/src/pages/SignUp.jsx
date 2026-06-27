import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function SignUp() {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async (e) => {

        e.preventDefault();

        try {

            const response = await axios.post(
                "https://evidence-verification-system.onrender.com/api/auth/register",
                {
                    name,
                    email,
                    password,
                }
            );

            alert(response.data.message);

            navigate("/");

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

            <form className="auth-card" onSubmit={handleRegister}>

                <h1>📝 Create Account</h1>

                <input
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />

                <input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Create Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    pattern="^(?=.*[A-Z])(?=.*\d).{8,}$"
                    title="Password must contain at least 8 characters, one uppercase letter and one number."
                />

                <button type="submit">
                    Register
                </button>

                <p>
                    Already have an account?{" "}
                    <Link to="/">
                        Login
                    </Link>
                </p>

            </form>

        </div>
    );
}

export default SignUp;