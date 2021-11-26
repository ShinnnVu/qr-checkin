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
    Input,
    VStack,
    Switch,
} from "native-base";
import color from "../../constants/colors";
import { LEFT_CAVRET, RIGHT_CAVRET } from "../../constants/icons";
import translate from "../../localize";
import size from "../../constants/sizes";
import fonts from "../../constants/fonts";
import { ILLUSTRATION, LOCATION, QR_CODE } from "../../constants/images";
import Icon_Button from "../../components/base/icon_button";
import { check } from "react-native-permissions";
import { Screens } from "../../navigations/model";
import HeaderThree from "../../components/header/headerThree";

interface CheckinMode {
    qrCode: boolean;
    location: boolean;
}

const dummyData: CheckinMode = {
    qrCode: true,
    location: true,
};
const Workspace_checkin_form = ({ route, navigation }: { route: any; navigation: any }) => {
    const [checkinMode, setCheckinMode] = useState<CheckinMode>(dummyData);
    const locationToggle = () => {
        const newCheckinMode = { ...checkinMode, location: !checkinMode.location };
        setCheckinMode(newCheckinMode);
    };
    const handleSubmit = () => {
        const data = { ...route.params, checkinMode: checkinMode };
        if (checkinMode.location) {
            navigation.navigate(Screens.WS_LOCATION, data);
        } else {
            navigation.navigate(Screens.WS_TIME, data);
        }
    };

    return (
        <Flex flex={1} bg={color.WHITE} safeArea>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Box px={"10px"} py={"10px"}>
                    <HeaderThree
                        title={"workspace_creation.checkin_form"}
                        back={() => navigation.goBack()}
                        to={handleSubmit}
                    />
                    <VStack alignItems="center" space={"25px"} py={"50px"}>
                        <Box w={"90%"} borderRadius={"16px"} shadow={5} bg={color.WHITE}>
                            <HStack p={"10px"} py={"20px"}>
                                <Center width={"60px"}>
                                    <Image source={QR_CODE} alt="Image Error" alignSelf="center" />
                                </Center>
                                <VStack flex={1} px={"5px"}>
                                    <HStack alignItems={"center"} justifyContent="space-between">
                                        <Text fontSize={size.font.text.large} fontFamily={fonts.PoppinsBold}>
                                            {translate("workspace_creation.qr_code")}
                                        </Text>
                                        <Switch
                                            onTrackColor={color.PURPLE_HEAVY}
                                            onThumbColor={color.WHITE}
                                            isChecked
                                            isDisabled
                                        />
                                    </HStack>
                                    <Box width={"90%"}>
                                        <Text fontSize={size.font.text.small} fontFamily={fonts.PoppinsRegular}>
                                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                        </Text>
                                    </Box>
                                </VStack>
                            </HStack>
                        </Box>
                        <Box w={"90%"} borderRadius={"16px"} shadow={5} bg={color.WHITE}>
                            <HStack p={"10px"} py={"20px"}>
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
                                        <Switch
                                            onTrackColor={color.PURPLE_HEAVY}
                                            onThumbColor={color.WHITE}
                                            isChecked={checkinMode.location}
                                            onToggle={locationToggle}
                                        />
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
