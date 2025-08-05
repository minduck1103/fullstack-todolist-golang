package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
	// Tạo router với Gin
	router := gin.Default()

	// Route test để kiểm tra server
	router.GET("/", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "Todo API is running!",
			"status":  "success",
		})
	})

	// Route health check
	router.GET("/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"status": "healthy",
		})
	})

	// Khởi động server trên port 8080
	router.Run(":8080")
} 