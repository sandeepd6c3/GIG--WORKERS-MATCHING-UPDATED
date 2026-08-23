# GIG-Workers-Matching-main

GIG Workers Matching Platform - Full Stack MERN Application.

## Project Structure

```
GIG-Workers-Matching-main/
│
├── client/                 ← React Frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── layouts/
│   │   ├── services/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── assets/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── server/                 ← Node + Express Backend
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── validators/
│   ├── .env
│   ├── package.json
│   └── server.js
│
├── .gitignore
├── README.md
└── package.json            ← root package
```

## Getting Started

```bash
# Install dependencies
npm run install-all

# Start client and server concurrently
npm run dev
```
