import { AddIcon, Box, Center, Flex, HStack, Icon, Input, Pressable, Text, View, VStack } from "native-base";
import React, { useEffect, useState } from "react";
import { apiService } from "../../services";
import HeaderTwo from "../../components/header/headerTwo";
import PagerView from "react-native-pager-view";
import { LEFT_CAVRET, RIGHT_CAVRET } from "../../constants/icons";
import Icon_Button from "../../components/base/icon_button";
import color from "../../constants/colors";
import { Search } from "react-native-iconly";
import fonts from "../../constants/fonts";
import size from "../../constants/sizes";
import { USER_AVATAR } from "../../constants/images";
import translate from "../../localize";
import { useIsFocused } from "@react-navigation/native";
import { Screens } from "../../navigations/model";

const EmployeeList = ({ route, navigation }: { route: any; navigation: any }) => {
    const { workspace_id } = route.params;
    const [employees, setEmployees] = useState([]);
    const [keyword, setKeyWord] = useState<string>("");
    const [currentPage, setCurrentPage] = useState(0);
    const pager = React.useRef<PagerView>(null);
    const [pages, setPages] = useState<any>(null);
    const isFocused = useIsFocused();

    // Fetch data from server
    useEffect(() => {
        setKeyWord("");
        (async () => {
            await getEmployees();
            filter();
        })();
    }, [isFocused]);

    useEffect(() => {
        filter();
    }, [keyword]);

    const getEmployees = async () => {
        const res: any = await apiService.getEmployees({ workspace_id: workspace_id });
        setEmployees(res.data.data);
    };

    const filter = async () => {
        let searchKey = keyword.toLowerCase().replace(new RegExp(/\s+/g), "");
        const pages = chunk(
            employees.filter(
                (employee: any) =>
                    keyword.length === 0 || employee?.username.toLowerCase().replace(/\s+/g, "").includes(searchKey),
            ),
            4,
        ).map((page, index) => {
            const p = page.map((employee, index) => (
                <Box
                    key={employee.username + "-" + index}
                    bg={color.WHITE}
                    h={"80px"}
                    borderRadius={"16px"}
                    m={1}
                    my={3}
                    shadow={4}
                >
                    <HStack alignItems="center" flex={1} m={"25px"} justifyContent={"space-between"}>
                        <USER_AVATAR style={{ width: "60px", height: "60px" }} />
                        <Flex mr={"auto"}>
                            <Text fontSize={size.font.text.large} fontFamily={fonts.PoppinsMedium} ml={4}>
                                {employee.username}
                            </Text>
                            <Text
                                fontSize={size.font.text.small}
                                fontFamily={fonts.PoppinsRegular}
                                color={"gray.400"}
                                ml={4}
                            >
                                Employee
                            </Text>
                        </Flex>
                    </HStack>
                </Box>
            ));

            return <View key={index + 1}>{p}</View>;
        });
        setPages(pages);
        setCurrentPage(0);
    };

    return (
        <Box flex={1} py={3} safeArea bgColor={"white"}>
            <VStack flex={1}>
                <HeaderTwo title="employees.employees" back={() => navigation.goBack()} />
                <VStack flex={1} mx={8} justifyContent={"center"}>
                    <Input
                        w={{
                            base: "100%",
                        }}
                        InputLeftElement={<Icon ml={2} as={<Search set="light" primaryColor="lightgray" />} />}
                        placeholder="Search by name"
                        variant={"rounded"}
                        my={5}
                        onChangeText={(text) => setKeyWord(text)}
                    />
                    <Box bg={color.DANGER_01} w={"100%"} h={"86px"} my={5} borderRadius={"20px"}>
                        <HStack alignItems="center" flex={1} m={"20px"}>
                            <Pressable
                                onPress={() => {
                                    navigation.navigate(Screens.EMPLOYEE_INVITATION, {
                                        workspace_id: workspace_id,
                                    });
                                }}
                            >
                                <Center
                                    bg={{
                                        linearGradient: {
                                            colors: [color.PURLE_LIGHT, color.PURPLE_HEAVY],
                                            start: [0, 0],
                                            end: [1, 0],
                                        },
                                    }}
                                    w={"60px"}
                                    h={"60px"}
                                    borderRadius={"30px"}
                                >
                                    <AddIcon color={color.WHITE} size={"16px"} />
                                </Center>
                            </Pressable>
                            <Text fontSize={size.font.text.large} fontFamily={fonts.PoppinsMedium} pl={"10px"}>
                                {translate("employees.add_employee")}
                            </Text>
                        </HStack>
                    </Box>

                    <PagerView style={{ flex: 1 }} initialPage={0} scrollEnabled={false} ref={pager}>
                        {pages}
                    </PagerView>
                </VStack>
            </VStack>
            <HStack alignSelf={"center"} alignItems={"center"} mb={5}>
                <Icon_Button
                    onPress={() => {
                        if (currentPage > 0) {
                            setCurrentPage(currentPage - 1);
                            pager?.current?.setPage(currentPage - 1);
                        }
                    }}
                    icon={LEFT_CAVRET}
                    pColor={color.GRAY_BUTTON_CLICK}
                    upColor={color.GRAY_BUTTON}
                />
                <Text mx={5}>{currentPage + 1}</Text>
                <Icon_Button
                    onPress={() => {
                        if (currentPage < pages.length - 1) {
                            setCurrentPage(currentPage + 1);
                            pager?.current?.setPage(currentPage + 1);
                        }
                    }}
                    icon={RIGHT_CAVRET}
                    pColor={color.GRAY_BUTTON_CLICK}
                    upColor={color.GRAY_BUTTON}
                />
            </HStack>
        </Box>
    );
};

const chunk = (array: any[], chunkSize: number): any[][] => {
    let temp = [];
    for (let i = 0; i < array.length; i += chunkSize) {
        const c = array.slice(i, i + chunkSize);
        temp.push(c);
    }
    return temp;
};

export default EmployeeList;
