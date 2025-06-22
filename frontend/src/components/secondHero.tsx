import useNewsStore from "@/stores/useNewsStore";
import { ArrowRight } from "lucide-react";
import parse from "html-react-parser";
import { useEffect } from "react";
import { AuroraText } from "./magicui/aurora-text";
import { useNavigate } from "react-router-dom";
import NewsCardSkeleton from "./NewsCardSkeleton";
import { Skeleton } from "./ui/skeleton";

const SecondHero = () => {
  const { recentNews, topTechNews, fetchNews } = useNewsStore();
  useEffect(() => {
    if (!topTechNews || !recentNews?.length) {
      fetchNews();
    }
  }, []);
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left Column - Featured News and Small Tech News Cards */}
        <div className="flex flex-col space-y-6">
          {/* Featured Tech News */}
          <div className="space-y-4">
            <AuroraText className="text-lg font-bold mb-3">
              सुचना प्रविधि
            </AuroraText>
            {/* <h3 className="text-lg font-bold mb-3">सुचना प्रविधि</h3> */}
            <div className="technews bg-background/50 rounded-lg shadow-md overflow-hidden">
              {topTechNews ? (
                <div className="flex flex-col">
                  <div className="md:h-60 overflow-hidden">
                    <img
                      src={topTechNews.image}
                      alt={topTechNews.heading}
                      className="w-full md:h-full object-cover"
                    />
                  </div>
                  <div
                    className="p-4 flex flex-col flex-grow cursor-pointer"
                    onClick={() => {
                      navigate(`news/${topTechNews.id}`);
                    }}
                  >
                    <h2 className="text-lg font-bold mb-3">
                      {parse(topTechNews.heading)}
                    </h2>
                    <div className="h-[50px] text-ellipsis overflow-hidden">
                      <p className="text-gray-600 mb-4 flex-grow text-sm line-clamp-2">
                        {parse(topTechNews.description)}
                      </p>
                    </div>
                    <button className="flex items-center text-purple-600 hover:text-purple-800 font-medium transition-colors">
                      Read more
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <NewsCardSkeleton />
              )}
            </div>
          </div>

          {/* Small Tech News Cards */}
        </div>

        {/* Recent News Cards */}
        <div className="flex flex-col space-y-2.5">
          <AuroraText className="text-lg font-bold mb-3">
            भर्खर प्रकाशित
          </AuroraText>

          {/* <SparklesText className="text-lg font-bold mb-3">
        
          </SparklesText> */}

          {/* <h3 className="text-lg font-bold  mb-2">भर्खर प्रकाशित</h3> */}
          {recentNews && recentNews.length > 0
            ? recentNews.map((news) => (
                <div
                  key={news.id}
                  className="flex bg-background/50 rounded-lg shadow-md overflow-hidden md:h-24 cursor-pointer items-center"
                  onClick={() => {
                    navigate(`news/${news.id}`);
                  }}
                >
                  <div className="w-1/3 overflow-hidden">
                    <img
                      src={news.image}
                      alt={news.heading}
                      className="w-full md:h-full object-cover"
                    />
                  </div>
                  <div className="w-2/3 p-3">
                    <h4 className="text-[15px] md:text-lg font-light md:font-normal  line-clamp-2">
                      {parse(news.heading)}
                    </h4>
                  </div>
                </div>
              ))
            : Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="flex bg-background/50 rounded-lg shadow-md overflow-hidden md:h-24 items-center"
                >
                  <div className="w-1/3 overflow-hidden">
                    <Skeleton className="w-full md:h-full object-cover" />
                  </div>
                  <div className="w-2/3 p-3">
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default SecondHero;
