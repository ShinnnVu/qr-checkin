import { Center, Heading, Text, VStack } from "native-base";
import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import * as Progress from 'react-native-progress'

const CheckinValidation = ({ route, navigation }: { route: any, navigation: any }) => {
    const { type, data } = route.params;

    useEffect(() => validateCheckinUrl(), []);

    const validateCheckinUrl = () => {
        console.warn("validating");
        fetch("link")
            .then(res => res.json())
            .then(data => navigation.navigate("CheckinValidationSuccess"))
            .catch(error => navigation.navigate("CheckinValidationError"));
    }

    return (
        <Center flex={1} safeAreaTop>
            <VStack alignItems={"center"} space={20}>
                <Heading size="xl">Checkin Verification</Heading>
                <Progress.CircleSnail size={100} indeterminate={true} thickness={5} direction="counter-clockwise" color={["mediumpurple"]} />
                <Text>Please wait while we verify you checkin</Text>
                <Text>Link: {data}</Text>
            </VStack>
        </Center>
    );
};

const styles = StyleSheet.create({
    spinner: {
        transform: [{ scale: 3 }]
    },
});

export default CheckinValidation;