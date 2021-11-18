import React, { useEffect, useState } from "react";
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
    VStack,
    AddIcon,
    FlatList,
} from "native-base";
import color from "../../constants/colors";
import translate from "../../localize";
import size from "../../constants/sizes";
import fonts from "../../constants/fonts";
import { LEFT_CAVRET } from "../../constants/icons";
import Icon_Button from "../../components/base/icon_button";
import { AVATAR, CLOCK, ILLUSTRATION, USER_PHOTO } from "../../constants/images";
import { getDate } from "../../utils/utils";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
const dummyEmployee = [
    { id: 1, name: "Personal", description: "Your information" },
    { id: 2, name: "Calendar", description: "Working shifts" },
];

const dummyAdmin = [
    { id: 1, name: "Personal", description: "Your information" },
    { id: 2, name: "Calendar", description: "Working shifts" },
    { id: 3, name: "Employee", description: "Employees" },
];

const WS_Home = ({ navigation }: { navigation: any }) => {
    const [workspace] = useState("Workspace A");
    const [yourWorkspace, setYourWorkspace] = useState([]);
    const [showReminder, setReminder] = useState(true);
    useEffect(() => {
        const getWorkspace = async () => {
            const admin = true;
            const myWorkspace = admin ? dummyAdmin : dummyEmployee;
            setYourWorkspace(myWorkspace);
        };
        getWorkspace();
    }, []);
    const renderItem = ({ item }) => {
        return (
            <Box w={"50%"} h={"100px"}>
                <Pressable onPress={() => {}} w={"90%"} h={"80%"} borderRadius={"16px"} shadow={1} alignSelf="center">
                    <HStack alignSelf={"center"} flex={1} alignItems="center">
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
                <HStack w={"100%"} alignItems="center">
                    <Icon_Button
                        onPress={() => navigation.goBack()}
                        pColor={color.GRAY_BUTTON_CLICK}
                        upColor={color.GRAY_BUTTON}
                        icon={LEFT_CAVRET}
                    />
                    <Box paddingLeft={"10px"}>
                        <Image source={USER_PHOTO} alt={"Error"} />
                    </Box>
                    <VStack>
                        <Text fontSize={size.font.title.H4} fontFamily={fonts.PoppinsBold} pl={"10px"}>
                            {workspace}
                        </Text>
                        <Text fontSize={size.font.text.small} fontFamily={fonts.PoppinsMedium} pl={"10px"}>
                            {getDate()}
                        </Text>
                    </VStack>
                </HStack>
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
                <View style={{ flex: 1 }}>
                    <FlatList
                        data={yourWorkspace}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id.toString()}
                        numColumns={2}
                    />
                </View>
            </Flex>
        </Flex>
    );
};

export default WS_Home;
