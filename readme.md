# Employee Leave Tracking System

A simple full-stack Employee Leave Tracking System built to demonstrate clean project structure, database design, and basic full-stack functionality. The system allows organizations to manage employees, submit leave requests, track leave balances, and approve or reject requests from a manager dashboard.

This project was built with a focus on:

- Clean backend architecture
- Clean React frontend structure
- Proper database design
- Separation of concerns (API → Hooks → UI)

> **Note:** Authentication was intentionally omitted to focus on the core system logic. In a production environment, JWT-based authentication with role-based access (Employee / Manager) can easily be integrated.

---

## Repository

Clone the repository:

```bash
git clone https://github.com/HakimRaja/Employee-Leave-Tracking-System
cd Employee-Leave-Tracking-System
```

---

## Project Structure

```
backend/   → FastAPI backend with PostgreSQL and Alembic
frontend/  → React + TypeScript frontend using Vite
```

---

## Backend Setup (FastAPI + SQLModel)

### Requirements

- Python 3.13.7
- PostgreSQL installed and running

### 1️⃣ Navigate to backend

```bash
cd backend
```

### 2️⃣ Create virtual environment

```bash
python -m venv venv
```

Activate it:

**Windows:**
```bash
venv\Scripts\activate
```

**Mac/Linux:**
```bash
source venv/bin/activate
```

### 3️⃣ Install dependencies

```bash
pip install -r requirements.txt
```

### 4️⃣ Create PostgreSQL Database

Create a database named:

```
elms
```

### 5️⃣ Environment Variables

Create a `.env` file inside the `backend` folder:

```env
DATABASE_URL=postgresql+asyncpg://postgres:root@localhost:5432/elms
DATABASE_URL_FOR_MIGRATIONS=postgresql+psycopg2://postgres:root@localhost:5432/elms
```

| Variable | Purpose |
|---|---|
| `DATABASE_URL` | Async connection used by FastAPI + SQLModel |
| `DATABASE_URL_FOR_MIGRATIONS` | Sync connection used by Alembic |

### 6️⃣ Run Database Migrations

All Alembic migration files are already included, so you do **NOT** need to initialize Alembic. Simply run:

```bash
alembic upgrade head
```

This will create all required tables.

### 7️⃣ Start Backend Server

```bash
uvicorn main:app --reload
```

The API will run at: **http://127.0.0.1:8000**

---

## Backend Architecture

The backend follows a layered architecture:

```
Routers → Controllers → Database
```

### Directory Structure

```
src/
 ├── config/        → environment settings
 ├── database/      → database connection
 ├── models/        → SQLModel database models
 ├── schemas/       → Pydantic request/response schemas
 ├── controllers/   → business logic
 └── routers/       → API route definitions
```

This separation ensures maintainable code, clear responsibilities, and a scalable architecture.

---

## Frontend Setup (React + Vite)

### Requirements

- Node v22.19.0
- npm 10.9.3

### 1️⃣ Navigate to frontend

From the project root:

```bash
cd frontend
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Create Environment File

Create a `.env` file inside the `frontend` folder:

```env
VITE_API_BASE_URL=http://127.0.0.1:8000 
```

### 4️⃣ Start Frontend

```bash
npm run dev
```

The app will run at: **http://localhost:5173**

---

## Frontend Tech Stack

- React 19
- TypeScript
- Vite
- React Router
- Tailwind CSS (for styling)
- Sonner (toast notifications)
- Lucide React (icons)

---

## Frontend Architecture

The frontend follows a clean separation between API, logic, and UI:

```
API
 ↓
HOOK (logic)
 ↓
COMPONENT (UI)
 ↓
TOAST / MODAL / UI
```

### Directory Structure

```
src/
 ├── api/           → API service functions
 ├── hooks/         → business logic hooks
 ├── interfaces/    → TypeScript interfaces
 ├── components/    → reusable UI components
 ├── pages/         → page-level components
 ├── modals/        → modal forms
 └── ui/            → reusable UI elements
```

---

## Key Features

### Employee Management
- Create employee profiles
- Store employee details: name, email, department, and annual leave balance

### Leave Requests
Employees can submit leave requests with:
- Start date
- End date
- Leave type
- Notes

### Leave Validation
The backend includes several validations:
- Start date cannot be in the past
- End date cannot be before start date
- Leave requests cannot overlap
- Leave cannot exceed annual entitlement

### Manager Dashboard
Managers can:
- View pending leave requests
- Approve or reject requests
- See overall system statistics

### Calendar View
Displays upcoming employee leave in a visual format.

### Responsive UI built with Tailwind CSS
The UI is styled using Tailwind CSS and designed to be responsive across different screen sizes.

---

## Possible Future Improvements

This project can easily be extended with:

**Authentication**
- JWT access tokens
- Refresh tokens
- Role-based access control (Employee / Manager / Admin)

**Additional Features**
- Email notifications
- Leave history reports
- Department filtering
- Pagination
- Audit logging

---

## Notes

This project was built as a coding assignment with a limited time frame. The goal was to demonstrate clean project architecture, proper API design, maintainable frontend structure, and working full-stack functionality.

---

## Author

**Hakim Mahfooz Raja**  
GitHub: [https://github.com/HakimRaja](https://github.com/HakimRaja)