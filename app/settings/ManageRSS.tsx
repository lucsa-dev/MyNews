
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, Button, FlatList, TouchableOpacity } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Settings() {
    const [rssLink, setRssLink] = useState('');
    const [rssLinks, setRssLinks] = useState<string[]>([]);

    // Função para carregar os links armazenados ao iniciar o componente
    useEffect(() => {
        const loadLinks = async () => {
            try {
                const storedLinks = await AsyncStorage.getItem('rssLinks');
                if (storedLinks) {
                    setRssLinks(JSON.parse(storedLinks));
                }
            } catch (error) {
                console.error("Erro ao carregar os links:", error);
            }
        };
        loadLinks();
    }, []);

    // Função para adicionar um novo link RSS
    const addLink = async () => {
        if (rssLink.trim() === '') return;
        const newLinks = [...rssLinks, rssLink];
        setRssLinks(newLinks);
        setRssLink('');

        try {
            await AsyncStorage.setItem('rssLinks', JSON.stringify(newLinks));
        } catch (error) {
            console.error("Erro ao salvar o link:", error);
        }
    };

    // Função para remover um link RSS
    const removeLink = async (link: string) => {
        const newLinks = rssLinks.filter(item => item !== link);
        setRssLinks(newLinks);

        try {
            await AsyncStorage.setItem('rssLinks', JSON.stringify(newLinks));
        } catch (error) {
            console.error("Erro ao remover o link:", error);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Adicionar link RSS"
                value={rssLink}
                onChangeText={setRssLink}
            />
            <Button title="Adicionar" onPress={addLink} />

            <FlatList
                data={rssLinks}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                    <View style={styles.linkContainer}>
                        <Text style={styles.linkText}>{item}</Text>
                        <TouchableOpacity onPress={() => removeLink(item)}>
                            <Text style={styles.removeText}>Remover</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    linkContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    linkText: {
        flex: 1,
        fontSize: 16,
    },
    removeText: {
        color: "red",
        fontWeight: "bold",
    },
});
