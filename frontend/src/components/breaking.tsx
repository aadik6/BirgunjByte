import useNewsStore from "@/stores/useNewsStore";
import { Marquee } from "./magicui/marquee";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Breaking = () => {
  const { breakingNews,fetchNews } = useNewsStore();
  useEffect(() => {
    fetchNews();
  }, []);
  const navigate = useNavigate();

  return (
    <div className="flex items-baseline ">
      {/* <div>
        <AuroraText className="text-2xl font-bold">Breaking</AuroraText>
      </div> */}
      <div className="bg-purple-800 text-white text-sm md:text-xl py-1 px-2 font-bold rounded-bl-sm ">Breaking:</div>
      <Marquee pauseOnHover>
        {breakingNews &&
          breakingNews.map((news) => (
            <div
              key={news.id}
              className="text-sm md:text-lg flex items-center gap-2 cursor-pointer"
              onClick={() => {
                navigate(`/news/${news.id}`);
              }}
            >
              {news.heading}
            </div>
          ))}
      </Marquee>
    </div>
  );
};

export default Breaking;
