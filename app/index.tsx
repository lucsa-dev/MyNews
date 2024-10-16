import { View, Text, ActivityIndicator, FlatList, Image, StyleSheet, Dimensions } from "react-native";
import { useEffect, useState } from "react";
import { Article } from "../src/types/Article";
import { fetchNews } from "../src/services/fetchNews";
import NewsListComponent from "../src/components/NewsList";

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
            <NewsListComponent news={news} />;
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});