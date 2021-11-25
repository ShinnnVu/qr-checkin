import React from "react";
import { Center, HStack, Pressable, Icon, Text, View } from "native-base";
import color from "../../constants/colors";
import size from "../../constants/sizes";
import fonts from "../../constants/fonts";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";

const languageIcon = (
    <Icon as={<MaterialCommunityIcons name="home-edit-outline" />} size={5} ml="2" color="muted.400" />
);
const privacyIcon = <Icon as={<MaterialCommunityIcons name="email-outline" />} size={5} ml="2" color="muted.400" />;
const addressIcon = <Icon as={<MaterialCommunityIcons name="map-outline" />} size={5} ml="2" color="muted.400" />;

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
        <Pressable onPress={props.press}>
            <View style={[styles.holder, props.holderStyle]}>
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
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    holder: {
        elevation: 1,
        justifyContent: "space-between",
        flexDirection: "row",
        height: 50,
        alignItems: "center",

        borderRadius: 16,
        padding: 5,
    },
});
