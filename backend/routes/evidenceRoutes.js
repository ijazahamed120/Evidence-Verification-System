const express = require("express");
const upload = require("../middleware/upload");
const fs = require("fs");
const crypto = require("crypto");
const db = require("../config/db");
const PDFDocument = require("pdfkit");
const router = express.Router();

// ==========================
// Test Route
// ==========================
router.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Evidence Routes Working",
    });
});

// ==========================
// Upload Evidence
// ==========================
router.post("/upload", upload.single("evidence"), (req, res) => {

    try {

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No file uploaded",
            });
        }

        const { title, description, evidenceType } = req.body;

        if (!title || !description || !evidenceType) {
            return res.status(400).json({
                success: false,
                message: "Please fill all fields",
            });
        }

        const fileBuffer = fs.readFileSync(req.file.path);

        const hash = crypto
            .createHash("sha256")
            .update(fileBuffer)
            .digest("hex");

        const sql = `
            INSERT INTO evidence
            (title, description, evidenceType, fileName, hash, status)
            VALUES (?, ?, ?, ?, ?, ?)
        `;

        db.query(
            sql,
            [
                title,
                description,
                evidenceType,
                req.file.filename,
                hash,
                "Verified",
            ],
            (err, result) => {

                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: err.sqlMessage,
                    });
                }

                return res.json({
                    success: true,
                    message: "Evidence Uploaded Successfully",
                    evidenceId: result.insertId,
                    fileName: req.file.filename,
                    hash: hash,
                });

            }
        );

    } catch (err) {

        return res.status(500).json({
            success: false,
            message: err.message,
        });

    }

});
// ==========================
// Verify Evidence
// ==========================
router.post("/verify/:id", upload.single("evidence"), (req, res) => {

    const id = req.params.id;

    if (!req.file) {
        return res.status(400).json({
            success: false,
            message: "Please upload a file",
        });
    }

    const path = require("path");

    const absolutePath = path.join(__dirname, "../uploads", req.file.filename);

    const fileBuffer = fs.readFileSync(absolutePath);
    const uploadedHash = crypto
        .createHash("sha256")
        .update(fileBuffer)
        .digest("hex");

    db.query(
        "SELECT hash FROM evidence WHERE id=?",
        [id],
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.sqlMessage,
                });
            }

            if (result.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: "Evidence not found",
                });
            }

            const originalHash = result[0].hash;

            if (uploadedHash === originalHash) {

                db.query(
                    "UPDATE evidence SET status=? WHERE id=?",
                    ["Verified", id],
                    () => {

                        return res.json({
                            status: "Verified ✅",
                            match: "Yes",
                            hash: uploadedHash,
                        });

                    }
                );

            } else {

                db.query(
                    "UPDATE evidence SET status=? WHERE id=?",
                    ["Tampered", id],
                    () => {

                        return res.json({
                            status: "Tampered ❌",
                            match: "No",
                            hash: uploadedHash,
                        });

                    }
                );

            }

        }
    );

});
// ==========================
// History
// ==========================
router.get("/history", (req, res) => {

    const sql = `
        SELECT *
        FROM evidence
        ORDER BY id DESC
    `;

    db.query(sql, (err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.sqlMessage,
            });
        }

        return res.json(result);

    });

});
// ==========================
// Dashboard Statistics
// ==========================
router.get("/dashboard", (req, res) => {

    const sql = `
        SELECT
            COUNT(*) AS totalEvidence,
            SUM(status='Verified') AS verified,
            SUM(status='Tampered') AS tampered,
            SUM(DATE(uploadDate)=CURDATE()) AS todayUploads
        FROM evidence
    `;

    db.query(sql, (err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.sqlMessage
            });
        }

        res.json(result[0]);

    });

});
// ==========================
// Download PDF Report
// ==========================
router.get("/report/:id", (req, res) => {

    const id = req.params.id;

    db.query(
        "SELECT * FROM evidence WHERE id=?",
        [id],
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.sqlMessage,
                });
            }

            if (result.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: "Evidence not found",
                });
            }

            const evidence = result[0];

            const doc = new PDFDocument();

            res.setHeader(
                "Content-Disposition",
                `attachment; filename=Evidence_Report_${id}.pdf`
            );

            res.setHeader(
                "Content-Type",
                "application/pdf"
            );

            doc.pipe(res);

            // Title
            doc
                .fontSize(22)
                .text("Evidence Verification Report", {
                    align: "center",
                });

            doc.moveDown();

            doc.fontSize(14);

            doc.text(`Evidence ID : ${evidence.id}`);
            doc.text(`Title : ${evidence.title}`);
            doc.text(`Description : ${evidence.description}`);
            doc.text(`Evidence Type : ${evidence.evidenceType}`);

            doc.moveDown();

            doc.text(`File Name : ${evidence.fileName}`);
            doc.text(`Status : ${evidence.status}`);

            doc.moveDown();

            doc.text("SHA-256 Hash:");

            doc.fontSize(10);

            doc.text(evidence.hash);

            doc.moveDown();

            doc.fontSize(14);

            doc.text(
                `Uploaded On : ${new Date(
                    evidence.uploadDate
                ).toLocaleString()}`
            );

            doc.moveDown(2);

            doc
                .fontSize(12)
                .text(
                    "Generated by Evidence Verification System",
                    {
                        align: "center",
                    }
                );

            doc.end();

        }
    );

});
// ==========================
// Recent Evidence
// ==========================
router.get("/recent", (req, res) => {

    const sql = `
        SELECT
            id,
            title,
            evidenceType,
            status,
            uploadDate
        FROM evidence
        ORDER BY uploadDate DESC
        LIMIT 5
    `;

    db.query(sql, (err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.sqlMessage,
            });
        }

        res.json(result);

    });

});
module.exports = router;
