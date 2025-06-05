import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/header";
import { Building, CheckCircle, Clock, FileText, Users, Star, ArrowRight, Shield } from "lucide-react";
import { Link } from "wouter";

export default function BusinessFormationPage() {
  const { data: services, isLoading } = useQuery({
    queryKey: ["/api/business-services"],
  });

  const { data: popularServices } = useQuery({
    queryKey: ["/api/business-services/popular"],
  });

  const processSteps = [
    {
      step: "1",
      title: "Consultation",
      description: "Free consultation to understand your business needs and recommend the best structure",
      icon: Users
    },
    {
      step: "2",
      title: "Documentation",
      description: "Prepare all necessary legal documents and applications for your business setup",
      icon: FileText
    },
    {
      step: "3",
      title: "Registration",
      description: "Submit applications to relevant authorities and handle all government procedures",
      icon: Building
    },
    {
      step: "4",
      title: "Completion",
      description: "Receive your business license and get assistance with banking and operational setup",
      icon: CheckCircle
    }
  ];

  const benefits = [
    "100% foreign ownership in Free Zones",
    "No personal income tax",
    "Strategic location between East and West",
    "World-class infrastructure",
    "Easy access to global markets",
    "Streamlined business processes"
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Start Your Business in UAE
            </h1>
            <p className="text-xl text-purple-100 mb-8 max-w-3xl mx-auto">
              Complete end-to-end support for young entrepreneurs. From company formation 
              to operational setup, we handle everything so you can focus on growing your business.
            </p>
            <Link href="/contact">
              <Button size="lg" variant="secondary" className="px-8 py-3">
                Start Your Journey
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our 4-Step Process
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Simple, transparent process to get your business up and running
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="text-center relative">
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gray-200 z-0"></div>
                )}
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 relative">
                    <step.icon className="w-8 h-8 text-purple-600" />
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                      {step.step}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Services */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Popular Business Setup Services
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Most requested services by young entrepreneurs starting in UAE
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[1, 2].map((i) => (
                <Card key={i} className="animate-pulse">
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
              {popularServices?.map((service: any) => (
                <Card key={service.id} className="group hover:shadow-xl transition-all duration-300 border-0 relative overflow-hidden">
                  <div className="absolute top-0 right-0">
                    <Badge className="bg-purple-600 text-white rounded-bl-lg rounded-tr-lg px-3 py-1">
                      Popular
                    </Badge>
                  </div>
                  <CardContent className="p-8">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Building className="w-6 h-6 text-purple-600" />
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-purple-600">
                          {service.price}
                        </div>
                        <div className="text-sm text-gray-500">
                          {service.duration}
                        </div>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {service.serviceName}
                    </h3>
                    
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {service.description}
                    </p>
                    
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-gray-900 mb-3">What's Included:</h4>
                      <ul className="space-y-2">
                        {service.features?.map((feature: string, idx: number) => (
                          <li key={idx} className="flex items-center text-sm text-gray-600">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <Button className="w-full bg-purple-600 hover:bg-purple-700">
                      Get Started
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* All Services */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Complete Service Portfolio
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Comprehensive business formation and support services
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <Card key={i} className="animate-pulse">
                  <CardContent className="p-6">
                    <div className="h-4 bg-gray-300 rounded mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded mb-4"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {services?.map((service: any) => (
                <Card key={service.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {service.serviceName}
                        </h3>
                        <p className="text-gray-600 text-sm mb-3">
                          {service.description}
                        </p>
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="w-4 h-4 mr-1" />
                          {service.duration}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-gray-900">
                          {service.price}
                        </div>
                        {service.isPopular && (
                          <Badge variant="secondary" className="mt-1">
                            Popular
                          </Badge>
                        )}
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="w-full">
                      Learn More
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Why Choose UAE */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Why Start Your Business in UAE?
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                The UAE offers one of the world's most business-friendly environments, 
                making it the perfect destination for young entrepreneurs looking to build 
                successful companies with global reach.
              </p>
              <ul className="space-y-3">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center text-gray-700">
                    <Star className="w-5 h-5 text-yellow-500 mr-3 flex-shrink-0" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gradient-to-br from-purple-100 to-indigo-100 rounded-2xl p-8">
              <div className="text-center">
                <Shield className="w-16 h-16 text-purple-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Success Guarantee
                </h3>
                <p className="text-gray-600 mb-6">
                  We ensure 100% successful business registration or your money back. 
                  Our expert team has helped over 500+ young entrepreneurs start their journey.
                </p>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-purple-600">500+</div>
                    <div className="text-sm text-gray-600">Businesses Formed</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-600">7-14</div>
                    <div className="text-sm text-gray-600">Days Average</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-purple-600 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Start Your Business?
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Join hundreds of successful entrepreneurs who started their journey with us
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" variant="secondary" className="px-8 py-3">
                Get Free Consultation
                <Building className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="px-8 py-3 text-white border-white hover:bg-white hover:text-purple-600">
              Download Business Guide
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}