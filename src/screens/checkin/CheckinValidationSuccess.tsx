import { Center, Text } from "native-base";
import React from "react";

const CheckinValidationSuccess = ({ route, navigation }: { route: any, navigation: any }) => {
    return (
        <Center flex={1} safeAreaTop>
            <Text>Validation Success</Text>
        </Center>
    );
}

export default CheckinValidationSuccess;