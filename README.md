# TechNotes – MERN Stack Application

TechNotes is a full-stack note management application built with the MERN stack. It provides a platform for employees to create, view, update, and manage technical notes, with authentication and role-based access control.

The application includes a React frontend and a RESTful API built with Node.js and Express, with MongoDB used for data storage.

## Features

### Authentication & Authorization

- User login and authentication using JSON Web Tokens (JWT).
- Secure password hashing with bcrypt.
- Access and refresh token implementation.
- Role-based access control.
- Protected routes for authenticated users.
- Persistent login functionality.

### Note Management

- Create new technical notes.
- View existing notes.
- Update note information.
- Delete notes.
- Manage note completion status.

### User Management

- Create new user accounts.
- View registered users.
- Update user information and roles.
- Delete user accounts.
- Manage active and inactive users.
- Restrict user-management features based on user roles.

### User Roles

The application supports three user roles:

| Role     | Permissions                               |
| -------- | ----------------------------------------- |
| Employee | Access and manage technical notes         |
| Manager  | Access notes and user-management features |
| Admin    | Access notes and user-management features |

## Tech Stack

**Frontend**

- React
- Vite
- React Router
- Redux Toolkit
- RTK Query
- Tailwind CSS
- Font Awesome

**Backend**

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Tokens (JWT)
- bcrypt


## API Overview

The backend provides REST API endpoints for authentication, user management, and note management.

| Route           | Purpose              |
| --------------- | -------------------- |
| `/auth`         | User login           |
| `/auth/refresh` | Refresh access token |
| `/auth/logout`  | User logout          |
| `/users`        | User management      |
| `/notes`        | Note management      |

## Security

- Passwords are hashed before being stored.
- Protected endpoints use JWT authentication.
- Role-based middleware restricts access to authorized users.
- Sensitive configuration values are stored in environment variables.
- HTTP-only cookies are used for refresh-token handling.

## Future Improvements

Potential enhancements include:

- Password reset functionality.
- User profile management.
- Advanced note search and filtering.
- Improved dashboard analytics.
- Automated testing.
- Application deployment.

## Author

**Abrham Biresaw**

Full Stack Developer | Ethiopia

linkedin: https://www.linkedin.com/in/abrham-biresaw-4914a1321/
