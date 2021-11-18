import React from "react";
import { Box, HStack, Text } from "native-base";
import size from "../../constants/sizes";
import fonts from "../../constants/fonts";
import color from "../../constants/colors";
import Icon_Button from "../base/icon_button";
import { LEFT_CAVRET } from "../../constants/icons";
import translate from "../../localize";

interface HeaderProps {
    title: string;
    back: () => void;
}

const HeaderTwo = (props: HeaderProps) => {
    return (
        <Box px={"10px"} py={"10px"}>
            <HStack alignItems="center">
                <Icon_Button
                    onPress={props.back}
                    pColor={color.GRAY_BUTTON_CLICK}
                    upColor={color.GRAY_BUTTON}
                    icon={LEFT_CAVRET}
                />
                <Text fontSize={size.font.title.H4} fontFamily={fonts.PoppinsBold} marginLeft={"15px"}>
                    {translate(props.title)}
                </Text>
            </HStack>
        </Box>
    );
};

export default HeaderTwo;
