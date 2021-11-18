import * as Location from "expo-location";
import { Alert, Box, Button, Center, Heading, HStack, Text, VStack, FormControl, Input, WarningOutlineIcon, InputLeftAddon, InputGroup, Icon, Divider, View, useToast } from "native-base";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import * as Progress from 'react-native-progress'
import { FontAwesome5 } from '@expo/vector-icons';
import CheckoutSuccessSvg from "../../../assets/checkin/checkout-success.svg";
import ValidationFailureSvg from "../../../assets/checkin/validation-failure.svg";

const EmployeeInvitation = ({ route, navigation }: { route: any, navigation: any }) => {
    const [username, setUsername] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const toast = useToast();

    const validate = () => {
        if (username === null || username.length === 0) {
            setError("Username must not be empty");
            return false;
        }
        return true;
    }

    const inviteUser = () => {
        fetch("invite-link")
            .then(res => res.json())
            .then(data => {

            })
            .catch(err => {
                toast.show({
                    title: "Something went wrong",
                    status: "error",
                    description: "Cannot connect to server",
                    duration: 3000,
                    placement: "top",
                });
            });
    };

    return (
        <Box flex={1} m={8} my={10} safeArea>
            <VStack flex={1} space={5}>
                <Heading size={"md"}>Employee Info</Heading>
                <FormControl isRequired isInvalid={error !== null}>
                    <FormControl.Label>Username</FormControl.Label>
                    <Input
                        variant={"rounded"}
                        placeholder="Username"
                        InputLeftElement={
                            <Icon
                                as={<FontAwesome5 name="user" />}
                                size={4}
                                ml={5}
                                mr={3}
                                color="muted.400"
                            />
                        }
                        onChangeText={text => { setUsername(text); setError(null) }}
                    />
                    {error
                        ? <FormControl.ErrorMessage>{error}</FormControl.ErrorMessage>
                        : <FormControl.HelperText>The account with this username will be invited to the workspace.</FormControl.HelperText>
                    }
                </FormControl>
            </VStack>
            <VStack space={5}>
                <Button onPress={() => { if (validate()) inviteUser() }}>Invite</Button>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <View style={{ flex: 1, height: 1, backgroundColor: "darkgray" }} />
                    <View>
                        <Text style={{ width: 50, textAlign: "center", color: "darkgray" }}>Or</Text>
                    </View>
                    <View style={{ flex: 1, height: 1, backgroundColor: "darkgray" }} />
                </View>
                <Button onPress={() => navigation.navigate("ExcelInvitation")}>Import From Excel</Button>
            </VStack>
        </Box>
    );
};

export default EmployeeInvitation;