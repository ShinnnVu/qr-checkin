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
import { LEFT_CAVRET } from "../../constants/icons";
import translate from "../../localize";
import size from "../../constants/sizes";
import fonts from "../../constants/fonts";
import { AVATAR, ILLUSTRATION, USER_PHOTO } from "../../constants/images";
import Icon_Button from "../../components/base/icon_button";
import { getDate } from "../../utils/utils";
import { MaterialCommunityIcons } from "@expo/vector-icons";
const dummy = [
    { id: 1, name: "Workspace A" },
    { id: 2, name: "Workspace B" },
    { id: 3, name: "Workspace C" },
];

const Workspace_naming = ({ navigation }: { navigation: any }) => {
    const [user] = useState<string>("User A");
    const [workspace, setWorkspace] = useState([]);
    useEffect(() => {
        const getWorkspace = async () => {
            const newWorkspace: any = dummy;
            setWorkspace(newWorkspace);
        };
        getWorkspace();
    }, []);
    const renderItem = ({ item }: { item: any }) => {
        return (
            <Pressable onPress={() => {}}>
                <Box bg={color.WHITE} w={"100%"} h={"80px"} borderRadius={"16px"} my={"10px"} shadow={4}>
                    <HStack alignItems="center" flex={1} m={"10px"} justifyContent={"space-between"}>
                        <HStack alignItems="center">
                            <Image source={AVATAR} alt="Error" />
                            <Text fontSize={size.font.text.large} fontFamily={fonts.PoppinsSemiBold} pl={"10px"}>
                                {item.name}
                            </Text>
                        </HStack>
                        <MaterialCommunityIcons name="chevron-right" size={24} color={color.PURLE_LIGHT} solid />
                    </HStack>
                </Box>
            </Pressable>
        );
    };
    return (
        <Flex flex={1} bg={color.WHITE} safeArea>
            <Box px={"10px"} py={"10px"}>
                <HStack w={"100%"} alignItems="center">
                    <Image source={USER_PHOTO} alt={"Error"} />
                    <VStack>
                        <Text fontSize={size.font.title.H4} fontFamily={fonts.PoppinsBold} pl={"10px"}>
                            {user}
                        </Text>
                        <Text fontSize={size.font.text.small} fontFamily={fonts.PoppinsMedium} pl={"10px"}>
                            {getDate()}
                        </Text>
                    </VStack>
                </HStack>
                <Box bg={color.DANGER_01} w={"100%"} h={"86px"} my={"20px"} borderRadius={"20px"}>
                    <HStack alignItems="center" flex={1} m={"10px"}>
                        <Pressable onPress={() => {}}>
                            <Center
                                bg={{
                                    linearGradient: {
                                        colors: [color.PURLE_LIGHT, color.PURPLE_HEAVY],
                                        start: [0, 0],
                                        end: [1, 0],
                                    },
                                }}
                                w={"60px"}
                                h={"60px"}
                                borderRadius={"30px"}
                            >
                                <AddIcon color={color.WHITE} size={"16px"} />
                            </Center>
                        </Pressable>
                        <Text fontSize={size.font.text.small} fontFamily={fonts.PoppinsMedium} pl={"10px"}>
                            {translate("home.add_workspace")}
                        </Text>
                    </HStack>
                </Box>
                <FlatList data={workspace} renderItem={renderItem} keyExtractor={(item) => item.id.toString()} />
            </Box>
        </Flex>
    );
};

export default Workspace_naming;
