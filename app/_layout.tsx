import { Tabs } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function HomeLayout() {
    return(
    <Tabs>
        <Tabs.Screen
        name="index"
        options={{
            title: 'Home',
            headerShown: false,
            tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
        }}
    />
    <Tabs.Screen
        name="settings"
        options={{
            title: 'Ajustes',
            headerShown: false,
            tabBarIcon: ({ color }) => <FontAwesome size={28} name="cog" color={color} />,
        }}
    />
    </Tabs>);
}