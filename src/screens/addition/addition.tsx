import React, { useState } from "react";
import { Box, Flex, Image, Text, VStack, View } from "native-base";
import { StyleSheet } from "react-native";
import color from "../../constants/colors";
import translate from "../../localize";
import size from "../../constants/sizes";
import fonts from "../../constants/fonts";
import { USER_PHOTO_BIG } from "../../constants/images";
import AdditionElement from "../../components/base/addition";
import BottomTab from "../../components/bottom/bottom";
import { Screens } from "../../navigations/model";

const leftIconStyle = { color: color.BLUE_LIGHT, size: 6 };
const rightIconStyle = { size: 6 };
const Addition = ({ navigation }: { navigation: any }) => {
    const [user, setUser] = useState<string>("");

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
                        <VStack space={1}>
                            <Text fontSize={size.font.text.subTitle} fontFamily={fonts.PoppinsSemiBold} px={"10px"}>
                                {translate("addition.setting")}
                            </Text>
                            <AdditionElement
                                leftIcon="translate"
                                holderStyle={styles.holderStyle}
                                leftIconStyle={leftIconStyle}
                                rightIconStyle={rightIconStyle}
                                text={translate("addition.language")}
                                rightIcon="chevron-right"
                                press={() => console.log("hello")}
                            />
                            <AdditionElement
                                leftIcon="shield-check-outline"
                                leftIconStyle={leftIconStyle}
                                holderStyle={styles.holderStyle}
                                rightIconStyle={rightIconStyle}
                                text={translate("addition.pv_policy")}
                                rightIcon="chevron-right"
                                press={() => console.log("hello")}
                            />
                            <AdditionElement
                                leftIcon="logout-variant"
                                holderStyle={styles.holderStyle}
                                leftIconStyle={leftIconStyle}
                                rightIconStyle={rightIconStyle}
                                text={translate("addition.logout")}
                                rightIcon="chevron-right"
                                press={() => navigation.navigate(Screens.LOG_IN)}
                            />
                        </VStack>
                    </View>
                </View>
            </Box>
            <BottomTab
                homeActive={false}
                left={() => {
                    navigation.navigate(Screens.HOME);
                }}
                right={() => {}}
                checkin={() => {}}
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
        elevation: 2,
        padding: 10,
        borderRadius: 16,
    },
    holderStyle: {
        elevation: 0,
    },
});
export default Addition;
