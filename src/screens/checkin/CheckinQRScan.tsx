import { BarCodeEvent, BarCodeScanner } from "expo-barcode-scanner";
import * as Location from "expo-location";
import { Button, Text, Box, Center, Heading, VStack } from "native-base";
import React, { useState, useEffect } from "react";
import { Dimensions, StyleSheet } from "react-native";
import RoundedButton from "../../components/base/RoundedButton";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function CheckinQRScan({ route, navigation }: { route: any; navigation: any }) {
    const { workspace_id, workspace_name } = route.params;
    const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
    const [hasLocationPermission, setHasLocationPermission] = useState<boolean | null>(null);
    const [scanned, setScanned] = useState(false);

    const askForCameraPermission = () =>
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasCameraPermission(status === "granted");
        })();

    const askForLocationPermission = () =>
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();
            setHasLocationPermission(status === "granted");
        })();

    useEffect(() => {
        askForCameraPermission();
        askForLocationPermission();
    }, []);

    const handleBarCodeScanned = async ({ type, data }: BarCodeEvent) => {
        const user = await AsyncStorage.getItem("@User");
        if (user) {
            const id = JSON.parse(user).id;
            navigation.navigate("CheckinValidation", {
                type: type,
                qrCode: data,
                workspace_id: workspace_id,
                workspace_name: workspace_name,
                user_id: id,
            });
        }
    };

    if (hasCameraPermission === null || hasLocationPermission === null) {
        return (
            <Center flex={1} px={3} safeAreaTop>
                <VStack space={5}>
                    <Heading textAlign={"center"}>Requesting Camera Permission</Heading>
                    <Box style={styles.qrCodeScannerBox}></Box>
                    <Text textAlign={"center"}>Please align the QR code within the frame</Text>
                    <Button
                        onPress={() =>
                            navigation.navigate("WS_HOME", {
                                workspace_id: workspace_id,
                                workspace_name: workspace_name,
                            })
                        }
                    >
                        Cancel
                    </Button>
                </VStack>
            </Center>
        );
    }

    if (hasCameraPermission === false) {
        return (
            <Center flex={1} px={3} safeAreaTop>
                <VStack space={5}>
                    <Heading textAlign={"center"}>No Camera Permission</Heading>
                    <Box style={styles.qrCodeScannerBox}></Box>
                    <Text textAlign={"center"}>Please provide camera permission to use this feature</Text>
                    <Button onPress={() => askForCameraPermission()}>Allow Camerra Access</Button>
                </VStack>
            </Center>
        );
    }

    if (hasLocationPermission === false) {
        return (
            <Center flex={1} px={3} safeAreaTop>
                <VStack space={5}>
                    <Heading textAlign={"center"}>No Location Permission</Heading>
                    <Box style={styles.qrCodeScannerBox}></Box>
                    <Text textAlign={"center"}>Please provide location permission to use this feature</Text>
                    <Button onPress={() => askForLocationPermission()}>Allow Location Access</Button>
                </VStack>
            </Center>
        );
    }

    return (
        <Center flex={1} px={3} safeAreaTop>
            <VStack space={10}>
                <Heading textAlign={"center"}>Scan QR Code</Heading>
                <Box style={styles.qrCodeScannerBox}>
                    <BarCodeScanner
                        style={{ width: Dimensions.get("window").width, height: Dimensions.get("window").height }}
                        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                        barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
                    />
                </Box>
                <Text textAlign={"center"}>Please align the QR code within the frame</Text>
                <RoundedButton
                    size={"lg"}
                    w="200"
                    h="60"
                    text="Cancel"
                    onPress={() =>
                        navigation.navigate("WS_HOME", {
                            workspace_id: workspace_id,
                            workspace_name: workspace_name,
                        })
                    }
                />
            </VStack>
        </Center>
    );
}

const styles: StyleSheet.NamedStyles<any> = StyleSheet.create({
    qrCodeScannerBox: {
        backgroundColor: "#ddd",
        alignItems: "center",
        justifyContent: "center",
        width: "90%",
        aspectRatio: 1,
        borderRadius: 30,
        overflow: "hidden",
    },
});
