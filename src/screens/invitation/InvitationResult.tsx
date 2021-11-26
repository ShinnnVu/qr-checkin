import { LinearGradient } from "expo-linear-gradient";
import { Box, Button, Heading, HStack, Text, VStack, useToast, extendTheme } from "native-base";
import React, { useEffect, useState } from "react";
import color from "../../constants/colors";
import fonts from "../../constants/fonts";
import RoundedButton from "../../components/base/RoundedButton";
import { Screens } from "../../navigations/model";

const InvitationResult = ({ route, navigation }: { route: any; navigation: any }) => {
    const { workspace_id, result } = route.params;
    const [invitations, setInvitation] = useState<any[]>([]);
    const [resultType, setResultType] = useState<ResultType>(ResultType.SUCCESS);

    const description =
        resultType === ResultType.SUCCESS ? (
            <Text color={color.GRAY_MEDIUM}>Users that have been invited successfully.</Text>
        ) : (
            <Text color={color.GRAY_MEDIUM}>There has been an error trying to invite these users.</Text>
        );

    useEffect(() => {
        resultType === 0 ? setInvitation(result.successUsers) : setInvitation(result.failUsers);
    }, [resultType]);

    // const invitedEmployees = invitations.map((emp, index) => (
    //     <Heading key={`${index}`} size={"sm"}>
    //         {emp}
    //     </Heading>
    // ));

    return (
        <Box flex={1} py={3} safeArea bgColor={"white"}>
            <VStack flex={1} mx={8} space={7}>
                <Heading size={"md"} style={{ fontFamily: fonts.PoppinsLight }}>
                    Employees
                </Heading>
                <HStack justifyContent={"space-around"}>
                    <LinearGradient
                        colors={
                            resultType === ResultType.SUCCESS ? style.linearGradient.blue : style.linearGradient.gray
                        }
                        style={{ borderRadius: 99 }}
                        start={[0.0, 0.5]}
                        end={[1.0, 0.5]}
                    >
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
                    <RoundedButton
                        w={40}
                        size={"lg"}
                        variant={resultType !== ResultType.SUCCESS ? "blue" : "light"}
                        text="Fail"
                        onPress={() => setResultType(ResultType.FAIL)}
                    />
                </HStack>
                {description}
                <VStack space={3}>
                    {invitations.map((emp, index) => (
                        <Heading key={`${index}`} size={"sm"}>
                            {emp}
                        </Heading>
                    ))}
                </VStack>
            </VStack>
            <VStack alignItems={"center"}>
                <RoundedButton
                    h="50"
                    size={"20"}
                    text="Done"
                    onPress={() => {
                        navigation.navigate(Screens.EMPLOYEE_LIST, {
                            workspace_id: workspace_id,
                        });
                    }}
                />
            </VStack>
        </Box>
    );
};

enum ResultType {
    SUCCESS,
    FAIL,
}

const style = {
    linearGradient: {
        blue: [color.BLUE_LIGHT, color.BLUE_HEAVY],
        gray: [color.GRAY_BUTTON, color.GRAY_BUTTON],
    },
};

export default InvitationResult;
