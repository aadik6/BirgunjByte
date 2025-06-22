import { CategoryData } from "./columnTypes";

export type newsData = {
    id: string;
    heading: string;
    description: string;
    image: string;
    isBreaking: boolean;
    category: CategoryData;
    createdAt: string;
    views:string,
    updatedAt?: string;
    npDate?: string;
    };

    