# Todo API - Backend

Backend API cho ứng dụng Todo List được xây dựng bằng Golang và Gin framework.

## 🚀 Cài đặt và chạy

### Yêu cầu
- Go 1.21+ 
- Git

### Cài đặt dependencies
```bash
go mod tidy
```

### Chạy ứng dụng
```bash
go run cmd/server/main.go
```

Server sẽ chạy trên `http://localhost:8080`

### Test API
```bash
curl http://localhost:8080/

curl http://localhost:8080/health
```

## 📁 Cấu trúc dự án

```
backend/
├── cmd/
│   └── server/
│       └── main.go          # Entry point
├── internal/
│   ├── handlers/            # HTTP handlers
│   ├── models/              # Data structures
│   ├── services/            # Business logic
│   └── storage/             # Data storage
├── go.mod                   # Dependencies
└── README.md
```

## 🔧 Công nghệ sử dụng

- **Golang**: Ngôn ngữ lập trình
- **Gin**: HTTP web framework
- **In-Memory Storage**: Lưu trữ dữ liệu trong RAM

## 📋 API Endpoints 
- `GET /tasks` - Lấy danh sách tasks
- `POST /tasks` - Tạo task mới
- `PUT /tasks/{id}` - Cập nhật task
- `DELETE /tasks/{id}` - Xóa task 