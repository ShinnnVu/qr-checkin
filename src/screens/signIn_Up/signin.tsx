import React, { useCallback } from "react";
import { Button, Box, Flex, Text, ScrollView, Icon, Checkbox, VStack, HStack } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import color, { gradient } from "../../constants/colors";
import translate from "../../localize";
import size from "../../constants/sizes";
import fonts from "../../constants/fonts";
import GradientText from "../../components/base/purple_text";
import { Screens } from "../../navigations/model";
import * as yup from "yup";
import { Formik } from "formik";
import { StyleSheet } from "react-native";
import TextInput from "../../components/base/textinput";
import { memoize } from "lodash";
import { apiService } from "../../services";
const wsSigninSchema = yup.object().shape({
    username: yup
        .string()
        .trim()
        .required(translate("error.required", { field: "Username" }))
        .min(8, ({ min }) => translate("error.min_input", { field: "Username", min: min }))
        .max(256, ({ max }) => translate("error.max_input", { field: "Username", max: max })),
    password: yup
        .string()
        .trim()
        .required(translate("error.required", { field: "Password" }))
        .min(8, ({ min }) => translate("error.min_input", { field: "Password", min: min }))
        .max(256, ({ max }) => translate("error.max_input", { field: "Password", max: max })),
    confirmPassword: yup
        .string()
        .trim()
        .required(translate("error.required", { field: "Confirm Password" }))
        .min(8, ({ min }) => translate("error.min_input", { field: "Confirm Password", min: min }))
        .max(256, ({ max }) => translate("error.max_input", { field: "Confirm Password", max: max }))
        .oneOf([yup.ref("password")], translate("error.pass_unmatch", { field: "Password" })),
    policy: yup.boolean().oneOf([true], translate("error.uncheck")),
});

const startIcon = <Icon as={MaterialIcons} name="login" size="sm" />;
const userNameIcon = <Icon as={<MaterialIcons name="message" />} size={5} ml="2" color="muted.400" />;
const passwordIcon = <Icon as={<MaterialIcons name="lock" />} size={5} ml="2" color="muted.400" />;
const passwordRightIcon = (type: string) =>
    type === "password" ? <MaterialIcons name="visibility-off" /> : <MaterialIcons name="visibility" />;
const inputW = {
    base: "80%",
};
const buttonText = {
    fontSize: size.font.text.large,
    fontFamily: fonts.PoppinsBold,
    color: color.WHITE,
};
const hitSlop = {
    top: 10,
    bottom: 10,
    left: 10,
    right: 10,
};
function Signin({ navigation }: { navigation: any }) {
    const signUp = async ({
        username,
        password,
        setSubmitting,
    }: {
        username: string;
        password: string;
        setSubmitting: any;
    }) => {
        await apiService.register({
            username: username,
            password: password,
        });
        setSubmitting(false);
        navigation.navigate(Screens.LOG_IN);
    };
    return (
        <Flex flex={1} bg={color.WHITE} safeArea>
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
                <Formik
                    validationSchema={wsSigninSchema}
                    initialValues={{
                        username: "",
                        password: "",
                        confirmPassword: "",
                        policy: false,
                        type: { pw: "password", cpw: "password" },
                    }}
                    onSubmit={(values, { setSubmitting }) => signUp({ ...values, setSubmitting })}
                >
                    {({
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        values,
                        errors,
                        touched,
                        isValid,
                        setFieldValue,
                        isSubmitting,
                    }) => {
                        const check = (value: boolean) => {
                            setFieldValue("policy", value);
                        };

                        const rightIconPassword = useCallback(
                            memoize((value: string) => {
                                const change = value === "password" ? "none" : "password";
                                return (
                                    <Icon
                                        as={passwordRightIcon(value)}
                                        size={5}
                                        mr="2"
                                        color="muted.400"
                                        onPress={() => {
                                            setFieldValue("type", { ...values.type, pw: change });
                                        }}
                                        hitSlop={hitSlop}
                                    />
                                );
                            }),
                            [values.type],
                        );
                        const rightIconCP = useCallback(
                            memoize((value: string) => {
                                const change = value === "password" ? "none" : "password";
                                return (
                                    <Icon
                                        as={passwordRightIcon(value)}
                                        size={5}
                                        mr="2"
                                        color="muted.400"
                                        onPress={() => {
                                            setFieldValue("type", { ...values.type, cpw: change });
                                        }}
                                        hitSlop={hitSlop}
                                    />
                                );
                            }),
                            [values.type],
                        );

                        return (
                            <VStack mt="40px" alignContent="center" alignSelf="center" alignItems="center">
                                <VStack space={4} alignItems="center" alignSelf="center">
                                    <Text fontSize={size.font.title.H4} fontFamily={fonts.PoppinsRegular}>
                                        {"Hey there,"}
                                    </Text>
                                    <Text fontSize={size.font.title.H2} fontFamily={fonts.PoppinsBold}>
                                        {"Create an Account"}
                                    </Text>
                                </VStack>
                                <VStack my={"45px"} space={3}>
                                    <TextInput
                                        name={"Username"}
                                        value={values.username}
                                        handleChange={handleChange("username")}
                                        handleBlur={handleBlur("username")}
                                        leftIcon={userNameIcon}
                                        inputW={inputW}
                                        errors={errors.username}
                                        touched={touched.username}
                                    />

                                    <TextInput
                                        type={values.type.pw}
                                        name={"Password"}
                                        value={values.password}
                                        handleChange={handleChange("password")}
                                        handleBlur={handleBlur("password")}
                                        leftIcon={passwordIcon}
                                        rightIcon={rightIconPassword(values.type.pw)}
                                        inputW={inputW}
                                        errors={errors.password}
                                        touched={touched.password}
                                    />

                                    <TextInput
                                        type={values.type.cpw}
                                        name={"Confirm Password"}
                                        value={values.confirmPassword}
                                        handleChange={handleChange("confirmPassword")}
                                        handleBlur={handleBlur("confirmPassword")}
                                        leftIcon={passwordIcon}
                                        rightIcon={rightIconCP(values.type.cpw)}
                                        inputW={inputW}
                                        errors={errors.confirmPassword}
                                        touched={touched.confirmPassword}
                                    />
                                    <HStack>
                                        <Box w="10%">
                                            <Checkbox value="all" onChange={check} accessibilityLabel="all" />
                                        </Box>
                                        <HStack>
                                            <Text
                                                fontSize={"10px"}
                                                fontFamily={fonts.PoppinsLight}
                                                color={color.GRAY_MEDIUM}
                                            >
                                                {translate("sign.term")}
                                            </Text>
                                        </HStack>
                                    </HStack>
                                    {errors.policy && touched.policy && (
                                        <Text
                                            fontSize={size.font.text.caption}
                                            fontFamily={fonts.PoppinsMedium}
                                            color={color.RED_ERROR}
                                            pl={"10px"}
                                        >
                                            {errors.policy}
                                        </Text>
                                    )}
                                </VStack>
                                <VStack space="15px">
                                    <LinearGradient
                                        colors={gradient.BLUE}
                                        start={gradient.START_LINEAR}
                                        end={gradient.END_LINEAR}
                                        style={styles.button}
                                    >
                                        <Button
                                            isLoading={isSubmitting}
                                            onPress={handleSubmit}
                                            variant={"unstyle"}
                                            startIcon={startIcon}
                                            height={"60px"}
                                            width={"315px"}
                                            borderRadius={"99"}
                                            _text={buttonText}
                                            alignSelf="center"
                                        >
                                            <Text fontFamily={fonts.PoppinsRegular} color={color.WHITE}>
                                                Register
                                            </Text>
                                        </Button>
                                    </LinearGradient>
                                </VStack>
                            </VStack>
                        );
                    }}
                </Formik>
                <HStack alignSelf="center" space="2" pt={"10px"}>
                    <Text fontFamily={fonts.PoppinsBold} alignSelf="center">
                        {"Already have an account?"}
                    </Text>
                    <GradientText
                        fontFamily={fonts.PoppinsMedium}
                        fontSize={size.font.text.medium}
                        onClick={() => navigation.navigate(Screens.LOG_IN)}
                    >
                        {"Login"}
                    </GradientText>
                </HStack>
            </ScrollView>
        </Flex>
    );
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 99,
    },
});
export default Signin;
