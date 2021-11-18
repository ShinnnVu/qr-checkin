import React from "react";
import { Box, Button, Center } from "native-base";

const Example = ({ navigation }: { navigation: any }) => {
    return (
        <>
            <Center flex={1} px="3">
                <Box
                    bg={{
                        linearGradient: {
                            colors: ["lightBlue.300", "violet.800"],
                            start: [0, 0],
                            end: [1, 0],
                        },
                    }}
                    p="12"
                    rounded="xl"
                    _text={{
                        fontSize: "md",
                        fontWeight: "medium",
                        color: "warmGray.50",
                        textAlign: "center",
                    }}
                >
                    This is a Box with Linear Gradient
                </Box>
                <>
                    <Button
                        onPress={() => {
                            navigation.navigate("Header");
                        }}
                    >
                        Go to Header
                    </Button>
                    <Button
                        onPress={() => {
                            navigation.navigate("CheckinQRScan");
                        }}
                    >
                        Checkin
                    </Button>
                    <Button
                        onPress={() => {
                            navigation.navigate("CheckoutValidation");
                        }}
                    >
                        Checkout
                    </Button>
                    <Button
                        onPress={() => {
                            navigation.navigate("EmployeeInvitation");
                        }}
                    >
                        Invite Employees
                    </Button>
                </>
            </Center>
        </>
    );
};

export default Example;
