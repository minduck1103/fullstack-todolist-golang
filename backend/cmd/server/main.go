package main

import (
	"fmt"
	"net/http"
	"os"
	"strings"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"todo-api/internal/handlers"
	"todo-api/internal/services"
	"todo-api/internal/storage"
)

func main() {
	// Load environment variables
	if err := godotenv.Load(); err != nil {
		fmt.Println("Warning: .env file not found, using default values")
	}

	storage := storage.NewMemoryStorage()
	service := services.NewTaskService(storage)
	handler := handlers.NewTaskHandler(service)

	router := gin.Default()
	
	// Cấu hình CORS từ environment
	allowedOrigins := getEnv("ALLOWED_ORIGINS", "http://localhost:5173,http://localhost:3000")
	origins := strings.Split(allowedOrigins, ",")
	
	router.Use(cors.New(cors.Config{
		AllowOrigins:     origins,
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))
	
	setupRoutes(router, handler)
	
	// Get port from environment
	port := getEnv("PORT", "8080")
	host := getEnv("HOST", "0.0.0.0")
	
	fmt.Printf("Server starting on %s:%s\n", host, port)
	fmt.Printf("Environment: %s\n", getEnv("ENV", "development"))
	fmt.Printf("Allowed origins: %s\n", allowedOrigins)
	
	router.Run(fmt.Sprintf("%s:%s", host, port))
}

func setupRoutes(router *gin.Engine, handler *handlers.TaskHandler) {
	router.GET("/", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "Todo API is running!",
			"status":  "success",
			"env":     getEnv("ENV", "development"),
		})
	})

	router.GET("/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"status": "healthy",
			"env":    getEnv("ENV", "development"),
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

// Helper function to get environment variable with default
func getEnv(key, defaultValue string) string {
	if value := os.Getenv(key); value != "" {
		return value
	}
	return defaultValue
} 