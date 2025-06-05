import { Button } from "@/components/ui/button";
import { Menu, Plus } from "lucide-react";
import Sidebar from "@/components/sidebar";
import FeedbackForm from "@/components/feedback-form";
import FeedbackList from "@/components/feedback-list";

export default function FeedbackCollection() {
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
              <h1 className="text-2xl font-semibold text-gray-900">Feedback Collection</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline">
                Setup Email Integration
              </Button>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Feedback
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6 space-y-8">
          <FeedbackForm />
          <FeedbackList />
        </main>
      </div>
    </div>
  );
}
