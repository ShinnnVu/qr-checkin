import React, { useState, useEffect } from "react";
import {
    Button,
    Center,
    Pressable,
    Container,
    Box,
    View,
    Flex,
    Image,
    Text,
    ScrollView,
    HStack,
    Input,
    VStack,
    Icon,
} from "native-base";
import color from "../../constants/colors";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LEFT_CAVRET, RIGHT_CAVRET } from "../../constants/icons";
import translate from "../../localize";
import size from "../../constants/sizes";
import fonts from "../../constants/fonts";
import Icon_Button from "../../components/base/icon_button";
import { Screens } from "../../navigations/model";
import * as yup from "yup";
import { Formik } from "formik";
import HeaderThree from "../../components/header/headerThree";
import TextInput from "../../components/base/textinput";
import HeaderTwo from "../../components/header/headerTwo";
import Blue_button from "../../components/base/blue_button";
import * as Linking from "expo-linking";
import { Alert } from "react-native";
interface Com_info {
    name: string;
    email: string;
    address: string;
}

const Ws_s_checkin_page = ({ route, navigation }: { route: any; navigation: any }) => {
    const openURL = () => {
        const url = "https://www.w/";
        try {
            Linking.openURL(url);
        } catch {
            Alert.alert(
                "Can't open link",
                "There have been some troubles accessing this link, please try again later!",
            );
        }
    };
    return (
        <Flex flex={1} bg={color.WHITE} safeArea>
            <HeaderTwo title={"workspace_creation.c_in_page"} back={() => navigation.goBack()} />
            <Center flex={1}>
                <Text textAlign="center">
                    <Text fontSize={size.font.title.H1} fontFamily={fonts.PoppinsBold}>
                        {translate("workspace_creation.ur_c_in") + "\n"}
                    </Text>
                    <Text fontSize={size.font.title.H1} fontFamily={fonts.PoppinsBold} onPress={openURL} underline>
                        {"Link"}
                    </Text>
                </Text>
            </Center>
        </Flex>
    );
};

export default Ws_s_checkin_page;
