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
import HeaderTwo from "../../components/header/headerTwo";
import Blue_button from "../../components/base/blue_button";
import { sleep } from "../../utils/utils";
import loadingIndicator from "../../components/base/loading_indicator";
import { apiService } from "../../services";
interface CheckinMode {
    qrCode: boolean;
    location: boolean;
}

const dummyData: CheckinMode = {
    qrCode: true,
    location: true,
};
const Ws_s_checkin_form = ({ route, navigation }: { route: any; navigation: any }) => {
    const { workspace_id, workspace_name } = route?.params;
    const [checkinMode, setCheckinMode] = useState<CheckinMode>(dummyData);
    const [loading, setLoading] = useState<boolean>(true);
    const locationToggle = () => {
        const newCheckinMode = { ...checkinMode, location: !checkinMode.location };
        setCheckinMode(newCheckinMode);
    };
    const handleSubmit = async () => {
        const data = { ...route.params, config: { checkinMode: checkinMode } };
        await apiService.updateWorkspaceConfig(data);
        if (checkinMode.location) {
            navigation.navigate(Screens.WS_LOCATION, route.params);
        } else {
            navigation.navigate(Screens.WORKSPACE_ADDITION, {
                workspace_id: workspace_id,
                workspace_name: workspace_name,
            });
        }
    };
    useEffect(() => {
        let isActive = true;
        const getInfo = async () => {
            setLoading(true);
            await sleep(2000);
            // API for getting ws Info here
            let ws_mode: CheckinMode = { location: false, qrCode: true };
            const res = await apiService.getWorkspaceMode({
                workspace_id: workspace_id,
            });
            if (res.data.data) {
                ws_mode = res.data.data;
            }
            if (isActive) {
                setCheckinMode(ws_mode);
                setLoading(false);
            }
        };
        getInfo();
        return () => {
            isActive = false;
        };
    }, []);
    return (
        <Flex flex={1} bg={color.WHITE} safeArea>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
                <Box px={"10px"} py={"10px"} flex={1}>
                    <HeaderTwo title={"workspace_creation.checkin_form"} back={() => navigation.goBack()} />
                    {loading ? (
                        <VStack alignItems="center" space={"25px"} py={"50px"}>
                            {loadingIndicator}
                        </VStack>
                    ) : (
                        <VStack alignItems="center" space={"25px"} py={"50px"}>
                            <Box w={"90%"} shadow={"1"} borderRadius={"16px"} bg={color.WHITE}>
                                <HStack p={"10px"}>
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
                                                A quick response (QR) code is a type of barcode that stores information.
                                            </Text>
                                        </Box>
                                    </VStack>
                                </HStack>
                            </Box>
                            <Box w={"90%"} shadow={"1"} borderRadius={"16px"} bg={color.WHITE}>
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
                                            <Switch
                                                onTrackColor={color.PURPLE_HEAVY}
                                                onThumbColor={color.WHITE}
                                                isChecked={checkinMode.location}
                                                onToggle={locationToggle}
                                            />
                                        </HStack>
                                        <Box width={"90%"}>
                                            <Text fontSize={size.font.text.small} fontFamily={fonts.PoppinsRegular}>
                                                Check-in is a way to indicate your location at a particular place
                                            </Text>
                                        </Box>
                                    </VStack>
                                </HStack>
                            </Box>
                        </VStack>
                    )}

                    <Box flex={1} justifyContent={"flex-end"} marginBottom={"50px"}>
                        <Blue_button
                            onPress={handleSubmit}
                            text={translate("workspace_creation.save")}
                            width={"200px"}
                        />
                    </Box>
                </Box>
            </ScrollView>
        </Flex>
    );
};

export default Ws_s_checkin_form;
