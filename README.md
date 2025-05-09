# Task Tracker Application

This is a full-stack task tracking application where users can manage multiple projects and track tasks within each project. It supports authentication, CRUD operations on tasks, and project limitations per user.

---

## 📤 Live
## 🔗:  https://project-task-tracker.netlify.app/


## 🧰 Tech Stack

- **Frontend**: ReactJS, Axios, React Router
- **Backend**: Node.js, ExpressJS, JWT, bcryptjs
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)

---

## ✨ Features

- User Signup, Login & Logout
- JWT-based authentication
- Create up to 4 projects per user
- Add, update, delete, and view tasks in each project
- Track task status (Pending, In Progress, Completed)
- Automatic timestamps for task creation and completion

---

## 📁 Project Structure

Task-Tracker/
├── backend/ # Express server, API routes, models
└── frontend/ # React, Components

---------------------------------------------------------------------

## ⚙️ Getting Started
-----------------------

### 📦 Backend Setup

1. Navigate to the backend directory & install dependancies:

    cd backend
    npm install

2. Create a `.env` file using `.env.example` as a reference:
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_secret_key

2. Run the server:

    npm run dev

---

### 💻 Frontend Setup

1. Navigate to the backend directory & install dependancies:

    cd backend
    npm install

2. Run the server:

    npm run dev

---------------------------------------------------------------------------------

## 🧪 API Endpoints

Auth
 -POST /login
 -POST /signup
 -POST /logout

Projects
 -GET /projectlist
 -POST /add/project
 -Delete /delete/project

Tasks
 -POST /task/list
 -POST /create/task
 -PUT /update/task
 -DELETE /delete/task

-------------------------------------------------------------------------------

📌 Notes
Each user can create up to 4 projects.
Tasks include creation and completion dates.
Proper data validation and error handling are implemented.

👨‍💻 Author
Name: Purushottam Tulse

GitHub: https://github.com/purushhottam113



