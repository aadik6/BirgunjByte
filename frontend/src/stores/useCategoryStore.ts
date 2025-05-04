import { getCategories } from '@/apis/category';
import { CategoryData } from '@/types/columnTypes';
import { toast } from 'sonner';
import { create } from 'zustand';

interface CategoryStore {
    categories: CategoryData[];
    loading: boolean;
    error: string | null;
    fetchCategories: () => Promise<void>;
    setCategories: (categories: CategoryData[]) => void;
}

const useCategoryStore = create<CategoryStore>()((set) => ({
    categories: [],
    loading: false,
    error: null,
    setCategories: (categories) => set({ categories }),

    fetchCategories: async () => {
        try {
            set({ loading: true, error: null });
            const res = await getCategories();
            set({ categories: res.data.categories })
            set({ loading: false });
        } catch (err:any) {
            set({ loading: false, error: "Error fetching categories" });
            toast.error("Error fetching categories", err);
            console.error("Error fetching categories", err);
        }
    },
}));

export default useCategoryStore;