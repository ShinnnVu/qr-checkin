import React, { useState, useEffect } from "react";
import { Box, Flex, Image, Text, VStack, View } from "native-base";
import { Modal, TouchableOpacity, ScrollView, Alert } from "react-native";
import { StyleSheet } from "react-native";
import color from "../../constants/colors";
import translate from "../../localize";
import size from "../../constants/sizes";
import fonts from "../../constants/fonts";
import { USER_PHOTO_BIG } from "../../constants/images";
import AdditionElement from "../../components/base/addition";
import BottomTab from "../../components/bottom/bottom";
import { Screens } from "../../navigations/model";
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { apiService } from "../../services";
import { CommonActions } from "@react-navigation/native";
const leftIconStyle = { color: color.BLUE_LIGHT, size: 6 };
const rightIconStyle = { size: 6 };
const Addition = ({ navigation }: { navigation: any }) => {
    const [user, setUser] = useState<string>("");
    const [languageModal, setlanguageModal] = useState<boolean>(false);
    const [policyModal, setPolicyModal] = useState<boolean>(false);
    const isFocused = useIsFocused();
    const checkHost = async () => {
        const user = await AsyncStorage.getItem("@User");
        if (user) {
            const user_id = JSON.parse(user).id;
            setUser(JSON.parse(user).username);
        }
    };

    const navigationSignIn = () => {
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: Screens.LOG_IN }],
            }),
        );
    };
    const logOut = () => {
        Alert.alert("Log out", "Are you sure you want to log out?", [
            {
                text: "Cancel",
                onPress: () => {},
                style: "cancel",
            },
            { text: "OK", onPress: () => navigationSignIn() },
        ]);
    };
    useEffect(() => {
        checkHost();
    }, [isFocused]);
    return (
        <Flex flex={1} bg={color.WHITE} safeArea>
            <Box mx={"10px"} my={"20px"} alignItems={"center"} flex={1}>
                <VStack space={3} alignItems={"center"}>
                    <Image source={USER_PHOTO_BIG} alt="Errors" />
                    <Text
                        fontSize={size.font.title.H3}
                        fontFamily={fonts.PoppinsBold}
                        textAlign={"center"}
                        numberOfLines={2}
                    >
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
                                press={() => setlanguageModal(true)}
                            />
                            <AdditionElement
                                leftIcon="shield-check-outline"
                                leftIconStyle={leftIconStyle}
                                holderStyle={styles.holderStyle}
                                rightIconStyle={rightIconStyle}
                                text={translate("addition.pv_policy")}
                                rightIcon="chevron-right"
                                press={() => setPolicyModal(true)}
                            />
                            <AdditionElement
                                leftIcon="logout-variant"
                                holderStyle={styles.holderStyle}
                                leftIconStyle={leftIconStyle}
                                rightIconStyle={rightIconStyle}
                                text={translate("addition.logout")}
                                rightIcon="chevron-right"
                                press={logOut}
                            />
                        </VStack>
                    </View>
                </View>
            </Box>
            {!languageModal && !policyModal && (
                <BottomTab
                    homeActive={false}
                    left={() => {
                        navigation.navigate(Screens.HOME);
                    }}
                    right={() => {}}
                    checkin={() => {}}
                />
            )}
            <Modal
                animationType="slide"
                transparent={true}
                visible={languageModal}
                onRequestClose={() => {
                    setlanguageModal(false);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <TouchableOpacity onPress={() => setlanguageModal(false)}>
                            <Text fontSize={size.font.text.subTitle} fontFamily={fonts.PoppinsSemiBold} px={"10px"}>
                                {"English"}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <Modal
                animationType="fade"
                transparent={true}
                visible={policyModal}
                onRequestClose={() => {
                    setPolicyModal(false);
                }}
            >
                <View style={styles.centeredView}>
                    <ScrollView contentContainerStyle={styles.modalView}>
                        <Text fontSize={size.font.text.subTitle} fontFamily={fonts.PoppinsSemiBold}>
                            {"Policy"}
                        </Text>
                        <Text fontSize={size.font.text.small} fontFamily={fonts.PoppinsRegular}>
                            {translate("policy.text") + translate("policy.text")}
                        </Text>
                        <TouchableOpacity onPress={() => setPolicyModal(false)} style={styles.alignSelf}>
                            <Text>OK</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            </Modal>
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
        elevation: 5,
        padding: 10,
        borderRadius: 16,
        backgroundColor: color.WHITE,
    },
    holderStyle: {
        elevation: 0,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    alignSelf: {
        alignSelf: "flex-end",
    },
});
export default Addition;
