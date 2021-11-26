import { Box, Divider, Flex, HStack, Input, Pressable, Text, View, VStack } from "native-base";
import React, { useEffect, useState } from "react";
import CheckinSuccessSvg from "../../../assets/checkin/validation-success.svg";
import CheckinFailureSvg from "../../../assets/checkin/validation-failure.svg";
import RoundedButton from "../../components/base/RoundedButton";
import { apiService } from "../../services";
import HeaderTwo from "../../components/header/headerTwo";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Platform } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import PagerView from "react-native-pager-view";
import { LEFT_CAVRET, RIGHT_CAVRET } from "../../constants/icons";
import Icon_Button from "../../components/base/icon_button";
import color from "../../constants/colors";

const CheckinHistory = ({ route, navigation }: { route: any; navigation: any }) => {
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const [data, setData] = useState<{ date: Date; checkin: Date; checkout: Date }[]>([]);
    const [history, setHistory] = useState<any>(null);
    const [currentPage, setCurrentPage] = useState(0);
    const pager = React.useRef<PagerView>(null);

    // Fetch data from server
    useEffect(() => {
        const dummy = [];
        for (let i = 0; i < 19; i++) {
            const d = new Date();
            d.setDate(d.getDate() + i);
            dummy.push({
                date: d,
                checkin: d,
                checkout: d,
            });
        }
        setData(dummy.sort((a, b) => b.date.getTime() - a.date.getTime()));
    }, []);

    const filter = (month: number) => {
        const pages = chunk(
            data.filter((d) => d.date.getMonth() === month),
            7,
        ).map((page, i) => {
            const p = page.map((h, j) => (
                <Flex key={h.date.toDateString() + j} direction="row" justify={"center"} my={5}>
                    <Text flex={1} textAlign={"center"}>
                        {getDateFormat(h.date)}
                    </Text>
                    <Text flex={1} textAlign={"center"}>
                        {h.checkin.toLocaleTimeString()}
                    </Text>
                    <Text flex={1} textAlign={"center"}>
                        {h.checkout.toLocaleTimeString()}
                    </Text>
                </Flex>
            ));
            return <View key={i + 1}>{p}</View>;
        });
        if (pages.length === 0) {
            pages.push(
                <View flex={1} key={1} justifyContent={"center"}>
                    <Text>No Data</Text>
                </View>,
            );
        }
        setHistory(pages);
        setCurrentPage(0);
    };

    const getDateFormat = (date: Date): string => {
        return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
    };

    const getMonthFormat = (date: Date): string => {
        return date.getMonth() + 1 + "/" + date.getFullYear();
    };

    const onChange = (event: any, selectedDate: Date | undefined) => {
        const currentDate = selectedDate || date;
        setShow(false);
        setDate(currentDate);
        filter(currentDate.getMonth());
    };

    const chunk = (array: any[], chunkSize: number): any[][] => {
        let temp = [];
        for (let i = 0; i < array.length; i += chunkSize) {
            const c = array.slice(i, i + chunkSize);
            temp.push(c);
        }
        return temp;
    };

    return (
        <Box flex={1} py={3} safeArea bgColor={"white"}>
            <VStack flex={1}>
                <HeaderTwo title="employees.history" back={() => navigation.navigate("Home")} />
                <Flex direction="row" alignItems={"center"} px={5} my={5}>
                    <Text flex={3}>Select month: </Text>
                    <Pressable onPress={() => setShow(true)} flex={6}>
                        <Input
                            variant={"rounded"}
                            value={getMonthFormat(date)}
                            isReadOnly={true}
                            alignItems={"center"}
                        />
                    </Pressable>
                    <Box flex={1} ml={3}>
                        <AntDesign name="calendar" size={24} color="black" onPress={() => setShow(true)} />
                    </Box>
                </Flex>
                {show && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode={"date"}
                        is24Hour={true}
                        display="default"
                        onChange={onChange}
                        maximumDate={new Date()}
                        dateFormat={"day month year"}
                    />
                )}
                <Flex direction="row" justify={"center"} my={5}>
                    <Text flex={1} textAlign={"center"} bold={true}>
                        Date
                    </Text>
                    <Text flex={1} textAlign={"center"} bold={true}>
                        Checkin
                    </Text>
                    <Text flex={1} textAlign={"center"} bold={true}>
                        Checkout
                    </Text>
                </Flex>
                <Divider />
                <PagerView style={{ flex: 1 }} initialPage={0} scrollEnabled={false} ref={pager}>
                    {history}
                </PagerView>
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
                        if (currentPage < history.length - 1) {
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

export default CheckinHistory;
