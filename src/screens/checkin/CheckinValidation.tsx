import * as Location from "expo-location";
import { Center, Heading, HStack, Text, VStack } from "native-base";
import React, { useEffect, useState } from "react";
import * as Progress from "react-native-progress";
import CheckinSuccessSvg from "../../../assets/checkin/validation-success.svg";
import CheckinFailureSvg from "../../../assets/checkin/validation-failure.svg";
import RoundedButton from "../../components/base/RoundedButton";
import { apiService } from "../../services";

const CheckinValidation = ({ route, navigation }: { route: any; navigation: any }) => {
    const { type, qrCode, workspace_id, workspace_name, user_id } = route.params;
    const [validationSuccessful, setValidationSuccessful] = useState<boolean | null>(null);
    const [failureDetail, setFailureDetail] = useState<string | null>(null);

    useEffect(() => {
        validateCheckinUrl();
    }, []);

    const validateCheckinUrl = () => {
        Location.getCurrentPositionAsync()
            .then((res) => ({ longitude: res.coords.longitude, latitude: res.coords.latitude }))
            .then(async (res) => {
                const data = {
                    workspace_id: workspace_id,
                    user_id: user_id,
                    qrCode: qrCode,
                    location: {
                        longitude: res.longitude,
                        latitude: res.latitude,
                    },
                };

                await apiService.validateCheckin(data);
                setValidationSuccessful(true);
            })
            .catch((error) => {
                setValidationSuccessful(false);
                setFailureDetail(error.message);
            });
    };

    if (validationSuccessful == null) {
        return (
            <Center flex={1} safeAreaTop>
                <VStack alignItems={"center"} space={20}>
                    <Heading size="xl">Checkin Verification</Heading>
                    <Progress.CircleSnail
                        size={100}
                        indeterminate={true}
                        thickness={5}
                        direction="counter-clockwise"
                        color={["mediumpurple"]}
                    />
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
                        <RoundedButton
                            variant="lightColorful"
                            borderColor="lightColorful"
                            borderWidth={1}
                            w={150}
                            h={55}
                            text="Cancel"
                            onPress={() =>
                                navigation.navigate("WS_HOME", {
                                    workspace_id: workspace_id,
                                    workspace_name: workspace_name,
                                })
                            }
                        />
                        <RoundedButton
                            w={150}
                            h={50}
                            text="Try Again"
                            onPress={() =>
                                navigation.navigate("CheckinQRScan", {
                                    workspace_id: workspace_id,
                                    workspace_name: workspace_name,
                                })
                            }
                        />
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
                <RoundedButton
                    w={150}
                    h={50}
                    text="Continue"
                    onPress={() =>
                        navigation.navigate("WS_HOME", {
                            workspace_id: workspace_id,
                            workspace_name: workspace_name,
                        })
                    }
                />
            </VStack>
        </Center>
    );
};

export default CheckinValidation;
