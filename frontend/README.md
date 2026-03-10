# 🏃 Xtrail Running Frontend 🏃

The frontend for the Xtrail Running App built with Angular 20. A modern, responsive single-page application featuring a dark theme UI for tracking runs, viewing statistics, and earning achievements.


## 🛠️ Tech Stack

<div align="center">
  <a href="https://angular.dev/">
    <img src="https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white" alt="Angular" />
  </a>
  <a href="https://typescriptlang.org">
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  </a>
  <a href="https://tailwindcss.com/">
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="TailwindCSS" />
  </a>
  <a href="https://rxjs.dev/">
    <img src="https://img.shields.io/badge/RxJS-B7178C?style=for-the-badge&logo=reactivex&logoColor=white" alt="RxJS" />
  </a>
  <a href="https://www.chartjs.org/">
    <img src="https://img.shields.io/badge/Chart.js-FF6384?style=for-the-badge&logo=chartdotjs&logoColor=white" alt="Chart.js" />
  </a>
</div>

## Features

- **User Authentication** - Login, register, forgot password, and password reset flows
- **Run Tracking** - Log runs with built-in timer, distance, and automatic calorie calculation
- **Dashboard** - View running statistics with interactive Chart.js visualizations
- **Achievement System** - Track progress and unlock achievements based on milestones
- **Profile Management** - Update personal info, physical metrics, and fitness goals
- **Responsive Design** - Dark-themed UI optimized for desktop and mobile
- **Route Guards** - Protected routes with JWT token validation

## Local Installation

#### Prerequisites
- Node.js 18+
- npm package manager
- Backend API running (see backend README)

## Clone from Git

```bash
git clone https://github.com/yoanastamenova/Xtrail
cd Xtrail/frontend
```

## Install packages and dependencies

```bash
npm install
```

## Environment Configuration

The app uses environment files for API configuration:

- `src/environments/environment.ts` - Development (localhost:3000)
- `src/environments/environment.prod.ts` - Production

Default development configuration points to `http://localhost:3000/api`

## Running the Application

```bash
# Development server
ng serve

# Production build
ng build
```

The app will be available at http://localhost:4200

## Project Structure

```
src/
├── app/
│   ├── core/                 # Services, guards, interceptors
│   │   ├── guards/           # Auth and guest route guards
│   │   ├── interceptors/     # HTTP interceptors (auth, error handling)
│   │   └── services/         # API services (auth, runs, achievements)
│   ├── features/             # Feature modules
│   │   ├── auth/             # Login, register, forgot/reset password
│   │   ├── achievements/     # View and track achievements
│   │   ├── dashboard/        # Main dashboard with stats
│   │   ├── profile/          # User profile and settings
│   │   └── runs/             # New run, all runs, view run
│   └── shared/               # Shared components (modals, spinners)
├── assets/                   # Images, icons
└── environments/             # Environment configurations
```

## Key Components

| Component | Path | Description |
|-----------|------|-------------|
| Login | `/login` | User authentication |
| Register | `/register` | New user registration |
| Dashboard | `/dashboard` | Stats overview with charts |
| New Run | `/new-run` | Log a run with timer |
| All Runs | `/all-runs` | View run history |
| Achievements | `/achievements` | View unlocked achievements |
| Settings | `/settings` | Update profile and preferences |

## Authentication Flow

1. User registers or logs in
2. JWT token stored in localStorage
3. Auth interceptor attaches token to API requests
4. Route guards protect authenticated routes
5. Token expiration triggers redirect to login

## Future Improvements

- [ ] Implement toast notifications for actions
- [ ] Add pagination for runs list
- [ ] Add search and filter capabilities
- [ ] Add unit and e2e tests
- [ ] Add offline support with service workers

## Contact

If you like what you see or if there is anything you want to report, please let me know on:

<a href = "mailto:yoana.stamenovaa@gmail.com"><img src="https://img.shields.io/badge/Gmail-C6362C?style=for-the-badge&logo=gmail&logoColor=white" target="_blank"></a>  <a href="https://www.linkedin.com/in/yoanastamenova" target="_blank"><img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank"></a>

Made with <3 and ☕ from Yoana
