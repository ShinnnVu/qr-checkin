import React, { useEffect } from "react";
import { Pressable, Box, Flex, Text, ScrollView, HStack, Checkbox, FlatList, Center } from "native-base";
import color, { tintColors } from "../../constants/colors";
import translate from "../../localize";
import size from "../../constants/sizes";
import fonts from "../../constants/fonts";
import DateTimePicker from "@react-native-community/datetimepicker";
import { capitalizeFirstLetter, formatTime, sleep } from "../../utils/utils";
import HeaderThree from "../../components/header/headerThree";
import { apiService } from "../../services";
import { Screens } from "../../navigations/model";
import { initial } from "lodash.has/node_modules/@types/lodash";
import { ActivityIndicator } from "react-native";
import Checkbox2 from "@react-native-community/checkbox";
import HeaderTwo from "../../components/header/headerTwo";
import Blue_button from "../../components/base/blue_button";
import Purple_button from "../../components/base/purple_button";
import loadingIndicator from "../../components/base/loading_indicator";
interface Days {
    id: number;
    label: string;
    check: boolean;
    c_in: Date;
    c_out: Date;
}

interface Day_API {
    isActive: boolean;
    from: Date;
    to: Date;
}

interface Days_API {
    monday: Day_API;
    tuesday: Day_API;
    wednesday: Day_API;
    thursday: Day_API;
    friday: Day_API;
    saturday: Day_API;
    sunday: Day_API;
}
interface timePicker {
    show: boolean;
    currentId: number | null;
    check: 0 | 1 | null;
    time: Date;
}

const date_start = new Date(2021, 11, 24, 8, 0);
const date_end = new Date(2021, 11, 24, 17, 0);
const days: Array<Days> = [
    { id: 1, check: true, label: "Monsday", c_in: date_start, c_out: date_end },
    { id: 2, check: false, label: "Tuesday", c_in: date_start, c_out: date_end },
    { id: 3, check: true, label: "Wednesday", c_in: date_start, c_out: date_end },
    { id: 4, check: false, label: "Thursday", c_in: date_start, c_out: date_end },
    { id: 5, check: true, label: "Friday", c_in: date_start, c_out: date_end },
    { id: 6, check: true, label: "Saturday", c_in: date_start, c_out: date_end },
    { id: 7, check: false, label: "Sunday", c_in: date_start, c_out: date_end },
];

const initialTime = new Date();

const time = {
    monday: {
        isActive: false,
        from: "8:00",
        to: "17:00",
    },
    tuesday: {
        isActive: false,
        from: "8:00",
        to: "17:00",
    },
    wednesday: {
        isActive: false,
        from: "8:00",
        to: "17:00",
    },
    thursday: {
        isActive: false,
        from: "8:00",
        to: "17:00",
    },
    friday: {
        isActive: false,
        from: "8:00",
        to: "17:00",
    },
    saturday: {
        isActive: false,
        from: "8:00",
        to: "17:00",
    },
    sunday: {
        isActive: false,
        from: "8:00",
        to: "17:00",
    },
};

const days_API_to_days = (days: Days_API) => {
    return Object.keys(days).map((key, index) => {
        const data: Day_API = days[key];
        return {
            label: capitalizeFirstLetter(key),
            id: index + 1,
            check: data.isActive,
            c_in: data.from,
            c_out: data.to,
        };
    });
};

const days_to_days_API = (days: Array<Days>) => {
    return days.reduce(
        (newDays, item) => (
            (newDays[item.label.toLowerCase()] = { isActive: item.check, from: item.c_in, to: item.c_out }), newDays
        ),
        {},
    );
};

const Item = ({ item, timePickerOn, timePickerOff, checkChange }) => {
    return (
        <HStack w={"100%"} py={"10px"} alignItems={"center"}>
            {/* <Checkbox
                    isChecked={item.check}
                    onChange={(value) => checkChange(value, item.id)}
                    value={item.id}
                    accessibilityLabel={item.label}
                    w={"10%"}
                    _interactionBox={{
                        value: "ws",
                        color: color.WHITE,
                    }}
                /> */}
            <Checkbox2
                value={item.check}
                onValueChange={(value) => checkChange(value, item.id)}
                tintColors={tintColors}
            />
            <Text fontSize={size.font.text.medium} fontFamily={fonts.PoppinsRegular} w="35%" textAlign="center">
                {item.label}
            </Text>
            <Pressable
                onPress={() => {
                    timePickerOn(item, 0);
                }}
                w={"27.5%"}
            >
                <Text fontSize={size.font.text.medium} fontFamily={fonts.PoppinsRegular} textAlign="center">
                    {formatTime(item.c_in)}
                </Text>
            </Pressable>
            <Pressable
                onPress={() => {
                    timePickerOn(item, 1);
                }}
                w={"27.5%"}
            >
                <Text fontSize={size.font.text.medium} fontFamily={fonts.PoppinsRegular} textAlign="center">
                    {formatTime(item.c_out)}
                </Text>
            </Pressable>
        </HStack>
    );
};
const Ws_s_time = ({ route, navigation }: { route: any; navigation: any }) => {
    const [groupValues, setGroupValues] = React.useState<Array<Days>>(days);
    const [all, setAll] = React.useState<boolean>(false);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [timePicker, setTimePicker] = React.useState<timePicker>({
        show: false,
        currentId: null,
        check: null,
        time: initialTime,
    });
    useEffect(() => {
        let isActive = true;
        const getInfo = async () => {
            setLoading(true);
            await sleep(2000);
            // API for getting ws Info here
            const ws_time: Array<Days> = days;
            if (isActive) {
                setGroupValues(ws_time);
                setLoading(false);
            }
        };
        getInfo();
        return () => {
            isActive = false;
        };
    }, []);
    const renderItem = ({ item }) => {
        return <Item item={item} timePickerOn={timePickerOn} timePickerOff={timePickerOff} checkChange={checkChange} />;
    };
    const checkChange = (value, id) => {
        if (id === -1) {
            const newGroupValues = groupValues.map((ob) => ({ ...ob, check: value }));
            setAll(!all);
            setGroupValues(newGroupValues);
        } else {
            const newGroupValues = groupValues;
            const _ = newGroupValues.find((o, i) => {
                if (o.id === id) {
                    newGroupValues[i] = {
                        id: o.id,
                        check: value,
                        label: o.label,
                        c_in: o.c_in,
                        c_out: o.c_out,
                    };
                    return true;
                }
            });
            setGroupValues([...newGroupValues]);
        }
    };
    const timePickerOn = (day, check) => {
        const time = check ? day.c_out : day.c_in;
        setTimePicker({ show: true, currentId: day.id, check: check, time: time });
    };
    const timePickerOff = (value) => {
        setTimePicker({ show: false, currentId: timePicker.currentId, check: timePicker.check, time: timePicker.time });
        if (value.type === "set") {
            const newGroupValues = groupValues;
            const _ = newGroupValues.find((o, i) => {
                if (o.id === timePicker.currentId) {
                    if (timePicker.check === 0) {
                        newGroupValues[i] = {
                            id: o.id,
                            check: o.check,
                            label: o.label,
                            c_in: value.nativeEvent.timestamp,
                            c_out: o.c_out,
                        };
                    } else {
                        newGroupValues[i] = {
                            id: o.id,
                            check: o.check,
                            label: o.label,
                            c_in: o.c_in,
                            c_out: value.nativeEvent.timestamp,
                        };
                    }
                    return true;
                }
            });
            setGroupValues([...newGroupValues]);
        }
        setTimePicker({ show: false, currentId: null, check: null, time: initialTime });
    };
    const handleSubmit = async () => {
        const time = days_to_days_API(groupValues);

        // const data = { ...route?.params, time, id: route?.params.workspace_id };

        // try {
        //     await apiService.configurateWorkspace(data);
        //     navigation.navigate(Screens.WS_HOME, { workspace_id: data.id });
        // } catch (error: any) {
        //     navigation.navigate(Screens.WS_CR_FAIL);
        // }
    };

    return (
        <Flex flex={1} bg={color.WHITE} safeArea>
            <HeaderTwo
                title={"workspace_creation.time"}
                back={() => {
                    navigation.goBack();
                }}
            />
            <Box w={"100%"} alignSelf="center" px={"20px"}>
                <HStack py={"10px"} alignItems={"center"}>
                    <Checkbox2 value={all} onValueChange={(value) => checkChange(value, -1)} tintColors={tintColors} />

                    <Text
                        fontSize={size.font.text.medium}
                        fontFamily={fonts.PoppinsSemiBold}
                        w="35%"
                        textAlign="center"
                    >
                        {translate("workspace_creation.days")}
                    </Text>
                    <Text
                        fontSize={size.font.text.medium}
                        fontFamily={fonts.PoppinsSemiBold}
                        w="27.5%"
                        textAlign="center"
                    >
                        {translate("workspace_creation.c_in")}
                    </Text>
                    <Text
                        fontSize={size.font.text.medium}
                        fontFamily={fonts.PoppinsSemiBold}
                        w="27.5%"
                        textAlign="center"
                    >
                        {translate("workspace_creation.c_out")}
                    </Text>
                </HStack>
                <Box w={"100%"}>
                    {loading ? (
                        <Box h={"100px"} w={"100%"}>
                            {loadingIndicator}
                        </Box>
                    ) : (
                        <FlatList
                            data={groupValues}
                            renderItem={renderItem}
                            keyExtractor={(item) => item.id.toString()}
                        />
                    )}
                </Box>
                <HStack justifyContent={"space-evenly"} paddingTop={"10px"}>
                    <Purple_button
                        onPress={() => console.log("test")}
                        text={translate("workspace_creation.clear")}
                        width={"125px"}
                    />
                    <Blue_button
                        onPress={() => console.log("test")}
                        text={translate("workspace_creation.save")}
                        width={"125px"}
                    />
                </HStack>
            </Box>

            {timePicker.show && (
                <DateTimePicker
                    value={timePicker.time}
                    testID="dateTimePicker"
                    mode={"time"}
                    is24Hour={true}
                    display="default"
                    onChange={(value) => {
                        timePickerOff(value);
                    }}
                />
            )}
        </Flex>
    );
};

export default Ws_s_time;
