# Buổi 1: Project Setup + Environment

## 🎯 Mục tiêu
Sau buổi học này bạn sẽ hiểu:
- Cách tổ chức một Node.js/TypeScript project production-ready
- Mục đích của từng file cấu hình
- Cách Docker Compose giúp quản lý infrastructure cục bộ
- Cách Prisma ORM kết nối với PostgreSQL

---

## 📁 Giải thích từng file

### 1. `package.json` — Khai báo project và dependencies

```json
{
  "dependencies": {
    "express": "Framework HTTP",
    "cors": "Cho phép cross-origin requests",
    "dotenv": "Load biến môi trường từ .env",
    "@prisma/client": "Database client (tự sinh từ schema)",
    "axios": "HTTP client để gọi API ngoài"
  },
  "devDependencies": {
    "typescript": "Transpiler TypeScript → JavaScript",
    "ts-node": "Chạy TypeScript trực tiếp (không cần build)",
    "nodemon": "Tự restart server khi file thay đổi",
    "prisma": "CLI để migrate DB, generate client"
  }
}
```

**Scripts quan trọng:**
- `npm run dev` → Dùng `nodemon` + `ts-node` để hot-reload trong development
- `npm run build` → Compile TypeScript sang JavaScript vào thư mục `dist/`
- `npm start` → Chạy file đã compile (production)
- `npm run prisma:migrate` → Tạo/cập nhật bảng trong database

---

### 2. `tsconfig.json` — Cấu hình TypeScript

```json
{
  "target": "ES2020",    // Compile sang JavaScript ES2020
  "module": "commonjs",  // Dùng require() (Node.js style)
  "outDir": "dist",      // Output ra thư mục dist/
  "rootDir": "src",      // Source code ở thư mục src/
  "strict": true         // Bật tất cả type checks nghiêm ngặt
}
```

**Tại sao cần TypeScript?**
- Phát hiện lỗi lúc compile thay vì lúc runtime
- IDE auto-complete và type hints
- Code dễ đọc, dễ maintain hơn

---

### 3. `.env` — Biến môi trường (KHÔNG commit lên Git)

```
DATABASE_URL  → Connection string tới PostgreSQL
REDIS_URL     → Connection string tới Redis
PORT          → Port server lắng nghe
JWT_SECRET    → Khóa ký JWT token (phải giữ bí mật!)
```

**⚠️ Quan trọng:** File `.env` chứa secrets → luôn có trong `.gitignore`

---

### 4. `.env.example` — Template biến môi trường (commit lên Git)

File này giúp developer mới biết cần set những biến gì, nhưng không chứa giá trị thực.

---

### 5. `.gitignore` — Các file/thư mục không commit

```
node_modules/  → Dependencies (rất nặng, install lại từ package.json)
.env           → Secrets
dist/          → Build artifacts (generate lại từ source)
logs/          → Log files
```

---

### 6. `docker-compose.yml` — Infrastructure cục bộ

Docker Compose tạo 2 containers:

**PostgreSQL 15:**
```yaml
postgres:
  image: postgres:15
  environment:
    POSTGRES_DB: booking_system  # Tạo database tự động
  ports:
    - '5432:5432'                # host:container
  volumes:
    - postgres_data:/var/lib/postgresql/data  # Persistent storage
```

**Redis 7.0:**
```yaml
redis:
  image: redis:7.0
  ports:
    - '6379:6379'
```

**Tại sao dùng Docker Compose?**
- Không cần cài PostgreSQL/Redis trực tiếp trên máy
- Mọi developer trong team có cùng môi trường
- Dễ dàng reset, xóa, tạo lại

---

### 7. `prisma/schema.prisma` — Database schema

```prisma
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String
  password  String
  role      String   @default("user")
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

**Prisma hoạt động như thế nào?**
1. Bạn định nghĩa schema trong `schema.prisma`
2. Chạy `prisma migrate dev` → Prisma tạo SQL migration và apply vào DB
3. Chạy `prisma generate` → Prisma sinh TypeScript client với full type safety

---

### 8. `src/config/database.ts` — Prisma Client instance

```typescript
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient({ log: ['query', 'error'] });
export default prisma;
```

Export một instance duy nhất (singleton pattern) để tái sử dụng trong toàn bộ app.

---

### 9. `src/app.ts` — Express application

```typescript
app.use(cors())          // Cho phép browser gọi API
app.use(express.json())  // Parse JSON request body

// Health check endpoint
app.get('/api/health', ...)

// 404 handler
app.use((req, res) => res.status(404).json(...))

// Error handler (4 tham số = error middleware)
app.use((error, req, res, next) => ...)
```

---

### 10. `src/index.ts` — Entry point

```typescript
import app from './app';
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```

Tách `app.ts` và `index.ts` để dễ test (import app mà không start server).

---

## ✅ Checklist setup

```bash
# 1. Cài dependencies
npm install

# 2. Tạo .env
cp .env.example .env

# 3. Start database và Redis
docker-compose up -d

# 4. Tạo tables trong database
npm run prisma:migrate

# 5. Start server
npm run dev

# 6. Test health check
curl http://localhost:3000/api/health
# → {"status":"OK","message":"Booking System API is running"}
```

---

## 🔍 Kiểm tra kết quả

| Lệnh | Kết quả mong đợi |
|---|---|
| `docker ps` | Thấy `booking_postgres` và `booking_redis` đang running |
| `npm run dev` | Server khởi động, log "🚀 Server running on port 3000" |
| `curl localhost:3000/api/health` | `{"status":"OK"}` |
| `npx prisma studio` | Mở GUI quản lý DB tại localhost:5555 |
