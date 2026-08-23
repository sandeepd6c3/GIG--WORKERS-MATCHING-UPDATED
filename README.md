# GigMatch - AI-Powered Gig Workers Matching Platform

GigMatch is a modern full-stack marketplace connecting local customers with verified gig professionals across trades such as plumbing, electrical work, cleaning, carpentry, and home maintenance.

## Project Architecture

```
GIG-Workers-Matching/
│
├── frontend/                         # React Frontend (Vite + Lucide Icons + React Router)
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── common/              # Navbar, Footer, Loader, ProtectedRoute
│   │   │   ├── customer/            # WorkerCard, SearchBar, CategoryCard
│   │   │   ├── worker/              # BookingCard, EarningsCard, AvailabilityToggle
│   │   │   └── admin/               # Sidebar, StatCard, DataTable, AdminNavbar
│   │   ├── pages/
│   │   │   ├── auth/                # Login, Register, ForgotPassword
│   │   │   ├── customer/            # Home, Categories, FindWorkers, WorkerProfile, Booking, MyBookings, Notifications, Profile
│   │   │   ├── worker/              # Dashboard, Profile, Bookings, Earnings, Reviews, Verification, Notifications
│   │   │   └── admin/               # Dashboard, Users, Workers, Bookings, Categories, Reviews, Payments, Analytics, Verification, Settings
│   │   ├── services/                # Axios API services (Auth, Worker, Booking, Category, Admin)
│   │   ├── context/                 # AuthContext & NotificationContext
│   │   ├── hooks/                   # useAuth & useApi
│   │   ├── routes/                  # AppRoutes
│   │   └── utils/                   # Constants & Helpers
│   ├── package.json
│   └── vite.config.js
│
├── backend/                          # Node.js + Express Backend API
│   ├── config/                      # Database & Environment Configuration
│   ├── models/                      # User, Worker, Category, Booking, Review, Notification
│   ├── controllers/                 # Auth, User, Worker, Category, Booking, Review, Notification, Admin
│   ├── routes/                      # API Route Definitions
│   ├── middleware/                  # Auth, Admin, Error, Upload
│   ├── services/                    # Business Logic Services
│   ├── utils/                       # Token generation, Validators, Responses
│   ├── seed/                        # Category & Worker Data Seeds
│   ├── server.js
│   └── package.json
```

## Running the Application

### Install Dependencies
```bash
npm run install-all
```

### Start Frontend & Backend Concurrently
```bash
npm run dev
```

- **Frontend App**: `http://localhost:5173`
- **Backend API**: `http://localhost:5000/api/v1`
