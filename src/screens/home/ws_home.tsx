import React, { useEffect, useState } from "react";
import { Button, Center, Pressable, Box, View, Flex, Image, Text, HStack, VStack, FlatList } from "native-base";
import color from "../../constants/colors";
import translate from "../../localize";
import size from "../../constants/sizes";
import fonts from "../../constants/fonts";
import { CLOCK, USER_PHOTO } from "../../constants/images";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import HeaderOne from "../../components/header/headerOne";
import BottomTab from "../../components/bottom/bottom";
import { SafeAreaView, StyleSheet } from "react-native";
const dummyEmployee = [
    { id: 1, name: "Personal", description: "Your information" },
    { id: 2, name: "Calendar", description: "Working shifts" },
];

const dummyAdmin = [
    { id: 1, name: "Personal", description: "Your information" },
    { id: 2, name: "Calendar", description: "Working shifts" },
    { id: 3, name: "Employee", description: "Employees" },
];

const WS_Home = ({ route, navigation }: { route: any; navigation: any }) => {
    const { workspace_id, workspace_name } = route.params;
    const [yourWorkspace, setYourWorkspace] = useState([]);
    const [showReminder, setReminder] = useState(false);
    useEffect(() => {
        const getWorkspace = async () => {
            const host = true;
            const myWorkspace: any = host ? dummyAdmin : dummyEmployee;
            setYourWorkspace(myWorkspace);
        };
        getWorkspace();
    }, []);
    const renderItem = ({ item }: { item: any }) => {
        return (
            <Box w={"50%"} h={"100px"} alignItems={"center"}>
                <Pressable onPress={() => {}} w={"90%"} h={"90%"} alignItems={"center"}>
                    <HStack
                        h={"100%"}
                        w={"100%"}
                        justifyContent={"center"}
                        alignItems="center"
                        borderRadius={"16px"}
                        // borderWidth={"0.5px"}
                        // borderColor={color.DARK}
                        shadow={5}
                        bg={color.WHITE}
                    >
                        <MaterialCommunityIcons name="account" size={24} color={color.PURLE_LIGHT} solid />
                        <VStack>
                            <Text fontSize={size.font.text.medium} fontFamily={fonts.PoppinsSemiBold} pl={"10px"}>
                                {item.name}
                            </Text>
                            <Text fontSize={size.font.text.caption} fontFamily={fonts.PoppinsRegular} pl={"10px"}>
                                {item.description}
                            </Text>
                        </VStack>
                    </HStack>
                </Pressable>
            </Box>
        );
    };
    return (
        <Flex flex={1} bg={color.WHITE} safeArea>
            <Flex px={"10px"} py={"10px"} flex={1}>
                <HeaderOne
                    showBack={true}
                    back={() => {
                        navigation.navigate("Home");
                    }}
                    title={workspace_name}
                    source={USER_PHOTO}
                />
                {showReminder && (
                    <Box bg={color.DANGER_01} w={"100%"} h={"86px"} marginTop={"10px"} borderRadius={"20px"}>
                        <HStack flex={1} m={"10px"}>
                            <HStack alignItems="center" flex={1}>
                                <Pressable onPress={() => {}}>
                                    <Center bg={color.WHITE} w={"60px"} h={"60px"} borderRadius={"30px"}>
                                        <Image source={CLOCK} alt="Error" />
                                    </Center>
                                </Pressable>
                                <VStack>
                                    <Text
                                        fontSize={size.font.text.small}
                                        fontFamily={fonts.PoppinsRegular}
                                        color={color.DANGER}
                                        pl={"10px"}
                                    >
                                        {translate("home.reminder")}
                                    </Text>
                                    <Text fontSize={size.font.text.medium} fontFamily={fonts.PoppinsMedium} pl={"10px"}>
                                        {translate("home.c_in_forgot")}
                                    </Text>
                                </VStack>
                            </HStack>
                            <MaterialCommunityIcons
                                name="close"
                                size={20}
                                color={color.GRAY_HEAVY}
                                onPress={() => setReminder(false)}
                            />
                        </HStack>
                    </Box>
                )}
                <Text fontSize={size.font.text.large} fontFamily={fonts.PoppinsSemiBold} my={"20px"}>
                    {translate("home.ur_ws")}
                </Text>
                <SafeAreaView style={{ flex: 1 }}>
                    <FlatList
                        data={yourWorkspace}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id.toString()}
                        numColumns={2}
                    />
                </SafeAreaView>
            </Flex>
            <BottomTab
                homeActive={true}
                left={() => {}}
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
    pressable: {
        width: "90%",
        height: "80%",
        borderRadius: 16,
        elevation: 10,
        alignSelf: "center",
        backgroundColor: color.WHITE,
    },
});
export default WS_Home;
