import { BarCodeEvent, BarCodeScanner } from "expo-barcode-scanner";
import { Button, Text, Box, Center, Heading, VStack } from "native-base";
import React, { useState, useEffect } from "react";
import { Dimensions, StyleSheet } from "react-native";

export default function CheckinQRScan({ navigation }: { navigation: any }) {
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);
    const [scanned, setScanned] = useState(false);

    const askForCameraPermission = () => (async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
    })();

    useEffect(() => {
        askForCameraPermission();
    }, []);

    const handleBarCodeScanned = ({ type, data }: BarCodeEvent) => {
        navigation.navigate("CheckinValidation", { type: type, data: data });
    };

    if (hasPermission === null) {
        return (
            <Center flex={1} px={3} safeAreaTop>
                <VStack space={5}>
                    <Heading textAlign={"center"}>
                        Requesting Camera Permission
                    </Heading>
                    <Box style={styles.qrCodeScannerBox}></Box>
                    <Text textAlign={"center"}>Please align the QR code within the frame</Text>
                    <Button onPress={() => navigation.navigate("Example")}>Cancel</Button>
                </VStack>
            </Center>
        );
    }
    if (hasPermission === false) {
        return (
            <Center flex={1} px={3} safeAreaTop>
                <VStack space={5}>
                    <Heading textAlign={"center"}>
                        No Camera Permission
                    </Heading>
                    <Box style={styles.qrCodeScannerBox}></Box>
                    <Text textAlign={"center"}>Please provide camera permission to use this feature</Text>
                    <Button onPress={() => askForCameraPermission()}>Allow Camerra Access</Button>
                </VStack>
            </Center>
        );
    }

    return (
        <Center flex={1} px={3} safeAreaTop>
            <VStack space={5}>
                <Heading textAlign={"center"}>
                    Scan QR Code
                </Heading>
                <Box style={styles.qrCodeScannerBox}>
                    <BarCodeScanner
                        style={{ width: Dimensions.get("window").width, height: Dimensions.get("window").height }}
                        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                        barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
                    />
                </Box>
                <Text textAlign={"center"}>Please align the QR code within the frame</Text>
                <Button onPress={() => navigation.navigate("Example")}>Cancel</Button>
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