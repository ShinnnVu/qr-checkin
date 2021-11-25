import React, { useEffect, useState } from "react";
import { Center, Pressable, Box, Flex, Image, Text, HStack, VStack, AddIcon, FlatList, View } from "native-base";
import { StyleSheet } from "react-native";
import color from "../../constants/colors";
import translate from "../../localize";
import size from "../../constants/sizes";
import fonts from "../../constants/fonts";
import { AVATAR, USER_PHOTO, USER_PHOTO_BIG } from "../../constants/images";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { apiService } from "../../services";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HeaderOne from "../../components/header/headerOne";
import { useIsFocused } from "@react-navigation/native";
import AdditionElement from "../../components/base/addition";
import { left } from "styled-system";
import BottomTab from "../../components/bottom/bottom";

const leftIconStyle = { size: 6, color: color.PURLE_LIGHT };
const rightIconStyle = { size: 6, color: color.SUCCESS };
const Addition = ({ navigation }: { navigation: any }) => {
    const [user, setUser] = useState<string>("");
    const [workspace, setWorkspace] = useState([]);
    const isFocused = useIsFocused();
    const getWorkspace = async () => {
        try {
            const user = await AsyncStorage.getItem("@User");
            if (user) {
                const username = JSON.parse(user).username;
                const id = JSON.parse(user).id;
                setUser(username);
            }
        } catch (error: any) {}
    };
    useEffect(() => {
        (async () => {
            await getWorkspace();
        })();
    }, [isFocused]);
    return (
        <Flex flex={1} bg={color.WHITE} safeArea>
            <Box mx={"10px"} my={"20px"} alignItems={"center"} flex={1}>
                <VStack space={3}>
                    <Image source={USER_PHOTO_BIG} alt="Errors" />
                    <Text fontSize={size.font.title.H3} fontFamily={fonts.PoppinsBold} textAlign={"center"}>
                        {user}
                    </Text>
                </VStack>
                <View style={styles.holder}>
                    <View style={styles.contentHolder}>
                        <VStack space={3}>
                            <Text fontSize={size.font.text.subTitle} fontFamily={fonts.PoppinsSemiBold} px={"10px"}>
                                {translate("addition.ws_config")}
                            </Text>
                            <AdditionElement
                                leftIcon="information"
                                leftIconStyle={leftIconStyle}
                                text={translate("addition.ws_info")}
                                rightIcon="chevron-down-circle-outline"
                                rightIconStyle={rightIconStyle}
                                press={() => console.log("hello")}
                            />
                            <AdditionElement
                                leftIcon="qrcode-scan"
                                leftIconStyle={leftIconStyle}
                                text={translate("addition.ws_c_in_form")}
                                rightIcon="chevron-down-circle-outline"
                                rightIconStyle={rightIconStyle}
                                press={() => console.log("hello")}
                            />
                            <AdditionElement
                                leftIcon="compass"
                                leftIconStyle={leftIconStyle}
                                text={translate("addition.ws_location")}
                                rightIcon="chevron-down-circle-outline"
                                rightIconStyle={rightIconStyle}
                                press={() => console.log("hello")}
                            />
                            <AdditionElement
                                leftIcon="clock-time-five"
                                leftIconStyle={leftIconStyle}
                                text={translate("addition.time")}
                                rightIcon="chevron-down-circle-outline"
                                rightIconStyle={rightIconStyle}
                                press={() => console.log("hello")}
                            />
                            <AdditionElement
                                leftIcon="text-box"
                                leftIconStyle={leftIconStyle}
                                text={translate("addition.c_page")}
                                rightIcon="chevron-down-circle-outline"
                                rightIconStyle={rightIconStyle}
                                press={() => console.log("hello")}
                            />
                        </VStack>
                    </View>
                    <View style={{ flexDirection: "column-reverse" }}>
                        <BottomTab
                            homeActive={true}
                            left={() => {}}
                            right={() => {}}
                            checkin={() => {
                                // navigation.navigate("CheckinQRScan", {
                                //     workspace_id: workspace_id,
                                //     workspace_name: workspace_name,
                                // });
                            }}
                        />
                    </View>
                </View>
            </Box>
        </Flex>
    );
};

const styles = StyleSheet.create({
    holder: {
        flex: 1,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    contentHolder: {
        width: "90%",
        padding: 10,
        borderRadius: 16,
    },
});
export default Addition;
