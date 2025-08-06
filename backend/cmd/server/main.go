package main

import (
	"net/http"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"todo-api/internal/handlers"
	"todo-api/internal/services"
	"todo-api/internal/storage"
)

func main() {
	storage := storage.NewMemoryStorage()
	service := services.NewTaskService(storage)
	handler := handlers.NewTaskHandler(service)

	router := gin.Default()
	
	// Cấu hình CORS
	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5173", "http://localhost:3000"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))
	
	setupRoutes(router, handler)
	router.Run(":8080")
}

func setupRoutes(router *gin.Engine, handler *handlers.TaskHandler) {
	router.GET("/", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "Todo API is running!",
			"status":  "success",
		})
	})

	router.GET("/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"status": "healthy",
		})
	})

	// Route tạo task
	router.POST("/tasks", handler.CreateTask)
	
	// Route lấy danh sách tasks
	router.GET("/tasks", handler.GetAllTasks)
	
	// Route cập nhật task
	router.PUT("/tasks/:id", handler.UpdateTask)
	
	// Route xóa task
	router.DELETE("/tasks/:id", handler.DeleteTask)
} 