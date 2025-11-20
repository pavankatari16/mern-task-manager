# Task Manager with Role-Based Access

A full-stack task management system built with React, Node.js Edge Functions, and Supabase PostgreSQL database. Features include JWT authentication, role-based access control, and a modern responsive UI.

## Features

- User registration and authentication with JWT
- Role-based access control (User and Admin roles)
- Users can create, view, edit, and delete their own tasks
- Admins can view all tasks and delete any task
- Task management with status tracking (pending, in-progress, completed)
- Search and filter functionality
- Pagination for large task lists
- Responsive modern UI with Tailwind CSS

## Tech Stack

### Frontend
- React 18 with TypeScript
- React Router v7 for routing
- Axios for API calls
- Tailwind CSS for styling
- Lucide React for icons

### Backend
- Supabase Edge Functions (Deno runtime)
- PostgreSQL database
- JWT authentication with SHA-256 hashing
- Row Level Security (RLS) policies

## Project Structure

```
task-manager-rbac/
├── src/
│   ├── components/
│   │   ├── Navbar.tsx           # Navigation bar with user info
│   │   ├── TaskCard.tsx         # Individual task display
│   │   ├── TaskForm.tsx         # Create/Edit task modal
│   │   └── ProtectedRoute.tsx   # Route protection wrapper
│   ├── pages/
│   │   ├── Login.tsx            # Login page
│   │   ├── Register.tsx         # Registration page
│   │   └── Dashboard.tsx        # Main dashboard with task list
│   ├── context/
│   │   └── AuthContext.tsx      # Authentication state management
│   ├── services/
│   │   └── api.ts               # API service layer
│   ├── App.tsx                  # Main app component with routes
│   └── main.tsx                 # App entry point
├── supabase/
│   ├── functions/
│   │   ├── auth/
│   │   │   └── index.ts         # Authentication endpoints
│   │   └── tasks/
│   │       └── index.ts         # Task CRUD endpoints
│   └── migrations/              # Database migrations
└── README.md
```

## Database Schema

### Users Table
- `id` (uuid, primary key)
- `username` (text, unique)
- `password` (text, hashed)
- `role` (text: 'user' or 'admin')
- `created_at` (timestamptz)

### Tasks Table
- `id` (uuid, primary key)
- `title` (text, required)
- `description` (text)
- `status` (text: 'pending', 'in-progress', or 'completed')
- `created_by` (uuid, foreign key to users)
- `created_at` (timestamptz)
- `updated_at` (timestamptz)

## API Endpoints

### Authentication Routes

**POST** `/functions/v1/auth/register`
- Body: `{ username: string, password: string, role?: string }`
- Returns: `{ token: string, user: { id, username, role } }`

**POST** `/functions/v1/auth/login`
- Body: `{ username: string, password: string }`
- Returns: `{ token: string, user: { id, username, role } }`

### Task Routes (Requires Authentication)

**GET** `/functions/v1/tasks`
- Query params: `page`, `limit`, `status`, `search`
- Returns: `{ tasks: Task[], pagination: { page, limit, total, totalPages } }`

**GET** `/functions/v1/tasks/:id`
- Returns: `Task`

**POST** `/functions/v1/tasks`
- Body: `{ title: string, description?: string, status?: string }`
- Returns: `Task`

**PUT** `/functions/v1/tasks/:id`
- Body: `{ title?: string, description?: string, status?: string }`
- Returns: `Task`

**DELETE** `/functions/v1/tasks/:id`
- Returns: `{ message: string }`

## Setup Instructions

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone or download the repository

2. Install dependencies:
```bash
npm install
```

3. Environment variables are already configured in `.env` file with Supabase connection details

4. The database schema is already deployed with:
   - Users and tasks tables
   - Row Level Security policies
   - Proper indexes

5. Edge Functions are deployed and ready:
   - `/functions/v1/auth` - Authentication
   - `/functions/v1/tasks` - Task management

### Running the Application

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The production build will be created in the `dist/` directory.

## Usage Guide

### Getting Started

1. Open the application in your browser
2. Click "Sign up" to create a new account
3. Enter a username and password (minimum 6 characters)
4. You'll be automatically logged in and redirected to the dashboard

### Creating Tasks

1. Click the "New Task" button in the dashboard
2. Fill in the task details:
   - Title (required)
   - Description (optional)
   - Status (pending, in-progress, or completed)
3. Click "Create" to save the task

### Managing Tasks

- **View**: All your tasks are displayed as cards in the dashboard
- **Edit**: Click the edit icon on any of your tasks to modify it
- **Delete**: Click the trash icon to delete a task
- **Search**: Use the search bar to find tasks by title or description
- **Filter**: Use the status dropdown to filter tasks by status
- **Navigate**: Use pagination controls at the bottom to browse through tasks

### Admin Features

To create an admin user, you can register with role parameter or update a user in the database:

```sql
UPDATE users SET role = 'admin' WHERE username = 'your_username';
```

Admin users can:
- View all tasks from all users
- Delete any task (not just their own)
- See which user created each task

## Security Features

### Authentication
- Passwords are hashed using SHA-256
- JWT tokens expire after 24 hours
- Tokens are stored in localStorage

### Authorization
- Row Level Security (RLS) enabled on all tables
- Users can only view and modify their own tasks
- Admins have elevated privileges for viewing and deleting
- All API endpoints require valid JWT token

### Best Practices
- Input validation on both frontend and backend
- Prepared statements prevent SQL injection
- CORS headers properly configured
- Environment variables for sensitive data

## Technologies Used

- **React**: UI library
- **TypeScript**: Type safety
- **React Router**: Client-side routing
- **Axios**: HTTP client
- **Tailwind CSS**: Utility-first styling
- **Lucide React**: Icon library
- **Supabase**: Backend as a Service
- **PostgreSQL**: Relational database
- **Edge Functions**: Serverless API
- **JWT**: Token-based authentication

## License

This project is created for educational purposes as part of the AVPL International Assignment.
