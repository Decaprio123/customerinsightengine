import { pgTable, text, serial, integer, boolean, timestamp, real } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const feedback = pgTable("feedback", {
  id: serial("id").primaryKey(),
  content: text("content").notNull(),
  customerName: text("customer_name").notNull(),
  customerEmail: text("customer_email"),
  source: text("source").notNull(), // 'form', 'email', 'sms'
  sentiment: text("sentiment").notNull(), // 'positive', 'negative', 'neutral'
  confidence: real("confidence").notNull(), // 0-1 confidence score
  rating: integer("rating"), // 1-5 stars if provided
  isResponded: boolean("is_responded").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const customers = pgTable("customers", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").unique(),
  totalFeedback: integer("total_feedback").default(0),
  lastFeedbackAt: timestamp("last_feedback_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const sentimentStats = pgTable("sentiment_stats", {
  id: serial("id").primaryKey(),
  date: timestamp("date").notNull(),
  positiveCount: integer("positive_count").default(0),
  negativeCount: integer("negative_count").default(0),
  neutralCount: integer("neutral_count").default(0),
  totalCount: integer("total_count").default(0),
});

export const insertFeedbackSchema = createInsertSchema(feedback).omit({
  id: true,
  sentiment: true,
  confidence: true,
  isResponded: true,
  createdAt: true,
});

export const insertCustomerSchema = createInsertSchema(customers).omit({
  id: true,
  totalFeedback: true,
  lastFeedbackAt: true,
  createdAt: true,
});

export type InsertFeedback = z.infer<typeof insertFeedbackSchema>;
export type Feedback = typeof feedback.$inferSelect;
export type InsertCustomer = z.infer<typeof insertCustomerSchema>;
export type Customer = typeof customers.$inferSelect;
export type SentimentStats = typeof sentimentStats.$inferSelect;

// Add user schema that was already defined
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
