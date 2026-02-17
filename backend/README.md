# 🏃 Xtrail Running Backend 🏃

The backend for the Xtrail Running App as a RESTful API built with NestJS for managing users, runs and achievements. Uses Passport and JWT for authentication together with TypeORM for database management.


## 🛠️ Tech Stack

<div align="center">
 <a href="https://nodejs.org/">
    <img src="https://img.shields.io/badge/node.js-026E00?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
  </a>
  <a href="https://typescriptlang.org">
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  </a>
  <a href="https://jwt.io/">
    <img src="https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens" alt="JWT" />
  </a>
  <a href="https://typeorm.io/">
    <img src="https://img.shields.io/badge/TypeORM-FE0803?style=for-the-badge&logo=typeorm&logoColor=fff" alt="TypeORM" />
  </a>
  <a href="https://swagger.io/">
    <img src="https://img.shields.io/badge/-Swagger-%23Clojure?style=for-the-badge&logo=swagger&logoColor=white" alt="Swagger" />
  </a>
  <a href="https://nestjs.com/">
    <img src="https://img.shields.io/badge/NestJs-ea2845?style=for-the-badge&logo=nestjs&logoColor=white" alt="NestJS" />
  </a>
  <a href="https://angular.dev/">
    <img src="https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white" alt="Angular" />
  </a>
  <a href="https://tailwindcss.com/">
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  </a>
  <a href="https://heroicons.com/">
    <img src="https://img.shields.io/badge/Heroicons-8B5CF6?style=for-the-badge&logo=heroicons&logoColor=white" alt="Heroicons" />
  </a>
</div>

## Features

- **User Authentication** - Register, login with JWT tokens and bcrypt password hashing
- **Profile Management** - Update personal info, fitness goals (gain/lose/healthy)
- **Run Tracking** - Log runs with distance, pace, calories, duration, and elevation
- **Run Statistics** - View aggregated stats (total distance, average pace, longest run)
- **Achievement System** - Unlock 7 achievements based on milestones (first run, 10K club, etc.)
- **Role-Based Access** - Admin and user roles with protected routes
- **API Documentation** - Interactive Swagger docs

## Local installation

#### Prerequisites
- Node.js 18+ (see package.json)
- Docker (recommended) or PostgreSQL directly
- Npm package manager

## Clone from Git

```bash
git clone https://github.com/yoanastamenova/Xtrail
cd Xtrail
```

## Install packages and dependencies

```bash
npm install
```

## Environment Configuration

Create a `.env` file in the backend folder with the specifications from the `.env.example`

```env
PORT=3000

#PostgreSQL config
DB_TYPE=postgres
DB_HOST=thehost
DB_PORT=5432
DB_USERNAME=username
DB_PASSWORD=password
DB_NAME=xtrail

#JWT config
JWT_SECRET=yoursecret
JWT_EXPIRATION=1d
```

## Running the database

#### From terminal using command line

```bash
docker run -d --name xtrail-db -e POSTGRES_USER=youruser -e POSTGRES_PASSWORD=yourpassword -e POSTGRES_DB=xtrail -p 5432:5432 postgres:16
```

#### From Docker desktop

Include all .env variables

## Running the Application

```bash
# Development server
npm run start:dev

# Production mode
npm run build
npm run start:prod
```

The API will be available at http://localhost:3000

## Seeding the Database

Populate the database with achievements data:

```bash
npm run seed
```

This will insert the 7 types of achievements available.

## Database Configuration 

### User Entity Schema

| Field       | Type          | Constraints           | Description                    |
|-------------|---------------|-----------------------|--------------------------------|
| id          | number        | Primary Key, Auto     | Unique identifier              |
| username    | string        | Unique, Not Null      | Unique username                |
| email       | text          | Unique, Not Null      | Unique email                   |
| password    | string        | Not Null              | Hashed with bcrypt             |
| age         | number        | Not Null              | Age as number                  |
| weight      | number        | Not Null              | Weight in kilograms            |
| height      | number        | Not Null              | Height in centimeters          |
| goal        | enum          | Not Null              | Can be healthy, lose, gain     |
| role        | enum          | Not Null              | Can be user or admin           |
| createdAt   | Date          | Auto                  | Account creation timestamp     |


### Run Entity Schema

| Field       | Type          | Constraints           | Description                    |
|-------------|---------------|-----------------------|--------------------------------|
| id          | number        | Primary Key, Auto     | Unique identifier              |
| distance    | number        | Not Null              | Total distance in KM           |
| pace        | number        | Not Null              | Average pace                   |
| calories    | number        | Not Null              | Total burned kcal              |
| duration    | number        | Not Null              | Duration in time               |
| elevation   | number        | Not Null              | Elevation in meters            |
| date        | Date          | Not Null              | Date in DD/MM/YYYY             |


### Achievements Entity Schema

| Field       | Type          | Constraints           | Description                    |
|-------------|---------------|-----------------------|--------------------------------|
| id          | number        | Primary Key, Auto     | Unique identifier              |
| name        | string        | Unique, Not Null      | Name of the award              |
| description | text          | Not Null              | Description of the award       |
| icon        | string        | Not Null              | Icon to display                |
| createdAt   | Date          | Not Null              | Date in DD/MM/YYYY             |

TypeORM is configured with synchronize: false, which does not automatically create/update tables based on entity definitions.

### Entity Relationships

- **User → Run**: One user can have many runs (1:N)
- **User → Achievements**: Many-to-many relationship via UserAchievements join table

## Authentication

All protected endpoints require a valid JWT token in the Authorization header:

```
Authorization: Bearer <your_token>
```

### Getting a Token

1. Register a new user via `POST /auth/register`
2. Login via `POST /auth/login` to receive your JWT token
3. Include the token in subsequent requests

### Token Expiration

Tokens expire after 1 day (configurable via `JWT_EXPIRATION` in .env)

## Swagger documentation

A comprehensive guide on endpoints and their responses is written at 

http://localhost:3000/api

## Validation

The API uses class-validator decorators for automatic request validation. Invalid requests return `400 Bad Request` with detailed error messages.


## Error Handling

The API uses NestJS's built-in HTTP exceptions:

| Status Code | Exception             | Use Case                          |
|-------------|-----------------------|-----------------------------------|
| 400         | BadRequestException   | Validation errors                 |
| 404         | NotFoundException     | Resource not found                |
| 409         | ConflictException     | Duplicate name                    |
| 500         | InternalServerError   | Unexpected server errors          |

## Future Improvements

- [ ] Add comprehensive unit and e2e tests
- [ ] Implement pagination for entities
- [ ] Include date range filtering for runs (week/month)
- [ ] Add filtering and search capabilities
- [ ] Set up proper database migrations for production
- [ ] Containerize the application (Dockerfile)

## Contact

If you like what you see or if there is anything you want to report, please let me know on: 

<a href = "mailto:yoana.stamenovaa@gmail.com"><img src="https://img.shields.io/badge/Gmail-C6362C?style=for-the-badge&logo=gmail&logoColor=white" target="_blank"></a>  <a href="https://www.linkedin.com/in/yoanastamenova" target="_blank"><img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank"></a>

Made with <3 and ☕ from Yoana