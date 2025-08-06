package storage

import (
	"errors"
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
	if task.Text == "" {
		return nil, errors.New("text không được để trống")
	}

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

// Cập nhật task theo ID
func (s *MemoryStorage) Update(id int, req *models.UpdateTaskRequest) (*models.Task, error) {
	// Tìm task theo ID
	task := s.tasks[id]
	
	// Kiểm tra task có tồn tại không
	if task == nil {
		return nil, errors.New("task không tồn tại")
	}
	
	// Cập nhật text nếu có
	if req.Text != nil {
		if *req.Text == "" {
			return nil, errors.New("text không được để trống")
		}
		task.Text = *req.Text
	}
	
	// Cập nhật trạng thái completed nếu có
	if req.Completed != nil {
		task.Completed = *req.Completed
	}
	
	return task, nil
}

// Xóa task theo ID
func (s *MemoryStorage) Delete(id int) error {
	// Kiểm tra task có tồn tại không
	if s.tasks[id] == nil {
		return errors.New("task không tồn tại")
	}
	
	// Xóa task khỏi map
	delete(s.tasks, id)
	return nil
} 