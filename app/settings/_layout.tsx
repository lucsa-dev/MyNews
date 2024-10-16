// app/settings/_layout.tsx

import { Stack } from "expo-router";

export default function SettingsLayout() {
    return (
        <Stack>
            <Stack.Screen 
                name="index" 
                options={{ headerShown: false }} // Oculta o cabeçalho na página de índice
            />
            <Stack.Screen 
                name="ManageRSS" 
                options={{ headerShown: true, title: "Gerenciar RSS" }} // Mostra o cabeçalho nas subpáginas
            />
            {/* Adicione outras subpáginas conforme necessário */}
        </Stack>
    );
}
