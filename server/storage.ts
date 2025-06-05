import { feedback, customers, sentimentStats, users, type Feedback, type InsertFeedback, type Customer, type InsertCustomer, type SentimentStats, type User, type InsertUser } from "@shared/schema";

export interface IStorage {
  // User methods (existing)
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Feedback methods
  createFeedback(feedback: InsertFeedback & { sentiment: string; confidence: number; rating?: number }): Promise<Feedback>;
  getAllFeedback(): Promise<Feedback[]>;
  getFeedbackById(id: number): Promise<Feedback | undefined>;
  updateFeedbackResponse(id: number, isResponded: boolean): Promise<Feedback | undefined>;
  getFeedbackByDateRange(startDate: Date, endDate: Date): Promise<Feedback[]>;
  
  // Customer methods
  createCustomer(customer: InsertCustomer): Promise<Customer>;
  getCustomerByEmail(email: string): Promise<Customer | undefined>;
  updateCustomerStats(email: string): Promise<void>;
  
  // Analytics methods
  getSentimentStats(): Promise<{ positive: number; negative: number; neutral: number; total: number }>;
  getSentimentTrends(days: number): Promise<Array<{ date: string; positive: number; negative: number; neutral: number }>>;
  getResponseStats(): Promise<{ responseRate: number; avgResponseTime: number }>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private feedbackItems: Map<number, Feedback>;
  private customerItems: Map<number, Customer>;
  private stats: Map<string, SentimentStats>;
  private currentUserId: number;
  private currentFeedbackId: number;
  private currentCustomerId: number;

  constructor() {
    this.users = new Map();
    this.feedbackItems = new Map();
    this.customerItems = new Map();
    this.stats = new Map();
    this.currentUserId = 1;
    this.currentFeedbackId = 1;
    this.currentCustomerId = 1;
  }

  // User methods (existing)
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Feedback methods
  async createFeedback(insertFeedback: InsertFeedback & { sentiment: string; confidence: number; rating?: number }): Promise<Feedback> {
    const id = this.currentFeedbackId++;
    const feedbackItem: Feedback = { 
      ...insertFeedback, 
      id,
      isResponded: false,
      createdAt: new Date()
    };
    this.feedbackItems.set(id, feedbackItem);
    return feedbackItem;
  }

  async getAllFeedback(): Promise<Feedback[]> {
    return Array.from(this.feedbackItems.values()).sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async getFeedbackById(id: number): Promise<Feedback | undefined> {
    return this.feedbackItems.get(id);
  }

  async updateFeedbackResponse(id: number, isResponded: boolean): Promise<Feedback | undefined> {
    const feedbackItem = this.feedbackItems.get(id);
    if (feedbackItem) {
      feedbackItem.isResponded = isResponded;
      this.feedbackItems.set(id, feedbackItem);
      return feedbackItem;
    }
    return undefined;
  }

  async getFeedbackByDateRange(startDate: Date, endDate: Date): Promise<Feedback[]> {
    return Array.from(this.feedbackItems.values()).filter(item => {
      const itemDate = new Date(item.createdAt);
      return itemDate >= startDate && itemDate <= endDate;
    });
  }

  // Customer methods
  async createCustomer(insertCustomer: InsertCustomer): Promise<Customer> {
    const id = this.currentCustomerId++;
    const customer: Customer = { 
      ...insertCustomer, 
      id,
      totalFeedback: 0,
      lastFeedbackAt: null,
      createdAt: new Date()
    };
    this.customerItems.set(id, customer);
    return customer;
  }

  async getCustomerByEmail(email: string): Promise<Customer | undefined> {
    return Array.from(this.customerItems.values()).find(
      (customer) => customer.email === email,
    );
  }

  async updateCustomerStats(email: string): Promise<void> {
    const customer = await this.getCustomerByEmail(email);
    if (customer) {
      const feedbackCount = Array.from(this.feedbackItems.values()).filter(
        item => item.customerEmail === email
      ).length;
      customer.totalFeedback = feedbackCount;
      customer.lastFeedbackAt = new Date();
      this.customerItems.set(customer.id, customer);
    }
  }

  // Analytics methods
  async getSentimentStats(): Promise<{ positive: number; negative: number; neutral: number; total: number }> {
    const allFeedback = Array.from(this.feedbackItems.values());
    const positive = allFeedback.filter(item => item.sentiment === 'positive').length;
    const negative = allFeedback.filter(item => item.sentiment === 'negative').length;
    const neutral = allFeedback.filter(item => item.sentiment === 'neutral').length;
    const total = allFeedback.length;

    return { positive, negative, neutral, total };
  }

  async getSentimentTrends(days: number): Promise<Array<{ date: string; positive: number; negative: number; neutral: number }>> {
    const trends = [];
    const now = new Date();
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      date.setHours(0, 0, 0, 0);
      
      const nextDate = new Date(date);
      nextDate.setDate(nextDate.getDate() + 1);
      
      const dayFeedback = Array.from(this.feedbackItems.values()).filter(item => {
        const itemDate = new Date(item.createdAt);
        return itemDate >= date && itemDate < nextDate;
      });
      
      trends.push({
        date: date.toISOString().split('T')[0],
        positive: dayFeedback.filter(item => item.sentiment === 'positive').length,
        negative: dayFeedback.filter(item => item.sentiment === 'negative').length,
        neutral: dayFeedback.filter(item => item.sentiment === 'neutral').length,
      });
    }
    
    return trends;
  }

  async getResponseStats(): Promise<{ responseRate: number; avgResponseTime: number }> {
    const allFeedback = Array.from(this.feedbackItems.values());
    const respondedFeedback = allFeedback.filter(item => item.isResponded);
    
    const responseRate = allFeedback.length > 0 ? (respondedFeedback.length / allFeedback.length) * 100 : 0;
    const avgResponseTime = 2.4; // Mock average response time in hours
    
    return { responseRate, avgResponseTime };
  }
}

export const storage = new MemStorage();
