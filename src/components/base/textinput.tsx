import React, { memo } from "react";
import { Text, Input, Box } from "native-base";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import color from "../../constants/colors";
import size from "../../constants/sizes";
import fonts from "../../constants/fonts";
import { TouchableOpacity } from "react-native";
interface TextInputProps {
    type?: string;
    name: string;
    value: string;
    handleChange: any;
    handleBlur: any;
    leftIcon?: JSX.Element;
    rightIcon?: JSX.Element;
    inputW: { base: string };
    errors: string | undefined;
    touched: boolean | undefined;
}
const TextInput = (props: TextInputProps) => {
    const { type, name, value, handleChange, handleBlur, leftIcon, rightIcon, inputW, errors, touched } = props;
    console.log("render9");
    return (
        <>
            <Input
                type={type}
                value={value}
                onChangeText={handleChange}
                onBlur={handleBlur}
                placeholder={name}
                InputLeftElement={leftIcon}
                InputRightElement={rightIcon}
                borderRadius={"14px"}
                w={inputW}
            />
            {errors && touched && (
                <Text
                    fontSize={size.font.text.caption}
                    fontFamily={fonts.PoppinsMedium}
                    color={color.RED_ERROR}
                    pl={"10px"}
                >
                    {errors}
                </Text>
            )}
        </>
    );
};
const isEqual = (prevProps: any, nextProps: any) => {
    if (
        prevProps.type !== nextProps.type ||
        prevProps.errors !== nextProps.errors ||
        prevProps.value !== nextProps.value ||
        prevProps.rightIcon !== nextProps.rightIcon ||
        prevProps.touched !== nextProps.touched
    )
        return false;
    return true;
};
export default memo(TextInput, isEqual);
