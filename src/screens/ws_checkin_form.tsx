import React from "react";
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
    Input,
    VStack,
    Switch,
} from "native-base";
import color from "../constants/colors";
import { LEFT_CAVRET, RIGHT_CAVRET } from "../constants/icons";
import translate from "../localize";
import size from "../constants/sizes";
import fonts from "../constants/fonts";
import { ILLUSTRATION, LOCATION, QR_CODE } from "../constants/images";
import Icon_Button from "../components/base/icon_button";
const Workspace_checkin_form = ({ navigation }: { navigation: any }) => {
    return (
        <Flex flex={1} bg={color.WHITE} safeArea>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Box px={"10px"} py={"10px"}>
                    <HStack justifyContent="space-between" alignItems="center">
                        <Icon_Button
                            onPress={() => console.log("hello")}
                            pColor={color.GRAY_BUTTON_CLICK}
                            upColor={color.GRAY_BUTTON}
                            icon={LEFT_CAVRET}
                        />
                        <Text fontSize={size.font.title.H4} fontFamily={fonts.PoppinsBold}>
                            {translate("workspace_creation.checkin_form")}
                        </Text>
                        <Icon_Button
                            onPress={() => console.log("hello")}
                            pColor={color.GRAY_BUTTON_CLICK}
                            upColor={color.GRAY_BUTTON}
                            icon={RIGHT_CAVRET}
                        />
                    </HStack>
                    <VStack alignItems="center" space={"25px"} py={"50px"}>
                        <Box w={"90%"} shadow={"1"} borderRadius={"16px"}>
                            <HStack p={"10px"}>
                                <Center width={"60px"}>
                                    <Image source={QR_CODE} alt="Image Error" alignSelf="center" />
                                </Center>
                                <VStack flex={1} px={"5px"}>
                                    <HStack alignItems={"center"} justifyContent="space-between">
                                        <Text fontSize={size.font.text.large} fontFamily={fonts.PoppinsBold}>
                                            {translate("workspace_creation.qr_code")}
                                        </Text>
                                        <Switch onTrackColor={color.PURPLE_HEAVY} onThumbColor={color.WHITE} />
                                    </HStack>
                                    <Box width={"90%"}>
                                        <Text fontSize={size.font.text.small} fontFamily={fonts.PoppinsRegular}>
                                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                        </Text>
                                    </Box>
                                </VStack>
                            </HStack>
                        </Box>
                        <Box w={"90%"} shadow={"1"} borderRadius={"16px"}>
                            <HStack p={"10px"}>
                                <Center width={"60px"}>
                                    <Image
                                        source={LOCATION}
                                        alt="Image Error"
                                        height={"50px"}
                                        width={"50px"}
                                        alignSelf="center"
                                    />
                                </Center>
                                <VStack flex={1} px={"5px"}>
                                    <HStack alignItems={"center"} justifyContent="space-between">
                                        <Text fontSize={size.font.text.large} fontFamily={fonts.PoppinsBold}>
                                            {translate("workspace_creation.location")}
                                        </Text>
                                        <Switch onTrackColor={color.PURPLE_HEAVY} onThumbColor={color.WHITE} />
                                    </HStack>
                                    <Box width={"90%"}>
                                        <Text fontSize={size.font.text.small} fontFamily={fonts.PoppinsRegular}>
                                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                        </Text>
                                    </Box>
                                </VStack>
                            </HStack>
                        </Box>
                    </VStack>
                </Box>
            </ScrollView>
        </Flex>
    );
};

export default Workspace_checkin_form;
