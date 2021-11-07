import React from "react";
import { NativeBaseProvider } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { navigators } from "./src/navigators/navigators";

const config = {
    dependencies: {
        // For Expo projects (Bare or managed workflow)
        "linear-gradient": require("expo-linear-gradient").LinearGradient,
    },
};

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NativeBaseProvider config={config}>
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false,
                    }}
                    initialRouteName="Example"
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
