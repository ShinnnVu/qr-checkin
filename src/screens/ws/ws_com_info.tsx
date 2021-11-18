import React, { useState, useEffect } from "react";
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
    HStack,
    Input,
    VStack,
} from "native-base";
import color from "../../constants/colors";
import { LEFT_CAVRET, RIGHT_CAVRET } from "../../constants/icons";
import translate from "../../localize";
import size from "../../constants/sizes";
import fonts from "../../constants/fonts";
import Icon_Button from "../../components/base/icon_button";
import { Screens } from "../../navigations/model";
import * as yup from "yup";
import { Formik } from "formik";

interface Com_info {
    name: string;
    email: string;
    address: string;
}

const wsInfoValidationSchema = yup.object().shape({
    name: yup
        .string()
        .trim()
        .min(8, ({ min }) => translate("error.min_input", { field: "Name", min: min }))
        .max(256, ({ max }) => translate("error.max_input", { field: "Name", max: max }))
        .required(translate("error.required", { field: "Name" })),
    email: yup
        .string()
        .trim()
        .min(8, ({ min }) => translate("error.min_input", { field: "Email", min: min }))
        .max(256, ({ max }) => translate("error.max_input", { field: "Email", max: max }))
        .email(translate("error.invalid", { field: "Email" }))
        .required(translate("error.required", { field: "Email" })),
    address: yup
        .string()
        .trim()
        .min(8, ({ min }) => translate("error.min_input", { field: "Address", min: min }))
        .max(256, ({ max }) => translate("error.max_input", { field: "Address", max: max }))
        .required(translate("error.required", { field: "Address" })),
});

const dummy: Com_info = {
    name: "",
    email: "",
    address: "",
};
const Workspace_com_info = ({ navigation }: { navigation: any }) => {
    const [info, setInfo] = useState<Com_info>(dummy);
    useEffect(() => {
        const getInfo = async () => {
            const newInfo = { name: "A", email: "B", address: "C" };
            setInfo(newInfo);
        };
        getInfo();
    }, []);
    return (
        <Flex flex={1} bg={color.WHITE} safeArea>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Box px={"10px"} py={"10px"}>
                    <HStack justifyContent="space-between" alignItems="center">
                        <Icon_Button
                            onPress={() => navigation.goBack()}
                            pColor={color.GRAY_BUTTON_CLICK}
                            upColor={color.GRAY_BUTTON}
                            icon={LEFT_CAVRET}
                        />
                        <Text fontSize={size.font.title.H4} fontFamily={fonts.PoppinsBold}>
                            {translate("workspace_creation.info")}
                        </Text>
                        <Icon_Button
                            onPress={() => navigation.navigate(Screens.WS_CHECKIN_FORM)}
                            pColor={color.GRAY_BUTTON_CLICK}
                            upColor={color.GRAY_BUTTON}
                            icon={RIGHT_CAVRET}
                        />
                    </HStack>
                    <Center py={"30px"}>
                        <Text fontSize={size.font.title.H1} fontFamily={fonts.PoppinsBold}>
                            {translate("workspace_creation.com_info")}
                        </Text>
                        <Text
                            fontSize={size.font.text.medium}
                            fontFamily={fonts.PoppinsRegular}
                            textAlign="center"
                            paddingTop={"15px"}
                        >
                            {translate("workspace_creation.com_info_des")}
                        </Text>
                    </Center>
                    <Box w={"95%"} alignSelf="center">
                        <Formik
                            enableReinitialize
                            validationSchema={wsInfoValidationSchema}
                            initialValues={info}
                            onSubmit={(values) => console.log(values)}
                        >
                            {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid }) => (
                                <VStack w={"100%"} space={3}>
                                    <>
                                        <Text
                                            fontSize={size.font.text.large}
                                            fontFamily={fonts.PoppinsMedium}
                                            pl={"10px"}
                                        >
                                            {translate("workspace_creation.com_name")}
                                        </Text>
                                        <Input
                                            value={values.name}
                                            onChangeText={handleChange("name")}
                                            onBlur={handleBlur("name")}
                                            placeholder={translate("workspace_creation.enter_com_name")}
                                            placeholderTextColor={color.GRAY_MEDIUM}
                                            // fontFamily={fonts.PoppinsRegular}
                                            // // fontSize={size.font.text.small}
                                            w={{
                                                base: "100%",
                                                md: "25%",
                                            }}
                                            // InputLeftElement={<Image source={HOUSE} alt="No" ml="2" />}
                                            bg={color.GRAY_BUTTON}
                                            borderWidth={"1px"}
                                            borderColor={color.GRAY_MEDIUM}
                                            borderRadius={"14px"}
                                        />
                                        {errors.name && touched.name && (
                                            <Text
                                                fontSize={size.font.text.caption}
                                                fontFamily={fonts.PoppinsMedium}
                                                color={color.RED_ERROR}
                                                pl={"10px"}
                                            >
                                                {errors.name}
                                            </Text>
                                        )}
                                    </>
                                    <>
                                        <Text
                                            fontSize={size.font.text.large}
                                            fontFamily={fonts.PoppinsMedium}
                                            pl={"10px"}
                                        >
                                            {translate("workspace_creation.com_email")}
                                        </Text>
                                        <Input
                                            value={values.email}
                                            onChangeText={handleChange("email")}
                                            onBlur={handleBlur("email")}
                                            placeholder={translate("workspace_creation.enter_com_email")}
                                            placeholderTextColor={color.GRAY_MEDIUM}
                                            // fontFamily={fonts.PoppinsRegular}
                                            // // fontSize={size.font.text.small}
                                            w={{
                                                base: "100%",
                                                md: "25%",
                                            }}
                                            // InputLeftElement={<Image source={HOUSE} alt="No" ml="2" />}
                                            bg={color.GRAY_BUTTON}
                                            borderWidth={"1px"}
                                            borderColor={color.GRAY_MEDIUM}
                                            borderRadius={"14px"}
                                        />
                                        {errors.email && touched.email && (
                                            <Text
                                                fontSize={size.font.text.caption}
                                                fontFamily={fonts.PoppinsMedium}
                                                color={color.RED_ERROR}
                                                pl={"10px"}
                                            >
                                                {errors.email}
                                            </Text>
                                        )}
                                    </>
                                    <>
                                        <Text
                                            fontSize={size.font.text.large}
                                            fontFamily={fonts.PoppinsMedium}
                                            pl={"10px"}
                                        >
                                            {translate("workspace_creation.com_address")}
                                        </Text>
                                        <Input
                                            value={values.address}
                                            onChangeText={handleChange("address")}
                                            onBlur={handleBlur("address")}
                                            placeholder={translate("workspace_creation.enter_com_address")}
                                            placeholderTextColor={color.GRAY_MEDIUM}
                                            // // fontSize={size.font.text.small}
                                            w={{
                                                base: "100%",
                                                md: "25%",
                                            }}
                                            // InputLeftElement={<Image source={HOUSE} alt="No" ml="2" />}
                                            bg={color.GRAY_BUTTON}
                                            borderWidth={"1px"}
                                            borderColor={color.GRAY_MEDIUM}
                                            borderRadius={"14px"}
                                        />
                                        {errors.address && touched.address && (
                                            <Text
                                                fontSize={size.font.text.caption}
                                                fontFamily={fonts.PoppinsMedium}
                                                color={color.RED_ERROR}
                                                pl={"10px"}
                                            >
                                                {errors.address}
                                            </Text>
                                        )}
                                    </>
                                </VStack>
                            )}
                        </Formik>
                    </Box>
                </Box>
            </ScrollView>
        </Flex>
    );
};

export default Workspace_com_info;
