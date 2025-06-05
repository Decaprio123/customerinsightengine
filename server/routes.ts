import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertFeedbackSchema, insertCustomerSchema } from "@shared/schema";
import { analyzeSentiment } from "./sentiment";

export async function registerRoutes(app: Express): Promise<Server> {
  // Feedback routes
  app.post("/api/feedback", async (req, res) => {
    try {
      const validatedData = insertFeedbackSchema.parse(req.body);
      
      // Analyze sentiment using OpenAI
      const sentimentResult = await analyzeSentiment(validatedData.content);
      
      // Create or update customer
      if (validatedData.customerEmail) {
        let customer = await storage.getCustomerByEmail(validatedData.customerEmail);
        if (!customer) {
          customer = await storage.createCustomer({
            name: validatedData.customerName,
            email: validatedData.customerEmail,
          });
        }
        await storage.updateCustomerStats(validatedData.customerEmail);
      }
      
      // Create feedback with sentiment analysis
      const feedback = await storage.createFeedback({
        ...validatedData,
        sentiment: sentimentResult.sentiment,
        confidence: sentimentResult.confidence,
        rating: sentimentResult.rating,
      });
      
      res.json(feedback);
    } catch (error) {
      console.error("Error creating feedback:", error);
      res.status(400).json({ message: "Invalid feedback data" });
    }
  });

  app.get("/api/feedback", async (req, res) => {
    try {
      const feedback = await storage.getAllFeedback();
      res.json(feedback);
    } catch (error) {
      console.error("Error fetching feedback:", error);
      res.status(500).json({ message: "Failed to fetch feedback" });
    }
  });

  app.patch("/api/feedback/:id/respond", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { isResponded } = req.body;
      
      const feedback = await storage.updateFeedbackResponse(id, isResponded);
      if (!feedback) {
        return res.status(404).json({ message: "Feedback not found" });
      }
      
      res.json(feedback);
    } catch (error) {
      console.error("Error updating feedback response:", error);
      res.status(500).json({ message: "Failed to update feedback response" });
    }
  });

  // Analytics routes
  app.get("/api/analytics/sentiment-stats", async (req, res) => {
    try {
      const stats = await storage.getSentimentStats();
      res.json(stats);
    } catch (error) {
      console.error("Error fetching sentiment stats:", error);
      res.status(500).json({ message: "Failed to fetch sentiment stats" });
    }
  });

  app.get("/api/analytics/sentiment-trends", async (req, res) => {
    try {
      const days = parseInt(req.query.days as string) || 30;
      const trends = await storage.getSentimentTrends(days);
      res.json(trends);
    } catch (error) {
      console.error("Error fetching sentiment trends:", error);
      res.status(500).json({ message: "Failed to fetch sentiment trends" });
    }
  });

  app.get("/api/analytics/response-stats", async (req, res) => {
    try {
      const stats = await storage.getResponseStats();
      res.json(stats);
    } catch (error) {
      console.error("Error fetching response stats:", error);
      res.status(500).json({ message: "Failed to fetch response stats" });
    }
  });

  // Export data route
  app.get("/api/export/feedback", async (req, res) => {
    try {
      const feedback = await storage.getAllFeedback();
      
      // Convert to CSV format
      const headers = ['ID', 'Customer Name', 'Email', 'Content', 'Sentiment', 'Confidence', 'Rating', 'Source', 'Date', 'Responded'];
      const rows = feedback.map(item => [
        item.id,
        item.customerName,
        item.customerEmail || '',
        `"${item.content.replace(/"/g, '""')}"`,
        item.sentiment,
        item.confidence,
        item.rating || '',
        item.source,
        new Date(item.createdAt).toISOString(),
        item.isResponded ? 'Yes' : 'No'
      ]);
      
      const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
      
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename="feedback-export.csv"');
      res.send(csv);
    } catch (error) {
      console.error("Error exporting feedback:", error);
      res.status(500).json({ message: "Failed to export feedback" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
