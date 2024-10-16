import { API_KEY } from "@env";
import { NewsResponse } from "../types/NewsResponse";

const API_URL = 'https://newsapi.org/v2/top-headlines?sources=google-news-br&apiKey=' + API_KEY;
const CACHE_KEY = 'news_cache';
const CACHE_EXPIRY = 3 * 60 * 60 * 1000; // 3 horas em milissegundos

export const fetchNews = async (): Promise<NewsResponse | null> => {
  const cachedData = localStorage.getItem(CACHE_KEY);
  const now = new Date().getTime();

  if (cachedData) {
    const { data, timestamp } = JSON.parse(cachedData);

    // Verifica se o cache está ainda válido
    if (now - timestamp < CACHE_EXPIRY) {
      return data;
    }
  }

  // Se não houver cache válido, faz a requisição à API
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.statusText}`);
    }
    const data: NewsResponse = await response.json();

    // Armazena os dados e o timestamp no cache
    localStorage.setItem(CACHE_KEY, JSON.stringify({ data, timestamp: now }));

    return data;
  } catch (error) {
    console.error('Erro ao buscar notícias:', error);
    return null;
  }
};
