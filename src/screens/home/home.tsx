import React, { useEffect, useState } from "react";
import {
    Center,
    Pressable,
    Box,
    Flex,
    Image,
    Text,
    HStack,
    VStack,
    AddIcon,
    FlatList,
    View,
    Avatar,
} from "native-base";
import color, { gradient } from "../../constants/colors";
import translate from "../../localize";
import size from "../../constants/sizes";
import fonts from "../../constants/fonts";
import { AVATAR, USER_PHOTO } from "../../constants/images";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { apiService } from "../../services";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HeaderOne from "../../components/header/headerOne";
import { useIsFocused } from "@react-navigation/native";
import { SafeAreaView, StyleSheet, TouchableOpacity } from "react-native";
import { getNumOfLetters, getRandomColor, stringToColour } from "../../utils/utils";
import BottomTab from "../../components/bottom/bottom";
import { Screens } from "../../navigations/model";

const Workspace_naming = ({ navigation }: { navigation: any }) => {
    const [user, setUser] = useState<string>("");
    const [workspace, setWorkspace] = useState([]);
    const [empty, setEmpty] = useState(false);
    const isFocused = useIsFocused();

    const getWorkspace = async () => {
        try {
            const user = await AsyncStorage.getItem("@User");
            if (user) {
                const username = JSON.parse(user).username;
                const id = JSON.parse(user).id;
                setUser(username);
                const res = await apiService.getWorkspaces({ id: id });
                const host_workspace = res.data.data.host_workspace.map((item: any) => {
                    return { ...item, type: "Host" };
                });
                const par_workspace = res.data.data.par_workspace.map((item: any) => {
                    return { ...item, type: "Participant" };
                });
                const workspaces: any = [...host_workspace, ...par_workspace];
                if (workspace.length === 0) setEmpty(true);
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
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate("WS_HOME", {
                        workspace_id: item.id,
                        workspace_name: item.name,
                    });
                }}
                style={styles.workspace}
            >
                <View style={styles.ws_holder}>
                    <View style={styles.ws_avatar_holder}>
                        <Avatar bg={stringToColour(item.name)} size={"md"}>
                            <Text fontSize={size.font.title.H4} fontFamily={fonts.PoppinsBold} color={color.WHITE}>
                                {getNumOfLetters(item.name, 1)}
                            </Text>
                        </Avatar>
                        <Text
                            fontSize={size.font.text.large}
                            fontFamily={fonts.PoppinsSemiBold}
                            pl={"10px"}
                            maxWidth={"80%"}
                            numberOfLines={1}
                        >
                            {item.name}
                        </Text>
                    </View>
                    <MaterialCommunityIcons name="chevron-right" size={24} color={color.PURLE_LIGHT} solid />
                </View>
            </TouchableOpacity>
        );
    };

    const listEmpty = () => {
        return (
            <Text
                fontSize={size.font.text.large}
                fontFamily={fonts.PoppinsRegular}
                pl={"10px"}
                textAlign={"center"}
                w={"100%"}
            >
                {empty
                    ? "There is no workspace yet!"
                    : "Your workspace list is being loaded.  \n Please wait a second!"}
            </Text>
        );
    };
    const listHeader = () => {
        return (
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate("WS_CR_INT");
                }}
            >
                <Box bg={color.DANGER_01} h={"86px"} my={"20px"} borderRadius={"20px"} w={"95%"} alignSelf={"center"}>
                    <HStack alignItems="center" flex={1} m={"10px"}>
                        <Center
                            bg={{
                                linearGradient: {
                                    colors: gradient.PURPLE,
                                    start: gradient.START_LINEAR,
                                    end: gradient.END_LINEAR,
                                },
                            }}
                            w={"60px"}
                            h={"60px"}
                            borderRadius={"30px"}
                        >
                            <AddIcon color={color.WHITE} size={"16px"} />
                        </Center>

                        <Text fontSize={size.font.text.small} fontFamily={fonts.PoppinsMedium} pl={"10px"}>
                            {translate("home.add_workspace")}
                        </Text>
                    </HStack>
                </Box>
            </TouchableOpacity>
        );
    };
    return (
        <Flex flex={1} bg={color.WHITE} safeArea>
            <Box my={"10px"} flex={1}>
                <Box alignSelf={"center"} w={"95%"}>
                    <HeaderOne title={user} source={USER_PHOTO} />
                </Box>
                {listHeader()}
                <SafeAreaView style={styles.flex1}>
                    <FlatList
                        data={workspace}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id.toString()}
                        ListEmptyComponent={listEmpty}
                        contentContainerStyle={styles.flatlist}
                    />
                </SafeAreaView>
                <BottomTab
                    homeActive={true}
                    left={() => {}}
                    right={() => {
                        navigation.navigate(Screens.ADDITION);
                    }}
                    checkin={() => {}}
                />
            </Box>
        </Flex>
    );
};

const styles = StyleSheet.create({
    workspace: {
        backgroundColor: color.WHITE,
        width: "95%",
        height: 80,
        borderRadius: 16,
        marginVertical: 10,
        elevation: 5,
        alignSelf: "center",
    },
    ws_holder: {
        alignItems: "center",
        flex: 1,
        margin: 10,
        justifyContent: "space-between",
        flexDirection: "row",
    },
    ws_avatar_holder: {
        flexDirection: "row",
        alignItems: "center",
    },
    flatlist: {
        backgroundColor: color.WHITE,
        paddingVertical: 10,
    },
    flex1: {
        flex: 1,
    },
});
export default Workspace_naming;
