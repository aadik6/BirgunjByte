import { getNewsByCategory } from "@/apis/news";
import { newsData } from "@/types/newsTypes";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import parse from "html-react-parser";
import CategoryPageSkeleton from "@/components/categoryPageSkeleton";

const CategoryNews = () => {
  const { name, id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const [categoryNews, setCategoryNews] = useState<newsData[]>([]);
  const [recentNews, setRecentNews] = useState<newsData[]>([]);
  const getNews = async (categoryId: string) => {
    try{
      setLoading(true);
      const res = await getNewsByCategory(categoryId);
      setCategoryNews(res.data.news);
      setRecentNews(res.data.recentNews);
      setLoading(false);
      // console.log(res, "categoryNews");
    }catch (err) {
      setLoading(false);
      console.error("Error fetching category news", err);
    }
  };
  useEffect(() => {
    getNews(id as string);
  }, [id,name]);

  // Separate featured news from regular news
  const featuredNews = recentNews[0];
  const recentCatNews = recentNews.slice(1, 6);

  if(loading){
    return <CategoryPageSkeleton/>
  }

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Category Title */}
      <div className="mb-5 text-center">
        <h1 className="text-3xl font-bold uppercase">{name}</h1>
        <div className="h-1 w-24 bg-purple-800 mx-auto mt-2"></div>
      </div>

      {/* Main Content Layout */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Featured News - 3/4 width */}
        {featuredNews && (
          <div className="w-full md:w-2/3">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">
              Featured News
            </h2>

            {/* Featured News Item */}
            <div className="bg-background/50 rounded shadow-md overflow-hidden">
              <img
                src={featuredNews.image}
                alt={featuredNews.heading}
                className="w-full md:h-72 object-cover"
              />
              <div className="p-4">
                <h3 className="text-2xl font-bold mb-2">
                  {parse(featuredNews.heading)}
                </h3>
                <p className="text-gray-700 mb-4 line-clamp-6">
                  {parse(featuredNews.description)}
                </p>

                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gray-300 rounded-full mr-2 flex items-center justify-center">
                      {/* {featuredNews?.author.charAt(0)} */}
                    </div>
                    <span>Aadarsh Kushwaha</span>
                  </div>
                  <span className="text-gray-500">
                    {featuredNews.npDate?.split("T")[0]}
                  </span>
                  <button
                    className=" bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
                    onClick={() => {
                      navigate(`/news/${featuredNews.id}`);
                    }}
                  >
                    Read More
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Recent News - 1/4 width */}
        <div className="w-full md:w-1/3">
          <h2 className="text-xl font-semibold mb-4 border-b pb-2">
            भर्खर प्रकाशित
          </h2>

          <div className="space-y-4">
            {recentCatNews.map((news) => (
              <div
                key={news.id}
                className="flex border-b pb-2 overflow-hidden  cursor-pointer items-center"
                onClick={() => {
                  navigate(`/news/${news.id}`);
                }}
              >
                <div className="w-1/3 overflow-hidden">
                  <img
                    src={news.image}
                    alt={news.heading}
                    className="w-full object-cover"
                  />
                </div>
                <div className="w-2/3 p-3">
                  <h4 className="text-[15px] md:text-lg font-light md:font-normal">
                    {parse(news.heading)}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Remaining News */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4 border-b pb-2">
          {name} सुचना
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryNews &&
            categoryNews.map((news) => (
              <div
                key={news.id}
                className="bg-background/50 rounded shadow-md overflow-hidden"
              >
                <img
                  src={news.image}
                  alt={news.heading}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-bold mb-2">{news.heading}</h3>
                  <p className="text-sm text-gray-700 mb-3">
                    {news.description}
                  </p>
                  <div className="flex justify-between items-center text-xs">
                    {/* <span>By {news.author}</span> */}
                    <span className="text-gray-500">
                      {news.npDate?.split("T")[0]}
                    </span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryNews;
