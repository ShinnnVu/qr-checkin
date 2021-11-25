import React from "react";
import { Center, Box, Flex, Image, Text, ScrollView, Button } from "native-base";
import color from "../../constants/colors";
import { LEFT_CAVRET } from "../../constants/icons";
import translate from "../../localize";
import size from "../../constants/sizes";
import fonts from "../../constants/fonts";
import { ILLUSTRATION } from "../../constants/images";
import Icon_Button from "../../components/base/icon_button";
import Blue_button from "../../components/base/blue_button";
import { Screens } from "../../navigations/model";
import * as Linking from "expo-linking";
import { Alert } from "react-native";

const Ws_config_success = ({ navigation }: { navigation: any }) => {
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
            <ScrollView showsVerticalScrollIndicator={false}>
                <Box mx={"10px"} my={"10px"}>
                    <Icon_Button
                        onPress={() => navigation.navigate(Screens.HOME)}
                        pColor={color.GRAY_BUTTON_CLICK}
                        upColor={color.GRAY_BUTTON}
                        icon={LEFT_CAVRET}
                    />
                    <Center py={"40px"} alignSelf={"center"}>
                        <Text fontSize={size.font.title.H1} fontFamily={fonts.PoppinsBold} textAlign={"center"}>
                            {translate("workspace_creation.configure_success")}
                        </Text>
                        <Text
                            fontSize={size.font.text.large}
                            fontFamily={fonts.PoppinsRegular}
                            textAlign="center"
                            paddingTop={"20px"}
                            paddingBottom={"50px"}
                        >
                            <Text>{translate("workspace_creation.ur_c_in") + " "}</Text>
                            <Text onPress={openURL} underline>
                                {"Links"}
                            </Text>
                        </Text>

                        <Blue_button
                            onPress={() => console.log("test")}
                            text={translate("workspace_creation.visit_ws")}
                            width={"200px"}
                        />
                    </Center>
                </Box>
            </ScrollView>
        </Flex>
    );
};

export default Ws_config_success;
