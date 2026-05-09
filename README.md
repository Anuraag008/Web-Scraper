## Project Overview

This project is a full-stack MERN application built as part of a Full Stack Developer assignment.

The application scrapes the top stories from Hacker News, stores them in MongoDB, and provides authentication and bookmarking functionality through REST APIs and a React frontend.

---

# Features

## Backend Features

- JWT Authentication
- User Registration & Login
- Password Hashing using bcryptjs
- Hacker News Web Scraper using Axios & Cheerio
- Automatic Scraping on Server Start
- Manual Scraping API Endpoint
- Fetch All Stories API
- Fetch Single Story API
- Bookmark Toggle API
- Protected Routes using JWT Middleware
- MongoDB Integration using Mongoose
- Pagination Support

---

## Frontend Features

- React + Vite Frontend
- React Context API for Authentication State Management
- Login & Register Pages
- Display Top Hacker News Stories
- Bookmark Stories
- Protected Bookmarks Page
- Persistent Login using localStorage
- Responsive UI

---

# Tech Stack

## Frontend

- React
- Vite
- React Router DOM
- Axios
- Tailwind CSS

## Backend

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT
- bcryptjs
- Axios
- Cheerio

---

# Project Structure

```bash
project-root/
│
├── backend/
│   │
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── scrapeController.js
│   │   └── storyController.js
│   │
│   ├── middleware/
│   │   └── authMiddleware.js
│   │
│   ├── models/
│   │   ├── Story.js
│   │   └── User.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── scrapeRoutes.js
│   │   └── storyRoutes.js
│   │
│   ├── scraper/
│   │   └── scraperService.js
│   │
│   ├── .env
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
│
├── frontend/
│   │
│   ├── public/
│   │
│   ├── src/
│   │   │
│   │   ├── api/
│   │   │   └── axios.js
│   │   │
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   └── StoryCard.jsx
│   │   │
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   │
│   │   ├── hooks/
│   │   │
│   │   ├── pages/
│   │   │   ├── Bookmarks.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   │
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── .env
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   └── package-lock.json
│
└── README.md
```

---

# API Endpoints

## Authentication Routes

### Register User

```http
POST /api/auth/register
```

### Login User

```http
POST /api/auth/login
```

---

## Story Routes

### Get All Stories

```http
GET /api/stories
```

### Get Single Story

```http
GET /api/stories/:id
```

### Toggle Bookmark

```http
POST /api/stories/:id/bookmark
```

Protected Route

---

### Get Bookmarked Stories

```http
GET /api/stories/bookmarks
```

Protected Route

---

## Scraper Route

### Trigger Scraper

```http
POST /api/scrape
```

---

# Environment Variables

## Backend `.env`

Create a `.env` file inside the backend folder.

```env
PORT=5000

MONGO_URI=YOUR_MONGODB_CONNECTION_STRING

JWT_SECRET=YOUR_SECRET_KEY
```

---

## Frontend `.env`

Create a `.env` file inside the frontend folder.

```env
VITE_API_URL=http://localhost:5000
```

---

# Setup Instructions

## Clone Repository

```bash
git clone https://github.com/Anuraag008/Web-Scraper.git
```

---

# Backend Setup

Navigate to backend folder:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Run backend server:

```bash
npm run dev
```

Backend runs on:

```bash
http://localhost:5000
```

---

# Frontend Setup

Navigate to frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Run frontend server:

```bash
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

# Web Scraper Details

The scraper fetches the top 10 stories from Hacker News.

Scraped fields:

- Title
- URL
- Points
- Author
- Posted Time

The scraper:

- Runs automatically when the backend server starts
- Can also be triggered manually using:

```http
POST /api/scrape
```

---

# Authentication Flow

- User registers using email and password
- Password is hashed using bcryptjs
- JWT token is generated on successful login/register
- Protected routes require Bearer token authentication

---

# Bookmark Functionality

Authenticated users can:

- Bookmark stories
- Remove bookmarks
- View bookmarked stories on a protected page

Bookmarks are stored in MongoDB and linked to the authenticated user.

---

# Pagination

Pagination support is implemented using query parameters.

Example:

```http
GET /api/stories?page=1&limit=10
```

---

# Deployment

## Frontend Deployment

- Vercel

## Backend Deployment

- Render

## Database

- MongoDB Atlas

---

# Loom Video Walkthrough

Loom Video Link:

```txt
https://www.loom.com/share/603b7b76302943989188e968bc8cb5e2
```

---

# Author

Name: Anuraag
