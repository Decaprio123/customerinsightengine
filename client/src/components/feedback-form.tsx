import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { insertFeedbackSchema } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

const formSchema = insertFeedbackSchema.extend({
  customerName: z.string().min(1, "Customer name is required"),
  content: z.string().min(10, "Feedback content must be at least 10 characters"),
  source: z.string().min(1, "Source is required"),
});

type FormData = z.infer<typeof formSchema>;

export default function FeedbackForm() {
  const { toast } = useToast();
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customerName: "",
      customerEmail: "",
      content: "",
      source: "form",
    },
  });

  const createFeedbackMutation = useMutation({
    mutationFn: async (data: FormData) => {
      return apiRequest("POST", "/api/feedback", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/feedback"] });
      queryClient.invalidateQueries({ queryKey: ["/api/analytics"] });
      toast({
        title: "Success",
        description: "Feedback submitted successfully and analyzed for sentiment",
      });
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to submit feedback",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: FormData) => {
    createFeedbackMutation.mutate(data);
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Collect Customer Feedback</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="customerName">Customer Name *</Label>
              <Input
                id="customerName"
                {...form.register("customerName")}
                placeholder="Enter customer name"
              />
              {form.formState.errors.customerName && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.customerName.message}
                </p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="customerEmail">Customer Email</Label>
              <Input
                id="customerEmail"
                type="email"
                {...form.register("customerEmail")}
                placeholder="Enter customer email (optional)"
              />
              {form.formState.errors.customerEmail && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.customerEmail.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="source">Feedback Source *</Label>
            <Select 
              value={form.watch("source")} 
              onValueChange={(value) => form.setValue("source", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select feedback source" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="form">Contact Form</SelectItem>
                <SelectItem value="email">Email Survey</SelectItem>
                <SelectItem value="sms">SMS Survey</SelectItem>
                <SelectItem value="phone">Phone Call</SelectItem>
                <SelectItem value="chat">Live Chat</SelectItem>
                <SelectItem value="review">Online Review</SelectItem>
              </SelectContent>
            </Select>
            {form.formState.errors.source && (
              <p className="text-sm text-destructive">
                {form.formState.errors.source.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Feedback Content *</Label>
            <Textarea
              id="content"
              {...form.register("content")}
              placeholder="Enter the customer's feedback..."
              className="min-h-32"
            />
            {form.formState.errors.content && (
              <p className="text-sm text-destructive">
                {form.formState.errors.content.message}
              </p>
            )}
          </div>

          <div className="flex gap-4">
            <Button 
              type="submit" 
              disabled={createFeedbackMutation.isPending}
              className="flex-1"
            >
              {createFeedbackMutation.isPending ? "Analyzing..." : "Submit & Analyze Feedback"}
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => form.reset()}
              disabled={createFeedbackMutation.isPending}
            >
              Clear
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
