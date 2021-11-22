import React from "react";
import {
    Button,
    Center,
    Pressable,
    Container,
    Box,
    View,
    Flex,
    Image,
    Text,
    ScrollView,
    Input,
    Stack,
    Link,
    Icon,
    Checkbox,
    VStack,
    HStack,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import color from "../../constants/colors";
import translate from "../../localize";
import size from "../../constants/sizes";
import fonts from "../../constants/fonts";
import { ILLUSTRATION } from "../../constants/images";
import Icon_Button from "../../components/base/icon_button";
import { styles } from "styled-system";
import GradientText from "../../components/base/purple_text";
import { Screens } from "../../navigations/model";
import * as yup from "yup";
import { Formik, Form, FastField } from "formik";

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

const Signin = ({ navigation }: { navigation: any }) => {
    const signUp = async ({ username, password }: { username: string; password: string }) => {
        console.log(username, password);
    };
    return (
        <Flex flex={1} bg={color.WHITE} safeArea>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Formik
                    validationSchema={wsSigninSchema}
                    initialValues={{
                        username: "",
                        password: "",
                        confirmPassword: "",
                        policy: false,
                        type: { pw: "password", cpw: "password" },
                    }}
                    onSubmit={(values) => signUp(values)}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid, setFieldValue }) => {
                        console.log("a");
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
                                    <Input
                                        value={values.username}
                                        onChangeText={handleChange("username")}
                                        onBlur={handleBlur("username")}
                                        placeholder="Username"
                                        InputLeftElement={
                                            <Icon
                                                as={<MaterialIcons name="message" />}
                                                size={5}
                                                ml="2"
                                                color="muted.400"
                                            />
                                        }
                                        borderRadius={"14px"}
                                        w={{
                                            base: "80%",
                                        }}
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
                                        type={values.type.pw}
                                        value={values.password}
                                        onChangeText={handleChange("password")}
                                        onBlur={handleBlur("password")}
                                        placeholder="Password"
                                        InputLeftElement={
                                            <Icon
                                                as={<MaterialIcons name="lock" />}
                                                size={5}
                                                ml="2"
                                                color="muted.400"
                                            />
                                        }
                                        InputRightElement={
                                            <Icon
                                                as={
                                                    values.type.pw === "password" ? (
                                                        <MaterialIcons name="visibility-off" />
                                                    ) : (
                                                        <MaterialIcons name="visibility" />
                                                    )
                                                }
                                                size={5}
                                                mr="2"
                                                color="muted.400"
                                                onPress={() =>
                                                    setFieldValue(
                                                        "type",
                                                        values.type.pw === "password"
                                                            ? { ...values.type, pw: "none" }
                                                            : { ...values.type, pw: "password" },
                                                    )
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
                                    <Input
                                        type={values.type.cpw}
                                        value={values.confirmPassword}
                                        onChangeText={handleChange("confirmPassword")}
                                        onBlur={handleBlur("confirmPassword")}
                                        placeholder="Confirm Password"
                                        InputLeftElement={
                                            <Icon
                                                as={<MaterialIcons name="lock" />}
                                                size={5}
                                                ml="2"
                                                color="muted.400"
                                            />
                                        }
                                        InputRightElement={
                                            <Icon
                                                as={
                                                    values.type.cpw === "password" ? (
                                                        <MaterialIcons name="visibility-off" />
                                                    ) : (
                                                        <MaterialIcons name="visibility" />
                                                    )
                                                }
                                                size={5}
                                                mr="2"
                                                color="muted.400"
                                                onPress={() =>
                                                    setFieldValue(
                                                        "type",
                                                        values.type.cpw === "password"
                                                            ? { ...values.type, cpw: "none" }
                                                            : { ...values.type, cpw: "password" },
                                                    )
                                                }
                                            />
                                        }
                                        borderRadius={"14px"}
                                    />
                                    {errors.confirmPassword && touched.confirmPassword && (
                                        <Text
                                            fontSize={size.font.text.caption}
                                            fontFamily={fonts.PoppinsMedium}
                                            color={color.RED_ERROR}
                                            pl={"10px"}
                                        >
                                            {errors.confirmPassword}
                                        </Text>
                                    )}
                                    <View style={{ flexDirection: "row" }}>
                                        <Box w="10%">
                                            <Checkbox
                                                value="all"
                                                onChange={(value) => setFieldValue("policy", value)}
                                                accessibilityLabel="all"
                                            />
                                        </Box>
                                        <HStack>
                                            <Text
                                                fontSize={"10px"}
                                                fontFamily={fonts.PoppinsLight}
                                                color={color.GRAY_MEDIUM}
                                            >
                                                {"By continuing you accept our Privacy Policy and\nTerm of Use"}
                                            </Text>
                                        </HStack>
                                    </View>
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
                                        colors={[color.BLUE_LIGHT, color.BLUE_HEAVY]}
                                        start={[0, 0]}
                                        end={[1, 0]}
                                        style={{ borderRadius: 99 }}
                                    >
                                        <Button
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
                                        >
                                            <Text fontFamily={fonts.PoppinsRegular} style={{ color: "white" }}>
                                                Register
                                            </Text>
                                        </Button>
                                    </LinearGradient>
                                    <HStack alignSelf="center" space="2">
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
                                </VStack>
                            </VStack>
                        );
                    }}
                </Formik>
            </ScrollView>
        </Flex>
    );
};

export default Signin;
