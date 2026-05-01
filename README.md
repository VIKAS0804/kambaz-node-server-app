# Kambaz Node Server

Express backend for the Kambaz learning management system. This project provides the server-side routes and in-repo data modules that support core LMS flows such as users, courses, assignments, modules, and enrollments.

## Highlights

- Express-based API server
- Route modules for users, courses, modules, assignments, and enrollments
- Session and CORS setup for frontend integration
- Lightweight data layer backed by JavaScript modules inside the repo
- Coursework lab endpoints alongside the Kambaz app routes

## Project Structure

```text
Kambaz/
├── Assignments/
├── Courses/
├── Database/
├── Enrollments/
├── Modules/
└── Users/

Lab5/                      # Supporting coursework exercises
index.js                   # Server entry point
server.js                  # Express app bootstrap
```

## Tech Stack

- Node.js
- Express
- express-session
- CORS

## Getting Started

```bash
npm install
npm start
```

The server starts from `index.js`.

## Related Repo

The matching frontend lives in [kambaz-next-js1](https://github.com/VIKAS0804/kambaz-next-js1).
