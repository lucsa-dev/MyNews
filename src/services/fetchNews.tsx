import { API_KEY } from "@env"
import { NewsResponse } from "../types/NewsResponse";

const API_URL = 'https://newsapi.org/v2/top-headlines?sources=google-news-br&apiKey=' + API_KEY;

export const fetchNews = async (): Promise<NewsResponse | null> => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.statusText}`);
    }
    const data: NewsResponse = await response.json();

    return data;
  } catch (error) {
    console.error('Erro ao buscar notícias:', error);
    return null;
  }
};
