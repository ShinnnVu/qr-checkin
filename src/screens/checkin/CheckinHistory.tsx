import { Box, Divider, Flex, HStack, Input, Pressable, ScrollView, Text, View, VStack } from "native-base";
import React, { useEffect, useRef, useState } from "react";
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { uniqueId } from "lodash";

const CheckinHistory = ({ route, navigation }: { route: any; navigation: any }) => {
    const _mounted_ = useRef(true);
    const {workspace_id} = route.params;
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const [data, setData] = useState<{ date: Date; checkin: Date; checkout: Date }[]>([]);
    const [history, setHistory] = useState<any>(null);
    const [currentPage, setCurrentPage] = useState(0);
    const pager = React.useRef<PagerView>(null);

    // Cleanup
    useEffect(() => () => { 
        _mounted_.current = false;
    }, [])

    // Fetch data from server
    useEffect(() => {
       getHistories();
    }, []);

    useEffect(() => {
        filter();
    }, [data]);

    const getHistories = async () => {
        try {
            const user = await AsyncStorage.getItem("@User");
            if (user) {
                const id = JSON.parse(user).id;
                const d = await apiService.getHistory({user_id: id, workspace_id: workspace_id, month: date.getMonth() + 1, year: date.getFullYear()});
                const map = d.data.data.map((checkinPoint: any) => ({ date: new Date(checkinPoint.date), checkin: new Date(checkinPoint.checkin), checkout: new Date(checkinPoint.checkout) }));
                if (!_mounted_.current) {
                    return;
                }
                setData(map);
            }
        } catch (error: any) { console.log(error); }
    };

    const filter = () => {
        const pages = chunk(
            data,
            7,
        ).map((page, i) => {
            const p = page.map((h, j) => (
                <Flex key={uniqueId()} direction="row" justify={"center"} my={5}>
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
            return <ScrollView key={i + 1}>{p}</ScrollView>;
        });
        setHistory(pages);
        setCurrentPage(0);
        pager?.current?.setPage(0);
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
        getHistories();
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
