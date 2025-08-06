# Todo Application

## Clone Repo
```bash
git clone<https://github.com/minduck1103/fullstack-todolist-golang.git>
```

## Backend Setup

### Prerequisites
- Go 1.21 or higher
- Git

### Installation & Run
```bash
# Navigate to backend directory
cd backend

# Install dependencies
go mod download

# Run the server
go run cmd/server/main.go
```

The backend will start on `http://localhost:8080`

## Frontend Setup

### Prerequisites
- Node.js 18 or higher
- npm or yarn

### Installation & Run
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Run development server
npm run dev
```

The frontend will start on `http://localhost:5173`

## Environment Variables

### Backend (.env.local file in backend directory)
```
PORT=8080
HOST=0.0.0.0
ENV=development
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000
```

### Frontend (.env.local file in frontend directory)
```
VITE_API_BASE_URL=http://localhost:8080
VITE_API_TIMEOUT=10000
VITE_ENV=development
```
