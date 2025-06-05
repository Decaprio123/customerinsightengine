import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { MessageSquare, Bookmark } from "lucide-react";
import { getSentimentBadgeClass, formatDate } from "@/lib/utils";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

export default function FeedbackList() {
  const [sentimentFilter, setSentimentFilter] = useState("all");
  const { toast } = useToast();

  const { data: feedback, isLoading } = useQuery({
    queryKey: ["/api/feedback"],
  });

  const respondMutation = useMutation({
    mutationFn: async ({ id, isResponded }: { id: number; isResponded: boolean }) => {
      return apiRequest("PATCH", `/api/feedback/${id}/respond`, { isResponded });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/feedback"] });
      queryClient.invalidateQueries({ queryKey: ["/api/analytics/response-stats"] });
      toast({
        title: "Success",
        description: "Feedback response status updated",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update feedback response status",
        variant: "destructive",
      });
    },
  });

  const filteredFeedback = feedback?.filter((item: any) => {
    if (sentimentFilter === "all") return true;
    return item.sentiment === sentimentFilter;
  }) || [];

  if (isLoading) {
    return (
      <Card className="shadow-sm border border-gray-200">
        <CardContent className="pt-6">
          <Skeleton className="h-6 w-40 mb-6" />
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-6 border-b">
                <Skeleton className="h-4 w-60 mb-2" />
                <Skeleton className="h-16 w-full mb-2" />
                <Skeleton className="h-4 w-40" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-sm border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Recent Feedback</h3>
          <div className="flex items-center space-x-3">
            <Select value={sentimentFilter} onValueChange={setSentimentFilter}>
              <SelectTrigger className="w-36">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sentiments</SelectItem>
                <SelectItem value="positive">Positive</SelectItem>
                <SelectItem value="neutral">Neutral</SelectItem>
                <SelectItem value="negative">Negative</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="ghost" size="sm" className="text-primary hover:text-blue-700">
              View All
            </Button>
          </div>
        </div>
      </div>

      <CardContent className="p-0">
        {filteredFeedback.length === 0 ? (
          <div className="p-12 text-center">
            <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No feedback found</h3>
            <p className="text-gray-600">
              {sentimentFilter === "all" 
                ? "No feedback has been collected yet." 
                : `No ${sentimentFilter} feedback found.`}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredFeedback.map((item: any) => (
              <div key={item.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSentimentBadgeClass(item.sentiment)}`}>
                        {item.sentiment.charAt(0).toUpperCase() + item.sentiment.slice(1)}
                      </span>
                      <span className="text-sm text-gray-500">{item.source}</span>
                      <span className="text-sm text-gray-500">{formatDate(item.createdAt)}</span>
                    </div>
                    <p className="text-sm text-gray-900 mb-2">"{item.content}"</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <span>{item.customerName}</span>
                      {item.customerEmail && (
                        <>
                          <span className="mx-2">•</span>
                          <span>{item.customerEmail}</span>
                        </>
                      )}
                      <span className="mx-2">•</span>
                      <span>{Math.round(item.confidence * 100)}% confidence</span>
                      {item.rating && (
                        <>
                          <span className="mx-2">•</span>
                          <span>{item.rating} stars</span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => respondMutation.mutate({ id: item.id, isResponded: !item.isResponded })}
                      disabled={respondMutation.isPending}
                      className={item.isResponded ? "text-success" : "text-gray-400"}
                    >
                      <MessageSquare className="w-5 h-5" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-600">
                      <Bookmark className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
