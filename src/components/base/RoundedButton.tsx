import React from "react";
import { Box, Button, Center, Pressable } from "native-base";
import color from "../../constants/colors";
import size from "../../constants/sizes";
import fonts from "../../constants/fonts";
import { LinearGradient } from "expo-linear-gradient";
import { Dimensions } from "react-native";

interface RBProps {
    onPress?: any | null;
    variant?: "blue" | "light" | "lightColorful",
    size?: string | null,
    w?: number | string,
    h?: number | string,
    maxw?: number | string | "90%",
    minw?: number | string | "60%",
    text: string,
    borderColor?: "lightColorful",
    borderWidth?: number,
    isDisabled?: boolean
    isLoading?: boolean,
    isLoadingText?: string,
}
export default function RoundedButton(props: RBProps) {
    const textColor = props.variant ? style.text[props.variant] : style.text.blue;
    const borderColor = props.borderColor ? style.borderColor[props.borderColor] : undefined;
    return (
        <Box alignItems={"center"}>
            <LinearGradient colors={props.variant == null || props.variant === "blue" ? style.linearGradient.blue : style.linearGradient.light} style={{ borderRadius: 99 }} start={[0.0, 0.5]} end={[1.0, 0.5]}>
                <Button 
                    maxW={props.maxw}
                    minW={props.minw}
                    w={props.w || Dimensions.get("window").width * 0.9}
                    h={props.h}
                    size={props.size}
                    variant={"unstyled"}
                    onPress={props.onPress}
                    _text={{
                        color: textColor,
                        fontFamily: fonts.PoppinsMedium,
                        fontSize: size.font.text.large,
                    }}
                    _pressed={{ bg: color.WHITE_SHADOW }}
                    borderRadius={99}
                    borderColor={borderColor} 
                    borderWidth={props.borderWidth}
                    isDisabled={props.isDisabled}
                    isLoading={props.isLoading}
                    isLoadingText={props.isLoadingText}
                >
                    {props.text}
                </Button>
            </LinearGradient>
        </Box>
    );
}

const style = {
    linearGradient: {
        blue: [color.BLUE_LIGHT, color.BLUE_HEAVY],
        light: [color.GRAY_BUTTON, color.GRAY_BUTTON],
        lightColorful: [color.GRAY_BUTTON, color.GRAY_BUTTON], 
    },
    text: {
        blue: color.WHITE,
        light: color.GRAY_MEDIUM,
        lightColorful: color.PURPLE_HEAVY,
    },
    borderColor: {
        lightColorful: color.GRAY_LIGHT,
    }
};
