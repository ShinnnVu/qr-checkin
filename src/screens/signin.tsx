import React from "react";
import {
    Button,
    Center,
    Pressable,
    Container, Box, View, Flex, Image, Text, ScrollView, Input,
    Stack,
    Link,
    Icon,
    Checkbox,
    VStack,
    HStack,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import color from "../constants/colors";
import translate from "../localize";
import size from "../constants/sizes";
import fonts from "../constants/fonts";
import { ILLUSTRATION } from "../constants/images";
import Icon_Button from "../components/base/icon_button";
import { styles } from "styled-system";

const Signin = ({ navigation }: { navigation: any }) => {
    return (
        <Flex flex={1} bg={color.WHITE} safeArea>
            <ScrollView showsVerticalScrollIndicator={false}>
                <VStack
                    mt="40px"
                    alignContent="center"
                    alignSelf="center"
                    alignItems="center"
                    space="100px"
                >
                    <VStack
                        space={4}
                        alignItems="center"
                        alignSelf="center">
                        <Text fontSize={size.font.title.H4} fontFamily={fonts.PoppinsRegular}>
                            {"Hey there,"}
                        </Text>
                        <Text fontSize={size.font.title.H2} fontFamily={fonts.PoppinsBold}>
                            {"Create an Account"}
                        </Text>
                    </VStack>
                    <VStack
                        mt={3}
                        space={3}
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
                            w={{
                                base: "80%",
                            }}
                        />
                        <Input
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
                                    as={<MaterialIcons name="visibility-off" />}
                                    size={5}
                                    mr="2"
                                    color="muted.400"
                                />
                            }
                            borderRadius={"14px"}
                        />
                        <Input
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
                                    as={<MaterialIcons name="visibility-off" />}
                                    size={5}
                                    mr="2"
                                    color="muted.400"
                                />
                            }
                            borderRadius={"14px"}
                        />
                        <View style={{ flexDirection: 'row' }}>
                            <Box w="10%">
                                <Checkbox
                                    value="all"
                                    onChange={(value) => console.log(value)}
                                    accessibilityLabel="all"
                                />
                            </Box>
                            <HStack>
                                <Text fontSize={"10px"} fontFamily={fonts.PoppinsLight} color={color.GRAY_MEDIUM}>
                                    {"By continuing you accept our Privacy Policy and\nTerm of Use"}
                                </Text>
                            </HStack>
                        </View>
                    </VStack>
                    <VStack space="3">
                        <LinearGradient
                            colors={[color.BLUE_LIGHT, color.BLUE_HEAVY]}
                            start={[0, 0]}
                            end={[1, 0]}
                            style={{ borderRadius: 99 }}
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
                            >
                                <Text
                                    fontFamily={fonts.PoppinsRegular}
                                    style={{ color: "white" }}>Register</Text>
                            </Button>
                        </LinearGradient>
                        <HStack alignSelf="center" space="2">
                            <Text
                                fontFamily={fonts.PoppinsRegular}
                                alignSelf="center"
                            >
                                {"Already have an account?"}
                            </Text>
                            <Link
                                fontFamily={fonts.PoppinsBold}
                                href="#"
                                _text={{
                                    color: color.PURLE_LIGHT,
                                }}
                                isUnderlined={false}
                            >
                                {"Login"}
                            </Link>
                        </HStack>
                    </VStack>
                </VStack>
            </ScrollView>
        </Flex>
    );
};

export default Signin;
