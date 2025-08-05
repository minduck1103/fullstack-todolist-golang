package storage

import (
	"todo-api/internal/models"
)

// Lưu trữ tasks trong bộ nhớ (RAM)
type MemoryStorage struct {
	tasks  map[int]*models.Task
	nextID int
}

// Tạo storage mới
func NewMemoryStorage() *MemoryStorage {
	return &MemoryStorage{
		tasks:  make(map[int]*models.Task),
		nextID: 1,
	}
}

// Thêm task mới vào storage
func (s *MemoryStorage) Create(task *models.Task) (*models.Task, error) {
	// Gán ID cho task
	task.ID = s.nextID
	s.tasks[task.ID] = task
	s.nextID++

	return task, nil
}

// Lấy tất cả tasks
func (s *MemoryStorage) GetAll() []*models.Task {
	// Tạo slice để chứa tất cả tasks
	tasks := make([]*models.Task, 0, len(s.tasks))
	
	// Duyệt qua map và thêm vào slice
	for _, task := range s.tasks {
		tasks = append(tasks, task)
	}
	
	return tasks
} 