import React from "react";
import { Image, HStack, Text, VStack, Box, Avatar } from "native-base";
import size from "../../constants/sizes";
import fonts from "../../constants/fonts";
import color from "../../constants/colors";
import Icon_Button from "../base/icon_button";
import { LEFT_CAVRET } from "../../constants/icons";
import { getDate, stringToColour, getNumOfLetters } from "../../utils/utils";
interface HeaderProps {
    title: string;
    source?: any;
    showBack?: boolean;
    showAvatar?: boolean;
    back?: () => void;
}

const HeaderOne = (props: HeaderProps) => {
    return (
        <HStack w={"100%"} alignItems="center">
            {props.showBack ? (
                <>
                    <Icon_Button
                        onPress={props.back}
                        pColor={color.GRAY_BUTTON_CLICK}
                        upColor={color.GRAY_BUTTON}
                        icon={LEFT_CAVRET}
                    />
                    <Box paddingLeft={"10px"}>
                        {props.showAvatar ? (
                            <Avatar bg={stringToColour(props.title)} size={"md"}>
                                <Text fontSize={size.font.title.H4} fontFamily={fonts.PoppinsBold} color={color.WHITE}>
                                    {getNumOfLetters(props.title, 1)}
                                </Text>
                            </Avatar>
                        ) : (
                            <Image source={props.source} alt={"Error"} />
                        )}
                    </Box>
                </>
            ) : props.showAvatar ? (
                <Avatar bg={stringToColour(props.title)} size={"md"}>
                    <Text fontSize={size.font.title.H4} fontFamily={fonts.PoppinsBold} color={color.WHITE}>
                        {getNumOfLetters(props.title, 1)}
                    </Text>
                </Avatar>
            ) : (
                <Image source={props.source} alt={"Error"} />
            )}
            <VStack flex={1}>
                <Text fontSize={size.font.title.H4} fontFamily={fonts.PoppinsBold} pl={"10px"} numberOfLines={1}>
                    {props.title}
                </Text>
                <Text fontSize={size.font.text.small} fontFamily={fonts.PoppinsMedium} pl={"10px"}>
                    {getDate()}
                </Text>
            </VStack>
        </HStack>
    );
};

export default HeaderOne;
