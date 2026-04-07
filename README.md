# Booking System Backend

Production-ready Booking System API built with **Node.js**, **TypeScript**, **Express**, **PostgreSQL** (via Prisma ORM), and **Redis**.

---

## 🛠 Tech Stack

| Technology | Purpose |
|---|---|
| Node.js + TypeScript | Runtime & type safety |
| Express | HTTP framework |
| PostgreSQL 15 | Primary database |
| Prisma ORM | Database client & migrations |
| Redis 7 | Caching & sessions |
| Docker Compose | Local development infrastructure |
| JWT | Authentication |

---

## 📋 Prerequisites

- [Node.js](https://nodejs.org) v18+
- [Docker](https://www.docker.com) & Docker Compose
- [Git](https://git-scm.com)

---

## 🚀 Quick Start

### 1. Clone the repository

```bash
git clone https://github.com/TranNgon/booking-system-backend.git
cd booking-system-backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

```bash
cp .env.example .env
```

Edit `.env` with your actual values (the defaults work with the provided Docker Compose setup).

### 4. Start infrastructure (PostgreSQL + Redis)

```bash
docker-compose up -d
```

### 5. Run database migrations

```bash
npm run prisma:migrate
```

### 6. Start the development server

```bash
npm run dev
```

### 7. Verify the server is running

```bash
curl http://localhost:3000/api/health
```

Expected response:
```json
{
  "status": "OK",
  "message": "Booking System API is running",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

---

## 📜 Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start development server with hot-reload |
| `npm run build` | Compile TypeScript to JavaScript |
| `npm start` | Start production server (requires build) |
| `npm run prisma:migrate` | Run database migrations |
| `npm run prisma:generate` | Regenerate Prisma client |
| `npm run prisma:studio` | Open Prisma Studio (database GUI) |

---

## 🗂 Project Structure

```
booking-system-backend/
├── src/
│   ├── config/
│   │   └── database.ts      # Prisma client instance
│   ├── app.ts               # Express app setup
│   └── index.ts             # Server entry point
├── prisma/
│   └── schema.prisma        # Database schema
├── docker-compose.yml       # Infrastructure services
├── tsconfig.json            # TypeScript configuration
├── package.json
├── .env.example             # Environment variable template
└── README.md
```

---

## 🔧 Environment Variables

| Variable | Description | Default |
|---|---|---|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://postgres:postgres@localhost:5432/booking_system` |
| `REDIS_URL` | Redis connection string | `redis://localhost:6379` |
| `PORT` | Server port | `3000` |
| `NODE_ENV` | Environment | `development` |
| `JWT_SECRET` | JWT signing secret | *(change in production)* |
| `JWT_REFRESH_SECRET` | JWT refresh token secret | *(change in production)* |
| `JWT_EXPIRES_IN` | JWT expiry | `1d` |
| `JWT_REFRESH_EXPIRES_IN` | JWT refresh token expiry | `7d` |

---

## 🐳 Docker Services

| Service | Port | Description |
|---|---|---|
| PostgreSQL 15 | 5432 | Primary database |
| Redis 7.0 | 6379 | Cache & session store |

---

## 🛑 Troubleshooting

### Port already in use
```bash
# Check what is using the port
lsof -i :5432
lsof -i :6379
lsof -i :3000
```

### Docker containers not starting
```bash
# Check container logs
docker-compose logs postgres
docker-compose logs redis
```

### Prisma migration errors
```bash
# Reset the database (WARNING: deletes all data)
npx prisma migrate reset
```

### TypeScript compilation errors
```bash
# Clean build artifacts and rebuild
rm -rf dist && npm run build
```
