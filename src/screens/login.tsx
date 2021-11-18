import React from "react";
import {
    Button,
    Center,
    Pressable,
    Container, Box, View, Flex, Image, Text, ScrollView, Input,
    Stack,
    Link,
    Icon
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import color from "../constants/colors";
import { LEFT_CAVRET } from "../constants/icons";
import translate from "../localize";
import size from "../constants/sizes";
import fonts from "../constants/fonts";
import { ILLUSTRATION } from "../constants/images";
import Icon_Button from "../components/base/icon_button";
import { styles } from "styled-system";

const Login = ({ navigation }: { navigation: any }) => {
    return (
        <Flex flex={1} bg={color.WHITE} safeArea>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Center py={"40px"}>
                    <Box>
                        <Center>
                            <Text fontSize={size.font.title.H4} fontFamily={fonts.PoppinsRegular}>
                                {"Hey there,"}
                            </Text>
                            <Text fontSize={size.font.title.H2} fontFamily={fonts.PoppinsBold}>
                                {"Welcome to Checkin App"}
                            </Text>
                        </Center>
                    </Box>
                    <Stack
                        mt={3}
                        space={3}
                        w={{
                            base: "75%",
                            md: "25%",
                        }}
                        py={"208px"}
                    >
                        <Input
                            placeholder="Phone number"
                            InputLeftElement={
                                <Icon
                                    as={<MaterialIcons name="message" />}
                                    size={5}
                                    ml="2"
                                    color="muted.400"
                                />
                            }
                            borderRadius={"14px"}
                        />
                        <Input
                            placeholder="Input"
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
                                    as={<MaterialIcons name="visibility-off" />}
                                    size={5}
                                    mr="2"
                                    color="muted.400"
                                />
                            }
                            borderRadius={"14px"}
                        />
                    </Stack>
                </Center>
                <Pressable onPress={() => console.log("Press")}>
                    <Center
                        height={"60px"}
                        width={"315px"}
                        borderRadius={"99"}
                        _text={{
                            fontSize: size.font.text.large,
                            fontFamily: fonts.PoppinsBold,
                            color: color.WHITE,
                        }}
                        alignSelf="center"
                        bg={{
                            linearGradient: {
                                colors: [color.BLUE_LIGHT, color.BLUE_HEAVY],
                                start: [0, 0],
                                end: [1, 0],
                            },
                        }}
                    >
                        {"Login"}
                    </Center>
                </Pressable>
                <Text
                    fontFamily={fonts.PoppinsBold}
                    alignSelf="center"
                    isUnderlined={false}
                >
                    {"Don't have an account yet?"}
                    <Link
                        fontFamily={fonts.PoppinsBold}
                        href="#"
                        _text={{
                          color: color.PURLE_LIGHT,
                        }}
                    >
                        {"Register"}
                    </Link>
                </Text>
            </ScrollView>
        </Flex>
    );
};

export default Login;
