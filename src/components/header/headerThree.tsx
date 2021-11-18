import React from "react";
import { Box, HStack, Text } from "native-base";
import size from "../../constants/sizes";
import fonts from "../../constants/fonts";
import color from "../../constants/colors";
import Icon_Button from "../base/icon_button";
import { LEFT_CAVRET, RIGHT_CAVRET } from "../../constants/icons";
import translate from "../../localize";

interface HeaderProps {
    title: string;
    back: () => void;
    to: () => void;
}

const HeaderThree = (props: HeaderProps) => {
    return (
        <Box px={"10px"} py={"10px"}>
            <HStack justifyContent="space-between" alignItems="center">
                <Icon_Button
                    onPress={props.back}
                    pColor={color.GRAY_BUTTON_CLICK}
                    upColor={color.GRAY_BUTTON}
                    icon={LEFT_CAVRET}
                />
                <Text fontSize={size.font.title.H4} fontFamily={fonts.PoppinsBold}>
                    {translate(props.title)}
                </Text>
                <Icon_Button
                    onPress={props.to}
                    pColor={color.GRAY_BUTTON_CLICK}
                    upColor={color.GRAY_BUTTON}
                    icon={RIGHT_CAVRET}
                />
            </HStack>
        </Box>
    );
};

export default HeaderThree;
