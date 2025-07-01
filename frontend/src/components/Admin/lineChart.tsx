import { useState, useEffect } from "react";
import {
  LineChart as RechartLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { getDailyViews } from "@/apis/news";

interface ViewData {
  date: string;
  views: number;
}

type TimeRange = "weekly" | "monthly" | "yearly";

interface LineChartProps {
  newsId?: string;
  title?: string;
  initialData?: ViewData[];
}

const LineChart = ({
  newsId,
  title = "News Views Analytics",
  initialData = [],
}: LineChartProps) => {
  const [timeRange, setTimeRange] = useState<TimeRange>("weekly");
  const [filteredData, setFilteredData] = useState<ViewData[]>(initialData);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch data based on time range
  const fetchViewsData = async (range: TimeRange) => {
    if (!newsId) return;

    setIsLoading(true);
    setError(null);

    try {
      const res = await getDailyViews(newsId, range);
      if (res.status === 200) {
        // Process the API response data
        const formattedData = formatDataForDisplay(res.data.data, range);
        setFilteredData(formattedData);
      } else {
        setError("Failed to load view data");
      }
    } catch (err) {
      console.error("Error fetching view data:", err);
      setError("Error loading view data");
    } finally {
      setIsLoading(false);
    }
  };

  // Format dates based on time range for better display
  const formatDataForDisplay = (data: ViewData[], range: TimeRange) => {
    return data.map((item) => {
      const date = new Date(item.date);
      let displayDate: string;

      switch (range) {
        case "weekly":
          displayDate = date.toLocaleDateString(undefined, {
            weekday: "short",
          });
          break;
        case "monthly":
          displayDate = date.toLocaleDateString(undefined, {
            month: "short",
            day: "numeric",
          });
          break;
        case "yearly":
          displayDate = date.toLocaleDateString(undefined, { month: "short" });
          break;
        default:
          displayDate = date.toLocaleDateString();
      }

      return {
        date: displayDate,
        views: item.views,
        fullDate: item.date.split("T")[0],
      };
    });
  };

  // Initial data load and when timeRange changes
  useEffect(() => {
    fetchViewsData(timeRange);
  }, [newsId, timeRange]);

  const getTimeRangeDescription = () => {
    switch (timeRange) {
      case "weekly":
        return "Views for the last 7 days";
      case "monthly":
        return "Views for the last 30 days";
      case "yearly":
        return "Views for the last 12 months";
      default:
        return "";
    }
  };

  // Calculate statistics
  const totalViews = filteredData.reduce((sum, item) => sum + item.views, 0);
  const averageViews =
    filteredData.length > 0 ? Math.round(totalViews / filteredData.length) : 0;
  const peakViews =
    filteredData.length > 0
      ? Math.max(...filteredData.map((item) => item.views))
      : 0;

  const customTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-md shadow-sm">
          <p className="font-medium text-muted">{data.fullDate}</p>
          <p className="text-[#8B5CF6] font-medium">
            Views: {payload[0].value.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  const handleTimeRangeChange = (value: string) => {
    setTimeRange(value as TimeRange);
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-xl font-bold">{title}</CardTitle>
          <CardDescription>{getTimeRangeDescription()}</CardDescription>
        </div>
        <Select
          value={timeRange}
          onValueChange={handleTimeRangeChange}
          disabled={isLoading}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="weekly">Last 7 Days</SelectItem>
            <SelectItem value="monthly">Last 30 Days</SelectItem>
            <SelectItem value="yearly">Last Year</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="h-[300px]">
          {isLoading ? (
            <div className="h-full flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-700"></div>
            </div>
          ) : error ? (
            <div className="h-full flex items-center justify-center text-red-500">
              {error}
            </div>
          ) : filteredData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <RechartLineChart
                data={filteredData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.4} />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip content={customTooltip} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="views"
                  stroke="#8B5CF6"
                  strokeWidth={2}
                  activeDot={{ r: 8 }}
                  dot={{ strokeWidth: 2 }}
                />
              </RechartLineChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500">
              No data available for the selected time period
            </div>
          )}
        </div>

        <div className="mt-4 flex justify-between text-sm text-muted-foreground">
          <div>
            Total Views:{" "}
            <span className="font-medium text-foreground">
              {totalViews.toLocaleString()}
            </span>
          </div>
          <div>
            Average:{" "}
            <span className="font-medium text-foreground">
              {averageViews.toLocaleString()}
            </span>
          </div>
          <div>
            Peak:{" "}
            <span className="font-medium text-foreground">
              {peakViews.toLocaleString()}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LineChart;
