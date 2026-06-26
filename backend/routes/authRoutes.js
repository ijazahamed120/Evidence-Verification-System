const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../config/db");

const router = express.Router();

// ===============================
// Register User
// ===============================
router.post("/register", async (req, res) => {

    try {

        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        // Check if email already exists
        db.query(
            "SELECT * FROM users WHERE email = ?",
            [email],
            async (err, result) => {

                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: err.sqlMessage
                    });
                }

                if (result.length > 0) {
                    return res.status(400).json({
                        success: false,
                        message: "Email already exists"
                    });
                }

                // Hash Password
                const hashedPassword = await bcrypt.hash(password, 10);
                const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

                if (!passwordRegex.test(password)) {

                    return res.status(400).json({
                        success: false,
                        message:
                            "Password must contain at least 8 characters, one uppercase letter and one number."
                    });

                }

                db.query(
                    "INSERT INTO users(name,email,password) VALUES(?,?,?)",
                    [name, email, hashedPassword],
                    (err) => {

                        if (err) {
                            return res.status(500).json({
                                success: false,
                                message: err.sqlMessage
                            });
                        }

                        res.json({
                            success: true,
                            message: "Registration Successful"
                        });

                    }
                );

            }
        );

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

});


// ===============================
// Login User
// ===============================
router.post("/login", (req, res) => {

    const { email, password } = req.body;

    db.query(
        "SELECT * FROM users WHERE email=?",
        [email],
        async (err, result) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.sqlMessage
                });
            }

            if (result.length === 0) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid Email"
                });
            }

            const user = result[0];

            const match = await bcrypt.compare(
                password,
                user.password
            );

            if (!match) {

                return res.status(400).json({
                    success: false,
                    message: "Invalid Password"
                });

            }

            res.json({
                success: true,
                message: "Login Successful",
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email
                }
            });

        }
    );

});

module.exports = router;