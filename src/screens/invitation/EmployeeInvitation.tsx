import { Box, Button, Heading, Text, VStack, FormControl, Input, Icon, View, useToast } from "native-base";
import React, { useState } from "react";
import { FontAwesome5 } from '@expo/vector-icons';
import RoundedButton from "../../components/base/RoundedButton";

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
        fetch("invite-link", {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify([
                username
            ]),
        })
        .then(res => res.json())
        .then(data => {
            toast.show({
                title: "Completed",
                status: "success",
                description: "Invite employee successfully.",
                duration: 3000,
                placement: "top",
            });
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
                <RoundedButton text="Invite" h="60" onPress={() => { if (validate()) inviteUser() }}/>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <View style={{ flex: 1, height: 1, backgroundColor: "darkgray" }} />
                    <View>
                        <Text style={{ width: 50, textAlign: "center", color: "darkgray" }}>Or</Text>
                    </View>
                    <View style={{ flex: 1, height: 1, backgroundColor: "darkgray" }} />
                </View>
                <RoundedButton variant="lightColorful" h="60" text="Import From Excel" onPress={() => navigation.navigate("ExcelInvitation")} borderColor="lightColorful" borderWidth={1}/>
            </VStack>
        </Box>
    );
};

export default EmployeeInvitation;