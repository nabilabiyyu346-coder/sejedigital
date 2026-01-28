# Task Management Application - Backend for Frontend (BFF) Pattern

A complete microservice application demonstrating the Backend for Frontend (BFF) pattern with Express.js backend, React.js frontend, and PostgreSQL database.

## Project Overview

This project implements a complete Task Management system with:
- **User Authentication** (Registration, Login)
- **User Management** (CRUD operations)
- **Task Management** (CRUD operations with status tracking)
- **BFF Pattern Implementation** with REST API contracts
- **JWT-based Authentication**
- **Database persistence with PostgreSQL**

## Architecture

```
┌─────────────────────────────────────────┐
│         React.js Frontend               │
│    (http://localhost:3000)              │
└────────────────────┬────────────────────┘
                     │ REST API Calls
                     ▼
┌─────────────────────────────────────────┐
│      Express.js BFF Backend             │
│    (http://localhost:5000)              │
│  - Authentication                       │
│  - User Management                      │
│  - Task Management                      │
│  - JWT Token Management                 │
└────────────────────┬────────────────────┘
                     │ SQL Queries
                     ▼
┌─────────────────────────────────────────┐
│     PostgreSQL Database                 │
│  - Users table                          │
│  - Tasks table                          │
└─────────────────────────────────────────┘
```

## BFF Pattern

The Backend for Frontend pattern is implemented to:
1. Act as a single entry point for frontend requests
2. Handle authentication and JWT token management
3. Manage database interactions
4. Provide consistent API contracts
5. Separate frontend concerns from backend infrastructure

## Tech Stack

### Frontend
- React.js 18
- React Router v6 for routing
- Axios for HTTP requests
- Context API for state management
- CSS3 for styling

### Backend
- Express.js for REST API
- PostgreSQL for database
- JWT for authentication
- bcryptjs for password hashing
- Node.js runtime

### Database
- PostgreSQL 12+
- Tables: users, tasks
- Relational schema with foreign keys

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn
- Git

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Update `.env` with your database credentials

5. Create database:
```bash
createdb task_management_db
```

6. Start backend server:
```bash
npm run dev
```

Backend will be available at `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start frontend:
```bash
npm start
```

Frontend will be available at `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### User Management
- `GET /api/users` - List all users (protected)
- `GET /api/users/:id` - Get user by ID (protected)
- `POST /api/users` - Create user (protected)
- `PUT /api/users/:id` - Update user (protected)
- `DELETE /api/users/:id` - Delete user (protected)

### Task Management
- `GET /api/tasks` - List all tasks (protected)
- `GET /api/tasks/:id` - Get task by ID (protected)
- `POST /api/tasks` - Create task (protected)
- `PUT /api/tasks/:id` - Update task (protected)
- `PATCH /api/tasks/:id/status` - Update task status (protected)
- `DELETE /api/tasks/:id` - Delete task (protected)

## Features

### Minimum Features Implemented ✓
- **Authentication**
  - User Registration
  - User Login
  - JWT Token Management

- **User Management**
  - List all users
  - Create new user
  - Update user information
  - Delete user

- **Task Management**
  - List all tasks
  - Create task with user assignment
  - Update task details
  - Update task status
  - Delete task
  - User selection dropdown from backend

### Additional Features ✓
- Task status filtering
- Responsive design
- Error handling and validation
- Automatic session management
- Role-based access control via JWT
- Database relationships (users → tasks)
- Consistent API response format
- CORS configuration for BFF pattern

## Database Schema

### Users Table
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  full_name VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Tasks Table
```sql
CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  status VARCHAR(50) DEFAULT 'pending',
  assigned_to INTEGER REFERENCES users(id) ON DELETE SET NULL,
  created_by INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Request/Response Contracts

### Register Request
```json
{
  "username": "string",
  "email": "string",
  "password": "string",
  "full_name": "string"
}
```

### Login Request
```json
{
  "username": "string",
  "password": "string"
}
```

### Login Response
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "jwt_token",
    "user": {
      "id": 1,
      "username": "john_doe",
      "email": "john@example.com",
      "full_name": "John Doe"
    }
  }
}
```

### Create Task Request
```json
{
  "title": "string",
  "description": "string",
  "assigned_to": "integer"
}
```

### Task Response
```json
{
  "id": 1,
  "title": "Task Title",
  "description": "Task description",
  "status": "pending",
  "assigned_to": 2,
  "assigned_to_username": "jane_doe",
  "assigned_to_fullname": "Jane Doe",
  "created_by": 1,
  "created_by_username": "john_doe",
  "created_at": "2024-01-28T10:00:00Z",
  "updated_at": "2024-01-28T10:00:00Z"
}
```

## Development

### Code Structure

**Backend:**
- `/src/config` - Database and environment configuration
- `/src/controllers` - Business logic and request handling
- `/src/middleware` - Authentication and validation middleware
- `/src/routes` - API endpoint definitions
- `/src/utils` - Utility functions for auth and helpers
- `/db` - Database migrations and seeds

**Frontend:**
- `/src/components` - Reusable React components
- `/src/pages` - Page-level components
- `/src/services` - API client and service methods
- `/src/context` - React Context for state management
- `/src/styles` - CSS stylesheets

### Best Practices Applied
1. **Separation of Concerns** - Controllers, services, middleware separation
2. **DRY Principle** - Reusable components and utilities
3. **Error Handling** - Comprehensive try-catch blocks
4. **Input Validation** - Server-side validation on all endpoints
5. **Security** - JWT tokens, password hashing, CORS
6. **BFF Pattern** - Single entry point for frontend
7. **API Contracts** - Consistent request/response format

## Testing

### Manual Testing Steps

1. **Register new user:**
   - Visit `http://localhost:3000/register`
   - Fill in credentials and submit
   - Should redirect to tasks page

2. **Create task:**
   - Navigate to Tasks page
   - Click "Create New Task"
   - Fill in title, description, assign user
   - Click Create

3. **Update task status:**
   - Click on status dropdown in task table
   - Select new status
   - Should update immediately

4. **Manage users:**
   - Navigate to Users page
   - Create, edit, or delete users
   - Changes reflected in task assignment dropdown

## Security Considerations

1. **Authentication** - JWT tokens with expiration
2. **Password Security** - bcryptjs hashing with salt rounds
3. **SQL Injection** - Parameterized queries
4. **CORS** - Restricted to frontend origin only
5. **Input Validation** - Server-side validation
6. **Token Management** - HTTP-only considerations (can be enhanced)

## Performance Optimizations

1. Indexed database columns for common queries
2. Efficient SQL queries with JOINs
3. React component memoization potential
4. API response caching with Context
5. Database connection pooling

## Deployment Considerations

### Frontend
- Build: `npm run build`
- Deploy to: Netlify, Vercel, or static hosting
- Environment variables for API URL

### Backend
- Node.js hosting: Heroku, DigitalOcean, AWS
- Database: PostgreSQL managed service
- Environment variables for secrets
- SSL/TLS for production

## Troubleshooting

### Backend Issues
- Database connection: Check `.env` credentials
- Port conflict: Change `PORT` in `.env`
- Module not found: Run `npm install`

### Frontend Issues
- API connection: Verify backend is running on port 5000
- Module not found: Run `npm install` in frontend
- Build errors: Clear `node_modules` and reinstall

## Contributing

1. Create a feature branch
2. Make your changes
3. Commit with clear messages
4. Push to repository
5. Create pull request

## License

MIT License - See LICENSE file for details

## Author

Created as a demonstration of BFF pattern with modern web technologies.

## Project Statistics

- **Frontend Components**: 8
- **Backend Routes**: 3
- **API Endpoints**: 13
- **Database Tables**: 2
- **Middleware**: 1
- **Total Files**: 40+
- **Lines of Code**: 3000+

## Future Enhancements

- [ ] User roles and permissions
- [ ] Task comments and activity log
- [ ] Email notifications
- [ ] Task categories/tags
- [ ] Reporting and analytics
- [ ] Unit and integration tests
- [ ] API rate limiting
- [ ] Caching layer (Redis)
- [ ] File upload support
- [ ] Real-time updates (WebSocket)

## Support

For issues or questions, please create an issue in the repository.

---

**Version**: 1.0.0  
**Last Updated**: January 2026  
**Status**: Production Ready
