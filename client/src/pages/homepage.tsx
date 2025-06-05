import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/header";
import { ArrowRight, Package, Plane, Building, Star, Globe, Shield, Clock } from "lucide-react";

export default function Homepage() {
  const businessDivisions = [
    {
      title: "Spices & Natural Honey",
      description: "Premium quality natural spices including cardamom, black pepper, and cloves, plus pure wild honey sourced directly from trusted farms.",
      icon: Package,
      href: "/spices",
      features: ["Direct farm sourcing", "Premium quality guaranteed", "International shipping", "Bulk orders available"],
      gradient: "from-green-500 to-emerald-600"
    },
    {
      title: "Travel & Tourism",
      description: "Comprehensive travel planning and booking services for destinations in UAE, India, and beyond with customized packages.",
      icon: Plane,
      href: "/travel",
      features: ["Custom tour packages", "Hotel bookings", "Visa assistance", "24/7 support"],
      gradient: "from-blue-500 to-cyan-600"
    },
    {
      title: "Business Formation",
      description: "End-to-end support for young entrepreneurs starting their business in UAE with complete legal and administrative assistance.",
      icon: Building,
      href: "/business-formation",
      features: ["LLC formation", "Free zone setup", "Legal compliance", "Banking assistance"],
      gradient: "from-purple-500 to-indigo-600"
    }
  ];

  const whyChooseUs = [
    {
      icon: Globe,
      title: "International Reach",
      description: "Established network across UAE, India, and global markets"
    },
    {
      icon: Shield,
      title: "Trusted Quality",
      description: "Premium products and services with quality guarantees"
    },
    {
      icon: Clock,
      title: "Quick Response",
      description: "Fast turnaround times and responsive customer service"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Your Gateway to
              <span className="text-primary block">International Business</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Emirates Trade Hub LLC - Your trusted partner for premium spices and honey trade, 
              travel experiences, and business formation services in the UAE.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" className="px-8 py-3">
                  Get Started Today
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="px-8 py-3">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Business Divisions */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Business Divisions
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Three specialized divisions serving your international business needs
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {businessDivisions.map((division, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 overflow-hidden">
                <div className={`h-2 bg-gradient-to-r ${division.gradient}`}></div>
                <CardContent className="p-8">
                  <div className={`w-16 h-16 bg-gradient-to-r ${division.gradient} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <division.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {division.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {division.description}
                  </p>
                  
                  <ul className="space-y-2 mb-8">
                    {division.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-gray-600">
                        <Star className="w-4 h-4 text-yellow-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <Link href={division.href}>
                    <Button className="w-full group-hover:bg-primary-600 transition-colors">
                      Explore {division.title}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Emirates Trade Hub
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Trusted by businesses and individuals across the region
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {whyChooseUs.map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-20 h-20 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <item.icon className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-primary py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Start Your Business Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Contact us today for a free consultation and discover how we can help grow your business
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" variant="secondary" className="px-8 py-3">
                Get Free Consultation
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="px-8 py-3 text-white border-white hover:bg-white hover:text-primary">
              Call: +971-XX-XXX-XXXX
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <div>
                  <span className="text-xl font-bold">Emirates Trade Hub</span>
                  <div className="text-sm text-gray-400">UAE International Business</div>
                </div>
              </div>
              <p className="text-gray-400 mb-4">
                Your trusted partner for international trade, travel, and business formation in the UAE.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/spices" className="hover:text-white">Spices & Honey</Link></li>
                <li><Link href="/travel" className="hover:text-white">Travel Services</Link></li>
                <li><Link href="/business-formation" className="hover:text-white">Business Formation</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact Us</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Dubai, UAE</li>
                <li>+971-XX-XXX-XXXX</li>
                <li>info@emiratestradehub.com</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 mt-8 text-center text-gray-400">
            <p>&copy; 2024 Emirates Trade Hub LLC. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}