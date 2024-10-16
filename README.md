# README.md

## Assignment

**React Router Navigation Demonstration**

### Introduction

This project is a React-based web application that implements navigation using React Router. It includes user authentication and role-based access control, with distinct sections for admins and instructors. The application demonstrates secure routing to protect sensitive areas, allowing only authorized users to access specific routes.

### Key Features

- **Homepage**: The primary landing page of the app.
- **Login Page**: Allows users to log in to the application.
- **Admin Section**: Secured pages for admins to manage instructors and courses.
- **Instructor Dashboard**: An exclusive area for instructors to manage their activities.

### Application Routes

Here’s a breakdown of the main routes within the application:

- `/`: Accessible by everyone, this route displays the homepage.
- `/auth/login`: Public login page for user authentication.
- `/admin/courses`: Admin-only section where course management takes place.
- `/admin/add-courses`: Admin-protected route for adding new courses.
- `/admin/instructors`: Restricted to admins for managing instructors.
- `/instructor`: Dedicated dashboard for instructors, only accessible by logged-in instructors.

### API Overview

The application’s API is divided by functionality and includes appropriate middleware to enforce security and role-based access.

#### Authentication API

- `POST /auth/login`: Authenticates a user and grants access based on their role.

#### Admin API

- `GET /admin/instructor`: Fetches the list of all instructors. Protected by `adminAuthenticator`.
- `POST /admin/course`: Adds a new course. Requires `adminAuthenticator`.
- `GET /admin/course`: Retrieves a list of all courses linked to instructors. Admin access enforced through `adminAuthenticator`.
- `POST /admin/lecture`: Creates a new lecture. Accessible only by admins using `adminAuthenticator`.

#### Instructor API

- `GET /instructor/getSchedule`: Fetches the schedule for a specific instructor. Restricted by `instructorAuthenticator`.

### Important Considerations

- Specific routes require users to have certain roles, enforced through middleware functions.
- The API handles essential tasks such as authentication, course management, and schedule retrieval.
- Security measures like authentication and data validation are vital for protecting the API.

### Login Credentials

- **Admin Access**:
  - Username: `admin@gmail.com`
  - Password: `Admin@123`

- **Instructor Access**:
  - Username: `rahul.sharma@gmail.com`
  - Password: `Instructor@Rahul123`

### Database

The project includes a database dump that can be imported into your local environment to mirror the application's data.