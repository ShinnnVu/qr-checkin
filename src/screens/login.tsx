import React from "react";
import {
    Button,
    Center,
    Pressable,
    Container, Box, View, Flex, Image, Text, ScrollView, Input,
    Stack,
    Link,
    Icon,
    HStack,
    VStack
} from "native-base";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import color from "../constants/colors";
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
                <Center py={"60px"}>
                    <Box>
                        <VStack 
                            space={9}
                            alignItems="center"
                            alignSelf="center">
                            <Text fontSize={size.font.title.H4} fontFamily={fonts.PoppinsRegular}>
                                {"Hey there,"}
                            </Text>
                            <Text fontSize={size.font.title.H2} fontFamily={fonts.PoppinsBold}>
                                {"Welcome to Checkin App"}
                            </Text>
                        </VStack>
                    </Box>
                    <Stack
                        mt={3}
                        space={3}
                        w={{
                            base: "75%",
                            md: "25%",
                        }}
                        py={"135px"}
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
                            mb="15px"
                        />
                        <LinearGradient
                            colors={[color.BLUE_LIGHT, color.BLUE_HEAVY]}
                            start={[0, 0]}
                            end={[1, 0]}
                            style={{ borderRadius:99 }}
                        >
                            <Button
                                onPress={() => console.log("Press")}
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
                                <Text
                                    fontFamily={fonts.PoppinsRegular}
                                    style={{color:"white"}}>Login</Text>
                            </Button>
                        </LinearGradient>
                        <HStack alignSelf="center" space="2">
                            <Text
                                fontFamily={fonts.PoppinsBold}
                                alignSelf="center"
                            >
                                {"Don't have an account yet?"}
                            </Text>
                            <Link
                                fontFamily={fonts.PoppinsBold}
                                href="#"
                                _text={{
                                    color: color.PURLE_LIGHT,
                                }}
                                isUnderlined={false}
                            >
                                {"Register"}
                            </Link>
                        </HStack>
                    </Stack>
                </Center>
            </ScrollView>
        </Flex>
    );
};

export default Login;
