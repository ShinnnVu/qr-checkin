import React, { useState } from "react";
import { NativeBaseProvider } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { navigators } from "../navigations/navigators";
import AppLoading from "expo-app-loading";
import useFonts from "../hooks/useFonts";
import { Screens } from "./model";

const config = {
    dependencies: {
        // For Expo projects (Bare or managed workflow)
        "linear-gradient": require("expo-linear-gradient").LinearGradient,
    },
};

const Stack = createNativeStackNavigator();

export default function App() {
    const [isReady, setIsReady] = useState<boolean>(false);

    const LoadFonts = async () => {
        await useFonts();
    };
    if (!isReady) {
        return <AppLoading startAsync={LoadFonts} onFinish={() => setIsReady(true)} onError={() => {}} />;
    }

    return (
        <NativeBaseProvider config={config}>
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false,
                    }}
                    initialRouteName={Screens.ADDITION}
                >
                    {navigators.map((navigator) => {
                        return (
                            <Stack.Screen key={navigator.name} name={navigator.name} component={navigator.component} />
                        );
                    })}
                </Stack.Navigator>
            </NavigationContainer>
        </NativeBaseProvider>
    );
}
