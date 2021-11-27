import React, { useState, useEffect } from "react";
import { Center } from "native-base";
import { ActivityIndicator } from "react-native";
import color from "../../constants/colors";
const loadingIndicator = (
    <Center flex={1}>
        <ActivityIndicator animating color={color.BLUE_HEAVY} size={"large"} />
    </Center>
);

export default loadingIndicator;
