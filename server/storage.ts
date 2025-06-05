import { 
  inquiries, 
  spiceProducts, 
  travelPackages, 
  businessServices,
  type Inquiry, 
  type InsertInquiry, 
  type SpiceProduct, 
  type InsertSpiceProduct,
  type TravelPackage,
  type InsertTravelPackage,
  type BusinessService,
  type InsertBusinessService
} from "@shared/schema";

export interface IStorage {
  // Inquiry methods
  createInquiry(inquiry: InsertInquiry): Promise<Inquiry>;
  getAllInquiries(): Promise<Inquiry[]>;
  getInquiriesByBusinessType(businessType: string): Promise<Inquiry[]>;
  updateInquiryStatus(id: number, status: string): Promise<Inquiry | undefined>;
  
  // Spice products methods
  createSpiceProduct(product: InsertSpiceProduct): Promise<SpiceProduct>;
  getAllSpiceProducts(): Promise<SpiceProduct[]>;
  getSpiceProductsByCategory(category: string): Promise<SpiceProduct[]>;
  updateSpiceProduct(id: number, updates: Partial<InsertSpiceProduct>): Promise<SpiceProduct | undefined>;
  
  // Travel packages methods
  createTravelPackage(package: InsertTravelPackage): Promise<TravelPackage>;
  getAllTravelPackages(): Promise<TravelPackage[]>;
  getActiveTravelPackages(): Promise<TravelPackage[]>;
  updateTravelPackage(id: number, updates: Partial<InsertTravelPackage>): Promise<TravelPackage | undefined>;
  
  // Business services methods
  createBusinessService(service: InsertBusinessService): Promise<BusinessService>;
  getAllBusinessServices(): Promise<BusinessService[]>;
  getPopularBusinessServices(): Promise<BusinessService[]>;
  updateBusinessService(id: number, updates: Partial<InsertBusinessService>): Promise<BusinessService | undefined>;
}

export class MemStorage implements IStorage {
  private inquiries: Map<number, Inquiry>;
  private spiceProducts: Map<number, SpiceProduct>;
  private travelPackages: Map<number, TravelPackage>;
  private businessServices: Map<number, BusinessService>;
  private currentInquiryId: number;
  private currentSpiceProductId: number;
  private currentTravelPackageId: number;
  private currentBusinessServiceId: number;

  constructor() {
    this.inquiries = new Map();
    this.spiceProducts = new Map();
    this.travelPackages = new Map();
    this.businessServices = new Map();
    this.currentInquiryId = 1;
    this.currentSpiceProductId = 1;
    this.currentTravelPackageId = 1;
    this.currentBusinessServiceId = 1;
    
    // Initialize with sample data
    this.initializeSampleData();
  }

  private initializeSampleData() {
    // Sample spice products
    const spiceProductsData = [
      {
        name: "Premium Black Cardamom",
        category: "spices",
        origin: "Kerala, India",
        description: "Aromatic black cardamom with intense smoky flavor, perfect for biryanis and meat dishes.",
        priceRange: "AED 45-65 per kg",
        isAvailable: true,
        imageUrl: "/api/placeholder/300/200"
      },
      {
        name: "Malabar Black Pepper",
        category: "spices",
        origin: "Kerala, India",
        description: "Premium quality black pepper with high piperine content and bold flavor.",
        priceRange: "AED 85-120 per kg",
        isAvailable: true,
        imageUrl: "/api/placeholder/300/200"
      },
      {
        name: "Madagascar Cloves",
        category: "spices",
        origin: "Madagascar",
        description: "High-quality whole cloves with strong aroma and authentic flavor.",
        priceRange: "AED 95-140 per kg",
        isAvailable: true,
        imageUrl: "/api/placeholder/300/200"
      },
      {
        name: "Wild Forest Honey",
        category: "honey",
        origin: "Himalayas, India",
        description: "Pure, unprocessed wild honey sourced from Himalayan forests.",
        priceRange: "AED 35-50 per kg",
        isAvailable: true,
        imageUrl: "/api/placeholder/300/200"
      }
    ];

    for (const product of spiceProductsData) {
      await this.createSpiceProduct(product);
    }

    // Sample travel packages
    const travelPackagesData = [
      {
        title: "Dubai Heritage & Modern Tour",
        destination: "Dubai, UAE",
        duration: "4 Days / 3 Nights",
        price: "AED 1,850 per person",
        description: "Experience the perfect blend of traditional and modern Dubai with visits to heritage sites and iconic landmarks.",
        includes: ["Airport transfers", "Hotel accommodation", "City tour", "Desert safari", "Dhow cruise"],
        imageUrl: "/api/placeholder/400/250",
        isActive: true
      },
      {
        title: "Abu Dhabi Cultural Experience",
        destination: "Abu Dhabi, UAE",
        duration: "3 Days / 2 Nights",
        price: "AED 1,450 per person",
        description: "Discover the cultural heart of UAE with visits to Sheikh Zayed Mosque, Louvre Abu Dhabi, and traditional markets.",
        includes: ["Hotel stay", "Cultural tours", "Museum entries", "Traditional meals"],
        imageUrl: "/api/placeholder/400/250",
        isActive: true
      },
      {
        title: "Kerala Spice Trail",
        destination: "Kerala, India",
        duration: "7 Days / 6 Nights",
        price: "AED 2,850 per person",
        description: "Explore spice plantations, backwaters, and traditional Kerala culture.",
        includes: ["Flights", "Accommodation", "Spice plantation tours", "Backwater cruise", "Ayurvedic treatments"],
        imageUrl: "/api/placeholder/400/250",
        isActive: true
      }
    ];

    for (const pkg of travelPackagesData) {
      await this.createTravelPackage(pkg);
    }

    // Sample business services
    const businessServicesData = [
      {
        serviceName: "UAE Business Setup - LLC Formation",
        description: "Complete LLC company formation in UAE with all legal documentation and approvals.",
        price: "AED 12,500",
        duration: "7-14 business days",
        features: ["Trade license", "MOA preparation", "Bank account assistance", "Visa processing", "Office setup guidance"],
        isPopular: true
      },
      {
        serviceName: "Free Zone Company Setup",
        description: "Establish your business in UAE free zones with 100% foreign ownership.",
        price: "AED 15,000",
        duration: "5-10 business days",
        features: ["Free zone license", "Office space", "Visa allocation", "Banking support", "Legal compliance"],
        isPopular: true
      },
      {
        serviceName: "Business Consultation Package",
        description: "Complete business planning and market entry strategy for UAE market.",
        price: "AED 2,500",
        duration: "2-3 weeks",
        features: ["Market analysis", "Business plan", "Legal structure advice", "Financial planning", "Ongoing support"],
        isPopular: false
      },
      {
        serviceName: "Import/Export License",
        description: "Obtain import/export licenses for international trade operations.",
        price: "AED 8,000",
        duration: "10-15 business days",
        features: ["Trade license amendment", "Customs registration", "Chamber membership", "Documentation support"],
        isPopular: false
      }
    ];

    for (const service of businessServicesData) {
      await this.createBusinessService(service);
    }
  }

  // Inquiry methods
  async createInquiry(insertInquiry: InsertInquiry): Promise<Inquiry> {
    const id = this.currentInquiryId++;
    const inquiry: Inquiry = {
      ...insertInquiry,
      id,
      phone: insertInquiry.phone || null,
      status: "new",
      createdAt: new Date()
    };
    this.inquiries.set(id, inquiry);
    return inquiry;
  }

  async getAllInquiries(): Promise<Inquiry[]> {
    return Array.from(this.inquiries.values()).sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async getInquiriesByBusinessType(businessType: string): Promise<Inquiry[]> {
    return Array.from(this.inquiries.values()).filter(
      inquiry => inquiry.businessType === businessType
    );
  }

  async updateInquiryStatus(id: number, status: string): Promise<Inquiry | undefined> {
    const inquiry = this.inquiries.get(id);
    if (inquiry) {
      inquiry.status = status;
      this.inquiries.set(id, inquiry);
      return inquiry;
    }
    return undefined;
  }

  // Spice products methods
  async createSpiceProduct(insertProduct: InsertSpiceProduct): Promise<SpiceProduct> {
    const id = this.currentSpiceProductId++;
    const product: SpiceProduct = {
      ...insertProduct,
      id,
      priceRange: insertProduct.priceRange || null,
      isAvailable: insertProduct.isAvailable ?? true,
      imageUrl: insertProduct.imageUrl || null
    };
    this.spiceProducts.set(id, product);
    return product;
  }

  async getAllSpiceProducts(): Promise<SpiceProduct[]> {
    return Array.from(this.spiceProducts.values());
  }

  async getSpiceProductsByCategory(category: string): Promise<SpiceProduct[]> {
    return Array.from(this.spiceProducts.values()).filter(
      product => product.category === category && product.isAvailable
    );
  }

  async updateSpiceProduct(id: number, updates: Partial<InsertSpiceProduct>): Promise<SpiceProduct | undefined> {
    const product = this.spiceProducts.get(id);
    if (product) {
      Object.assign(product, updates);
      this.spiceProducts.set(id, product);
      return product;
    }
    return undefined;
  }

  // Travel packages methods
  async createTravelPackage(insertPackage: InsertTravelPackage): Promise<TravelPackage> {
    const id = this.currentTravelPackageId++;
    const travelPackage: TravelPackage = {
      ...insertPackage,
      id,
      includes: insertPackage.includes || null,
      imageUrl: insertPackage.imageUrl || null,
      isActive: insertPackage.isActive ?? true
    };
    this.travelPackages.set(id, travelPackage);
    return travelPackage;
  }

  async getAllTravelPackages(): Promise<TravelPackage[]> {
    return Array.from(this.travelPackages.values());
  }

  async getActiveTravelPackages(): Promise<TravelPackage[]> {
    return Array.from(this.travelPackages.values()).filter(
      pkg => pkg.isActive
    );
  }

  async updateTravelPackage(id: number, updates: Partial<InsertTravelPackage>): Promise<TravelPackage | undefined> {
    const travelPackage = this.travelPackages.get(id);
    if (travelPackage) {
      Object.assign(travelPackage, updates);
      this.travelPackages.set(id, travelPackage);
      return travelPackage;
    }
    return undefined;
  }

  // Business services methods
  async createBusinessService(insertService: InsertBusinessService): Promise<BusinessService> {
    const id = this.currentBusinessServiceId++;
    const service: BusinessService = {
      ...insertService,
      id,
      price: insertService.price || null,
      duration: insertService.duration || null,
      features: insertService.features || null,
      isPopular: insertService.isPopular ?? false
    };
    this.businessServices.set(id, service);
    return service;
  }

  async getAllBusinessServices(): Promise<BusinessService[]> {
    return Array.from(this.businessServices.values());
  }

  async getPopularBusinessServices(): Promise<BusinessService[]> {
    return Array.from(this.businessServices.values()).filter(
      service => service.isPopular
    );
  }

  async updateBusinessService(id: number, updates: Partial<InsertBusinessService>): Promise<BusinessService | undefined> {
    const service = this.businessServices.get(id);
    if (service) {
      Object.assign(service, updates);
      this.businessServices.set(id, service);
      return service;
    }
    return undefined;
  }
}

export const storage = new MemStorage();
