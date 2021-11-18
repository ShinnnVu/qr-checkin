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

const InvitationResult = ({ route, navigation }: { route: any, navigation: any }) => {
    const [fileName, setFileName] = useState<string | null>(null);
    const [usernames, setUserNames] = useState<string[] | null>(null);
    const toast = useToast();

    return (
        <Box flex={1} m={8} my={10} safeArea>
            <VStack flex={1} space={5}>
                
            </VStack>
            <VStack>
                <Button onPress={() => navigation.navigate("InvitationResult", { users: usernames })} isDisabled={usernames === null || usernames.length === 0}>Invite</Button>
            </VStack>
        </Box>
    );
};

export default InvitationResult;