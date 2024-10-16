# README.md

## Timely

**React Router Navigation Example**

### Overview

This project is a React application that utilizes React Router for navigation between different pages, including authentication and admin routes. It demonstrates the use of protected routes for admins and instructors, ensuring that only authorized users can access certain parts of the application.

### Features

- **Home Page**: Landing page of the application.
- **Login Page**: Authentication page for users to log in.
- **Admin Routes**: Protected routes for admin users to manage courses and instructors.
- **Instructor Dashboard**: Protected route for instructors to access their dashboard.


### Routes

Below is a list of the application's routes:

| Path                          | Component                      | Protection Level      |
|-------------------------------|--------------------------------|-----------------------|
| `/`                           | `HomePage`                    | Public                |
| `/auth/login`                | `LoginPage`                   | Public                |
| `/admin/courses`             | `Courses`                     | Admin Protected       |
| `/admin/add-courses`         | `AddCourses`                  | Admin Protected       |
| `/admin/instructors`         | `Instructors`                 | Admin Protected       |
| `/instructor`                | `InstructorDashboard`         | Instructor Protected   |

# API Endpoints

This section outlines the API endpoints for the application, categorized by functionality. Each endpoint specifies the HTTP method, route, and associated middleware for authentication where applicable.

## Authentication Endpoints

| Method | Route             | Description                    | Middleware       |
|--------|-------------------|--------------------------------|-------------------|
| POST   | `/auth/login`     | Log in a user                 | None              |

## Admin Endpoints

| Method | Route                  | Description                                   | Middleware            |
|--------|------------------------|-----------------------------------------------|------------------------|
| GET    | `/admin/instructor`    | Retrieve a list of instructors                | `adminAuthenticator`   |
| POST   | `/admin/course`        | Add a new course                              | `adminAuthenticator`   |
| GET    | `/admin/course`        | Get a list of courses associated with instructors | `adminAuthenticator`   |
| POST   | `/admin/lecture`       | Add a new lecture                             | `adminAuthenticator`   |

## Instructor Endpoints

| Method | Route              | Description                    | Middleware               |
|--------|--------------------|--------------------------------|---------------------------|
| GET    | `/instructor/getSchedule` | Retrieve the schedule for the instructor | `instructorAuthenticator` |

### Notes

- Each route may require specific user roles for access, which is enforced by middleware.
- The endpoints allow for basic operations like login, course management, and schedule retrieval. 
- Ensure proper authentication and validation are implemented for a secure API.

### Credentials

- **Admin Login**:  
  - Username: `admin@gmail.com`  
  - Password: `Admin@123`

- **User Login**:  
  - Username: `rahul.sharma@gmail.com`  
  - Password: `Instructor@Rahul123`



### Database Dump

A database dump is included in the project files. Ensure to import it into your local database to replicate the application data.

