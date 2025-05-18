import { getMostViewed } from "@/apis/news";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { newsData } from "@/types/newsTypes";
import { useEffect, useState } from "react";
import NewsCard from "./newsCard";
import { useNavigate } from "react-router-dom";
import { AuroraText } from "./magicui/aurora-text";
import NewsCardSkeleton from "./NewsCardSkeleton";
const MostViewed = () => {
  const [mostViewed, setMostViewed] = useState<newsData[]>([]);
  const navigate = useNavigate();
  const fetchMostViewed = async () => {
    try {
      const res = await getMostViewed();
      setMostViewed(res.data.news);
      console.log(res.data.news, "mostViewed");
    } catch (error: any) {
      console.error("Error fetching most viewed news:", error);
    }
  };
  useEffect(() => {
    fetchMostViewed();
  }, []);

  return (
    <div className="px-4">
      <AuroraText className="text-lg font-bold mb-3">धेरै पढिएको</AuroraText>
      <Carousel className="w-full">
        <CarouselContent>
          {mostViewed && mostViewed.length > 0
            ? mostViewed.map((news) => (
                <CarouselItem
                  key={news.id}
                  className="relative flex-shrink-0 md:basis-1/2 lg:basis-1/4 cursor-pointer"
                  onClick={() => navigate(`/news/${news.id}`)}
                >
                  <NewsCard news={news} />
                </CarouselItem>
              ))
            : Array.from({ length: 5 }).map((_, idx) => (
                <CarouselItem
                  key={idx}
                  className="relative flex-shrink-0 md:basis-1/2 lg:basis-1/4"
                >
                  <NewsCardSkeleton />
                </CarouselItem>
              ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default MostViewed;
