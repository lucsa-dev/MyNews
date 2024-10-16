import { View, Text, ActivityIndicator, FlatList, Image, StyleSheet, Dimensions } from "react-native";
import { useEffect, useState } from "react";
import { Article } from "../src/types/Article";
import { fetchNews } from "../src/services/fetchNews";
const { height } = Dimensions.get("window");

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
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
            </View>
            )}
            pagingEnabled
            horizontal={false}
            showsVerticalScrollIndicator={false}
            snapToAlignment="start"
            decelerationRate="fast"
        />
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
    newsItem: {
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        height,
    },
    image: {
        width: "100%",
        height: 200,
        marginBottom: 15,
    },
    titleContainer: {
        height: height * 0.4,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: 62,
        fontWeight: "bold",
        textAlign: "center",
    },
    description: {
        fontSize: 16,
        textAlign: "center",
    },
});