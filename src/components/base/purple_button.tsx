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
export default function Purple_button(props: BBProps) {
    return (
        <Pressable onPress={props.onPress}>
            {({ isPressed }) => {
                return (
                    <Center
                        height={"60px"}
                        width={props.width}
                        borderRadius={"99"}
                        _text={{
                            fontSize: size.font.text.large,
                            fontFamily: fonts.PoppinsBold,
                            color: color.WHITE,
                        }}
                        alignSelf="center"
                        bg={
                            isPressed
                                ? color.DARKEN_LIGHT
                                : {
                                      linearGradient: {
                                          colors: [color.PURLE_LIGHT, color.PURPLE_HEAVY],
                                          start: [0, 0],
                                          end: [1, 0],
                                      },
                                  }
                        }
                    >
                        {props.text}
                    </Center>
                );
            }}
        </Pressable>
    );
}
