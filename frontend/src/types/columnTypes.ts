export type CategoryData = {
    id: string;
    _id?: string;
    name: string;
    description: string;
    updatedBy?: string;
    createdBy?: string;
    createdAt?: string;
    updatedAt?: string;
}

export type Categories = {
    message: string;
    success: boolean;
    data: CategoryData[];
}