package services

import (
	"strconv"
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
func (s *TaskService) CreateTask(req *models.CreateTaskRequest) *models.CreateTaskResponse {
	// Tạo task mới
	task := &models.Task{
		Title:       req.Title,
		Description: req.Description,
		Completed:   false,
	}

	// Lưu vào storage
	createdTask, _ := s.storage.Create(task)

	// Trả về kết quả
	return &models.CreateTaskResponse{
		ID: createdTask.ID,
	}
}

// Lấy tất cả tasks
func (s *TaskService) GetAllTasks() []*models.Task {
	return s.storage.GetAll()
}

// Cập nhật task
func (s *TaskService) UpdateTask(idString string, req *models.UpdateTaskRequest) *models.Task {
	// Chuyển string ID thành int
	id, _ := strconv.Atoi(idString)
	
	return s.storage.Update(id, req.Completed)
}

// Xóa task
func (s *TaskService) DeleteTask(idString string) {
	// Chuyển string ID thành int
	id, _ := strconv.Atoi(idString)
	
	// Xóa khỏi storage
	s.storage.Delete(id)
} 