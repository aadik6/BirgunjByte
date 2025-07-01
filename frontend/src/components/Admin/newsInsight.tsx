import { useParams } from "react-router-dom";
import LineChart from "./lineChart";
import { useEffect, useState } from "react";
import { newsData, ViewsData } from "@/types/newsTypes";
import { getDailyViews } from "@/apis/news";
import { Calendar, User, FileText, Clock, RefreshCw } from "lucide-react";
import { format } from "date-fns";

const NewsInsight = () => {
  const { id } = useParams();
  const [data, setData] = useState<ViewsData[]>([]);
  const [newsDetails, setNewsDetails] = useState<newsData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async (id: any) => {
      setLoading(true);
      try {
        const result = await getDailyViews(id, "weekly");
        setData(result.data.data);
        setNewsDetails(result.data.news);
      } catch (error) {
        console.error("Error fetching news insights:", error);
      } finally {
        setLoading(false);
      }
    };
    
    if (id) {
      fetchData(id);
    }
  }, [id]);

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return format(date, "PPP"); // Format as "April 29, 2023"
    } catch (error) {
      return dateString;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 px-4 space-y-6">
      {/* News Details Card */}
      {newsDetails && (
        <div className="bg-background/65 rounded-lg shadow-md p-6 border-t-4 border-purple-500">
          <h1 className="text-2xl font-bold mb-4">{newsDetails.heading}</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <FileText size={18} className="text-purple-500" />
                <span className="font-medium">Category:</span>
                <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                  {newsDetails.category?.name}
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                <User size={18} className="text-blue-500" />
                <span className="font-medium">Author:</span>
                <span>
                  {newsDetails.createdBy?.firstName} {newsDetails.createdBy?.lastName}
                </span>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Calendar size={18} className="text-green-500" />
                <span className="font-medium">Created:</span>
                <span>{formatDate(newsDetails.createdAt)}</span>
              </div>
              
              {newsDetails.updatedBy && (
                <div className="flex items-center space-x-2">
                  <RefreshCw size={18} className="text-amber-500" />
                  <span className="font-medium">Updated By:</span>
                  <span>
                    {newsDetails.updatedBy.firstName} {newsDetails.updatedBy.lastName}
                  </span>
                </div>
              )}
              
              {newsDetails.updatedAt && newsDetails.updatedAt !== newsDetails.createdAt && (
                <div className="flex items-center space-x-2">
                  <Clock size={18} className="text-amber-500" />
                  <span className="font-medium">Last Updated:</span>
                  <span>{formatDate(newsDetails.updatedAt)}</span>
                </div>
              )}
            </div>
          </div>
          
          {/* View Stats Summary */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <h3 className="text-lg font-semibold mb-2">Article Performance</h3>
            <div className="flex flex-wrap gap-4">
              <div className="bg-purple-50 px-4 py-2 rounded-md">
                <p className="text-sm text-gray-600">Total Views</p>
                <p className="text-xl font-bold text-purple-700">
                  {data.reduce((sum, item) => sum + item.views, 0).toLocaleString()}
                </p>
              </div>
              <div className="bg-blue-50 px-4 py-2 rounded-md">
                <p className="text-sm text-gray-600">Average Daily</p>
                <p className="text-xl font-bold text-blue-700">
                  {data.length > 0 
                    ? Math.round(data.reduce((sum, item) => sum + item.views, 0) / data.length).toLocaleString()
                    : 0}
                </p>
              </div>
              <div className="bg-green-50 px-4 py-2 rounded-md">
                <p className="text-sm text-gray-600">Peak Views</p>
                <p className="text-xl font-bold text-green-700">
                  {data.length > 0 
                    ? Math.max(...data.map(item => item.views)).toLocaleString()
                    : 0}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Analytics Chart */}
      <div className="mt-6">
        <LineChart initialData={data} newsId={id} title="Views Analytics" />
      </div>
    </div>
  );
};

export default NewsInsight;
