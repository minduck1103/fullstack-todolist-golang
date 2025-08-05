package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"todo-api/internal/models"
	"todo-api/internal/services"
)

// Xử lý HTTP requests cho tasks
type TaskHandler struct {
	service *services.TaskService
}

// Tạo handler mới
func NewTaskHandler(service *services.TaskService) *TaskHandler {
	return &TaskHandler{
		service: service,
	}
}

// Xử lý POST /tasks
func (h *TaskHandler) CreateTask(c *gin.Context) {
	var req models.CreateTaskRequest

	c.ShouldBindJSON(&req)
	response, err := h.service.CreateTask(&req)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}
	c.JSON(http.StatusCreated, response)
}

// Xử lý GET /tasks
func (h *TaskHandler) GetAllTasks(c *gin.Context) {
	// Lấy tất cả tasks
	tasks := h.service.GetAllTasks()
	
	// Trả về danh sách tasks
	c.JSON(http.StatusOK, tasks)
}

// Xử lý PUT /tasks/{id}
func (h *TaskHandler) UpdateTask(c *gin.Context) {
	// Lấy ID từ URL parameter
	id := c.Param("id")
	
	// Đọc dữ liệu từ request body
	var req models.UpdateTaskRequest
	c.ShouldBindJSON(&req)
	
	// Cập nhật task
	updatedTask, err := h.service.UpdateTask(id, &req)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}
	
	// Trả về task đã cập nhật
	c.JSON(http.StatusOK, updatedTask)
}

// Xử lý DELETE /tasks/{id}
func (h *TaskHandler) DeleteTask(c *gin.Context) {
	// Lấy ID từ URL parameter
	id := c.Param("id")
	
	// Xóa task
	err := h.service.DeleteTask(id)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}
	
	// Trả về thông báo thành công
	c.JSON(http.StatusOK, gin.H{
		"message": "Task đã được xóa thành công",
	})
} 