# 🔐 Evidence Verification System

A secure web-based **Evidence Verification System** developed using **React, Node.js, Express, and MySQL**. The system allows users to upload digital evidence, generate SHA-256 hash values, verify file integrity, and detect tampering.

---

## 📌 Features

- 🔑 User Registration & Login
- 🔒 Secure Password Hashing using bcrypt
- 📤 Upload Digital Evidence
- 🔍 Verify Evidence using SHA-256 Hash
- ⚠️ Tamper Detection
- 📊 Interactive Dashboard
- 📈 Statistics using Chart.js
- 📜 Evidence History
- 👤 User Profile
- 📄 PDF Report Generation
- 📱 Responsive Design

---

## 🛠️ Tech Stack

### Frontend
- React.js
- React Router
- Axios
- Chart.js
- React Icons

### Backend
- Node.js
- Express.js

### Database
- MySQL

### Security
- SHA-256
- bcrypt

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/ijazahamed120/Evidence-Verification-System.git
```

### Backend

```bash
cd backend
npm install
npm start
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 📁 Project Structure

```
Evidence-Verification-System
│
├── frontend
│   ├── src
│   ├── public
│   └── package.json
│
├── backend
│   ├── config
│   ├── routes
│   ├── uploads
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

## 🔄 System Workflow

1. User creates an account or logs in.
2. User uploads digital evidence.
3. System generates a SHA-256 hash.
4. Hash is stored securely in MySQL.
5. User uploads a file for verification.
6. A new SHA-256 hash is generated.
7. The new hash is compared with the stored hash.
8. The system displays:
   - ✅ Verified
   - ❌ Tampered

---

## 📸 Screenshots

> Add screenshots here after uploading them.

### Login

(Add Screenshot)

### Dashboard

(Add Screenshot)

### Upload Evidence

(Add Screenshot)

### Verify Evidence

(Add Screenshot)

### History

(Add Screenshot)

### Profile

(Add Screenshot)

---

## 🚀 Future Enhancements

- JWT Authentication
- Role-Based Access Control
- Email Verification
- Forgot Password
- Cloud Storage Integration
- Admin Dashboard
- Search & Filter Evidence
- Audit Logs

---

## 👨‍💻 Author

**Ijaz Ahamed**

GitHub: https://github.com/ijazahamed120

---

## 📄 License

This project was developed for educational and academic purposes.
