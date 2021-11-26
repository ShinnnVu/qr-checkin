import React, { useEffect, useState } from "react";
import { Box, Flex, Image, Text, VStack, View } from "native-base";
import { StyleSheet } from "react-native";
import color from "../../constants/colors";
import translate from "../../localize";
import size from "../../constants/sizes";
import fonts from "../../constants/fonts";
import { AVATAR, USER_PHOTO_BIG } from "../../constants/images";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import AdditionElement from "../../components/base/addition";
import BottomTab from "../../components/bottom/bottom";
import { Screens } from "../../navigations/model";
import { Linking } from "react-native";
import { apiService } from "../../services";

const leftIconStyle = { size: 6, color: color.PURLE_LIGHT };

const Addition = ({ route, navigation }: { route: any; navigation: any }) => {
    const { workspace_id, workspace_name } = route.params;
    const [host, setHost] = useState(false);
    const [user, setUser] = useState("");
    const isFocused = useIsFocused();
    const checkHost = async () => {
        const user = await AsyncStorage.getItem("@User");
        if (user) {
            const user_id = JSON.parse(user).id;
            setUser(JSON.parse(user).username);
            const res = await apiService.checkHost({
                user_id: user_id,
                workspace_id: workspace_id,
            });
            setHost(res.data.data.isHost);
        }
    };
    useEffect(() => {
        checkHost();
    }, [isFocused]);
    return (
        <Flex flex={1} bg={color.WHITE} safeArea>
            <Box mx={"10px"} my={"20px"} alignItems={"center"} flex={1}>
                <VStack space={3} textAlign={"center"}>
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
                            {host && (
                                <VStack space={3}>
                                    <AdditionElement
                                        leftIcon="information"
                                        leftIconStyle={leftIconStyle}
                                        text={translate("addition.ws_info")}
                                        press={() => {
                                            navigation.navigate(Screens.WS_S_INFO, {
                                                workspace_id: workspace_id,
                                            });
                                        }}
                                    />
                                    <AdditionElement
                                        leftIcon="qrcode-scan"
                                        leftIconStyle={leftIconStyle}
                                        text={translate("addition.ws_c_in_form")}
                                        press={() => {
                                            navigation.navigate(Screens.WS_S_CHECKIN_FORM, {
                                                workspace_id: workspace_id,
                                            });
                                        }}
                                    />
                                    <AdditionElement
                                        leftIcon="compass"
                                        leftIconStyle={leftIconStyle}
                                        text={translate("addition.ws_location")}
                                        press={() => {
                                            navigation.navigate(Screens.WS_S_LOCATION, {
                                                workspace_id: workspace_id,
                                            });
                                        }}
                                    />
                                    <AdditionElement
                                        leftIcon="clock-time-five"
                                        leftIconStyle={leftIconStyle}
                                        text={translate("addition.time")}
                                        press={() => {
                                            navigation.navigate(Screens.WS_S_TIME, {
                                                workspace_id: workspace_id,
                                            });
                                        }}
                                    />
                                </VStack>
                            )}
                            <AdditionElement
                                leftIcon="text-box"
                                leftIconStyle={leftIconStyle}
                                text={translate("addition.c_page")}
                                press={() => Linking.openURL("https://qr-checkin-server.vercel.app/qrcode")}
                            />
                        </VStack>
                    </View>
                </View>
            </Box>
            <BottomTab
                homeActive={false}
                left={() => {
                    navigation.navigate(Screens.WS_HOME, {
                        workspace_id: workspace_id,
                        workspace_name: workspace_name,
                    });
                }}
                right={() => {}}
                checkin={() => {
                    navigation.navigate("CheckinQRScan", {
                        workspace_id: workspace_id,
                        workspace_name: workspace_name,
                    });
                }}
            />
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
