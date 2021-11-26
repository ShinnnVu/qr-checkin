import React from "react";
import { Center, HStack, Pressable, Icon, Text, View } from "native-base";
import color from "../../constants/colors";
import size from "../../constants/sizes";
import fonts from "../../constants/fonts";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity } from "react-native";

interface AProps {
    text: string;
    leftIcon?: string;
    leftIconStyle?: any;
    rightIconStyle?: any;
    holderStyle?: any;
    rightIcon?: string;
    press: () => void;
}
export default function Addition_element(props: AProps) {
    return (
        <TouchableOpacity onPress={props.press} style={[styles.holder, props.holderStyle]}>
            <HStack space={"10px"}>
                <Icon
                    as={<MaterialCommunityIcons name={props.leftIcon} />}
                    size={5}
                    ml="2"
                    color="muted.400"
                    {...props.leftIconStyle}
                />
                <Text fontSize={size.font.text.large} fontFamily={fonts.PoppinsRegular} color={color.GRAY_HEAVY}>
                    {props.text}
                </Text>
            </HStack>
            <Icon
                as={<MaterialCommunityIcons name={props.rightIcon} />}
                size={5}
                ml="2"
                color="muted.400"
                {...props.rightIconStyle}
            />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    holder: {
        elevation: 5,
        justifyContent: "space-between",
        flexDirection: "row",
        height: 50,
        alignItems: "center",
        borderRadius: 16,
        padding: 5,
        backgroundColor: color.WHITE,
    },
});
