package models

// Cấu trúc dữ liệu cho một task
type Task struct {
	ID          int    `json:"id"`
	Title       string `json:"title"`
	Description string `json:"description"`
	Completed   bool   `json:"completed"`
}

// Dữ liệu nhận từ request khi tạo task
type CreateTaskRequest struct {
	Title       string `json:"title"`
	Description string `json:"description"`
}

// Dữ liệu trả về khi tạo task thành công
type CreateTaskResponse struct {
	ID int `json:"id"`
} 