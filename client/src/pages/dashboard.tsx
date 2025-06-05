import { Button } from "@/components/ui/button";
import { Download, Menu } from "lucide-react";
import Sidebar from "@/components/sidebar";
import StatsCards from "@/components/stats-cards";
import SentimentCharts from "@/components/sentiment-charts";
import FeedbackList from "@/components/feedback-list";
import { useToast } from "@/hooks/use-toast";

export default function Dashboard() {
  const { toast } = useToast();

  const handleExport = async () => {
    try {
      const response = await fetch("/api/export/feedback");
      if (!response.ok) throw new Error("Export failed");
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = "feedback-export.csv";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      
      toast({
        title: "Success",
        description: "Feedback data exported successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to export feedback data",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center">
              <Button variant="ghost" size="sm" className="md:hidden mr-4">
                <Menu className="w-6 h-6" />
              </Button>
              <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Refresh
              </Button>
              <Button onClick={handleExport}>
                Export Data
              </Button>
            </div>
          </div>
        </header>

        {/* Main Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <StatsCards />
          <SentimentCharts />
          <FeedbackList />
        </main>
      </div>

      {/* Quick Actions Floating Button (Mobile) */}
      <div className="fixed bottom-6 right-6 md:hidden">
        <Button size="lg" className="w-14 h-14 rounded-full shadow-lg">
          <Download className="w-6 h-6" />
        </Button>
      </div>
    </div>
  );
}
