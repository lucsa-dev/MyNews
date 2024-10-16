import { View, Text, ActivityIndicator, FlatList, Image } from "react-native";
import styles from "./Home.style";
import { useEffect, useState } from "react";
import { fetchNews } from "../../services/fetchNews";
import { Article } from "../../types/Article";

export default function Home () {

    const [news, setNews] = useState<Article[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const getNews = async () => {
        setLoading(true);
        const newsData = await fetchNews();
        if (newsData) {
            setNews(newsData.articles);
        }
        setLoading(false);
        };

        getNews();
    }, []);

    if (loading) {
        return (
        <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text>Carregando notícias...</Text>
        </View>
        );
    }

    return (
        <View style={styles.container}>
        <FlatList
            data={news}
            keyExtractor={(item) => item.url}
            renderItem={({ item }) => (
            <View style={styles.newsItem}>
                <Image src={item.urlToImage ?? undefined} alt={item.title} />
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
            </View>
            )}
        />
        </View>
    );
};