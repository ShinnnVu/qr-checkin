import React from "react";
import { Box, HStack, Image, Pressable } from "native-base";
import Icon_Button from "../base/icon_button";
import color from "../../constants/colors";
import { HOME_ACTIVE, HOUSE, MORE, MORE_ACTIVE } from "../../constants/icons";
import { BARCODE } from "../../constants/images";

interface BottomProps {
    left: () => void;
    right: () => void;
    checkin: () => void;
    homeActive: boolean;
}

const BottomTab = (props: BottomProps) => {
    return (
        <Box px={"40px"}>
            <HStack paddingLeft="30px" paddingRight="30px" justifyContent="space-between" alignItems="center">
                <Icon_Button
                    onPress={props.left}
                    pColor={color.WHITE}
                    upColor={color.WHITE}
                    icon={props.homeActive ? HOME_ACTIVE : HOUSE}
                />
                {/* <Icon_Button onPress={props.checkin} pColor={color.WHITE} upColor={color.WHITE} icon={HOME_ACTIVE} /> */}
                <Pressable onPress={props.checkin}>
                    <Image source={BARCODE} alt="Error" />
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
