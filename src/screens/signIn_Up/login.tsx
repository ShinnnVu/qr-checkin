import React, { useState } from "react";
import { Button, Center, Box, Flex, Text, ScrollView, Input, Stack, Link, Icon, HStack, VStack } from "native-base";
import { Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import color from "../../constants/colors";
import size from "../../constants/sizes";
import fonts from "../../constants/fonts";
import { apiService, connector } from "../../services";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MaskedView from "@react-native-masked-view/masked-view";
import GradientText from "../../components/base/purple_text";
import { Screens } from "../../navigations/model";
import * as yup from "yup";
import { Formik } from "formik";
import translate from "../../localize";
import { CommonActions } from "@react-navigation/native";
const wsLoginSchema = yup.object().shape({
    username: yup
        .string()
        .trim()
        .min(1, ({ min }) => translate("error.min_input", { field: "Username", min: min }))
        .max(256, ({ max }) => translate("error.max_input", { field: "Username", max: max }))
        .required(translate("error.required", { field: "Username" })),
    password: yup
        .string()
        .trim()
        .min(1, ({ min }) => translate("error.min_input", { field: "Password", min: min }))
        .max(256, ({ max }) => translate("error.max_input", { field: "Password", max: max }))
        .required(translate("error.required", { field: "Password" })),
});

const Login = ({ navigation }: { navigation: any }) => {
    const login = async (username: string, password: string, setSubmitting) => {
        try {
            const res = await apiService.login({
                username: username,
                password: password,
            });
            const user = res.data.data;
            connector.setJWT(user.token);
            await AsyncStorage.setItem("@User", JSON.stringify(user));
            setSubmitting(false);
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{ name: "Home" }],
                }),
            );
        } catch (error: any) {
            Alert.alert("Failed", "Your username or password is not correct!", [
                { text: "OK", onPress: () => console.log("OK Pressed") },
            ]);
        }
    };

    return (
        <Flex flex={1} bg={color.WHITE} safeArea>
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={"handled"}>
                <Center py={"20px"}>
                    <Box>
                        <VStack space={2} alignItems="center" alignSelf="center">
                            <Text fontSize={size.font.title.H4} fontFamily={fonts.PoppinsRegular}>
                                {"Hey there,"}
                            </Text>
                            <Text fontSize={size.font.title.H2} fontFamily={fonts.PoppinsBold}>
                                {"Welcome to Checkin App"}
                            </Text>
                        </VStack>
                    </Box>
                    <Formik
                        validationSchema={wsLoginSchema}
                        initialValues={{ username: "", password: "", type: "password" }}
                        onSubmit={(values, { setSubmitting }) => login(values.username, values.password, setSubmitting)}
                    >
                        {({
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            values,
                            errors,
                            touched,
                            isValid,
                            isSubmitting,
                            setFieldValue,
                        }) => (
                            <Stack
                                mt={3}
                                space={4}
                                w={{
                                    base: "75%",
                                    md: "25%",
                                }}
                                py={"100px"}
                            >
                                <Input
                                    value={values.username}
                                    onChangeText={handleChange("username")}
                                    onBlur={handleBlur("username")}
                                    type="text"
                                    placeholder="Username"
                                    InputLeftElement={
                                        <Icon as={<MaterialIcons name="message" />} size={5} ml="2" color="muted.400" />
                                    }
                                    borderRadius={"14px"}
                                />
                                {errors.username && touched.username && (
                                    <Text
                                        fontSize={size.font.text.caption}
                                        fontFamily={fonts.PoppinsMedium}
                                        color={color.RED_ERROR}
                                        pl={"10px"}
                                    >
                                        {errors.username}
                                    </Text>
                                )}
                                <Input
                                    value={values.password}
                                    onChangeText={handleChange("password")}
                                    onBlur={handleBlur("password")}
                                    type={values.type}
                                    placeholder="Password"
                                    InputLeftElement={
                                        <Icon as={<MaterialIcons name="lock" />} size={5} ml="2" color="muted.400" />
                                    }
                                    InputRightElement={
                                        <Icon
                                            as={
                                                values.type === "password" ? (
                                                    <MaterialIcons name="visibility-off" />
                                                ) : (
                                                    <MaterialIcons name="visibility" />
                                                )
                                            }
                                            size={5}
                                            mr="2"
                                            color="muted.400"
                                            onPress={() =>
                                                setFieldValue("type", values.type === "password" ? "none" : "password")
                                            }
                                        />
                                    }
                                    borderRadius={"14px"}
                                />
                                {errors.password && touched.password && (
                                    <Text
                                        fontSize={size.font.text.caption}
                                        fontFamily={fonts.PoppinsMedium}
                                        color={color.RED_ERROR}
                                        pl={"10px"}
                                    >
                                        {errors.password}
                                    </Text>
                                )}
                                <LinearGradient
                                    colors={[color.BLUE_LIGHT, color.BLUE_HEAVY]}
                                    start={[0, 0]}
                                    end={[1, 0]}
                                    style={{ borderRadius: 99 }}
                                >
                                    <Button
                                        isLoading={isSubmitting}
                                        onPress={handleSubmit}
                                        variant={"unstyle"}
                                        startIcon={<Icon as={MaterialIcons} name="login" size="sm" />}
                                        height={"60px"}
                                        width={"315px"}
                                        borderRadius={"99"}
                                        _text={{
                                            fontSize: size.font.text.large,
                                            fontFamily: fonts.PoppinsBold,
                                            color: color.WHITE,
                                        }}
                                        alignSelf="center"
                                        // bg={{
                                        //     linearGradient: {
                                        //         colors: [color.BLUE_LIGHT, color.BLUE_HEAVY],
                                        //         start: [0, 0],
                                        //         end: [1, 0],
                                        //     },
                                        // }}
                                    >
                                        <Text fontFamily={fonts.PoppinsRegular} style={{ color: "white" }}>
                                            Login
                                        </Text>
                                    </Button>
                                </LinearGradient>
                                <HStack alignSelf="center" space="2">
                                    <Text fontFamily={fonts.PoppinsBold} alignSelf="center">
                                        {"Don't have an account yet?"}
                                    </Text>
                                    <GradientText
                                        fontFamily={fonts.PoppinsMedium}
                                        fontSize={size.font.text.medium}
                                        onClick={() => navigation.navigate(Screens.SIGN_IN)}
                                    >
                                        Register
                                    </GradientText>
                                </HStack>
                            </Stack>
                        )}
                    </Formik>
                </Center>
            </ScrollView>
        </Flex>
    );
};

export default Login;
