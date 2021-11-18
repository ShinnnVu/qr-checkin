import React, { useEffect, useState } from "react";
import { Center, Pressable, Box, Flex, Image, Text, HStack, VStack, AddIcon, FlatList } from "native-base";
import color from "../../constants/colors";
import translate from "../../localize";
import size from "../../constants/sizes";
import fonts from "../../constants/fonts";
import { AVATAR, USER_PHOTO } from "../../constants/images";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { apiService } from "../../services";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HeaderOne from "../../components/header/headerOne";
import { useIsFocused } from "@react-navigation/native";

const Workspace_naming = ({ navigation }: { navigation: any }) => {
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
                const res = await apiService.getWorkspaces({ id: id });
                const workspaces: any = [...res.data.data.host_workspace, ...res.data.data.par_workspace];
                setWorkspace(workspaces);
            }
        } catch (error: any) {}
    };
    useEffect(() => {
        (async () => {
            await getWorkspace();
        })();
    }, [isFocused]);
    const renderItem = ({ item }: { item: any }) => {
        return (
            <Pressable
                onPress={() => {
                    navigation.navigate("WS_HOME", {
                        workspace_id: item.id,
                        workspace_name: item.name,
                    });
                }}
            >
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
                <HeaderOne title={user} source={USER_PHOTO} />
                <Box bg={color.DANGER_01} w={"100%"} h={"86px"} my={"20px"} borderRadius={"20px"}>
                    <HStack alignItems="center" flex={1} m={"10px"}>
                        <Pressable
                            onPress={() => {
                                navigation.navigate("WS_CR_INT");
                            }}
                        >
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
