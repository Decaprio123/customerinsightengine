import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect, useRef } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function SentimentCharts() {
  const [timeRange, setTimeRange] = useState("30");
  const sentimentChartRef = useRef<HTMLCanvasElement>(null);
  const distributionChartRef = useRef<HTMLCanvasElement>(null);

  const { data: trendsData, isLoading: trendsLoading } = useQuery({
    queryKey: ["/api/analytics/sentiment-trends", { days: parseInt(timeRange) }],
  });

  const { data: sentimentStats, isLoading: statsLoading } = useQuery({
    queryKey: ["/api/analytics/sentiment-stats"],
  });

  useEffect(() => {
    if (!trendsData || trendsLoading || !sentimentChartRef.current) return;

    const ctx = sentimentChartRef.current.getContext('2d');
    if (!ctx) return;

    // Import Chart.js dynamically
    import('chart.js/auto').then((Chart) => {
      // Clear any existing chart
      Chart.default.getChart(sentimentChartRef.current!)?.destroy();

      const labels = trendsData.map((item: any) => {
        const date = new Date(item.date);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      });

      new Chart.default(ctx, {
        type: 'line',
        data: {
          labels,
          datasets: [{
            label: 'Positive',
            data: trendsData.map((item: any) => item.positive),
            borderColor: 'hsl(var(--success))',
            backgroundColor: 'hsla(var(--success), 0.1)',
            tension: 0.4,
            fill: true,
          }, {
            label: 'Neutral',
            data: trendsData.map((item: any) => item.neutral),
            borderColor: 'hsl(var(--warning))',
            backgroundColor: 'hsla(var(--warning), 0.1)',
            tension: 0.4,
            fill: true,
          }, {
            label: 'Negative',
            data: trendsData.map((item: any) => item.negative),
            borderColor: 'hsl(var(--destructive))',
            backgroundColor: 'hsla(var(--destructive), 0.1)',
            tension: 0.4,
            fill: true,
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom'
            }
          },
          scales: {
            y: {
              beginAtZero: true,
            }
          }
        }
      });
    });
  }, [trendsData, trendsLoading]);

  useEffect(() => {
    if (!sentimentStats || statsLoading || !distributionChartRef.current) return;

    const ctx = distributionChartRef.current.getContext('2d');
    if (!ctx) return;

    import('chart.js/auto').then((Chart) => {
      Chart.default.getChart(distributionChartRef.current!)?.destroy();

      const total = sentimentStats.total || 1;
      const positivePercent = Math.round((sentimentStats.positive / total) * 100);
      const neutralPercent = Math.round((sentimentStats.neutral / total) * 100);
      const negativePercent = Math.round((sentimentStats.negative / total) * 100);

      new Chart.default(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Positive', 'Neutral', 'Negative'],
          datasets: [{
            data: [positivePercent, neutralPercent, negativePercent],
            backgroundColor: [
              'hsl(var(--success))',
              'hsl(var(--warning))',
              'hsl(var(--destructive))'
            ],
            borderWidth: 0
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom'
            }
          }
        }
      });
    });
  }, [sentimentStats, statsLoading]);

  if (trendsLoading || statsLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardContent className="pt-6">
            <Skeleton className="h-6 w-40 mb-6" />
            <Skeleton className="h-64 w-full" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <Skeleton className="h-6 w-40 mb-6" />
            <Skeleton className="h-64 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* Sentiment Trends Chart */}
      <Card className="shadow-sm border border-gray-200">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Sentiment Trends</h3>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-36">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">Last 7 days</SelectItem>
                <SelectItem value="30">Last 30 days</SelectItem>
                <SelectItem value="90">Last 90 days</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="h-64">
            <canvas ref={sentimentChartRef}></canvas>
          </div>
        </CardContent>
      </Card>

      {/* Sentiment Distribution */}
      <Card className="shadow-sm border border-gray-200">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Sentiment Distribution</h3>
            <button className="text-sm text-primary hover:text-blue-700">View Details</button>
          </div>
          <div className="h-64">
            <canvas ref={distributionChartRef}></canvas>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
