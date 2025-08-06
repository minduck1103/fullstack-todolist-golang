# Todo List Frontend

Frontend ứng dụng Todo List được xây dựng bằng ReactJS.

## 🚀 Cài đặt và chạy

### Yêu cầu
- Node.js 18+
- npm hoặc yarn

### Cài đặt dependencies
```bash
npm install
```

### Chạy ứng dụng
```bash
npm run dev
```

Ứng dụng sẽ chạy trên `http://localhost:5173`

## 📁 Cấu trúc dự án

```
src/
├── components/          # React components
│   └── index.js        # Component exports
├── hooks/              # Custom React hooks
│   └── index.js        # Hook exports
├── pages/              # Page components
│   └── todo.jsx        # Todo page
├── services/           # API services
│   └── api.js          # API configuration & functions
├── types/              # Type definitions
│   └── index.js        # Data shapes & constants
├── utils/              # Utility functions
│   ├── constants.js    # App constants
│   └── helpers.js      # Helper functions
├── App.jsx             # Main App component
└── main.jsx            # Entry point
```

## 🔧 Công nghệ sử dụng

- **React 19**: UI framework
- **Vite**: Build tool
- **Axios**: HTTP client
- **Lucide React**: Icon library

## 📋 PR Progress

### ✅ PR 1: Setup cơ bản và cấu trúc dự án
- [x] Cài đặt dependencies (axios)
- [x] Tạo cấu trúc thư mục components
- [x] Setup API service layer
- [x] Tạo constants và utilities cơ bản
- [x] Tạo type definitions
- [x] Test API connection

### 🔄 PR 2: TodoList Component (Next)
- [ ] Component hiển thị danh sách tasks
- [ ] Loading states và error handling
- [ ] Styling cơ bản

### ⏳ PR 3: AddTodo Component
- [ ] Form thêm task mới
- [ ] Validation
- [ ] Success/error feedback

### ⏳ PR 4: TodoItem Component
- [ ] Component cho từng task
- [ ] Checkbox hoàn thành
- [ ] Nút xóa task

### ⏳ PR 5: Integration
- [ ] Kết hợp tất cả components
- [ ] State management
- [ ] Real-time updates

### ⏳ PR 6: UI/UX Improvements
- [ ] Responsive design
- [ ] Animations
- [ ] Loading skeletons

### ⏳ PR 7: Testing & Optimization
- [ ] Unit tests
- [ ] Performance optimization
- [ ] Code cleanup

## 🔗 API Endpoints

Backend API chạy trên `http://localhost:8080` với các endpoints:

- `GET /tasks` - Lấy danh sách tasks
- `POST /tasks` - Tạo task mới
- `PUT /tasks/{id}` - Cập nhật task
- `DELETE /tasks/{id}` - Xóa task
- `GET /health` - Health check

## 🧪 Test

```bash
# Chạy linter
npm run lint

# Build production
npm run build

# Preview build
npm run preview
```
