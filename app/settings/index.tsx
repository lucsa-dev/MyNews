// app/settings/index.tsx

import React from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

const settingsOptions = [
    { id: '1', title: 'Gerenciar RSS', route: '/settings/ManageRSS' },
    { id: '2', title: 'Layout', route: '/settings/Layout' },
];

export default function Settings() {
    const router = useRouter();

    const handlePress = (route: string) => {
        router.push(route);
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={settingsOptions}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity 
                        style={styles.optionContainer} 
                        onPress={() => handlePress(item.route)}
                    >
                        <Text style={styles.optionText}>{item.title}</Text>
                    </TouchableOpacity>
                )}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    optionContainer: {
        paddingVertical: 15,
        paddingHorizontal: 20,
        backgroundColor: "#f9f9f9",
    },
    optionText: {
        fontSize: 16,
        color: "#333",
    },
    separator: {
        height: 1,
        backgroundColor: "#ddd",
        marginHorizontal: 20,
    },
});
