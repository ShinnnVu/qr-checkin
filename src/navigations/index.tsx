import React, { useState } from "react";
import { NativeBaseProvider } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { navigators } from "../navigations/navigators";
import AppLoading from "expo-app-loading";
import useFonts from "../hooks/useFonts";

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
                    initialRouteName={navigators.ws_location.name}
                >
                    <Stack.Screen
                        key={navigators.ws_home.name}
                        name={navigators.ws_home.name}
                        component={navigators.ws_home.component}
                    />
                    <Stack.Screen
                        key={navigators.ws_time.name}
                        name={navigators.ws_time.name}
                        component={navigators.ws_time.component}
                    />
                    <Stack.Screen
                        key={navigators.ws_location.name}
                        name={navigators.ws_location.name}
                        component={navigators.ws_location.component}
                    />
                    <Stack.Screen
                        key={navigators.ws_checkin_form.name}
                        name={navigators.ws_checkin_form.name}
                        component={navigators.ws_checkin_form.component}
                    />
                    <Stack.Screen
                        key={navigators.ws_com_info.name}
                        name={navigators.ws_com_info.name}
                        component={navigators.ws_com_info.component}
                    />
                    <Stack.Screen
                        key={navigators.ws_cr_fail.name}
                        name={navigators.ws_cr_fail.name}
                        component={navigators.ws_cr_fail.component}
                    />
                    <Stack.Screen
                        key={navigators.ws_cr_success.name}
                        name={navigators.ws_cr_success.name}
                        component={navigators.ws_cr_success.component}
                    />
                    <Stack.Screen
                        key={navigators.ws_naming.name}
                        name={navigators.ws_naming.name}
                        component={navigators.ws_naming.component}
                    />
                    <Stack.Screen
                        key={navigators.ws_cr_intro.name}
                        name={navigators.ws_cr_intro.name}
                        component={navigators.ws_cr_intro.component}
                    />
                    <Stack.Screen
                        key={navigators.home.name}
                        name={navigators.home.name}
                        component={navigators.home.component}
                    />
                    <Stack.Screen
                        key={navigators.example.name}
                        name={navigators.example.name}
                        component={navigators.example.component}
                    />
                    <Stack.Screen
                        key={navigators.header.name}
                        name={navigators.header.name}
                        component={navigators.header.component}
                    />
                    <Stack.Screen
                        key={navigators.checkin_qr_scan.name}
                        name={navigators.checkin_qr_scan.name}
                        component={navigators.checkin_qr_scan.component}
                    />
                    <Stack.Screen
                        key={navigators.checkin_validation.name}
                        name={navigators.checkin_validation.name}
                        component={navigators.checkin_validation.component}
                    />
                    <Stack.Screen
                        key={navigators.checkout_validation.name}
                        name={navigators.checkout_validation.name}
                        component={navigators.checkout_validation.component}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </NativeBaseProvider>
    );
}
