# Task Management BFF - Frontend

React.js frontend for Task Management Application using Backend for Frontend (BFF) pattern.

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

The application will open in your browser at `http://localhost:3000`

## Project Structure

```
src/
├── components/          # Reusable React components
│   ├── Navbar.js       # Navigation bar
│   ├── PrivateRoute.js # Protected route wrapper
│   ├── UserModal.js    # User create/edit modal
│   └── TaskModal.js    # Task create/edit modal
├── context/            # React Context for state management
│   ├── AuthContext.js  # Authentication context
│   └── useAuth.js      # Custom hook for auth
├── pages/              # Page components
│   ├── LoginPage.js    # Login page
│   ├── RegisterPage.js # Registration page
│   ├── TasksPage.js    # Tasks management page
│   └── UsersPage.js    # Users management page
├── services/           # API service layer
│   ├── apiClient.js    # Axios instance with interceptors
│   └── index.js        # Service methods for API calls
├── styles/             # CSS stylesheets
│   ├── global.css      # Global styles
│   ├── auth.css        # Auth pages styles
│   ├── navbar.css      # Navigation bar styles
│   ├── tasks.css       # Tasks page styles
│   └── users.css       # Users page styles
├── App.js              # Main app component with routes
└── index.js            # React DOM render entry point
```

## Features

### Authentication
- User registration with email validation
- User login with JWT token
- Automatic token inclusion in API requests
- Session persistence using localStorage
- Automatic logout on token expiration

### User Management
- View all users with pagination
- Create new users
- Edit user information
- Delete users

### Task Management
- View all tasks with details
- Create new tasks and assign to users
- Edit task details and reassign
- Update task status (pending, in_progress, completed, cancelled)
- Filter tasks by status
- Delete tasks

### BFF Pattern Implementation
- Single API gateway for all frontend requests
- Centralized authentication handling
- Automatic JWT token management
- Axios interceptors for request/response handling
- Consistent error handling

## Available Scripts

### `npm start`
Runs the app in development mode.

### `npm build`
Builds the app for production.

### `npm test`
Runs the test suite.

## API Communication

All API requests are made through the backend running on `http://localhost:5000`.

### Authentication Flow
1. User registers or logs in
2. Backend returns JWT token
3. Token is stored in localStorage
4. All subsequent requests include token in Authorization header
5. Token is automatically added via axios interceptor

### Error Handling
- 401 errors automatically clear token and redirect to login
- User-friendly error messages displayed in UI
- API errors are caught and displayed to users

## Environment Variables

The application assumes the backend is running on `http://localhost:5000`. This can be modified in the axios configuration if needed.

## Component Communication

### AuthContext
Manages user authentication state globally:
- `user` - Current logged-in user
- `loading` - Loading state
- `error` - Error message
- `login()` - Login method
- `register()` - Register method
- `logout()` - Logout method

### API Services
Organized into three main services:
- `authService` - Login, register, get current user
- `userService` - CRUD operations for users
- `taskService` - CRUD operations for tasks

## Styling

The application uses plain CSS with CSS variables for theming:
- Primary color: #0066cc
- Success color: #28a745
- Danger color: #dc3545
- Warning color: #ffc107

## Security Considerations

1. **JWT Token Storage**: Tokens stored in localStorage
2. **Authorization Header**: Token automatically added to all requests
3. **Token Expiration**: Expired tokens trigger logout
4. **CORS**: Configured at backend to accept requests from frontend only
5. **Password Security**: Passwords hashed at backend

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Development Workflow

1. Start backend server: `npm run dev` in backend directory
2. Start frontend: `npm start` in frontend directory
3. Make changes and see them reflected immediately (hot reload)
4. Open browser DevTools to debug

## Troubleshooting

### API Connection Error
- Ensure backend is running on `http://localhost:5000`
- Check CORS configuration in backend
- Check network tab in browser DevTools

### Login Issues
- Clear browser cache and localStorage
- Check if user exists in database
- Verify password is correct

### Component Not Updating
- Check React DevTools
- Verify context provider is wrapping components
- Check for console errors

## License

MIT
