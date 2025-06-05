import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/header";
import { MapPin, Clock, Users, Star, ArrowRight, Plane, Hotel, Car } from "lucide-react";
import { Link } from "wouter";

export default function TravelPage() {
  const { data: packages, isLoading } = useQuery({
    queryKey: ["/api/travel-packages"],
  });

  const services = [
    {
      icon: Plane,
      title: "Flight Bookings",
      description: "Best rates for domestic and international flights"
    },
    {
      icon: Hotel,
      title: "Hotel Reservations",
      description: "Luxury to budget accommodations worldwide"
    },
    {
      icon: Car,
      title: "Transportation",
      description: "Airport transfers and local transportation"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-cyan-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Travel & Tourism Services
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Discover amazing destinations with our customized travel packages. 
              From UAE adventures to international journeys, we handle every detail.
            </p>
            <Link href="/contact">
              <Button size="lg" variant="secondary" className="px-8 py-3">
                Plan Your Trip
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Complete Travel Solutions
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Everything you need for a perfect trip, all in one place
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <service.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Travel Packages */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Featured Travel Packages
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Carefully curated experiences for unforgettable journeys
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
              {packages?.map((pkg: any) => (
                <Card key={pkg.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <div className="relative">
                    <img 
                      src={pkg.imageUrl} 
                      alt={pkg.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-3 left-3 bg-blue-600">
                      Featured
                    </Badge>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {pkg.title}
                    </h3>
                    
                    <div className="flex items-center text-gray-600 mb-2">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span className="text-sm">{pkg.destination}</span>
                    </div>
                    
                    <div className="flex items-center text-gray-600 mb-4">
                      <Clock className="w-4 h-4 mr-1" />
                      <span className="text-sm">{pkg.duration}</span>
                    </div>
                    
                    <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                      {pkg.description}
                    </p>
                    
                    {pkg.includes && (
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-gray-900 mb-2">Includes:</h4>
                        <ul className="text-xs text-gray-600 space-y-1">
                          {pkg.includes.slice(0, 3).map((item: string, idx: number) => (
                            <li key={idx} className="flex items-center">
                              <Star className="w-3 h-3 text-yellow-500 mr-1" />
                              {item}
                            </li>
                          ))}
                          {pkg.includes.length > 3 && (
                            <li className="text-blue-600">+{pkg.includes.length - 3} more</li>
                          )}
                        </ul>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-lg font-bold text-blue-600">
                          {pkg.price}
                        </span>
                      </div>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        Book Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Our Travel Services */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Travel With Us
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Expert Guides
              </h3>
              <p className="text-gray-600 text-sm">
                Local experts with deep destination knowledge
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                5-Star Service
              </h3>
              <p className="text-gray-600 text-sm">
                Premium service from booking to return
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                24/7 Support
              </h3>
              <p className="text-gray-600 text-sm">
                Round-the-clock assistance during your trip
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ArrowRight className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Easy Booking
              </h3>
              <p className="text-gray-600 text-sm">
                Simple process from inquiry to confirmation
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-blue-600 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready for Your Next Adventure?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Let us create a personalized travel experience just for you
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" variant="secondary" className="px-8 py-3">
                Start Planning
                <Plane className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="px-8 py-3 text-white border-white hover:bg-white hover:text-blue-600">
              Call: +971-XX-XXX-XXXX
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}