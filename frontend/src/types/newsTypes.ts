import { CategoryData } from "./columnTypes";

type authorData = {
  id?: string;
  firstName?: string;
  lastName?: string;
};
export type newsData = {
  id: string;
  heading: string;
  description: string;
  image: string;
  isBreaking: boolean;
  category: CategoryData;
  createdAt: string;
  views: string;
  updatedAt?: string;
  npDate?: string;
  createdBy?: authorData;
  updatedBy?: authorData;
};

export type ViewsData = {
  id: string;
  date: string;
  views: number;
};
