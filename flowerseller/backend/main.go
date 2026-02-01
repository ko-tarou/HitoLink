package main

import (
	"context"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"flowerseller/backend/db"
	"flowerseller/backend/handlers"
	"flowerseller/backend/middleware"

	"github.com/go-chi/chi/v5"
	chimiddleware "github.com/go-chi/chi/v5/middleware"
)

func main() {
	dsn := os.Getenv("DATABASE_URL")
	if dsn == "" {
		dsn = "postgres://flowerseller:flowerseller@localhost:5434/flowerseller?sslmode=disable"
	}
	jwtSecret := os.Getenv("JWT_SECRET")
	if jwtSecret == "" {
		jwtSecret = "dev-secret-change-in-production"
	}
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	pool, err := db.Connect(context.Background(), dsn)
	if err != nil {
		log.Fatalf("db connect: %v", err)
	}
	defer pool.Close()

	h := handlers.New(pool, jwtSecret)
	r := chi.NewRouter()
	r.Use(chimiddleware.Logger)
	r.Use(chimiddleware.Recoverer)
	r.Use(middleware.CORS)

	r.Post("/auth/signup", h.Signup)
	r.Post("/auth/login", h.Login)

	r.Route("/api", func(r chi.Router) {
		r.Use(middleware.JWT(jwtSecret))
		// Categories
		r.Get("/categories", h.ListCategories)
		r.Post("/categories", h.CreateCategory)
		// Products: /similar must be before /{id} so "similar" is not treated as product id
		r.Route("/products", func(r chi.Router) {
			r.Get("/", h.ListProducts)
			r.Get("/similar", h.SimilarProducts)
			r.Get("/{id}", h.GetProduct)
			r.Post("/", h.CreateProduct)
			r.Patch("/{id}", h.UpdateProduct)
			r.Delete("/{id}", h.DeleteProduct)
		})
		// Inventory
		r.Get("/inventory_batches", h.ListInventoryBatches)
		r.Post("/inventory_batches", h.CreateInventoryBatch)
		r.Patch("/inventory_batches/{id}", h.UpdateInventoryBatch)
		// Watering
		r.Get("/watering_records", h.ListWateringRecords)
		r.Post("/watering_records", h.CreateWateringRecord)
		// Inbound
		r.Get("/inbound_records", h.ListInboundRecords)
		r.Post("/inbound_records", h.CreateInboundRecord)
		// Sales
		r.Get("/sales", h.ListSales)
		r.Post("/sales", h.CreateSale)
		// Price
		r.Get("/price_adjustment_history", h.ListPriceAdjustmentHistory)
		r.Post("/price_adjustment", h.ApplyPriceAdjustment)
		// Search (no auth required for read; allow in API group with optional JWT)
		r.Get("/search/products", h.SearchProducts)
	})

	srv := &http.Server{Addr: ":" + port, Handler: r}
	go func() {
		log.Printf("server listening on :%s", port)
		if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Fatal(err)
		}
	}()
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	if err := srv.Shutdown(ctx); err != nil {
		log.Fatal(err)
	}
}
