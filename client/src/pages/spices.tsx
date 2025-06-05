import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/header";
import { MapPin, Package, Star, ArrowRight, Shield, Truck, Clock } from "lucide-react";
import { Link } from "wouter";

export default function SpicesPage() {
  const { data: products, isLoading } = useQuery({
    queryKey: ["/api/spices"],
  });

  const spiceProducts = products?.filter((p: any) => p.category === "spices") || [];
  const honeyProducts = products?.filter((p: any) => p.category === "honey") || [];

  const benefits = [
    {
      icon: Shield,
      title: "Quality Assured",
      description: "All products tested for purity and authenticity"
    },
    {
      icon: Truck,
      title: "Global Shipping",
      description: "Worldwide delivery with proper packaging"
    },
    {
      icon: Clock,
      title: "Fresh Supply",
      description: "Direct from source with optimal freshness"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-emerald-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Premium Natural Spices & Honey
            </h1>
            <p className="text-xl text-green-100 mb-8 max-w-3xl mx-auto">
              Sourced directly from the finest farms in India and around the world. 
              Experience authentic flavors and natural purity in every product.
            </p>
            <Link href="/contact">
              <Button size="lg" variant="secondary" className="px-8 py-3">
                Request Quote
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Spices Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Premium Spices Collection
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Handpicked spices from the best growing regions, ensuring maximum flavor and aroma
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="animate-pulse">
                  <div className="h-48 bg-gray-300 rounded-t-lg"></div>
                  <CardContent className="p-6">
                    <div className="h-4 bg-gray-300 rounded mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded mb-4"></div>
                    <div className="h-8 bg-gray-300 rounded"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {spiceProducts.map((product: any) => (
                <Card key={product.id} className="group hover:shadow-lg transition-shadow overflow-hidden">
                  <div className="relative">
                    <img 
                      src={product.imageUrl} 
                      alt={product.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-3 left-3 bg-green-600">
                      {product.category}
                    </Badge>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {product.name}
                    </h3>
                    <div className="flex items-center text-gray-600 mb-3">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span className="text-sm">{product.origin}</span>
                    </div>
                    <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-semibold text-green-600">
                        {product.priceRange}
                      </span>
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        Inquire Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Honey Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Pure Natural Honey
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Wild and organic honey sourced from pristine environments, maintaining natural properties
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[1, 2].map((i) => (
                <Card key={i} className="animate-pulse">
                  <div className="h-48 bg-gray-300 rounded-t-lg"></div>
                  <CardContent className="p-6">
                    <div className="h-4 bg-gray-300 rounded mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded mb-4"></div>
                    <div className="h-8 bg-gray-300 rounded"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {honeyProducts.map((product: any) => (
                <Card key={product.id} className="group hover:shadow-lg transition-shadow overflow-hidden">
                  <div className="relative">
                    <img 
                      src={product.imageUrl} 
                      alt={product.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-3 left-3 bg-yellow-600">
                      {product.category}
                    </Badge>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {product.name}
                    </h3>
                    <div className="flex items-center text-gray-600 mb-3">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span className="text-sm">{product.origin}</span>
                    </div>
                    <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-semibold text-yellow-600">
                        {product.priceRange}
                      </span>
                      <Button size="sm" className="bg-yellow-600 hover:bg-yellow-700">
                        Inquire Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-green-600 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Place Your Order?
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Contact us for bulk pricing, custom packaging, and international shipping options
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" variant="secondary" className="px-8 py-3">
                Get Quote Now
                <Package className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="px-8 py-3 text-white border-white hover:bg-white hover:text-green-600">
              Download Catalog
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}