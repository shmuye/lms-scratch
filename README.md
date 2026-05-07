# Library Management System

A modern full-stack Library Management System built with the MERN stack (MongoDB, Express.js, React, Node.js). The application provides secure authentication, role-based access control, book borrowing workflows, email verification, and responsive dashboards for Admins, Librarians, and Readers.

## Features

**Authentication & Authorization**

- JWT-based authentication
- Secure access & refresh token flow
- Role-based authorization - _Admin_ - _Librarian_ - _Reader_
- Email verification using Resend
- Protected routes on frontend and backend
- Persistent login sessions with HTTP-only cookies

**Book Management**

- Create, update, and delete books
- Upload and manage book cover images
- Search and browse books
- View book availability and categories

**Borrowing System**

- Borrow books
- Return request workflow
- Borrow history tracking
- Due date management
- Borrow status handling

**Dashboards**

_Admin Dashboard_

- Manage users
- Create librarians
- Monitor borrowing activity
- View system metrics

_Librarian Dashboard_

- Handle return requests
- Manage borrowing operations
- View profile information

_Reader Dashboard_

- Browse books
- Search books
- Borrow and return books
- Track personal borrowing history

**Frontend Features**

- Responsive modern UI
- React Query for server state management
- Redux Toolkit for global state management
- Form validation with React Hook Form + Zod
- Reusable layouts and components
- Loading and error handling states

## Tech Stack

**Backend**

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Bcrypt
- Cookie Parser
- Resend Email API

**Frontend**

- React.js
- TypeScript
- Tailwind CSS
- React Router DOM
- Redux Toolkit
- TanStack Query
- React Hook Form
- Zod
- Axios

## Project Structure

lms-scratch/
│
├── backend/
│ ├── config/
│ ├── constants/
│ ├── controllers/
│ ├── db/
│ ├── middleware/
│ ├── models/
│ ├── routes/
│ ├── uploads/
│ ├── utils/
│ ├── app.js
│ └── server.js
│
├── frontend/
│ ├── src/
│ │ ├── assets/
│ │ ├── components/
│ │ ├── features/
│ │ ├── hooks/
│ │ ├── layouts/
│ │ ├── pages/
│ │ ├── routes/
│ │ ├── services/
│ │ ├── store/
│ │ ├── types/
│ │ ├── App.tsx
│ │ ├── main.tsx
│ │ └── index.css
│
└── shared/
└── validations/

## Setup Instructions

1. Clone the repository

git clone <repository-url>
cd lms-scratch

2. Backend Setup

cd backend

**_Install dependencies_**

npm install

Create a .env file based on .env.example

and populate all required environment variables

npm run dev

3. Frontend Setup

cd ../frontend

**_Install dependencies_**

npm install

Create a .env file based on .env.example
and populate all required environment variables

npm run dev
