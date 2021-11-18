import { Center, Text } from "native-base";
import React from "react";

const CheckinValidationError = ({ route, navigation }: { route: any, navigation: any }) => {
    return (
        <Center flex={1} safeAreaTop>
            <Text>Validation Error</Text>
        </Center>
    );
}

export default CheckinValidationError;