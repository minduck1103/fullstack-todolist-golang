package models

import "time"

// Cấu trúc dữ liệu cho một task
type Task struct {
	ID          int       `json:"id"`
	Text        string    `json:"text"`
	Completed   bool      `json:"completed"`
	CreatedAt   time.Time `json:"createdAt"`
}

// Dữ liệu nhận từ request khi tạo task
type CreateTaskRequest struct {
	Text string `json:"text"`
}

// Dữ liệu trả về khi tạo task thành công
type CreateTaskResponse struct {
	ID int `json:"id"`
}

// Dữ liệu nhận từ request khi cập nhật task
type UpdateTaskRequest struct {
	Text      *string `json:"text,omitempty"`
	Completed *bool   `json:"completed,omitempty"`
} 