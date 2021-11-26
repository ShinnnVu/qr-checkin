import React, { useState } from "react";
import { Button, Center, Pressable, Container, Box, View, Flex, Image, Text, ScrollView, Input } from "native-base";
import color from "../../constants/colors";
import { HOUSE, LEFT_CAVRET } from "../../constants/icons";
import translate from "../../localize";
import size from "../../constants/sizes";
import fonts from "../../constants/fonts";
import Icon_Button from "../../components/base/icon_button";
import Blue_button from "../../components/base/blue_button";
import { Screens } from "../../navigations/model";
import { apiService } from "../../services";
import TextInput from "../../components/base/textinput";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as yup from "yup";
import { Formik } from "formik";
const inputW = {
    base: "100%",
};
const wsNamingSchema = yup.object().shape({
    name: yup
        .string()
        .trim()
        .required(translate("error.required", { field: "Workspace name" }))
        .min(2, ({ min }) => translate("error.min_input", { field: "Workspace name", min: min }))
        .max(256, ({ max }) => translate("error.max_input", { field: "Workspace name", max: max })),
});

const Workspace_naming = ({ navigation }: { navigation: any }) => {
    const nameSubmit = async ({ name, setSubmitting }) => {
        try {
            const user = await AsyncStorage.getItem("@User");
            if (user) {
                const id = JSON.parse(user).id;
                const res = await apiService.createWorkspace({ host: id, name: name });
                setSubmitting(false);
                navigation.navigate(Screens.WS_CR_SUCCESS, { workspace_id: res.data.data });
            }
        } catch (error: any) {
            setSubmitting(false);
            navigation.navigate(Screens.WS_CR_FAIL);
        }
    };
    return (
        <Flex flex={1} bg={color.WHITE} safeArea>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Box px={"10px"} py={"10px"}>
                    <Icon_Button
                        onPress={() => navigation.navigate(Screens.WS_CR_INT)}
                        pColor={color.GRAY_BUTTON_CLICK}
                        upColor={color.GRAY_BUTTON}
                        icon={LEFT_CAVRET}
                    />
                    <Center py={"40px"}>
                        <Text fontSize={size.font.title.H1} fontFamily={fonts.PoppinsBold}>
                            {translate("workspace_creation.name_workspace")}
                        </Text>
                        <Text
                            fontSize={size.font.text.medium}
                            fontFamily={fonts.PoppinsRegular}
                            textAlign="center"
                            py={"30px"}
                        >
                            {translate("workspace_creation.name_ws_des")}
                        </Text>
                    </Center>
                    <Formik
                        validationSchema={wsNamingSchema}
                        initialValues={{
                            name: "",
                        }}
                        onSubmit={(values, { setSubmitting }) => nameSubmit({ ...values, setSubmitting })}
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
                            return (
                                <>
                                    <Box paddingBottom={"60px"} w={"90%"} alignSelf={"center"}>
                                        <TextInput
                                            name={translate("workspace_creation.enter_ws_name")}
                                            value={values.name}
                                            handleChange={handleChange("name")}
                                            handleBlur={handleBlur("name")}
                                            errors={errors.name}
                                            inputW={inputW}
                                            touched={touched.name}
                                        />
                                    </Box>
                                    <Blue_button
                                        onPress={handleSubmit}
                                        text={translate("workspace_creation.create")}
                                        width={"200px"}
                                    />
                                </>
                            );
                        }}
                    </Formik>
                </Box>
            </ScrollView>
        </Flex>
    );
};

export default Workspace_naming;
