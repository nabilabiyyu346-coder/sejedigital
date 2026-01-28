# Task Management BFF - Backend

Backend for Frontend (BFF) pattern implementation for Task Management Application using Express.js and PostgreSQL.

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file from `.env.example`:
```bash
cp .env.example .env
```

3. Update `.env` with your database credentials:
```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=task_management_db
DB_USER=postgres
DB_PASSWORD=your_password
JWT_SECRET=your-secret-key-here
```

4. Create database (if not exists):
```bash
createdb task_management_db
```

5. Start the server:
```bash
npm run dev
```

Server will be running on `http://localhost:5000`

## API Endpoints Documentation

### Authentication Endpoints

#### Register
- **POST** `/api/auth/register`
- **Request Body:**
  ```json
  {
    "username": "string",
    "email": "string",
    "password": "string",
    "full_name": "string (optional)"
  }
  ```
- **Response (201):**
  ```json
  {
    "success": true,
    "message": "User registered successfully",
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

#### Login
- **POST** `/api/auth/login`
- **Request Body:**
  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```
- **Response (200):**
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

#### Get Current User
- **GET** `/api/auth/me`
- **Headers:** `Authorization: Bearer {token}`
- **Response (200):**
  ```json
  {
    "success": true,
    "data": {
      "id": 1,
      "username": "john_doe",
      "email": "john@example.com",
      "full_name": "John Doe",
      "created_at": "2024-01-28T10:00:00Z"
    }
  }
  ```

### User Management Endpoints

#### List All Users
- **GET** `/api/users`
- **Headers:** `Authorization: Bearer {token}`
- **Response (200):**
  ```json
  {
    "success": true,
    "data": [
      {
        "id": 1,
        "username": "john_doe",
        "email": "john@example.com",
        "full_name": "John Doe",
        "created_at": "2024-01-28T10:00:00Z"
      }
    ]
  }
  ```

#### Get User by ID
- **GET** `/api/users/:id`
- **Headers:** `Authorization: Bearer {token}`
- **Response (200):**
  ```json
  {
    "success": true,
    "data": {
      "id": 1,
      "username": "john_doe",
      "email": "john@example.com",
      "full_name": "John Doe",
      "created_at": "2024-01-28T10:00:00Z"
    }
  }
  ```

#### Create New User
- **POST** `/api/users`
- **Headers:** `Authorization: Bearer {token}`
- **Request Body:**
  ```json
  {
    "username": "string",
    "email": "string",
    "password": "string",
    "full_name": "string (optional)"
  }
  ```
- **Response (201):**
  ```json
  {
    "success": true,
    "message": "User created successfully",
    "data": {
      "id": 2,
      "username": "jane_doe",
      "email": "jane@example.com",
      "full_name": "Jane Doe",
      "created_at": "2024-01-28T11:00:00Z"
    }
  }
  ```

#### Update User
- **PUT** `/api/users/:id`
- **Headers:** `Authorization: Bearer {token}`
- **Request Body:**
  ```json
  {
    "email": "newemail@example.com (optional)",
    "full_name": "string (optional)",
    "password": "string (optional)"
  }
  ```
- **Response (200):**
  ```json
  {
    "success": true,
    "message": "User updated successfully",
    "data": {
      "id": 1,
      "username": "john_doe",
      "email": "newemail@example.com",
      "full_name": "John Updated",
      "updated_at": "2024-01-28T12:00:00Z"
    }
  }
  ```

#### Delete User
- **DELETE** `/api/users/:id`
- **Headers:** `Authorization: Bearer {token}`
- **Response (200):**
  ```json
  {
    "success": true,
    "message": "User deleted successfully"
  }
  ```

### Task Management Endpoints

#### List All Tasks
- **GET** `/api/tasks`
- **Headers:** `Authorization: Bearer {token}`
- **Response (200):**
  ```json
  {
    "success": true,
    "data": [
      {
        "id": 1,
        "title": "Complete Project",
        "description": "Finish the BFF project",
        "status": "pending",
        "assigned_to": 2,
        "assigned_to_username": "jane_doe",
        "assigned_to_fullname": "Jane Doe",
        "created_by": 1,
        "created_by_username": "john_doe",
        "created_at": "2024-01-28T10:00:00Z",
        "updated_at": "2024-01-28T10:00:00Z"
      }
    ]
  }
  ```

#### Get Task by ID
- **GET** `/api/tasks/:id`
- **Headers:** `Authorization: Bearer {token}`
- **Response (200):**
  ```json
  {
    "success": true,
    "data": {
      "id": 1,
      "title": "Complete Project",
      "description": "Finish the BFF project",
      "status": "pending",
      "assigned_to": 2,
      "assigned_to_username": "jane_doe",
      "assigned_to_fullname": "Jane Doe",
      "created_by": 1,
      "created_by_username": "john_doe",
      "created_at": "2024-01-28T10:00:00Z",
      "updated_at": "2024-01-28T10:00:00Z"
    }
  }
  ```

#### Create Task
- **POST** `/api/tasks`
- **Headers:** `Authorization: Bearer {token}`
- **Request Body:**
  ```json
  {
    "title": "string (required)",
    "description": "string (optional)",
    "assigned_to": "integer (optional, user id)"
  }
  ```
- **Response (201):**
  ```json
  {
    "success": true,
    "message": "Task created successfully",
    "data": {
      "id": 1,
      "title": "Complete Project",
      "description": "Finish the BFF project",
      "status": "pending",
      "assigned_to": 2,
      "created_by": 1,
      "created_at": "2024-01-28T10:00:00Z",
      "updated_at": "2024-01-28T10:00:00Z"
    }
  }
  ```

#### Update Task (All Fields)
- **PUT** `/api/tasks/:id`
- **Headers:** `Authorization: Bearer {token}`
- **Request Body:**
  ```json
  {
    "title": "string (optional)",
    "description": "string (optional)",
    "status": "string (optional)",
    "assigned_to": "integer (optional)"
  }
  ```
- **Response (200):**
  ```json
  {
    "success": true,
    "message": "Task updated successfully",
    "data": {
      "id": 1,
      "title": "Updated Task",
      "description": "Updated description",
      "status": "in_progress",
      "assigned_to": 3,
      "created_by": 1,
      "created_at": "2024-01-28T10:00:00Z",
      "updated_at": "2024-01-28T12:00:00Z"
    }
  }
  ```

#### Update Task Status Only
- **PATCH** `/api/tasks/:id/status`
- **Headers:** `Authorization: Bearer {token}`
- **Request Body:**
  ```json
  {
    "status": "pending | in_progress | completed | cancelled"
  }
  ```
- **Response (200):**
  ```json
  {
    "success": true,
    "message": "Task status updated successfully",
    "data": {
      "id": 1,
      "title": "Complete Project",
      "description": "Finish the BFF project",
      "status": "completed",
      "assigned_to": 2,
      "created_by": 1,
      "created_at": "2024-01-28T10:00:00Z",
      "updated_at": "2024-01-28T12:00:00Z"
    }
  }
  ```

#### Delete Task
- **DELETE** `/api/tasks/:id`
- **Headers:** `Authorization: Bearer {token}`
- **Response (200):**
  ```json
  {
    "success": true,
    "message": "Task deleted successfully"
  }
  ```

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

## BFF Pattern Implementation

This backend follows the Backend for Frontend (BFF) pattern:

1. **Single Entry Point**: All frontend requests go through this backend
2. **API Aggregation**: The backend can aggregate multiple services if needed
3. **Authentication Handling**: JWT tokens are managed at the backend level
4. **Data Transformation**: Response data is formatted specifically for frontend needs
5. **CORS Configuration**: Configured to accept requests only from the frontend URL
6. **Security**: Sensitive operations and database queries are handled server-side

## Error Handling

Standard error response format:
```json
{
  "success": false,
  "message": "Error description"
}
```

### HTTP Status Codes
- `200`: Success
- `201`: Created
- `400`: Bad Request
- `401`: Unauthorized
- `403`: Forbidden
- `404`: Not Found
- `500`: Internal Server Error

## Development

### Run in Development Mode
```bash
npm run dev
```

This uses nodemon for auto-restart on file changes.

### Environment Variables
See `.env.example` for all available environment variables.

## Security Considerations

1. **JWT Authentication**: All protected endpoints require valid JWT token
2. **Password Hashing**: Passwords are hashed using bcryptjs
3. **CORS**: Restricted to frontend URL only
4. **Input Validation**: Basic validation on request bodies
5. **SQL Injection Protection**: Using parameterized queries

## License

MIT
