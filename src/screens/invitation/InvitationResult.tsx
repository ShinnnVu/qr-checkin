import { LinearGradient } from "expo-linear-gradient";
import { Box, Button, Heading, HStack, Text, VStack, useToast, extendTheme } from "native-base";
import React, { useEffect, useState } from "react";
import color from "../../constants/colors";
import fonts from "../../constants/fonts";
import RoundedButton from "../../components/base/RoundedButton";

const InvitationResult = ({ route, navigation }: { route: any, navigation: any }) => {
    const [invitations, setInvitation] = useState<any[]>([]);
    const toast = useToast();
    const [resultType, setResultType] = useState<ResultType>(ResultType.SUCCESS);

    const description = resultType === ResultType.SUCCESS ? <Text color={color.GRAY_MEDIUM}>Users that have been invited successfully.</Text> : <Text color={color.GRAY_MEDIUM}>There has been an error trying to invite these users.</Text>

    const getInvitations = () => {
        fetch("link")
            .then(res => res.json())
            .then(res => {
                // set invitations
            })
            .catch(err => {
                toast.show({
                    title: "Something went wrong",
                    status: "error",
                    description: "Error while getting data from server. Please try again",
                    duration: 3000,
                    placement: "top",
                });
            });
    };

    useEffect(() => {
        getInvitations();
    }, []);

    const invitedEmployees = invitations.map((emp, index) => <Heading key={`${index}`} size={"sm"}>Test</Heading>);

    return (
        <Box flex={1} m={8} my={10} safeArea>
            <VStack flex={1} space={7}>
                <Heading size={"md"} style={{ fontFamily: fonts.PoppinsLight }}>Employees</Heading>
                <HStack justifyContent={"space-around"}>
                    <LinearGradient colors={resultType === ResultType.SUCCESS ? style.linearGradient.blue : style.linearGradient.gray} style={{ borderRadius: 99 }} start={[0.0, 0.5]} end={[1.0, 0.5]}>
                        <Button
                            w={40}
                            size={"lg"}
                            variant={"unstyled"}
                            onPress={() => setResultType(ResultType.SUCCESS)}
                            _text={{ color: resultType === ResultType.SUCCESS ? color.WHITE : color.GRAY_MEDIUM }}
                            _pressed={{ bg: color.WHITE_SHADOW }}
                            borderRadius={99}
                        >
                            Success
                        </Button>
                    </LinearGradient>
                    <RoundedButton w={40} size={"lg"} variant={resultType !== ResultType.SUCCESS ? "blue" : "light"} text="Fail" onPress={() => setResultType(ResultType.FAIL)}/>
                </HStack>
                {description}
                <VStack space={3}>
                    {invitedEmployees}
                </VStack>
            </VStack>
            <VStack alignItems={"center"}>
                <RoundedButton h="50" size={"20"} text="Done" onPress={() => { navigation.navigate("Home") }}/>
            </VStack>
        </Box>
    );
};

enum ResultType {
    SUCCESS,
    FAIL,
};

const style = {
    linearGradient: {
        blue: [color.BLUE_LIGHT, color.BLUE_HEAVY],
        gray: [color.GRAY_BUTTON, color.GRAY_BUTTON],
    }
};

export default InvitationResult;