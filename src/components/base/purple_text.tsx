import React from "react";
import { Text } from "native-base";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import color from "../../constants/colors";
import { TouchableOpacity } from "react-native";
const GradientText = (props) => {
    return (
        <TouchableOpacity onPress={props.onClick}>
            <MaskedView maskElement={<Text {...props}>{props.children}</Text>}>
                <LinearGradient
                    colors={[color.PURLE_LIGHT, color.PURPLE_HEAVY]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                >
                    <Text {...props} style={[props.style, { opacity: 0 }]} />
                </LinearGradient>
            </MaskedView>
        </TouchableOpacity>
    );
};

export default GradientText;
