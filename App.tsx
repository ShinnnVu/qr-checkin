import React, { useState } from "react";
import AppLoading from "expo-app-loading";
import useFonts from "./src/hooks/useFonts";
import MainApp from "./src/navigations";

export default function App() {
    const [isReady, setIsReady] = useState<boolean>(false);

    const LoadFonts = async () => {
        await useFonts();
    };
    if (!isReady) {
        return <AppLoading startAsync={LoadFonts} onFinish={() => setIsReady(true)} onError={() => {}} />;
    }

    return <MainApp />;
}
