import * as Location from "expo-location";
import { Alert, Box, Button, Center, Heading, HStack, Text, VStack, FormControl, Input, WarningOutlineIcon, InputLeftAddon, InputGroup, Icon, Divider, View, useToast } from "native-base";
import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import * as Progress from 'react-native-progress'
import * as DocumentPicker from "expo-document-picker";
import * as XLSX from "xlsx";
import * as FileSystem from 'expo-file-system';
import { writeFile, readFile, read } from 'react-native-fs';
import { FontAwesome5 } from '@expo/vector-icons';
import CheckoutSuccessSvg from "../../../assets/checkin/checkout-success.svg";
import ValidationFailureSvg from "../../../assets/checkin/validation-failure.svg";
import { LinearGradient } from "react-native-svg";

const ExcelInvitation = ({ route, navigation }: { route: any, navigation: any }) => {
    const [fileName, setFileName] = useState<string | null>(null);
    const [usernames, setUserNames] = useState<string[] | null>(null);
    const toast = useToast();

    const pickDocument = async () => {
        const res = await DocumentPicker.getDocumentAsync({ type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", copyToCacheDirectory: false });
        if (res.type === "cancel") {
            toast.show({
                title: "Something went wrong",
                status: "error",
                description: "Cannot import excel file. Please try again.",
                duration: 3000,
                placement: "top",
            });
        } else {
            const fileString = await FileSystem.readAsStringAsync(res.uri, { encoding: FileSystem.EncodingType.Base64 });
            const workbook = await XLSX.read(fileString, { type: "base64" });
            const worksheet = workbook.Sheets[workbook.SheetNames[0]];
            const json = XLSX.utils.sheet_to_json(worksheet);
            const usernames: any[] | ((prevState: string[] | null) => string[] | null) | null = [];
            json.forEach(row => usernames.push((row as any).username));
            setFileName(res.name);
            setUserNames(usernames);
        }
    };

    let usernameList: JSX.Element[] = [];
    if (usernames !== null) {
        usernameList = usernames.slice(0, 10).map((username, index) => <Heading key={`${username}-${index}`} size={"sm"}>{username}</Heading>)
    }

    return (
        <Box flex={1} m={8} my={10} safeArea>
            <VStack flex={1} space={5}>
                <Heading size="md">Import From Excel</Heading>
                <Text>
                    Please add your file here.{"\n"}
                    Your file should follow the settings.
                </Text>
                <HStack alignItems={"center"} justifyContent={"space-around"} style={{ backgroundColor: "#DDDADA", padding: 10, borderRadius: 50 }}>
                    <Text>{fileName === null ? "Select Excel File" : fileName}</Text>
                    <Button onPress={() => pickDocument()}>Select</Button>
                </HStack>
                {usernames === null ? null :
                    <VStack space={5}>
                        <Divider />
                        <Heading size={"md"}>Import Results</Heading>
                        <Text>{usernames.length === 0 ? "No user was imported" : "These user will be invited to the workspace"}</Text>
                        {usernameList}
                    </VStack>
                }
            </VStack>
            <VStack>
                <Button onPress={() => navigation.navigate("InvitationResult", { users: usernames })} isDisabled={usernames === null || usernames.length === 0}>Invite</Button>
            </VStack>
        </Box>
    );
};

export default ExcelInvitation;