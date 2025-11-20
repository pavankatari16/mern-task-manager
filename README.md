# MERN Task Manager

A task management system built using the MERN stack (MongoDB, Express.js, React, Node.js).  
The system includes authentication, authorization, and role-based task management for users and admins.

---

## 🚀 Features

### ✅ Authentication
- User registration & login
- Password hashing using bcrypt
- JWT-based authentication
- Role support: `user`, `admin`

### ✅ Task Management
- Create, edit, delete tasks
- Task fields:
  - title
  - description
  - status (`pending`, `in-progress`, `completed`)
  - createdBy
  - createdAt
- Users can view/manage **only their tasks**
- Admins can view/delete **all tasks**

### ✅ Frontend (React + Vite + TS)
- Register, Login pages
- Dashboard for users & admins
- Create/Edit task pages
- Protected routes
- JWT in localStorage
- Axios for API calls
- Tailwind CSS UI

### ✅ Backend (Node + Express)
- Auth routes (register/login)
- Task routes with role-based permissions
- Mongoose models
- JOI validation (bonus)
- Middleware-based protection

---

## 📁 Project Structure
backend/
frontend/
README.md


---

## 🛠️ Setup Instructions

### 1️⃣ Backend Setup

cd backend
npm install
npm run dev


### 2️⃣ Frontend Setup

cd frontend
npm install
npm run dev


---

## 🔐 Environment Variables

Create a `.env` file in `backend/`:



MONGO_URI=your_mongo_url
JWT_SECRET=your_secret_key
PORT=5000


---

## 📡 API Endpoints

### Auth Routes


POST /api/register
POST /api/login


### Task Routes


POST /api/tasks
GET /api/tasks
GET /api/tasks/:id
PUT /api/tasks/:id
DELETE /api/tasks/:id


---

## 📝 Notes
- Admins have full access to all tasks.
- Users can only access tasks they created.
- JWT must be included in headers for protected routes.

---

## 📦 Requirements
- Node.js
- MongoDB
- npm

---

## 📜 License
This project is for educational and assignment purposes.
