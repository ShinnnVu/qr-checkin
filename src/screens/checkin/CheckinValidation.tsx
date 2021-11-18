import * as Location from "expo-location";
import { Button, Center, Heading, HStack, Text, VStack } from "native-base";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import * as Progress from 'react-native-progress'
import CheckinSuccessSvg from "../../../assets/checkin/validation-success.svg";
import CheckinFailureSvg from "../../../assets/checkin/validation-failure.svg";

const CheckinValidation = ({ route, navigation }: { route: any, navigation: any }) => {
    const { type, data } = route.params;
    const [validationSuccessful, setValidationSuccessful] = useState<boolean | null>(null);
    const [failureDetail, setFailureDetail] = useState<string | null>(null);

    useEffect(() => {
        setTimeout(() => {
            validateCheckinUrl();
        }, 3000)
    }, []);

    const validateCheckinUrl = () => {
        fetch(data)
            .then(res => res.json())
            .then(data => {
                setValidationSuccessful(true);
            })
            .catch(error => {
                setValidationSuccessful(false);
                setFailureDetail(error.message);
            });
    }

    const validateLocation = () => {
        Location.getCurrentPositionAsync().then(res => {
            console.warn("Loc: " + res.coords.latitude + " " + res.coords.longitude);
        })
    }

    if (validationSuccessful == null) {
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
    }

    if (validationSuccessful == false) {
        return (
            <Center flex={1} safeAreaTop>
                <VStack space={5} alignItems={"center"}>
                    <CheckinFailureSvg />
                    <Heading size={"2xl"}>Checkin Failed</Heading>
                    <Text>Oops, something wrong has happened. Please try again</Text>
                    {failureDetail ? <Text>Detail: {failureDetail}</Text> : null}
                    <HStack space={5} marginTop={10}>
                        <Button onPress={() => navigation.navigate("Example")}>Cancel</Button>
                        <Button onPress={() => navigation.navigate("CheckinQRScan")}>Try Again</Button>
                    </HStack>
                </VStack>
            </Center>
        );
    }

    return (
        <Center flex={1} safeAreaTop>
            <VStack space={5}>
                <CheckinSuccessSvg />
                <Heading size={"2xl"}>Checkin Successfully</Heading>
                <Text>Hooray! You have successfully checked in</Text>
                <Button marginTop={10}>Continue</Button>
            </VStack>
        </Center>
    );
};

export default CheckinValidation;