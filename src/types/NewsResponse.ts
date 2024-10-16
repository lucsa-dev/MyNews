import { Article } from "./Article";

export interface NewsResponse {
    status: string;
    totalResults: number;
    articles: Article[];
}