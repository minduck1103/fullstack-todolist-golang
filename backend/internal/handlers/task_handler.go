package handlers

import (
	"net/http"
	"strconv"

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

	// Kiểm tra request body hợp lệ
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Dữ liệu không hợp lệ: " + err.Error(),
		})
		return
	}

	response, err := h.service.CreateTask(&req)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}
	
	// Trả về task đầy đủ thay vì chỉ ID
	task := &models.Task{
		ID:        response.ID,
		Text:      req.Text,
		Completed: false,
	}
	c.JSON(http.StatusCreated, task)
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
	
	// Kiểm tra ID hợp lệ
	if _, err := strconv.Atoi(id); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "ID không hợp lệ",
		})
		return
	}
	
	// Đọc dữ liệu từ request body
	var req models.UpdateTaskRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Dữ liệu không hợp lệ: " + err.Error(),
		})
		return
	}
	
	// Cập nhật task
	updatedTask, err := h.service.UpdateTask(id, &req)
	if err != nil {
		// Xử lý status code phù hợp
		if err.Error() == "task không tồn tại" {
			c.JSON(http.StatusNotFound, gin.H{
				"error": err.Error(),
			})
		} else {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})
		}
		return
	}
	
	// Trả về task đã cập nhật
	c.JSON(http.StatusOK, updatedTask)
}

// Xử lý DELETE /tasks/{id}
func (h *TaskHandler) DeleteTask(c *gin.Context) {
	// Lấy ID từ URL parameter
	id := c.Param("id")
	
	// Kiểm tra ID hợp lệ
	if _, err := strconv.Atoi(id); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "ID không hợp lệ",
		})
		return
	}
	
	// Xóa task
	err := h.service.DeleteTask(id)
	if err != nil {
		// Xử lý status code phù hợp
		if err.Error() == "task không tồn tại" {
			c.JSON(http.StatusNotFound, gin.H{
				"error": err.Error(),
			})
		} else {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})
		}
		return
	}
	
	// Trả về thông báo thành công
	c.JSON(http.StatusOK, gin.H{
		"message": "Task đã được xóa thành công",
	})
} 