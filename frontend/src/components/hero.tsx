import { Tag } from "lucide-react";
import { AuroraText } from "@/components/magicui/aurora-text";
import { useEffect } from "react";
import parse from "html-react-parser";
import HeroSkeleton from "./ui/heroSkeleton";
import {useNavigate } from "react-router-dom";
import useNewsStore from "@/stores/useNewsStore";

const Hero = () => {
  const {loading,featuredNews,secondaryNews,fetchFeaturedNews} = useNewsStore();
  const navigate = useNavigate();

  useEffect(() => {
    if(!secondaryNews?.length){
      fetchFeaturedNews();
    }
  }, []);

  if (loading || !featuredNews || !secondaryNews) {
    return <HeroSkeleton />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Main featured news - left column */}
        {featuredNews && (
          <div className="bg-background/50 rounded-lg shadow-lg overflow-hidden">
            <div className="relative">
              <img
                src={featuredNews.image}
                alt={featuredNews.heading}
                className="w-full md:h-80 object-cover "
              />
              <div className="absolute top-4 left-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-800 text-white">
                  <Tag size={12} className="mr-1" />
                  {featuredNews.category.name}
                </span>
              </div>
            </div>
            <div
              className="p-6 cursor-pointer"
              onClick={() => {
                navigate(`news/${featuredNews.id}`);
              }}
            >
              <AuroraText className="text-xl font-bold mb-3">
                {parse(featuredNews.heading)}
              </AuroraText>
              <div className="h-[288px] text-ellipsis overflow-hidden">
                <p className="text-gray-600 ">
                  {parse(featuredNews.description)}
                </p>
              </div>
              <button
                onClick={() => {
                  navigate(`/news/${featuredNews.id}`);
                }}
                className="mt-4 text-purple-600 font-medium hover:underline cursor-pointer"
              >
                Read more →
              </button>
            </div>
          </div>
        )}

        {/* Secondary news - right column */}
        <div className="flex flex-col space-y-4">
          {secondaryNews.map((news, index) => (
            <div
              key={index}
              className="bg-background/50 rounded-lg shadow-lg overflow-hidden flex flex-col h-full"
            >
              <div className="relative">
                <img
                  src={news.image}
                  alt={news.heading}
                  className="w-full h-40 object-cover"
                />
                <div className="absolute top-3 left-3">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-800 text-white">
                    <Tag size={10} className="mr-1" />
                    {news.category.name}
                  </span>
                </div>
              </div>
              <div className="p-4 flex-grow cursor-pointer" onClick={()=>{navigate(`news/${news.id}`)}}>
                <h3 className="text-lg font-bold mb-2 md:line-clamp-1">
                  {parse(news.heading)}
                </h3>
                <div className="h-[100px] text-ellipsis overflow-hidden">
                  <p className="text-gray-600 text-sm line-clamp-5">
                    {parse(news.description)}
                  </p>
                </div>
                <button  className=" text-purple-600 font-medium hover:underline cursor-pointer mt-3">
                  Read more →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
