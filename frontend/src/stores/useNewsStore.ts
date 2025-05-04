import { getAllNews } from "@/apis/news";
import { newsData } from "@/types/newsTypes";
import { toast } from "sonner";
import { create } from "zustand";
interface NewsStore {
    news: newsData[];
    loading: boolean;
    error: string | null;
    fetchNews: () => Promise<void>;
    breakingNews: newsData[];
    recentNews: newsData[];
    setNews: (news: newsData[]) => void;
    topTechNews: newsData|null;
}

const useNewsStore = create<NewsStore>()((set) => ({
    news: [],
    breakingNews: [],
    loading: false,
    error: null,
    recentNews:[],
    topTechNews:null,
    setNews: (news) => set({ news }),

    fetchNews: async () => {
        try {
            set({ loading: true, error: null });
            const res = await getAllNews();
            set({ news: res.data.news });
            console.log(res,"news")
            var breaking = res.data.news.filter((item: newsData) => item.isBreaking);
            const recentPosts = res.data.news
            .sort((a: newsData, b: newsData) => {
                const dateA = new Date(a.createdAt).getTime();
                const dateB = new Date(b.createdAt).getTime();
                return dateB - dateA; // Sort in descending order (most recent first)
            })
            .slice(0, 4); // Get the first five posts
        
        console.log(recentPosts);
        
            set({topTechNews:res.topTechNews[0]})
            set({ breakingNews: breaking });
            set({ recentNews: recentPosts });
            set({ loading: false });
        } catch (err: any) {
            set({ loading: false, error: "Error fetching news" });
            toast.error("Error fetching news", err);
            console.error("Error fetching news", err);
        }
    },
}))

export default useNewsStore;
