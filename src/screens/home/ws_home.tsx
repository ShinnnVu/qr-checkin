import React, { useEffect, useState } from "react";
import { Center, Pressable, Box, View, Flex, Image, Text, HStack, VStack, FlatList, Icon } from "native-base";
import color from "../../constants/colors";
import translate from "../../localize";
import size from "../../constants/sizes";
import fonts from "../../constants/fonts";
import { AVATAR, CLOCK } from "../../constants/images";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import HeaderOne from "../../components/header/headerOne";
import BottomTab from "../../components/bottom/bottom";
import { StyleSheet, SafeAreaView, ActivityIndicator } from "react-native";
import { apiService } from "../../services";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import { Screens } from "../../navigations/model";

const dummyEmployee = [{ id: 1, name: "History", description: "Checkin/Checkout", link: Screens.CHECKIN_HISTORY }];

const dummyAdmin = [{ id: 1, name: "Employee", description: "Employee List", link: Screens.EMPLOYEE_LIST }];

const getIcon = (string: string) => {
    switch (string) {
        case "Personal":
            return "account";
        case "Calendar":
            return "calendar-check";
        case "Employee":
            return "domain";
        case "History":
            return "history";
        default:
            return "chevron-right";
    }
};

const listEmpty = () => {
    return (
        <Center flex={1}>
            <ActivityIndicator animating color={color.BLUE_HEAVY} />
        </Center>
    );
};
const WS_Home = ({ route, navigation }: { route: any; navigation: any }) => {
    const { workspace_id, workspace_name } = route.params;
    const [yourWorkspace, setYourWorkspace] = useState([]);
    const [showReminder, setReminder] = useState(false);
    const isFocused = useIsFocused();

    useEffect(() => {
        let isActive = true;
        const getWorkspace = async () => {
            const user = await AsyncStorage.getItem("@User");
            if (user) {
                const user_id = JSON.parse(user).id;
                const res = await apiService.checkHost({
                    user_id: user_id,
                    workspace_id: workspace_id,
                });
                const host = res.data.data.isHost;
                const myWorkspace: any = host ? dummyAdmin : dummyEmployee;
                if (isActive) setYourWorkspace(myWorkspace);
            }
        };

        getWorkspace();
        return () => {
            isActive = false;
        };
    }, [isFocused]);

    const renderItem = ({ item }: { item: any }) => {
        return (
            <Box w={"50%"} h={"100px"} alignItems={"center"} paddingTop={"10px"}>
                <Pressable
                    onPress={() => {
                        navigation.navigate(item.link, {
                            workspace_id: workspace_id,
                        });
                    }}
                    w={"90%"}
                    h={"90%"}
                    alignItems={"center"}
                >
                    <HStack
                        h={"100%"}
                        w={"100%"}
                        justifyContent={"center"}
                        alignItems="center"
                        borderRadius={"16px"}
                        shadow={5}
                        bg={color.WHITE}
                    >
                        <Icon
                            as={<MaterialCommunityIcons name={getIcon(item.name)} />}
                            size={8}
                            ml="2"
                            color={color.PURLE_LIGHT}
                        />
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
                    showAvatar
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
                        ListEmptyComponent={listEmpty()}
                    />
                </SafeAreaView>
            </Flex>
            <BottomTab
                homeActive={true}
                left={() => {}}
                right={() => {
                    navigation.navigate(Screens.WORKSPACE_ADDITION, {
                        workspace_id: workspace_id,
                        workspace_name: workspace_name,
                    });
                }}
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
