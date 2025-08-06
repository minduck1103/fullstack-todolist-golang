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
├── components/          # React components chung
│   ├── LoadingSpinner.jsx
│   ├── EmptyState.jsx
│   └── ErrorState.jsx
├── hooks/              # Custom React hooks chung
│   └── useTasks.js
├── pages/              # Page components
│   └── todo/           # Todo page
│       ├── components/ # Components riêng cho todo
│       │   ├── TodoList.jsx
│       │   └── TodoItem.jsx
│       └── index.jsx   # Todo page chính
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
- **Tailwind CSS**: Styling framework
- **Lucide React**: Icon library

## 📋 PR Progress

### ✅ PR 1: Setup cơ bản và cấu trúc dự án
- [x] Cài đặt dependencies (axios)
- [x] Tạo cấu trúc thư mục components
- [x] Setup API service layer
- [x] Tạo constants và utilities cơ bản
- [x] Tạo type definitions
- [x] Test API connection

### ✅ PR 2: TodoList Component
- [x] Component hiển thị danh sách tasks
- [x] Loading states và error handling
- [x] Styling với Tailwind CSS
- [x] Custom hooks cho state management
- [x] Components: TodoList, TodoItem, LoadingSpinner, EmptyState, ErrorState
- [x] Responsive design

### 🔄 PR 3: AddTodo Component (Next)
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

## 🎨 Features PR 2

### Components đã tạo:
- **TodoList**: Component chính hiển thị danh sách tasks
- **TodoItem**: Component cho từng task item với checkbox và nút xóa
- **LoadingSpinner**: Component loading với nhiều kích thước
- **EmptyState**: Component hiển thị khi không có tasks
- **ErrorState**: Component hiển thị khi có lỗi với nút retry

### Features:
- ✅ Hiển thị danh sách tasks từ API `GET /tasks`
- ✅ Loading states cho initial load và updates
- ✅ Error handling với retry functionality
- ✅ Empty state khi không có tasks
- ✅ Styling đẹp với Tailwind CSS
- ✅ Responsive design
- ✅ Custom hook `useTasks` cho state management
- ✅ Optimistic updates cho toggle complete và delete

## 🧪 Test

```bash
# Chạy linter
npm run lint

# Build production
npm run build

# Preview build
npm run preview
```
