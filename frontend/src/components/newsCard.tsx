import { newsData } from "@/types/newsTypes";
import { Clock, User, Eye } from "lucide-react";
import parse from "html-react-parser";

interface NewsCardProps {
    news: newsData;
    }

const NewsCard = ({news}:NewsCardProps) => {
    const date = news?.npDate?.split("T")[0];
  return (
    <div className="rounded-lg bg-background/50 overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
        
      {/* Image */}
      <div className="relative">
        <img src={news.image} alt={news.heading} className="w-full md:h-48 object-cover" />
        {/* Category badge */}
        <div className="absolute top-4 left-4">
          <span className="bg-purple-800 text-white text-xs font-medium px-2 py-1 rounded">
            {news.category.name}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Heading */}
        <h3 className="text-lg font-bold mb-2 line-clamp-2">
          {parse(news.heading)}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{parse(news.description)}</p>

        {/* Footer with date, author, and views */}
        <div className="flex items-center justify-between text-gray-500 text-xs">
          <div className="flex items-center">
            <Clock size={14} className="mr-1" />
            <span>{date}</span>
          </div>
          <div className="flex items-center">
            <User size={14} className="mr-1" />
            <span>Aadarsh Kushwaha</span>
          </div>
          <div className="flex items-center">
            <Eye size={14} className="mr-1" />
            <span>{news.views}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
