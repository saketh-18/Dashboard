# Task Dashboard

A full-stack task management application where users can create, manage, and track their tasks. Built with Next.js on the frontend and FastAPI on the backend.

**Live Demo:** [https://dashboard-eosin-five-81.vercel.app/](https://dashboard-eosin-five-81.vercel.app/)

## Tech Stack

### Frontend

- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Zustand** - State management
- **Biome** - Fast linter & formatter

### Backend

- **FastAPI** - Modern Python web framework
- **SQLModel** - SQL database ORM
- **PostgreSQL** - Database (hosted on Aiven)
- **JWT** - Authentication
- **bcrypt** - Password hashing
- **asyncpg** - Async PostgreSQL driver

## Backend

### Routes

The API has four main route groups:

- **`/signup`** - User registration endpoint
- **`/login`** - Authentication endpoint that returns JWT tokens
- **`/profile`** - Get current user info (protected)
- **`/tasks`** - CRUD operations for tasks (protected)
  - `GET /tasks` - Fetch all tasks for logged-in user
  - `POST /tasks` - Create a new task
  - `PATCH /tasks/{task_id}` - Update a task
  - `DELETE /tasks/{task_id}` - Delete a task

### Database Models

**User Model:**

- `username` - Display name
- `email` - Primary key, used for login
- `password` - Hashed password (bcrypt)

**Task Model:**

- `id` - UUID primary key
- `email` - Foreign key to User
- `name` - Task title
- `desc` - Task description
- `status` - Boolean (completed/incomplete)

### Authentication

JWT-based authentication using OAuth2 password bearer tokens. The middleware (`jwt_auth.py`) validates tokens on protected routes and extracts user info from the payload. Users must include the JWT in the Authorization header for all protected endpoints.

**Backend API:** [https://dashboard-0z1c.onrender.com](https://dashboard-0z1c.onrender.com)

## Frontend

### Pages

- **`/login`** - User login form
- **`/register`** - New user registration
- **`/dashboard`** - Main task management interface (protected route)

### Components

**Layout Components:**

- `Navbar.tsx` - Navigation bar with auth-aware menu

**Dashboard Components:**

- `TaskList.tsx` - Displays all user tasks with edit/delete actions
- `TaskForm.tsx` - Form for creating and editing tasks
- `TaskFilters.tsx` - Filter tasks by status (all/completed/pending)
- `ProfileCard.tsx` - Shows current user info
- `Loading.tsx` - Loading state component

### Key Features

- Client-side route protection with `useAuthGuard` hook
- JWT token stored in localStorage
- API client wrapper (`apiClient.ts`) for backend communication
- Zustand store for logout state management

## Deployment

- **Frontend:** Deployed on Vercel
- **Backend:** Deployed on Render
- **Database:** PostgreSQL hosted on Aiven

## Getting Started

### Backend Setup

```bash
cd server
pip install -r requirements.txt
# Set environment variables: DATABASE_URL, JWT_SECRET
python main.py
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The app should now be running locally with the frontend on `localhost:3000` and backend on `localhost:8000`.
