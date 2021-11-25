import React from "react";
import { Box, HStack, Image, Pressable, Icon, View, Center } from "native-base";
import Icon_Button from "../base/icon_button";
import color, { gradient } from "../../constants/colors";
import { HOME_ACTIVE, HOUSE, MORE, MORE_ACTIVE } from "../../constants/icons";
import { BARCODE } from "../../constants/images";
import { MaterialCommunityIcons } from "@expo/vector-icons";
interface BottomProps {
    left: () => void;
    right: () => void;
    checkin: () => void;
    homeActive: boolean;
}

const BottomTab = (props: BottomProps) => {
    return (
        <Box mx={"40px"}>
            <HStack
                marginLeft="30px"
                marginRight="30px"
                paddingBottom="8px"
                justifyContent="space-between"
                alignItems="center"
            >
                <Icon_Button
                    onPress={props.left}
                    pColor={color.WHITE}
                    upColor={color.WHITE}
                    icon={props.homeActive ? HOME_ACTIVE : HOUSE}
                />
                <Pressable onPress={props.checkin}>
                    <Center
                        h={"60px"}
                        w={"60px"}
                        borderRadius={"30px"}
                        bg={{
                            linearGradient: {
                                colors: gradient.BLUE,
                                start: gradient.START_LINEAR,
                                end: gradient.END_LINEAR,
                            },
                        }}
                    >
                        <Icon as={<MaterialCommunityIcons name="qrcode-scan" />} size={8} color={color.BLACK} />
                    </Center>
                </Pressable>
                <Icon_Button
                    onPress={props.right}
                    pColor={color.WHITE}
                    upColor={color.WHITE}
                    icon={!props.homeActive ? MORE_ACTIVE : MORE}
                />
            </HStack>
        </Box>
    );
};

export default BottomTab;
