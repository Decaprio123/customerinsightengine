import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { insertInquirySchema } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import Header from "@/components/header";
import { MapPin, Phone, Mail, Clock, Send, Building, Package, Plane } from "lucide-react";

const formSchema = insertInquirySchema.extend({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  businessType: z.string().min(1, "Please select a business type"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof formSchema>;

export default function ContactPage() {
  const { toast } = useToast();
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      businessType: "",
      subject: "",
      message: "",
    },
  });

  const createInquiryMutation = useMutation({
    mutationFn: async (data: FormData) => {
      return apiRequest("POST", "/api/inquiries", data);
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Your inquiry has been submitted successfully. We'll contact you within 24 hours.",
      });
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to submit inquiry",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: FormData) => {
    createInquiryMutation.mutate(data);
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Location",
      details: ["Dubai, UAE", "Business Bay District"]
    },
    {
      icon: Phone,
      title: "Phone",
      details: ["+971-XX-XXX-XXXX", "+971-XX-XXX-XXXY"]
    },
    {
      icon: Mail,
      title: "Email",
      details: ["info@emiratestradehub.com", "support@emiratestradehub.com"]
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: ["Sunday - Thursday: 9:00 AM - 6:00 PM", "Friday - Saturday: Closed"]
    }
  ];

  const businessTypes = [
    { value: "spices", label: "Spices & Honey Trade", icon: Package },
    { value: "travel", label: "Travel & Tourism", icon: Plane },
    { value: "business_formation", label: "Business Formation", icon: Building },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Get In Touch
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Ready to start your business journey? Contact us for a free consultation 
              and discover how Emirates Trade Hub can help you succeed.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-gray-900">Send Us a Message</CardTitle>
                <p className="text-gray-600">Fill out the form below and we'll get back to you within 24 hours.</p>
              </CardHeader>
              <CardContent>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        {...form.register("name")}
                        placeholder="Enter your full name"
                      />
                      {form.formState.errors.name && (
                        <p className="text-sm text-destructive">
                          {form.formState.errors.name.message}
                        </p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        {...form.register("email")}
                        placeholder="Enter your email"
                      />
                      {form.formState.errors.email && (
                        <p className="text-sm text-destructive">
                          {form.formState.errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        {...form.register("phone")}
                        placeholder="Enter your phone number"
                      />
                      {form.formState.errors.phone && (
                        <p className="text-sm text-destructive">
                          {form.formState.errors.phone.message}
                        </p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="businessType">Business Interest *</Label>
                      <Select 
                        value={form.watch("businessType")} 
                        onValueChange={(value) => form.setValue("businessType", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select your interest" />
                        </SelectTrigger>
                        <SelectContent>
                          {businessTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              <div className="flex items-center">
                                <type.icon className="w-4 h-4 mr-2" />
                                {type.label}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {form.formState.errors.businessType && (
                        <p className="text-sm text-destructive">
                          {form.formState.errors.businessType.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      {...form.register("subject")}
                      placeholder="Enter the subject of your inquiry"
                    />
                    {form.formState.errors.subject && (
                      <p className="text-sm text-destructive">
                        {form.formState.errors.subject.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      {...form.register("message")}
                      placeholder="Tell us about your requirements..."
                      className="min-h-32"
                    />
                    {form.formState.errors.message && (
                      <p className="text-sm text-destructive">
                        {form.formState.errors.message.message}
                      </p>
                    )}
                  </div>

                  <Button 
                    type="submit" 
                    disabled={createInquiryMutation.isPending}
                    className="w-full"
                    size="lg"
                  >
                    {createInquiryMutation.isPending ? "Sending..." : "Send Message"}
                    <Send className="w-5 h-5 ml-2" />
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Contact Information
                </h2>
                <p className="text-gray-600 mb-8">
                  Get in touch with our expert team. We're here to help you with all your business needs.
                </p>
              </div>

              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <Card key={index} className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center flex-shrink-0">
                        <info.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {info.title}
                        </h3>
                        {info.details.map((detail, idx) => (
                          <p key={idx} className="text-gray-600">
                            {detail}
                          </p>
                        ))}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Quick Response Promise */}
              <Card className="bg-gradient-to-r from-primary to-blue-600 text-white p-6">
                <div className="text-center">
                  <Clock className="w-12 h-12 mx-auto mb-4 opacity-90" />
                  <h3 className="text-xl font-bold mb-2">
                    Quick Response Guarantee
                  </h3>
                  <p className="text-blue-100">
                    We respond to all inquiries within 24 hours during business days. 
                    For urgent matters, call us directly.
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Business Divisions Quick Links */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Explore Our Services
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Learn more about our specialized business divisions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {businessTypes.map((type, index) => (
              <Card key={index} className="group hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                    <type.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {type.label}
                  </h3>
                  <Button variant="outline" size="sm" className="mt-4">
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}