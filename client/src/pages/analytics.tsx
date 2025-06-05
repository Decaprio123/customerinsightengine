import { Button } from "@/components/ui/button";
import { Menu, Download, Filter } from "lucide-react";
import Sidebar from "@/components/sidebar";
import StatsCards from "@/components/stats-cards";
import SentimentCharts from "@/components/sentiment-charts";

export default function Analytics() {
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
              <h1 className="text-2xl font-semibold text-gray-900">Analytics</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
              <Button>
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6 space-y-8">
          <StatsCards />
          <SentimentCharts />
          
          {/* Additional Analytics Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Sentiment Journey</h3>
              <p className="text-gray-600">Track how customer sentiment changes over time and identify improvement opportunities.</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Learning Progress</h3>
              <p className="text-gray-600">Monitor how the sentiment analysis accuracy improves with more feedback data.</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
