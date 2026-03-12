# Xtrail - Running Tracker App

A fullstack running tracker application that helps users log runs, track progress, and earn achievements. Built with Angular and NestJS.

<div align="center">
  <a href="https://angular.dev/">
    <img src="https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white" alt="Angular" />
  </a>
  <a href="https://nestjs.com/">
    <img src="https://img.shields.io/badge/NestJs-ea2845?style=for-the-badge&logo=nestjs&logoColor=white" alt="NestJS" />
  </a>
  <a href="https://typescriptlang.org">
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  </a>
  <a href="https://www.postgresql.org/">
    <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
  </a>
  <a href="https://tailwindcss.com/">
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="TailwindCSS" />
  </a>
</div>

## Features

- **User Authentication** - Register, login, forgot/reset password with JWT tokens
- **Run Tracking** - Log runs with timer, distance, pace, calories, and elevation
- **Dashboard** - View running statistics with interactive Chart.js visualizations
- **Achievement System** - Unlock achievements based on milestones (first run, 10K club, etc.)
- **Profile Management** - Update personal info, physical metrics, and fitness goals
- **Responsive Design** - Dark-themed UI optimized for desktop and mobile
- **API Documentation** - Interactive Swagger docs at `/api`

## Project Structure

```
Xtrail/
├── frontend/          # Angular application
│   ├── src/app/
│   │   ├── core/      # Services, guards, interceptors
│   │   ├── features/  # Auth, dashboard, runs, achievements, profile
│   │   └── shared/    # Reusable components
│   └── environments/  # Environment configs
│
└── backend/           # NestJS API
    ├── src/
    │   ├── auth/      # Authentication module
    │   ├── users/     # User management
    │   ├── runs/      # Run tracking
    │   └── achievements/ # Achievement system
    └── test/          # E2E tests
```

## Prerequisites

- **Node.js** 18+
- **npm** package manager
- **Docker** (recommended) or PostgreSQL installed locally

## Quick Start

### 1. Clone the repository

```bash
git clone https://github.com/yoanastamenova/Xtrail
cd Xtrail
```

### 2. Set up the database

Start a PostgreSQL container with Docker:

```bash
docker run -d \
  --name xtrail-db \
  -e POSTGRES_USER=xtrail \
  -e POSTGRES_PASSWORD=xtrail123 \
  -e POSTGRES_DB=xtrail \
  -p 5432:5432 \
  postgres:16
```

### 3. Configure the backend

Create a `.env` file in the `backend/` folder:

```env
PORT=3000

# PostgreSQL
DB_TYPE=postgres
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=xtrail
DB_PASSWORD=xtrail123
DB_NAME=xtrail

# JWT
JWT_SECRET=your-secret-key-change-in-production
JWT_EXPIRATION=1d
```

### 4. Install dependencies and start the backend

```bash
cd backend
npm install
npm run seed        # Populate achievements data
npm run start:dev   # Start in development mode
```

The API will be available at http://localhost:3000

### 5. Start the frontend

Open a new terminal:

```bash
cd frontend
npm install
npm start
```

The app will be available at http://localhost:4200

## Usage

1. **Register** - Create an account with your email, username, and fitness details
2. **Login** - Sign in to access your dashboard
3. **Log a Run** - Use the built-in timer to track your runs
4. **View Stats** - Check your progress on the dashboard with charts
5. **Achievements** - Track your milestones and unlock achievements

## API Documentation

Once the backend is running, visit http://localhost:3000/api for interactive Swagger documentation.

### Key Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register` | Register new user |
| POST | `/auth/login` | Login and get JWT |
| GET | `/runs` | Get user's runs |
| POST | `/runs` | Create a new run |
| GET | `/runs/stats` | Get aggregated stats |
| GET | `/achievements` | Get user achievements |
| GET | `/users/profile` | Get user profile |
| PATCH | `/users/profile` | Update profile |

## Available Scripts

### Backend (`/backend`)

| Command | Description |
|---------|-------------|
| `npm run start:dev` | Start in watch mode |
| `npm run build` | Build for production |
| `npm run start:prod` | Run production build |
| `npm run seed` | Seed achievements data |
| `npm run make-admin <email>` | Promote user to admin |
| `npm test` | Run unit tests |
| `npm run test:e2e` | Run e2e tests |

### Frontend (`/frontend`)

| Command | Description |
|---------|-------------|
| `npm start` | Start dev server |
| `npm run build` | Build for production |
| `npm test` | Run unit tests |

## Environment Configuration

### Backend `.env`

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | API port | `3000` |
| `DB_HOST` | Database host | `localhost` |
| `DB_PORT` | Database port | `5432` |
| `DB_USERNAME` | Database user | - |
| `DB_PASSWORD` | Database password | - |
| `DB_NAME` | Database name | `xtrail` |
| `JWT_SECRET` | JWT signing secret | - |
| `JWT_EXPIRATION` | Token expiry | `1d` |

### Frontend

Environment files are located in `frontend/src/environments/`:
- `environment.ts` - Development (points to `localhost:3000`)
- `environment.prod.ts` - Production

## Tech Stack

**Frontend:**
- Angular 21 with standalone components
- TailwindCSS 4 for styling
- Chart.js for data visualization
- RxJS for reactive programming

**Backend:**
- NestJS 11 framework
- TypeORM with PostgreSQL
- Passport + JWT authentication
- Swagger for API docs
- class-validator for validation

## Contact

<a href="mailto:yoana.stamenovaa@gmail.com"><img src="https://img.shields.io/badge/Gmail-C6362C?style=for-the-badge&logo=gmail&logoColor=white" target="_blank"></a>
<a href="https://www.linkedin.com/in/yoanastamenova" target="_blank"><img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank"></a>

---
