# Nexora CRM SaaS Dashboard

Nexora is a full-stack AI-powered CRM dashboard for managing sales pipelines, contacts, tasks, notes, and customer follow-ups. It combines a modern React frontend with a Node.js/Express backend and MongoDB persistence, with optional Gemini-based AI assistance for lead summaries, email drafting, and sales insights.

## Overview

This project is designed for sales teams and small agencies that want to:

- Track and manage leads through pipeline stages
- Maintain contact records and customer context
- Organize tasks and follow-ups
- Capture notes tied to leads or contacts
- Monitor dashboard analytics and pipeline health
- Use AI to summarize leads and generate outreach content

## Tech Stack

### Frontend
- React 19
- Vite
- React Router
- Recharts for charts and analytics
- DnD Kit for pipeline drag-and-drop interactions
- Tailwind-inspired custom design system
- Lucide icons
- Axios for API calls

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT authentication
- CORS and custom middleware
- Gemini AI via Google GenAI SDK

## Features

### Authentication and user management
- User registration and login
- JWT-based protected routes
- Profile updates and company metadata
- Secure password hashing with bcrypt

### Lead management
- Create, edit, delete, and list leads
- Lead stages: New, Contacted, Qualified, Lost, Won
- Lead priority and source tracking
- Pipeline value metrics and ordering
- AI-generated lead summary and risk score

### Contact management
- Contact directory with search and filtering
- Favorite contacts support
- Company and tag data
- Relationship tracking for sales outreach

### Tasks and notes
- Create tasks with status and priority
- Link tasks to related leads or contacts
- Notes with pinning and filtering
- Context-specific follow-up organization

### Dashboard and analytics
- Executive overview cards
- Pipeline by stage breakdown
- Revenue and conversion analytics
- Recent lead activity
- Monthly lead trend chart
- Upcoming tasks and top deals summaries

### AI-powered sales tools
- AI lead summary generation
- Email draft generation for outreach
- Pipeline health and sales recommendations
- AI status checks for Gemini configuration

## Project Structure

```text
CRM SaaS Dashboard/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── ai.controller.js
│   │   ├── analytics.controller.js
│   │   ├── auth.controller.js
│   │   ├── contact.controller.js
│   │   ├── lead.controller.js
│   │   ├── note.controller.js
│   │   └── task.controller.js
│   ├── middlewares/
│   │   ├── auth.middleware.js
│   │   └── error.middleware.js
│   ├── models/
│   │   ├── Contact.js
│   │   ├── Lead.js
│   │   ├── Note.js
│   │   ├── Task.js
│   │   └── User.js
│   ├── routes/
│   │   ├── aiRoutes.js
│   │   ├── analyticsRoutes.js
│   │   ├── authRoutes.js
│   │   ├── contactRoutes.js
│   │   ├── leadRoutes.js
│   │   ├── noteRoutes.js
│   │   └── taskRoutes.js
│   ├── services/
│   │   └── ai.service.js
│   ├── utils/
│   │   ├── ApiError.js
│   │   ├── AsyncHandler.js
│   │   └── generateToken.js
│   ├── .env.example
│   ├── package.json
│   ├── server.js
│   └── seed.js (if used by project setup)
├── frontend/
│   ├── src/
│   ├── public/
│   ├── .env
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
├── .gitignore
└── README.md
```

## Environment Variables

### Backend (.env)
Create a `.env` file in the `backend` directory:

```env
NODE_ENV=development
PORT=8000
CLIENT_URL=http://localhost:5173
MONGO_URI=mongodb://127.0.0.1:27017/nexora-crm
JWT_SECRET=your-super-secret-key
GEMINI_API_KEY=your_google_gemini_api_key
GEMINI_MODEL=gemini-2.5-flash
```

### Frontend (.env)
Create a `.env` file in the `frontend` directory:

```env
VITE_API_URL=http://localhost:8000/api
```

## Installation

### 1) Install backend dependencies

```bash
cd backend
npm install
```

### 2) Install frontend dependencies

```bash
cd frontend
npm install
```

## Running the Project

### Start the backend

```bash
cd backend
npm run dev
```

The API will start on:

```text
http://localhost:8000
```

### Start the frontend

```bash
cd frontend
npm run dev
```

The app will run on:

```text
http://localhost:5173
```

## Default Routes

### Public routes
- `/login`
- `/register`

### Authenticated app routes
- `/` — Dashboard
- `/leads` — Lead management
- `/contacts` — Contact directory
- `/pipeline` — Sales pipeline board
- `/notes` — Notes
- `/tasks` — Tasks and follow-ups
- `/settings` — User settings

## API Highlights

The backend exposes REST endpoints under `/api`:

- `/api/auth` — login, register, me, profile update
- `/api/leads` — lead CRUD and reorder actions
- `/api/contacts` — contact CRUD
- `/api/tasks` — task CRUD
- `/api/notes` — note CRUD
- `/api/analytics` — dashboard analytics overview
- `/api/ai` — AI status, lead summary, email generation, sales insights
- `/api/health` — health check endpoint

## AI Behavior

AI features are designed to work with Google Gemini. If `GEMINI_API_KEY` is not configured, the API will return a proper error response and the UI can indicate that AI is unavailable.

The AI services currently include:

- Lead summary generation
- Risk evaluation
- Recommended next step
- Email drafting for outreach
- Pipeline insight recommendations

## Notes

- The backend is structured around MongoDB collections for users, leads, contacts, tasks, and notes.
- The frontend is designed as a one-page CRM experience with dashboard-driven navigation and reusable UI components.
- The app is built as a SaaS-style internal sales tool, focusing on workflow efficiency and data visibility.

## License

This project is licensed under the ISC License unless otherwise specified in the repository.

## Contributing

Pull requests and feature improvements are welcome. For larger changes, it is recommended to discuss the idea in the project before implementing.

## Project Status

This app is a working CRM dashboard template with a complete frontend and backend foundation for real-world sales workflow management and AI-assisted operations.
