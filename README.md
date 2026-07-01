# Task Tracker — MERN Stack Application

A modern, full-stack task management dashboard built with MongoDB, Express, React (Vite), and Node.js. Features a clean, SaaS-style UI with full CRUD, search, filtering, sorting, and dark mode.

![Status](https://img.shields.io/badge/status-active-success)
![Stack](https://img.shields.io/badge/stack-MERN-4F46E5)

---

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Folder Structure](#folder-structure)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Deployment](#deployment)
- [Screenshots](#screenshots)
- [Future Improvements](#future-improvements)

---

## Project Overview

Task Tracker is a production-quality task management application. Users can create, edit, delete, search, filter, and sort tasks through a responsive, animated dashboard interface — all without a page refresh. The backend follows MVC architecture with clean separation of concerns, proper validation, and centralized error handling.

## Features

- ✅ Full CRUD (Create, Read, Update, Delete) for tasks
- 🔍 Real-time search by title (debounced)
- 🎚 Filter tasks by status (Pending / In Progress / Completed)
- ↕️ Sort by Latest, Oldest, Due Date, or Priority
- 🎨 Priority and status badges with color coding
- 🌗 Dark mode with system preference detection
- 🔔 Toast notifications for all actions (React Hot Toast)
- 🗑 Delete confirmation modal to prevent accidental deletions
- 🧭 Empty state illustration when no tasks exist
- ⏳ Loading spinner during data fetches
- 📱 Fully responsive, mobile-first layout
- 🧱 Reusable component architecture with custom hooks
- 🛡 Client- and server-side validation with inline error messages

## Tech Stack

**Frontend**
- React 18 (Vite)
- Tailwind CSS
- Axios
- React Hot Toast

**Backend**
- Node.js + Express.js
- MongoDB Atlas + Mongoose
- dotenv, cors

## Folder Structure

```
task-tracker/
├── server/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── taskController.js
│   ├── models/
│   │   └── Task.js
│   ├── routes/
│   │   └── taskRoutes.js
│   ├── middleware/
│   │   ├── errorHandler.js
│   │   └── notFound.js
│   ├── utils/
│   │   ├── asyncHandler.js
│   │   ├── ApiError.js
│   │   └── validateTask.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── TaskCard.jsx
│   │   │   ├── TaskFormModal.jsx
│   │   │   ├── SearchBar.jsx
│   │   │   ├── FilterDropdown.jsx
│   │   │   ├── SortDropdown.jsx
│   │   │   ├── DeleteConfirmModal.jsx
│   │   │   ├── EmptyState.jsx
│   │   │   └── Loader.jsx
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   └── NotFound.jsx
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   └── taskService.js
│   │   ├── hooks/
│   │   │   ├── useTasks.js
│   │   │   └── useDarkMode.js
│   │   ├── utils/
│   │   │   ├── constants.js
│   │   │   └── helpers.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── vite.config.js
│   ├── package.json
│   └── .env.example
│
└── README.md
```

## Installation

### Prerequisites
- Node.js 18+
- A MongoDB Atlas account (or local MongoDB instance)

### 1. Clone and install

```bash
# Backend
cd server
npm install

# Frontend
cd ../client
npm install
```

### 2. Configure environment variables

Copy the example env files and fill in your values (see [Environment Variables](#environment-variables) below).

```bash
cd server && cp .env.example .env
cd ../client && cp .env.example .env
```

### 3. Run the app

```bash
# Terminal 1 — start the backend (http://localhost:5000)
cd server
npm run dev

# Terminal 2 — start the frontend (http://localhost:5173)
cd client
npm run dev
```

Visit `http://localhost:5173` in your browser.

## Environment Variables

**server/.env**

| Variable      | Description                                  | Example                                              |
|---------------|-----------------------------------------------|-------------------------------------------------------|
| `PORT`        | Port the API server runs on                   | `5000`                                                |
| `NODE_ENV`    | Environment mode                              | `development`                                         |
| `MONGO_URI`   | MongoDB Atlas connection string               | `mongodb+srv://user:pass@cluster.mongodb.net/task-tracker` |
| `CLIENT_URL`  | Allowed CORS origin (your frontend URL)       | `http://localhost:5173`                                |

**client/.env**

| Variable              | Description               | Example                          |
|-----------------------|----------------------------|-----------------------------------|
| `VITE_API_BASE_URL`   | Base URL of the backend API | `http://localhost:5000/api`      |

## API Endpoints

Base URL: `/api/tasks`

| Method | Endpoint          | Description                                             |
|--------|-------------------|-----------------------------------------------------------|
| GET    | `/api/tasks`      | Get all tasks. Supports `?search=`, `?status=`, `?sortBy=` |
| POST   | `/api/tasks`      | Create a new task                                        |
| PUT    | `/api/tasks/:id`  | Update an existing task                                  |
| DELETE | `/api/tasks/:id`  | Delete a task                                             |

**Task object shape**

```json
{
  "_id": "665f1c2e8a1b2c3d4e5f6789",
  "title": "Design landing page",
  "description": "Create wireframes and high-fidelity mockups",
  "status": "In Progress",
  "priority": "High",
  "dueDate": "2026-07-10T00:00:00.000Z",
  "createdAt": "2026-07-01T09:00:00.000Z",
  "updatedAt": "2026-07-01T09:00:00.000Z"
}
```

## Deployment

**Frontend → Vercel**
1. Push the `client/` folder to a Git repository.
2. Import the project into Vercel, set the root directory to `client`.
3. Add the environment variable `VITE_API_BASE_URL` pointing to your deployed backend.
4. Deploy.

**Backend → Render**
1. Push the `server/` folder to a Git repository.
2. Create a new Web Service on Render, set the root directory to `server`.
3. Build command: `npm install` — Start command: `npm start`.
4. Add environment variables (`MONGO_URI`, `CLIENT_URL`, `NODE_ENV=production`).
5. Deploy.

**Database → MongoDB Atlas**
1. Create a free cluster at [mongodb.com/atlas](https://www.mongodb.com/atlas).
2. Create a database user and whitelist Render's IP (or `0.0.0.0/0` for simplicity).
3. Copy the connection string into `MONGO_URI`.

## Screenshots

> _Add screenshots of the dashboard, task form, and dark mode here._

- `docs/screenshot-dashboard.png`
- `docs/screenshot-task-form.png`
- `docs/screenshot-dark-mode.png`

## Future Improvements

- User authentication (JWT) with per-user task lists
- Drag-and-drop Kanban board view
- Task labels/tags and subtasks
- Pagination or infinite scroll for large task lists
- Recurring tasks and reminders/notifications
- Unit and integration test coverage (Jest, React Testing Library)
