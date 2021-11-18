import * as Location from "expo-location";
import { Alert, Box, Button, Center, Heading, HStack, Text, VStack, FormControl, Input, WarningOutlineIcon, InputLeftAddon, InputGroup, Icon, Divider, View, useToast, Select } from "native-base";
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
import fil from "date-fns/esm/locale/fil/index.js";
import RoundedButton from "../../components/base/RoundedButton";

interface ExcelFile {
    name: string,
    content: any[],
    header: string[],
}

const ExcelInvitation = ({ route, navigation }: { route: any, navigation: any }) => {
    const [fileName, setFileName] = useState<string | null>(null);
    const [fileContent, setFileContent] = useState<any[] | null>(null);
    const [file, setFile] = useState<ExcelFile | null>(null);
    const [usernames, setUsernames] = useState<string[] | null>(null);
    const [header, setHeader] = useState<string[] | null>(null);
    const [isInviting, setIsInviting] = useState(false);
    const [isReadingFile, setIsReadingFile] = useState(false);
    const [columnSelected, setColumnSelected] = useState<string | null>(null);
    const toast = useToast();
    let select = React.useRef<any | null>(null);

    const pickDocument = async () => {
        setIsReadingFile(true);
        const res = await DocumentPicker.getDocumentAsync({ type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", copyToCacheDirectory: false });
        if (res.type === "cancel") {
            setIsReadingFile(false);
            return;
        }
        // Success
        FileSystem
            .readAsStringAsync(res.uri, { encoding: FileSystem.EncodingType.Base64 })
            .then(res => XLSX.read(res, { type: "base64" }))
            .then(workbook => {
                const worksheet = workbook.Sheets[workbook.SheetNames[0]];
                const json = XLSX.utils.sheet_to_json(worksheet);
                if (json.length === 0) {
                    toast.show({
                        title: "File is empty",
                        status: "warning",
                        description: "Imported file is empty. Please choose another file.",
                        duration: 3000,
                        placement: "top",
                    });
                    return;
                }
                const name = res.name;
                const header = XLSX.utils.sheet_to_json(worksheet, { header: 1 })[0] as string[];
                const content: any[] = [];
                json.forEach((row) => {
                    content.push((row as any));
                });
                setFile({ name: name, header: header, content: content });
                setUsernames(null);
                setColumnSelected(null);
            })
            .catch(err => {
                toast.show({
                    title: "Something went wrong",
                    status: "error",
                    description: "Cannot import excel file. Please try again.",
                    duration: 3000,
                    placement: "top",
                });
            })
            .finally(() => {
                setIsReadingFile(false);
            });
    };

    const readUsernames = (columnName: string) => {
        if (file === null) {
            return;
        }
        const usernames: string[] = [];
        file.content.forEach(row => usernames.push((row[columnName] as string)));
        setUsernames(usernames);
    };

    const inviteUsers = () => {
        if (usernames === null || usernames.length === 0) {
            toast.show({
                title: "Something went wrong",
                status: "error",
                description: "No username was found. Please import before proceeding.",
                duration: 3000,
                placement: "top",
            });
            return;
        }

        setIsInviting(true);

        fetch("invite-link", {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify([
                ...usernames,
            ]),
        })
            .then(res => res.json())
            .then(res => {
                toast.show({
                    title: "Completed",
                    status: "success",
                    description: "Invite employees successfully.",
                    duration: 3000,
                    placement: "top",
                });
            })
            .catch(res => {
                toast.show({
                    title: "Something went wrong",
                    status: "error",
                    description: "Cannot invite these employees. Please try again.",
                    duration: 3000,
                    placement: "top",
                });
            })
            .finally(() => {
                setIsInviting(false);
            });
    };

    const columnSelector = file !== null ? (
        <FormControl isDisabled={isReadingFile}>
            <FormControl.Label>Choose Column</FormControl.Label>
            <Select
                onValueChange={(value) => {
                    setColumnSelected(value);
                    readUsernames(value);
                }}
                accessibilityLabel="Choose column that contains username"
                placeholder="Choose column that contains username"
                selectedValue={columnSelected == null ? undefined : columnSelected}
            >
                {file.header.map((value, index) => (
                    <Select.Item key={`${value}-${index}`} label={value} value={value}>{value}</Select.Item>
                ))}
            </Select>
        </FormControl>
    ) : null;

    let usernameList: JSX.Element[] = [];
    if (columnSelected !== null && file !== null) {
        usernameList = file.content
            .slice(0, 10)
            .filter(row => row.hasOwnProperty(columnSelected))
            .map((row, index) => (
                <Heading key={`${row[columnSelected]}-${index}`} size={"sm"}>
                    {row[columnSelected]}
                </Heading>
            ));
    }

    return (
        <Box flex={1} m={8} my={10} safeArea>
            <VStack flex={1} space={5}>
                <Heading size="md">Import From Excel</Heading>
                <Text>
                    Please add your file here.{"\n"}
                    Your file must has ".xlsx" extension
                </Text>
                <HStack alignItems={"center"} justifyContent={"space-around"} style={{ backgroundColor: "#EEEEEE", padding: 10, borderRadius: 50 }}>
                    <Text>{file === null || file.name === null ? "Select Excel File" : file.name}</Text>
                    <RoundedButton
                        isDisabled={isInviting}
                        isLoading={isReadingFile}
                        isLoadingText="Reading"
                        onPress={() => pickDocument()}
                        w={150}
                        text="Select"
                    />
                </HStack>
                {columnSelector}
                {file === null ? null :
                    <VStack space={5}>
                        <Divider />
                        <Heading size={"md"}>Import Results</Heading>
                        <Text>{file.content.length === 0 ? "No user was imported." : "These user will be invited to the workspace."}</Text>
                        {usernameList}
                    </VStack>
                }
            </VStack>
            <VStack space={5}>
                <RoundedButton
                    h="50"
                    onPress={() => inviteUsers()}
                    isDisabled={isReadingFile || file === null || file.content.length === 0}
                    isLoading={isInviting === true}
                    isLoadingText="Inviting"
                    text="Invite"
                />
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <View style={{ flex: 1, height: 1, backgroundColor: "darkgray" }} />
                    <View>
                        <Text style={{ width: 50, textAlign: "center", color: "darkgray" }}>Or</Text>
                    </View>
                    <View style={{ flex: 1, height: 1, backgroundColor: "darkgray" }} />
                </View>
                <RoundedButton
                    h="50"
                    variant={"lightColorful"}
                    onPress={() => navigation.navigate("EmployeeInvitation")}
                    text="Invite By Username"
                    borderColor="lightColorful"
                    borderWidth={1}
                />
            </VStack>
        </Box>
    );
};



export default ExcelInvitation;