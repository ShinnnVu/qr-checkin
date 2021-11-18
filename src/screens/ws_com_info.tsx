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
    HStack,
    Input,
    VStack,
} from "native-base";
import color from "../constants/colors";
import { LEFT_CAVRET, RIGHT_CAVRET } from "../constants/icons";
import translate from "../localize";
import size from "../constants/sizes";
import fonts from "../constants/fonts";
import { ILLUSTRATION } from "../constants/images";
import Icon_Button from "../components/base/icon_button";
const Workspace_com_info = ({ navigation }: { navigation: any }) => {
    return (
        <Flex flex={1} bg={color.WHITE} safeArea>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Box px={"10px"} py={"10px"}>
                    <HStack justifyContent="space-between" alignItems="center">
                        <Icon_Button
                            onPress={() => console.log("hello")}
                            pColor={color.GRAY_BUTTON_CLICK}
                            upColor={color.GRAY_BUTTON}
                            icon={LEFT_CAVRET}
                        />
                        <Text fontSize={size.font.title.H4} fontFamily={fonts.PoppinsBold}>
                            {translate("workspace_creation.info")}
                        </Text>
                        <Icon_Button
                            onPress={() => console.log("hello")}
                            pColor={color.GRAY_BUTTON_CLICK}
                            upColor={color.GRAY_BUTTON}
                            icon={RIGHT_CAVRET}
                        />
                    </HStack>
                    <Center py={"40px"}>
                        <Text fontSize={size.font.title.H1} fontFamily={fonts.PoppinsBold}>
                            {translate("workspace_creation.com_info")}
                        </Text>
                        <Text
                            fontSize={size.font.text.medium}
                            fontFamily={fonts.PoppinsRegular}
                            textAlign="center"
                            py={"30px"}
                        >
                            {translate("workspace_creation.com_info_des")}
                        </Text>
                    </Center>
                    <VStack space={3} w={"95%"} alignSelf="center">
                        <>
                            <Text fontSize={size.font.text.large} fontFamily={fonts.PoppinsMedium} pl={"10px"}>
                                {translate("workspace_creation.com_name")}
                            </Text>
                            <Input
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
                        </>
                        <>
                            <Text fontSize={size.font.text.large} fontFamily={fonts.PoppinsMedium} pl={"10px"}>
                                {translate("workspace_creation.com_email")}
                            </Text>
                            <Input
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
                        </>
                        <>
                            <Text fontSize={size.font.text.large} fontFamily={fonts.PoppinsMedium} pl={"10px"}>
                                {translate("workspace_creation.com_address")}
                            </Text>
                            <Input
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
                        </>
                    </VStack>
                </Box>
            </ScrollView>
        </Flex>
    );
};

export default Workspace_com_info;
