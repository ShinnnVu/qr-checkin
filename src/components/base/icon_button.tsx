import React from "react";
import { Center, Pressable, Image } from "native-base";
import { ImageSourcePropType } from "react-native";

interface IBProps {
    onPress: any;
    pColor: string;
    upColor: string;
    icon: ImageSourcePropType;
}
export default function Icon_Button(props: IBProps): any {
    return (
        <Pressable onPress={props.onPress}>
            {({ isPressed }) => {
                return (
                    <Center
                        height={"32px"}
                        width={"32px"}
                        borderRadius={8}
                        bg={isPressed ? props.pColor : props.upColor}
                    >
                        <Image source={props.icon} alt="No" />
                    </Center>
                );
            }}
        </Pressable>
    );
}
