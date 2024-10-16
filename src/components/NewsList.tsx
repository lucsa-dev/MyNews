import { FlatList, View, Text, StyleSheet, Dimensions } from "react-native";
import { Article } from "../types/Article";

const { height } = Dimensions.get("window");

type NewsListComponentProps = {
    news: Article[];
};

export default function NewsListComponent({ news }: NewsListComponentProps) {
    return (
        <FlatList
            data={news}
            keyExtractor={(item) => item.url}
            renderItem={({ item }) => (
                <View style={styles.newsItem}>
                    <Text style={styles.title}>{item.title}</Text>
                </View>
            )}
            pagingEnabled
            horizontal={false}
            showsVerticalScrollIndicator={false}
            snapToAlignment="start"
            decelerationRate="fast"
        />
    );
}

const styles = StyleSheet.create({
    newsItem: {
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        height,
    },
    title: {
        fontSize: 62,
        fontWeight: "bold",
        textAlign: "center",
    },
});
