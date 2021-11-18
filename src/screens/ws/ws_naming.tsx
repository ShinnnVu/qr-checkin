import React, { useState } from "react";
import { Button, Center, Pressable, Container, Box, View, Flex, Image, Text, ScrollView, Input } from "native-base";
import color from "../../constants/colors";
import { HOUSE, LEFT_CAVRET } from "../../constants/icons";
import translate from "../../localize";
import size from "../../constants/sizes";
import fonts from "../../constants/fonts";
import Icon_Button from "../../components/base/icon_button";
import Blue_button from "../../components/base/blue_button";
import { Screens } from "../../navigations/model";
import { apiService } from "../../services";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Workspace_naming = ({ navigation }: { navigation: any }) => {
    const [name, setName] = useState<string>("");

    const nameSubmit = async () => {
        try {
            const user = await AsyncStorage.getItem("@User");
            if (user) {
                const id = JSON.parse(user).id;
                const res = await apiService.createWorkspace({ host: id, name: name });
                navigation.navigate(Screens.WS_CR_SUCCESS, { workspace_id: res.data.data });
            }
        } catch (error: any) {
            navigation.navigate(Screens.WS_CR_FAIL);
        }
    };
    return (
        <Flex flex={1} bg={color.WHITE} safeArea>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Box px={"10px"} py={"10px"}>
                    <Icon_Button
                        onPress={() => navigation.navigate(Screens.WS_CR_INT)}
                        pColor={color.GRAY_BUTTON_CLICK}
                        upColor={color.GRAY_BUTTON}
                        icon={LEFT_CAVRET}
                    />
                    <Center py={"40px"}>
                        <Text fontSize={size.font.title.H1} fontFamily={fonts.PoppinsBold}>
                            {translate("workspace_creation.name_workspace")}
                        </Text>
                        <Text
                            fontSize={size.font.text.medium}
                            fontFamily={fonts.PoppinsRegular}
                            textAlign="center"
                            py={"30px"}
                        >
                            {translate("workspace_creation.name_ws_des")}
                        </Text>
                    </Center>
                    <Center paddingBottom={"60px"}>
                        <Input
                            value={name}
                            onChangeText={setName}
                            placeholder={translate("workspace_creation.enter_ws_name")}
                            placeholderTextColor={color.GRAY_MEDIUM}
                            // fontFamily={fonts.PoppinsRegular}
                            // // fontSize={size.font.text.small}
                            w={{
                                base: "90%",
                                md: "25%",
                            }}
                            // InputLeftElement={<Image source={HOUSE} alt="No" ml="2" />}
                            bg={color.GRAY_BUTTON}
                            borderWidth={"1px"}
                            borderColor={color.GRAY_MEDIUM}
                            borderRadius={"14px"}
                        />
                    </Center>
                    <Blue_button
                        onPress={() => nameSubmit()}
                        text={translate("workspace_creation.create")}
                        width={"200px"}
                    />
                </Box>
            </ScrollView>
        </Flex>
    );
};

export default Workspace_naming;
