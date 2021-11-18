import * as Location from "expo-location";
import { Button, Center, Heading, HStack, Text, VStack } from "native-base";
import React, { useEffect, useState } from "react";
import * as Progress from 'react-native-progress'
import CheckinSuccessSvg from "../../../assets/checkin/validation-success.svg";
import CheckinFailureSvg from "../../../assets/checkin/validation-failure.svg";
import RoundedButton from "../../components/base/RoundedButton";

const CheckinValidation = ({ route, navigation }: { route: any, navigation: any }) => {
    const { type, data } = route.params;
    const [validationSuccessful, setValidationSuccessful] = useState<boolean | null>(null);
    const [failureDetail, setFailureDetail] = useState<string | null>(null);

    useEffect(() => {
        validateCheckinUrl();
    }, []);

    const validateCheckinUrl = () => {
        Location
            .getCurrentPositionAsync()
            .then(res => ({ longitude: res.coords.longitude, latitude: res.coords.latitude }))
            .then(res => {
                fetch(data, {
                    method: "POST",
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        qrCode: data,
                        location: {
                            longitude: res.longitude,
                            latitude: res.latitude,
                        }
                    }),
                })
                .then(res => res.json())
                .then(data => {
                    setValidationSuccessful(true);
                })
                .catch(error => {
                    setValidationSuccessful(false);
                    setFailureDetail(error.message);
                });
            })
            .catch(error => {
                setValidationSuccessful(false);
                setFailureDetail(error.message);
            })
    };

    if (validationSuccessful == null) {
        return (
            <Center flex={1} safeAreaTop>
                <VStack alignItems={"center"} space={20}>
                    <Heading size="xl">Checkin Verification</Heading>
                    <Progress.CircleSnail size={100} indeterminate={true} thickness={5} direction="counter-clockwise" color={["mediumpurple"]} />
                    <Text>Please wait while we verify you checkin</Text>
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
                        <RoundedButton variant="lightColorful" borderColor="lightColorful" borderWidth={1} w={150} h={55} text="Cancel" onPress={() => navigation.navigate("Example")}/>
                        <RoundedButton w={150} h={50} text="Try Again" onPress={() => navigation.navigate("CheckinQRScan")}/>
                    </HStack>
                </VStack>
            </Center>
        );
    }

    return (
        <Center flex={1} safeAreaTop>
            <VStack space={5} alignItems={"center"}>
                <CheckinSuccessSvg />
                <Heading size={"2xl"}>Checkin Successfully</Heading>
                <Text mb={10}>Hooray! You have successfully checked in</Text>
                <RoundedButton w={150} h={50} text="Continue"/>
            </VStack>
        </Center>
    );
};

export default CheckinValidation;