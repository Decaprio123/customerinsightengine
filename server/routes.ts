import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertInquirySchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact/Inquiry routes
  app.post("/api/inquiries", async (req, res) => {
    try {
      const validatedData = insertInquirySchema.parse(req.body);
      const inquiry = await storage.createInquiry(validatedData);
      res.json(inquiry);
    } catch (error) {
      console.error("Error creating inquiry:", error);
      res.status(400).json({ message: "Invalid inquiry data" });
    }
  });

  app.get("/api/inquiries", async (req, res) => {
    try {
      const inquiries = await storage.getAllInquiries();
      res.json(inquiries);
    } catch (error) {
      console.error("Error fetching inquiries:", error);
      res.status(500).json({ message: "Failed to fetch inquiries" });
    }
  });

  app.get("/api/inquiries/:businessType", async (req, res) => {
    try {
      const { businessType } = req.params;
      const inquiries = await storage.getInquiriesByBusinessType(businessType);
      res.json(inquiries);
    } catch (error) {
      console.error("Error fetching inquiries by business type:", error);
      res.status(500).json({ message: "Failed to fetch inquiries" });
    }
  });

  // Spice products routes
  app.get("/api/spices", async (req, res) => {
    try {
      const products = await storage.getAllSpiceProducts();
      res.json(products);
    } catch (error) {
      console.error("Error fetching spice products:", error);
      res.status(500).json({ message: "Failed to fetch spice products" });
    }
  });

  app.get("/api/spices/category/:category", async (req, res) => {
    try {
      const { category } = req.params;
      const products = await storage.getSpiceProductsByCategory(category);
      res.json(products);
    } catch (error) {
      console.error("Error fetching spice products by category:", error);
      res.status(500).json({ message: "Failed to fetch spice products" });
    }
  });

  // Travel packages routes
  app.get("/api/travel-packages", async (req, res) => {
    try {
      const packages = await storage.getActiveTravelPackages();
      res.json(packages);
    } catch (error) {
      console.error("Error fetching travel packages:", error);
      res.status(500).json({ message: "Failed to fetch travel packages" });
    }
  });

  // Business services routes
  app.get("/api/business-services", async (req, res) => {
    try {
      const services = await storage.getAllBusinessServices();
      res.json(services);
    } catch (error) {
      console.error("Error fetching business services:", error);
      res.status(500).json({ message: "Failed to fetch business services" });
    }
  });

  app.get("/api/business-services/popular", async (req, res) => {
    try {
      const services = await storage.getPopularBusinessServices();
      res.json(services);
    } catch (error) {
      console.error("Error fetching popular business services:", error);
      res.status(500).json({ message: "Failed to fetch popular business services" });
    }
  });

  // Placeholder image route
  app.get("/api/placeholder/:width/:height", (req, res) => {
    const { width, height } = req.params;
    const svg = `
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#f3f4f6"/>
        <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="16" fill="#6b7280" text-anchor="middle" dy=".3em">
          ${width} × ${height}
        </text>
      </svg>
    `;
    res.setHeader('Content-Type', 'image/svg+xml');
    res.send(svg);
  });

  const httpServer = createServer(app);
  return httpServer;
}
