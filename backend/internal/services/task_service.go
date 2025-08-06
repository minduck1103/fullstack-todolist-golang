package services

import (
	"strconv"
	"time"
	"todo-api/internal/models"
	"todo-api/internal/storage"
)

// Xử lý logic nghiệp vụ cho tasks
type TaskService struct {
	storage *storage.MemoryStorage
}

// Tạo service mới
func NewTaskService(storage *storage.MemoryStorage) *TaskService {
	return &TaskService{
		storage: storage,
	}
}

// Tạo task mới
func (s *TaskService) CreateTask(req *models.CreateTaskRequest) (*models.CreateTaskResponse, error) {
	task := &models.Task{
		Text:      req.Text,
		Completed: false,
		CreatedAt: time.Now(),
	}

	// Lưu vào storage
	createdTask, err := s.storage.Create(task)
	if err != nil {
		return nil, err
	}

	// Trả về kết quả
	return &models.CreateTaskResponse{
		ID: createdTask.ID,
	}, nil
}

// Lấy tất cả tasks
func (s *TaskService) GetAllTasks() []*models.Task {
	return s.storage.GetAll()
}

// Cập nhật task
func (s *TaskService) UpdateTask(idString string, req *models.UpdateTaskRequest) (*models.Task, error) {
	// Chuyển string ID thành int
	id, _ := strconv.Atoi(idString)
	
	return s.storage.Update(id, req)
}

// Xóa task
func (s *TaskService) DeleteTask(idString string) error {
	// Chuyển string ID thành int
	id, _ := strconv.Atoi(idString)
	
	// Xóa khỏi storage
	return s.storage.Delete(id)
} 