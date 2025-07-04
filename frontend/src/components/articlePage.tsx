import { useEffect, useState } from "react";
import {
  Clock,
  Eye,
  ChevronLeft,
  Bookmark,
  Share2,
  ThumbsUp,
} from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { newsData } from "@/types/newsTypes";
import { getNewsById } from "@/apis/news";
import parse from "html-react-parser";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ArticleSkeleton from "./articleSkeleton";
import useNewsStore from "@/stores/useNewsStore";
import NewsCard from "./newsCard";
import NewsCardSkeleton from "./NewsCardSkeleton";

// Dummy author data
const authorData = {
  name: "Aadarsh Kushwaha",
  role: "Local News Reporter",
};

export default function ArticlePage() {
  const id = useParams();
  const [newsArticle, setNewsArticle] = useState<newsData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const fetchNews = async (id: string) => {
    try {
      setLoading(true);
      const res = await getNewsById(id);
      setNewsArticle(res.data);
      setLoading(false);
    } catch (error: any) {
      console.error("Error fetching news by ID:", error);
    }
  };
  useEffect(() => {
    if (id.id) {
      fetchNews(id.id);
    }
    window.scrollTo(0, 0);
  }, [id.id]);

  const [likes, setLikes] = useState(89);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleLike = () => {
    setLikes(likes + 1);
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };
  const date = newsArticle?.npDate?.split("T")[0];
  const { news } = useNewsStore();
  const relatedArticles = news
    .filter(
      (article) =>
        article.category._id === newsArticle?.category._id &&
        article.id !== newsArticle?.id
    )
    .slice(0, 5);

  if (loading) {
    return <ArticleSkeleton />;
  }

  return (
    <>
      {newsArticle && (
        <article className="max-w-4xl mx-auto px-4">
          {/* Back button */}
          <div className="mb-6">
            <button className="flex items-center text-gray-600 hover:text-purple-800 transition">
              <ChevronLeft size={20} />
              <Link to={"/"} className="ml-1">
                Back to News
              </Link>
            </button>
          </div>

          {/* Category and Date */}
          <div className="flex flex-wrap items-center text-sm mb-4">
            <span className="bg-purple-800 text-white px-3 py-1 rounded-full font-medium">
              {newsArticle.category.name}
            </span>
            <div className="flex items-center text-gray-500 ml-3 md:ml-4">
              <Clock size={16} />
              <span className="ml-1">{date}</span>
            </div>
            <div className="flex items-center text-gray-500 ml-3 md:ml-4">
              <Eye size={16} />
              <span className="ml-1">{newsArticle.views} views</span>
            </div>
          </div>

          {/* Article Title */}
          <h1 className="text-xl md:text-3xl font-bold mb-6">
            {parse(newsArticle.heading)}
          </h1>

          {/* Author info */}
          <div className="flex items-center mb-6">
            <Avatar className="w-10 h-10">
              <AvatarImage src="https://github.com/shadcn.png" alt="name" />
              <AvatarFallback>AK</AvatarFallback>
            </Avatar>
            <div className="ml-3">
              <p className="font-medium">{authorData.name}</p>
              <p className="text-sm text-gray-500">{authorData.role}</p>
            </div>
          </div>

          {/* Featured Image */}
          <div className="mb-8">
            <img
              src={newsArticle.image}
              alt={newsArticle.heading}
              className="w-full md:h-96 object-cover rounded-lg shadow-md"
            />
          </div>

          {/* Article content */}
          <div className="prose max-w-none mb-8">
            {newsArticle && <div>{parse(newsArticle.description)}</div>}
          </div>

          {/* Engagement buttons */}
          <div className="flex items-center justify-between border-t border-b py-4 my-8">
            <div className="flex items-center space-x-6">
              <button
                onClick={handleLike}
                className="flex items-center text-muted-foreground"
                disabled={true}
              >
                <ThumbsUp
                  size={20}
                  className={likes > 89 ? "text-blue-600 fill-blue-600" : ""}
                />
                <span className="ml-2">{likes}</span>
              </button>

              <button
                onClick={handleBookmark}
                className="flex items-center text-muted-foreground"
              >
                <Bookmark
                  size={20}
                  // className={isBookmarked ? "text-blue-600 fill-blue-600" : ""}
                />
                <span className="ml-2">Save</span>
              </button>
              {/* <ShareButton/> */}

              <button className="flex items-center 0 hover:text-blue-600 transition">
                <Share2 size={20} />
                <span className="ml-2">Share</span>
              </button>
            </div>
          </div>
        </article>
      )}
      {/* related articles section */}
      {relatedArticles && relatedArticles.length > 0 ? (
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-4">सम्बन्धित सुचना</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {relatedArticles.map((article) => (
              <div onClick={()=>{navigate(`/news/${article.id}`)}} className="cursor-pointer">
                <NewsCard news={article}/>
              </div>
            ))}
          </div>
        </div>
      ):(
        Array.from({ length: 5 }, (_, index) => (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <NewsCardSkeleton key={index} />
          </div>
        ))
      )}
    </>
  );
}
