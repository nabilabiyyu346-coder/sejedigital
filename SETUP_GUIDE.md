# Complete Setup Guide - Task Management BFF

This guide provides step-by-step instructions to set up and run the entire Task Management application.

## Prerequisites

Before starting, ensure you have installed:
- **Node.js** v14 or higher ([Download](https://nodejs.org/))
- **PostgreSQL** v12 or higher ([Download](https://www.postgresql.org/download/))
- **Git** ([Download](https://git-scm.com/))
- **npm** (comes with Node.js)

## Part 1: Database Setup

### Step 1: Create PostgreSQL Database

Open PostgreSQL command line or use pgAdmin:

```bash
# Using psql command line
psql -U postgres

# Inside psql shell
CREATE DATABASE task_management_db;

# Verify creation
\l

# Exit psql
\q
```

## Part 2: Backend Setup

### Step 1: Navigate to Backend Directory

```bash
cd backend
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install:
- express
- pg (PostgreSQL client)
- bcryptjs (password hashing)
- jsonwebtoken (JWT authentication)
- cors (Cross-Origin Resource Sharing)
- express-validator (input validation)
- dotenv (environment variables)

### Step 3: Create Environment File

```bash
# Copy example env file
cp .env.example .env
```

### Step 4: Update Environment Variables

Edit `.env` file with your database credentials:

```env
NODE_ENV=development
PORT=5000

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=task_management_db
DB_USER=postgres
DB_PASSWORD=postgres

# JWT Configuration
JWT_SECRET=your-secret-key-change-in-production
JWT_EXPIRY=7d

# CORS Configuration
FRONTEND_URL=http://localhost:3000
```

**Important**: Keep `.env` file private. Never commit it to repository.

### Step 5: Start Backend Server

```bash
# Development mode with auto-restart
npm run dev

# Production mode
npm start
```

Expected output:
```
Database tables initialized successfully
Server running on http://localhost:5000
Frontend origin: http://localhost:3000
Environment: development
```

### Verify Backend is Running

Open your browser and visit:
```
http://localhost:5000/api/health
```

You should see:
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2024-01-28T..."
}
```

## Part 3: Frontend Setup

### Step 1: Open New Terminal Window

Keep the backend terminal running and open a new terminal.

### Step 2: Navigate to Frontend Directory

```bash
cd frontend
```

### Step 3: Install Dependencies

```bash
npm install
```

This will install:
- react
- react-dom
- react-router-dom
- axios (HTTP client)
- react-scripts

### Step 4: Start Frontend Development Server

```bash
npm start
```

Expected output:
```
Compiled successfully!

You can now view task-management-bff-frontend in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://xxx.xxx.x.xxx:3000
```

The application will automatically open in your default browser at `http://localhost:3000`.

## Part 4: First Time Usage

### Step 1: Create a User Account

1. Navigate to Registration page (should be default)
2. Fill in the form:
   - Username: `testuser`
   - Email: `test@example.com`
   - Password: `password123`
   - Full Name: `Test User`
3. Click "Register"

### Step 2: Create Tasks

1. After login, you'll be on the Tasks page
2. Click "+ Create New Task"
3. Fill in the form:
   - Title: `My First Task`
   - Description: `This is a test task`
   - Assign To: Select a user (optional)
4. Click "Create Task"

### Step 3: Create More Users

1. Navigate to Users page
2. Click "+ Add New User"
3. Create another user account

### Step 4: Test Task Assignment

1. Go back to Tasks page
2. Click "Edit" on a task
3. Assign it to one of the users you created
4. Update the task status from the status dropdown

## API Testing with Postman/curl

### Login Endpoint Test

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "password123"
  }'
```

Response:
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "user": {
      "id": 1,
      "username": "testuser",
      "email": "test@example.com",
      "full_name": "Test User"
    }
  }
}
```

### Get Tasks (Protected)

```bash
curl -X GET http://localhost:5000/api/tasks \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## Project Structure Overview

```
task-management-bff/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── database.js         # PostgreSQL connection
│   │   │   └── initDb.js           # Database initialization
│   │   │
│   │   ├── controllers/
│   │   │   ├── authController.js   # Login, Register, getCurrentUser
│   │   │   ├── userController.js   # User CRUD operations
│   │   │   └── taskController.js   # Task CRUD operations
│   │   │
│   │   ├── middleware/
│   │   │   └── auth.js             # JWT verification
│   │   │
│   │   ├── routes/
│   │   │   ├── authRoutes.js       # Auth endpoints
│   │   │   ├── userRoutes.js       # User endpoints
│   │   │   └── taskRoutes.js       # Task endpoints
│   │   │
│   │   ├── utils/
│   │   │   └── auth.js             # Token, hashing utilities
│   │   │
│   │   └── server.js               # Express app setup
│   │
│   ├── .env.example                # Environment template
│   ├── package.json                # Dependencies
│   └── README.md                   # Backend documentation
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js
│   │   │   ├── PrivateRoute.js
│   │   │   ├── UserModal.js
│   │   │   └── TaskModal.js
│   │   │
│   │   ├── pages/
│   │   │   ├── LoginPage.js
│   │   │   ├── RegisterPage.js
│   │   │   ├── TasksPage.js
│   │   │   └── UsersPage.js
│   │   │
│   │   ├── services/
│   │   │   ├── apiClient.js        # Axios instance
│   │   │   └── index.js            # API methods
│   │   │
│   │   ├── context/
│   │   │   ├── AuthContext.js      # Auth state
│   │   │   └── useAuth.js          # Auth hook
│   │   │
│   │   ├── styles/
│   │   │   ├── global.css
│   │   │   ├── auth.css
│   │   │   ├── navbar.css
│   │   │   ├── tasks.css
│   │   │   └── users.css
│   │   │
│   │   ├── App.js                  # Main app component
│   │   └── index.js                # React entry point
│   │
│   ├── public/
│   │   └── index.html
│   │
│   ├── package.json
│   └── README.md
│
├── .gitignore
└── README.md
```

## Common Issues and Solutions

### Issue: Database Connection Error

**Error**: `Error: connect ECONNREFUSED 127.0.0.1:5432`

**Solution**:
1. Ensure PostgreSQL is running
2. Check database credentials in `.env`
3. Verify database `task_management_db` exists
4. Check PostgreSQL is on port 5432

### Issue: Backend Port Already in Use

**Error**: `Error: listen EADDRINUSE: address already in use :::5000`

**Solution**:
1. Change PORT in `.env` to a different number
2. Or kill the process using port 5000:
   ```bash
   # Windows
   netstat -ano | findstr :5000
   taskkill /PID <PID> /F
   
   # Mac/Linux
   lsof -i :5000
   kill -9 <PID>
   ```

### Issue: Frontend Cannot Connect to Backend

**Error**: `Network error` or `API request failed`

**Solution**:
1. Ensure backend is running on `http://localhost:5000`
2. Check CORS configuration in backend
3. Clear browser cache
4. Check browser console for detailed error messages

### Issue: JWT Token Expired

**Error**: `Invalid or expired token`

**Solution**:
1. Log out and log back in
2. Tokens expire after 7 days (configurable in `.env`)
3. For development, increase JWT_EXPIRY in `.env`

### Issue: Cannot Create User - Username Already Exists

**Solution**:
1. Use a different username
2. Or delete the user from the database:
   ```sql
   DELETE FROM users WHERE username = 'testuser';
   ```

## Development Workflow

### Running in Development Mode

**Terminal 1 - Backend**:
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend**:
```bash
cd frontend
npm start
```

Both will auto-reload when you make changes.

### Building for Production

**Backend**: No build step needed, just deploy `src/` and `package.json`

**Frontend**: Build the React app
```bash
cd frontend
npm run build
```

This creates optimized files in `build/` directory.

## Database Operations

### Connect to Database

```bash
psql -U postgres -d task_management_db
```

### View Tables

```sql
\dt
```

### View Users

```sql
SELECT * FROM users;
```

### View Tasks

```sql
SELECT * FROM tasks;
```

### Delete All Data (Development Only)

```sql
DELETE FROM tasks;
DELETE FROM users;
```

## Environment Variables Reference

| Variable | Description | Default |
|----------|-------------|---------|
| NODE_ENV | Environment type | development |
| PORT | Backend server port | 5000 |
| DB_HOST | PostgreSQL host | localhost |
| DB_PORT | PostgreSQL port | 5432 |
| DB_NAME | Database name | task_management_db |
| DB_USER | Database user | postgres |
| DB_PASSWORD | Database password | postgres |
| JWT_SECRET | JWT signing secret | your-secret-key-here-change-in-production |
| JWT_EXPIRY | Token expiration | 7d |
| FRONTEND_URL | Frontend origin for CORS | http://localhost:3000 |

## Next Steps

1. **Test the application** thoroughly
2. **Read the API documentation** in `backend/README.md`
3. **Explore the code** to understand BFF pattern implementation
4. **Customize** styling, features, or database schema as needed
5. **Deploy** to production when ready

## Support and Troubleshooting

For detailed API documentation, see:
- Backend: `backend/README.md`
- Frontend: `frontend/README.md`

For additional help:
1. Check error messages in browser console
2. Check backend server logs
3. Verify all ports are correct
4. Ensure PostgreSQL is running
5. Check `.env` file configuration

## License

This project is licensed under the MIT License.
