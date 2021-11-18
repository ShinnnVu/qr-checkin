import React from "react";
import { Button, Center, Pressable, Container, Box, View, Flex, Image, Text, ScrollView, Input } from "native-base";
import color from "../constants/colors";
import { HOUSE, LEFT_CAVRET } from "../constants/icons";
import translate from "../localize";
import size from "../constants/sizes";
import fonts from "../constants/fonts";
import { ILLUSTRATION } from "../constants/images";
import Icon_Button from "../components/base/icon_button";
import Blue_button from "../components/base/blue_button";
const Workspace_naming = ({ navigation }: { navigation: any }) => {
    return (
        <Flex flex={1} bg={color.WHITE} safeArea>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Box px={"10px"} py={"10px"}>
                    <Icon_Button
                        onPress={() => console.log("hello")}
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
                        onPress={() => console.log("hello")}
                        text={translate("workspace_creation.create")}
                        width={"200px"}
                    />
                </Box>
            </ScrollView>
        </Flex>
    );
};

export default Workspace_naming;
