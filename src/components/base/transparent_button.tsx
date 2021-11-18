import React from "react";
import { Center, Pressable } from "native-base";
import color from "../../constants/colors";
import size from "../../constants/sizes";
import fonts from "../../constants/fonts";

interface BBProps {
    onPress: any;
    text: string;
    width: string;
}
export default function Trans_button(props: BBProps) {
    return (
        <Pressable onPress={props.onPress}>
            {({ isPressed }) => {
                return (
                    <Center
                        height={"60px"}
                        width={props.width}
                        borderRadius={"99"}
                        borderWidth={"1px"}
                        borderColor={color.GRAY_MEDIUM}
                        _text={{
                            fontSize: size.font.text.large,
                            fontFamily: fonts.PoppinsBold,
                            color: color.PURLE_LIGHT,
                        }}
                        alignSelf="center"
                        bg={isPressed ? color.GRAY_BUTTON_CLICK : color.GRAY_BUTTON}
                    >
                        {props.text}
                    </Center>
                );
            }}
        </Pressable>
    );
}
