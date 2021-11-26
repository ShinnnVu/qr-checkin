import { Box, Heading, Text, VStack, FormControl, Input, Icon, View } from "native-base";
import React, { useState } from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import RoundedButton from "../../components/base/RoundedButton";
import { apiService } from "../../services";
import { Screens } from "../../navigations/model";
import HeaderTwo from "../../components/header/headerTwo";

const EmployeeInvitation = ({ route, navigation }: { route: any; navigation: any }) => {
    const { workspace_id } = route.params;
    const [username, setUsername] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const validate = () => {
        if (username === null || username.length === 0) {
            setError("Username must not be empty");
            return false;
        }
        return true;
    };

    const inviteUser = async () => {
        try {
            const res = await apiService.addParticipant({
                id: workspace_id,
                participants: [username],
            });
            navigation.navigate(Screens.INVITATION_RESULT, {
                workspace_id: workspace_id,
                result: res.data.data,
            });
        } catch (error) {}
    };

    return (
        <Box flex={1} py={3} safeArea bgColor={"white"}>
            <HeaderTwo title="employees.add_employee" back={() => navigation.goBack()} />
            <VStack flex={1} mx={8} space={5}>
                <FormControl isRequired isInvalid={error !== null}>
                    <FormControl.Label>Username</FormControl.Label>
                    <Input
                        variant={"rounded"}
                        placeholder="Username"
                        InputLeftElement={
                            <Icon as={<FontAwesome5 name="user" />} size={4} ml={5} mr={3} color="muted.400" />
                        }
                        onChangeText={(text) => {
                            setUsername(text);
                            setError(null);
                        }}
                    />
                    {error ? (
                        <FormControl.ErrorMessage>{error}</FormControl.ErrorMessage>
                    ) : (
                        <FormControl.HelperText>
                            The account with this username will be invited to the workspace.
                        </FormControl.HelperText>
                    )}
                </FormControl>
            </VStack>
            <VStack space={5}>
                <RoundedButton
                    text="Invite"
                    h="60"
                    onPress={() => {
                        if (validate()) inviteUser();
                    }}
                />
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <View style={{ flex: 1, height: 1, backgroundColor: "darkgray" }} />
                    <View>
                        <Text style={{ width: 50, textAlign: "center", color: "darkgray" }}>Or</Text>
                    </View>
                    <View style={{ flex: 1, height: 1, backgroundColor: "darkgray" }} />
                </View>
                <RoundedButton
                    variant="lightColorful"
                    h="60"
                    text="Import From Excel"
                    onPress={() => navigation.navigate("ExcelInvitation")}
                    borderColor="lightColorful"
                    borderWidth={1}
                />
            </VStack>
        </Box>
    );
};

export default EmployeeInvitation;
