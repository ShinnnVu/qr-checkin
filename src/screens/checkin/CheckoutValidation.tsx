import * as Location from "expo-location";
import { Button, Center, Heading, HStack, Text, VStack } from "native-base";
import React, { useEffect, useState } from "react";
import * as Progress from 'react-native-progress'
import CheckoutSuccessSvg from "../../../assets/checkin/checkout-success.svg";
import ValidationFailureSvg from "../../../assets/checkin/validation-failure.svg";

const CheckoutValidation = ({ route, navigation }: { route: any, navigation: any }) => {
    const [isValidating, setIsValidating] = useState(true);
    const [validationSuccessful, setValidationSuccessful] = useState<boolean | null>(null);
    const [failureDetail, setFailureDetail] = useState<string | null>(null);

    useEffect(() => {
        if (isValidating) {
            setTimeout(() => {
                validateCheckinUrl();
            }, 3000)
        }
    }, [isValidating]);

    const validateCheckinUrl = () => {
        fetch("checkout-link")
            .then(res => res.json())
            .then(data => {
                setValidationSuccessful(true);
                setIsValidating(false);
            })
            .catch(error => {
                setValidationSuccessful(false);
                setFailureDetail(error.message);
                setIsValidating(false);
            });
    }

    const validateLocation = () => {
        Location.getCurrentPositionAsync().then(res => {
            console.warn("Loc: " + res.coords.latitude + " " + res.coords.longitude);
        })
    }

    const retry = () => {
        setValidationSuccessful(null);
        setFailureDetail(null);
        setIsValidating(true);
    }

    if (validationSuccessful === null) {
        return (
            <Center flex={1} safeAreaTop>
                <VStack alignItems={"center"} space={20}>
                    <Heading size="xl">Checkout Verification</Heading>
                    <Progress.CircleSnail size={100} indeterminate={true} thickness={5} direction="counter-clockwise" color={["mediumpurple"]} />
                    <Text>Please wait while we verify you checkout</Text>
                </VStack>
            </Center>
        );
    }

    if (validationSuccessful === false) {
        return (
            <Center flex={1} safeAreaTop>
                <VStack space={5} alignItems={"center"}>
                    <ValidationFailureSvg />
                    <Heading size={"2xl"}>Checkout Failed</Heading>
                    <Text>Oops, something wrong has happened. Please try again</Text>
                    {failureDetail ? <Text>Detail: {failureDetail}</Text> : null}
                    <HStack space={5} marginTop={10}>
                        <Button onPress={() => navigation.navigate("Example")}>Cancel</Button>
                        <Button onPress={() => retry()}>Try Again</Button>
                    </HStack>
                </VStack>
            </Center>
        );
    }

    return (
        <Center flex={1} safeAreaTop>
            <VStack space={5}>
                <CheckoutSuccessSvg />
                <Heading size={"2xl"}>Checkout Successfully</Heading>
                <Text>That's all work for today. Great job!</Text>
                <Button marginTop={10}>Continue</Button>
            </VStack>
        </Center>
    );
};

export default CheckoutValidation;