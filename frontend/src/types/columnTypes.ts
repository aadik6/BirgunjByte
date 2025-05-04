export type CategoryData = {
    id: string;
    name: string;
    description: string;
    createdAt?: string;
    updatedAt?: string;
}

export type Categories = {
    message:string;
    success:boolean;
    data:CategoryData[];
}