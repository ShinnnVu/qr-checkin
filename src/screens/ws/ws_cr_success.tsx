import React from "react";
import { Button, Center, Pressable, Container, Box, View, Flex, Image, Text, ScrollView } from "native-base";
import color from "../../constants/colors";
import { LEFT_CAVRET } from "../../constants/icons";
import translate from "../../localize";
import size from "../../constants/sizes";
import fonts from "../../constants/fonts";
import { ILLUSTRATION, ILLUSTRATION_2 } from "../../constants/images";
import Icon_Button from "../../components/base/icon_button";
import Blue_button from "../../components/base/blue_button";
import { Screens } from "../../navigations/model";
const Workspace_creation_success = ({ route, navigation }: { route: any; navigation: any }) => {
    const { workspace_id } = route.params;
    const configure = () => {
        navigation.navigate(Screens.WS_COM_INFO, { workspace_id: workspace_id });
    };
    const skip = () => {
        navigation.navigate(Screens.HOME);
    };
    return (
        <Flex flex={1} bg={color.WHITE} safeArea>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Box px={"10px"} py={"10px"}>
                    <Center py={"40px"}>
                        <Center paddingBottom={"30px"}>
                            <Image source={ILLUSTRATION_2} alt={"Image Error"} />
                        </Center>
                        <Text
                            fontSize={size.font.title.H1}
                            fontFamily={fonts.PoppinsBold}
                            textAlign="center"
                            paddingBottom={"15px"}
                        >
                            {translate("workspace_creation.success")}
                        </Text>
                        <Text fontSize={size.font.text.medium} fontFamily={fonts.PoppinsRegular} textAlign="center">
                            {translate("workspace_creation.configure_ask")}
                        </Text>
                    </Center>
                    <Blue_button
                        onPress={() => configure()}
                        text={translate("workspace_creation.configure")}
                        width={"156px"}
                    />
                    {/* <Pressable onPress={() => skip()}>
                        <Center py={"16px"}>
                            <Text
                                fontSize={size.font.text.large}
                                fontFamily={fonts.PoppinsRegular}
                                color={[color.PURLE_LIGHT, color.PURPLE_HEAVY]}
                            >
                                {translate("workspace_creation.skip")}
                            </Text>
                        </Center>
                        <Center py={"16px"}></Center>
                    </Pressable> */}
                </Box>
            </ScrollView>
        </Flex>
    );
};

export default Workspace_creation_success;
