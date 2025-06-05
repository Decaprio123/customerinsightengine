import { pgTable, text, serial, integer, boolean, timestamp, real } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Contact inquiries for all business divisions
export const inquiries = pgTable("inquiries", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  businessType: text("business_type").notNull(), // 'spices', 'travel', 'business_formation'
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  status: text("status").default("new"), // 'new', 'contacted', 'closed'
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Spice trade products
export const spiceProducts = pgTable("spice_products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  category: text("category").notNull(), // 'spices', 'honey'
  origin: text("origin").notNull(),
  description: text("description").notNull(),
  priceRange: text("price_range"),
  isAvailable: boolean("is_available").default(true),
  imageUrl: text("image_url"),
});

// Travel packages
export const travelPackages = pgTable("travel_packages", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  destination: text("destination").notNull(),
  duration: text("duration").notNull(),
  price: text("price").notNull(),
  description: text("description").notNull(),
  includes: text("includes").array(),
  imageUrl: text("image_url"),
  isActive: boolean("is_active").default(true),
});

// Business formation services
export const businessServices = pgTable("business_services", {
  id: serial("id").primaryKey(),
  serviceName: text("service_name").notNull(),
  description: text("description").notNull(),
  price: text("price"),
  duration: text("duration"),
  features: text("features").array(),
  isPopular: boolean("is_popular").default(false),
});

export const insertInquirySchema = createInsertSchema(inquiries).omit({
  id: true,
  status: true,
  createdAt: true,
});

export const insertSpiceProductSchema = createInsertSchema(spiceProducts).omit({
  id: true,
});

export const insertTravelPackageSchema = createInsertSchema(travelPackages).omit({
  id: true,
});

export const insertBusinessServiceSchema = createInsertSchema(businessServices).omit({
  id: true,
});

export type InsertInquiry = z.infer<typeof insertInquirySchema>;
export type Inquiry = typeof inquiries.$inferSelect;
export type InsertSpiceProduct = z.infer<typeof insertSpiceProductSchema>;
export type SpiceProduct = typeof spiceProducts.$inferSelect;
export type InsertTravelPackage = z.infer<typeof insertTravelPackageSchema>;
export type TravelPackage = typeof travelPackages.$inferSelect;
export type InsertBusinessService = z.infer<typeof insertBusinessServiceSchema>;
export type BusinessService = typeof businessServices.$inferSelect;
