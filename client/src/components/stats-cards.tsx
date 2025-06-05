import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare, ThumbsUp, Clock, Zap } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";

interface StatsData {
  totalFeedback: number;
  positiveSentiment: number;
  responseRate: number;
  avgResponseTime: number;
}

export default function StatsCards() {
  const { data: sentimentStats, isLoading: sentimentLoading } = useQuery({
    queryKey: ["/api/analytics/sentiment-stats"],
  });

  const { data: responseStats, isLoading: responseLoading } = useQuery({
    queryKey: ["/api/analytics/response-stats"],
  });

  const isLoading = sentimentLoading || responseLoading;

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i}>
            <CardContent className="pt-6">
              <Skeleton className="h-8 w-full mb-2" />
              <Skeleton className="h-12 w-20 mb-2" />
              <Skeleton className="h-4 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const totalFeedback = sentimentStats?.total || 0;
  const positiveSentiment = sentimentStats?.total > 0 
    ? Math.round((sentimentStats.positive / sentimentStats.total) * 100)
    : 0;
  const responseRate = responseStats?.responseRate || 0;
  const avgResponseTime = responseStats?.avgResponseTime || 0;

  const stats = [
    {
      title: "Total Feedback",
      value: totalFeedback.toLocaleString(),
      change: "+12% from last month",
      changeType: "positive" as const,
      icon: MessageSquare,
      iconBg: "bg-blue-50",
      iconColor: "text-primary",
    },
    {
      title: "Positive Sentiment",
      value: `${positiveSentiment}%`,
      change: "+5% from last month",
      changeType: "positive" as const,
      icon: ThumbsUp,
      iconBg: "bg-green-50",
      iconColor: "text-success",
    },
    {
      title: "Response Rate",
      value: `${Math.round(responseRate)}%`,
      change: "-2% from last month",
      changeType: "negative" as const,
      icon: Clock,
      iconBg: "bg-orange-50",
      iconColor: "text-warning",
    },
    {
      title: "Avg. Response Time",
      value: `${avgResponseTime}h`,
      change: "-15min from last month",
      changeType: "positive" as const,
      icon: Zap,
      iconBg: "bg-purple-50",
      iconColor: "text-purple-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat) => (
        <Card key={stat.title} className="shadow-sm border border-gray-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                <p className={`text-sm ${stat.changeType === 'positive' ? 'text-success' : 'text-warning'}`}>
                  {stat.change}
                </p>
              </div>
              <div className={`p-3 ${stat.iconBg} rounded-lg`}>
                <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
