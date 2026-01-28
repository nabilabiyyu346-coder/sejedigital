# API Contracts - Task Management BFF

This document defines the complete REST API contracts for the Task Management Backend for Frontend application.

## Base URL

```
http://localhost:5000/api
```

## Response Format

All responses follow a consistent format:

### Success Response
```json
{
  "success": true,
  "message": "Optional message",
  "data": {}
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description"
}
```

## HTTP Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK - Request successful |
| 201 | Created - Resource created successfully |
| 400 | Bad Request - Invalid input |
| 401 | Unauthorized - No valid token |
| 403 | Forbidden - Access denied |
| 404 | Not Found - Resource doesn't exist |
| 500 | Internal Server Error |

## Authentication

Protected endpoints require JWT token in Authorization header:

```
Authorization: Bearer <jwt_token>
```

## Endpoints

### 1. AUTHENTICATION ENDPOINTS

#### 1.1 Register New User
- **Endpoint**: `POST /auth/register`
- **Authentication**: None (Public)
- **Content-Type**: `application/json`

**Request Body**:
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "full_name": "John Doe"
}
```

**Request Validation**:
- `username`: Required, string, 3-255 characters, unique
- `email`: Required, valid email format, unique
- `password`: Required, string, minimum 6 characters
- `full_name`: Optional, string

**Response (201 Created)**:
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": 1,
      "username": "john_doe",
      "email": "john@example.com",
      "full_name": "John Doe"
    }
  }
}
```

**Error Responses**:
```json
{
  "success": false,
  "message": "Username or email already exists"
}
```

---

#### 1.2 Login User
- **Endpoint**: `POST /auth/login`
- **Authentication**: None (Public)
- **Content-Type**: `application/json`

**Request Body**:
```json
{
  "username": "john_doe",
  "password": "securePassword123"
}
```

**Request Validation**:
- `username`: Required, string
- `password`: Required, string

**Response (200 OK)**:
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": 1,
      "username": "john_doe",
      "email": "john@example.com",
      "full_name": "John Doe"
    }
  }
}
```

**Error Responses**:
```json
{
  "success": false,
  "message": "Invalid username or password"
}
```

---

#### 1.3 Get Current User
- **Endpoint**: `GET /auth/me`
- **Authentication**: Required (Bearer Token)
- **Content-Type**: `application/json`

**Request Headers**:
```
Authorization: Bearer <jwt_token>
```

**Response (200 OK)**:
```json
{
  "success": true,
  "data": {
    "id": 1,
    "username": "john_doe",
    "email": "john@example.com",
    "full_name": "John Doe",
    "created_at": "2024-01-28T10:00:00.000Z"
  }
}
```

**Error Responses**:
```json
{
  "success": false,
  "message": "Access token required"
}
```

---

### 2. USER MANAGEMENT ENDPOINTS

#### 2.1 Get All Users
- **Endpoint**: `GET /users`
- **Authentication**: Required (Bearer Token)
- **Content-Type**: `application/json`

**Request Headers**:
```
Authorization: Bearer <jwt_token>
```

**Query Parameters**: None

**Response (200 OK)**:
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "username": "john_doe",
      "email": "john@example.com",
      "full_name": "John Doe",
      "created_at": "2024-01-28T10:00:00.000Z"
    },
    {
      "id": 2,
      "username": "jane_smith",
      "email": "jane@example.com",
      "full_name": "Jane Smith",
      "created_at": "2024-01-28T11:00:00.000Z"
    }
  ]
}
```

---

#### 2.2 Get User by ID
- **Endpoint**: `GET /users/:id`
- **Authentication**: Required (Bearer Token)
- **Content-Type**: `application/json`

**URL Parameters**:
- `id`: Integer, user ID

**Response (200 OK)**:
```json
{
  "success": true,
  "data": {
    "id": 1,
    "username": "john_doe",
    "email": "john@example.com",
    "full_name": "John Doe",
    "created_at": "2024-01-28T10:00:00.000Z"
  }
}
```

**Error Responses (404 Not Found)**:
```json
{
  "success": false,
  "message": "User not found"
}
```

---

#### 2.3 Create User
- **Endpoint**: `POST /users`
- **Authentication**: Required (Bearer Token)
- **Content-Type**: `application/json`

**Request Body**:
```json
{
  "username": "new_user",
  "email": "newuser@example.com",
  "password": "securePassword123",
  "full_name": "New User"
}
```

**Request Validation**:
- `username`: Required, unique
- `email`: Required, unique, valid email
- `password`: Required, minimum 6 characters
- `full_name`: Optional

**Response (201 Created)**:
```json
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "id": 3,
    "username": "new_user",
    "email": "newuser@example.com",
    "full_name": "New User",
    "created_at": "2024-01-28T12:00:00.000Z"
  }
}
```

---

#### 2.4 Update User
- **Endpoint**: `PUT /users/:id`
- **Authentication**: Required (Bearer Token)
- **Content-Type**: `application/json`

**URL Parameters**:
- `id`: Integer, user ID

**Request Body** (all fields optional):
```json
{
  "email": "newemail@example.com",
  "full_name": "Updated Name",
  "password": "newPassword123"
}
```

**Request Validation**:
- At least one field required
- Password: minimum 6 characters if provided
- Email: must be unique if provided

**Response (200 OK)**:
```json
{
  "success": true,
  "message": "User updated successfully",
  "data": {
    "id": 1,
    "username": "john_doe",
    "email": "newemail@example.com",
    "full_name": "Updated Name",
    "updated_at": "2024-01-28T13:00:00.000Z"
  }
}
```

---

#### 2.5 Delete User
- **Endpoint**: `DELETE /users/:id`
- **Authentication**: Required (Bearer Token)
- **Content-Type**: `application/json`

**URL Parameters**:
- `id`: Integer, user ID

**Response (200 OK)**:
```json
{
  "success": true,
  "message": "User deleted successfully"
}
```

**Note**: Deleting a user will cascade delete their tasks (as creator) or set assigned tasks to NULL.

---

### 3. TASK MANAGEMENT ENDPOINTS

#### 3.1 Get All Tasks
- **Endpoint**: `GET /tasks`
- **Authentication**: Required (Bearer Token)
- **Content-Type**: `application/json`

**Request Headers**:
```
Authorization: Bearer <jwt_token>
```

**Response (200 OK)**:
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Complete Project",
      "description": "Finish the BFF project implementation",
      "status": "in_progress",
      "assigned_to": 2,
      "assigned_to_username": "jane_smith",
      "assigned_to_fullname": "Jane Smith",
      "created_by": 1,
      "created_by_username": "john_doe",
      "created_at": "2024-01-28T10:00:00.000Z",
      "updated_at": "2024-01-28T12:00:00.000Z"
    }
  ]
}
```

---

#### 3.2 Get Task by ID
- **Endpoint**: `GET /tasks/:id`
- **Authentication**: Required (Bearer Token)
- **Content-Type**: `application/json`

**URL Parameters**:
- `id`: Integer, task ID

**Response (200 OK)**:
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Complete Project",
    "description": "Finish the BFF project implementation",
    "status": "in_progress",
    "assigned_to": 2,
    "assigned_to_username": "jane_smith",
    "assigned_to_fullname": "Jane Smith",
    "created_by": 1,
    "created_by_username": "john_doe",
    "created_at": "2024-01-28T10:00:00.000Z",
    "updated_at": "2024-01-28T12:00:00.000Z"
  }
}
```

**Error Responses (404 Not Found)**:
```json
{
  "success": false,
  "message": "Task not found"
}
```

---

#### 3.3 Create Task
- **Endpoint**: `POST /tasks`
- **Authentication**: Required (Bearer Token)
- **Content-Type**: `application/json`

**Request Body**:
```json
{
  "title": "New Task",
  "description": "Task description here",
  "assigned_to": 2
}
```

**Request Validation**:
- `title`: Required, string, 1-255 characters
- `description`: Optional, string
- `assigned_to`: Optional, integer (user ID must exist)

**Note**: `created_by` is automatically set to current user

**Response (201 Created)**:
```json
{
  "success": true,
  "message": "Task created successfully",
  "data": {
    "id": 2,
    "title": "New Task",
    "description": "Task description here",
    "status": "pending",
    "assigned_to": 2,
    "created_by": 1,
    "created_at": "2024-01-28T13:00:00.000Z",
    "updated_at": "2024-01-28T13:00:00.000Z"
  }
}
```

---

#### 3.4 Update Task (All Fields)
- **Endpoint**: `PUT /tasks/:id`
- **Authentication**: Required (Bearer Token)
- **Content-Type**: `application/json`

**URL Parameters**:
- `id`: Integer, task ID

**Request Body** (all fields optional):
```json
{
  "title": "Updated Task Title",
  "description": "Updated description",
  "status": "completed",
  "assigned_to": 3
}
```

**Request Validation**:
- `title`: String, 1-255 characters
- `description`: String
- `status`: One of: `pending`, `in_progress`, `completed`, `cancelled`
- `assigned_to`: Integer (user ID must exist)

**Response (200 OK)**:
```json
{
  "success": true,
  "message": "Task updated successfully",
  "data": {
    "id": 2,
    "title": "Updated Task Title",
    "description": "Updated description",
    "status": "completed",
    "assigned_to": 3,
    "created_by": 1,
    "created_at": "2024-01-28T13:00:00.000Z",
    "updated_at": "2024-01-28T14:00:00.000Z"
  }
}
```

---

#### 3.5 Update Task Status Only
- **Endpoint**: `PATCH /tasks/:id/status`
- **Authentication**: Required (Bearer Token)
- **Content-Type**: `application/json`

**URL Parameters**:
- `id`: Integer, task ID

**Request Body**:
```json
{
  "status": "completed"
}
```

**Request Validation**:
- `status`: Required, one of: `pending`, `in_progress`, `completed`, `cancelled`

**Response (200 OK)**:
```json
{
  "success": true,
  "message": "Task status updated successfully",
  "data": {
    "id": 2,
    "title": "New Task",
    "description": "Task description here",
    "status": "completed",
    "assigned_to": 2,
    "created_by": 1,
    "created_at": "2024-01-28T13:00:00.000Z",
    "updated_at": "2024-01-28T14:30:00.000Z"
  }
}
```

**Error Responses (400 Bad Request)**:
```json
{
  "success": false,
  "message": "Invalid status. Must be one of: pending, in_progress, completed, cancelled"
}
```

---

#### 3.6 Delete Task
- **Endpoint**: `DELETE /tasks/:id`
- **Authentication**: Required (Bearer Token)
- **Content-Type**: `application/json`

**URL Parameters**:
- `id`: Integer, task ID

**Response (200 OK)**:
```json
{
  "success": true,
  "message": "Task deleted successfully"
}
```

---

## Error Handling

### Common Error Responses

#### Unauthorized Access (401)
```json
{
  "success": false,
  "message": "Access token required"
}
```

#### Invalid Token (403)
```json
{
  "success": false,
  "message": "Invalid or expired token"
}
```

#### Not Found (404)
```json
{
  "success": false,
  "message": "Resource not found"
}
```

#### Bad Request (400)
```json
{
  "success": false,
  "message": "Validation error message"
}
```

#### Internal Server Error (500)
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## Health Check

#### Health Status
- **Endpoint**: `GET /health`
- **Authentication**: None
- **Response (200 OK)**:
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2024-01-28T14:30:00.000Z"
}
```

## Rate Limiting

Currently no rate limiting is implemented. For production, consider implementing:
- Rate limiting middleware
- API key authentication
- Usage quotas

## Pagination

Currently no pagination is implemented. For large datasets, consider:
- Limit and offset parameters
- Cursor-based pagination
- Response metadata

## Versioning

Current API Version: `1.0`

For future versions, use:
```
/api/v2/auth/login
```

## Authentication Token Example

JWT Token structure:
```json
{
  "iss": "task-management-bff",
  "sub": "1",
  "id": 1,
  "username": "john_doe",
  "iat": 1706425200,
  "exp": 1707030000
}
```

Token expiration: 7 days from issuance

## CORS Configuration

Allowed origins: `http://localhost:3000`

Allowed methods: `GET`, `POST`, `PUT`, `PATCH`, `DELETE`, `OPTIONS`

Allowed headers: `Content-Type`, `Authorization`

## Testing with curl

### Example: Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john_doe",
    "password": "password123"
  }'
```

### Example: Create Task (with token)
```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "title": "New Task",
    "description": "Description",
    "assigned_to": 2
  }'
```

## Change Log

### Version 1.0 (2024-01-28)
- Initial API implementation
- Authentication endpoints
- User management endpoints
- Task management endpoints
- JWT token authentication
- PostgreSQL integration
