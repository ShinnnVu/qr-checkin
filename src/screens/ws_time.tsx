import React from "react";
import { Pressable, Box, Flex, Text, ScrollView, HStack, Checkbox } from "native-base";
import color from "../constants/colors";
import translate from "../localize";
import size from "../constants/sizes";
import fonts from "../constants/fonts";
import DateTimePicker from "@react-native-community/datetimepicker";
import { formatTime } from "../utils/utils";
import { cloneDeep } from "lodash";
import HeaderThree from "../components/header/headerThree";

interface Days {
    id: number;
    label: string;
    check: boolean;
    c_in: Date;
    c_out: Date;
}
const date = new Date();
const days: Array<Days> = [
    { id: 1, check: true, label: "Monsday", c_in: date, c_out: date },
    { id: 2, check: false, label: "Tuesday", c_in: date, c_out: date },
    { id: 3, check: true, label: "Wednesday", c_in: date, c_out: date },
    { id: 4, check: false, label: "Thursday", c_in: date, c_out: date },
    { id: 5, check: true, label: "Friday", c_in: date, c_out: date },
    { id: 6, check: true, label: "Saturday", c_in: date, c_out: date },
    { id: 7, check: false, label: "Sunday", c_in: date, c_out: date },
];
interface timePicker {
    show: boolean;
    currentId: number | null;
    check: 0 | 1 | null;
}
const WS_Time = ({ navigation }: { navigation: any }) => {
    const [groupValues, setGroupValues] = React.useState<Array<Days>>(days);
    const [timePicker, setTimePicker] = React.useState<timePicker>({ show: false, currentId: null, check: null });
    const checkChange = (value, id) => {
        if (id === -1) {
            const newGroupValues = groupValues.map((ob) => ({ ...ob, check: value }));
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
        setTimePicker({ show: true, currentId: day.id, check: check });
    };
    const timePickerOff = (value) => {
        setTimePicker({ show: false, currentId: timePicker.currentId, check: timePicker.check });
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
        setTimePicker({ show: false, currentId: null, check: null });
    };

    return (
        <Flex flex={1} bg={color.WHITE} safeArea>
            <HeaderThree
                title={"workspace_creation.time"}
                back={() => {
                    navigation.navigate("WS_CHECKIN_FORM");
                }}
                to={() => {
                    console.log("Configurate Workspace");
                }}
            />
            <ScrollView showsVerticalScrollIndicator={false}>
                <Box w={"90%"} alignSelf="center">
                    <HStack w={"100%"} py={"10px"}>
                        <Box w="10%">
                            <Checkbox
                                value="all"
                                onChange={(value) => checkChange(value, -1)}
                                accessibilityLabel="all"
                            />
                        </Box>
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
                    {groupValues.map((day) => {
                        return (
                            <HStack w={"100%"} py={"10px"} key={day.id}>
                                <Box w="10%">
                                    <Checkbox
                                        isChecked={day.check}
                                        onChange={(value) => checkChange(value, day.id)}
                                        value={day.id}
                                        accessibilityLabel={day.label}
                                    />
                                </Box>
                                <Text
                                    fontSize={size.font.text.medium}
                                    fontFamily={fonts.PoppinsRegular}
                                    w="35%"
                                    textAlign="center"
                                >
                                    {day.label}
                                </Text>
                                <Pressable
                                    onPress={() => {
                                        timePickerOn(day, 0);
                                    }}
                                    w={"27.5%"}
                                >
                                    <Text
                                        fontSize={size.font.text.medium}
                                        fontFamily={fonts.PoppinsRegular}
                                        textAlign="center"
                                    >
                                        {formatTime(day.c_in)}
                                    </Text>
                                </Pressable>
                                <Pressable
                                    onPress={() => {
                                        timePickerOn(day, 1);
                                    }}
                                    w={"27.5%"}
                                >
                                    <Text
                                        fontSize={size.font.text.medium}
                                        fontFamily={fonts.PoppinsRegular}
                                        textAlign="center"
                                    >
                                        {formatTime(day.c_out)}
                                    </Text>
                                </Pressable>
                            </HStack>
                        );
                    })}
                </Box>
            </ScrollView>
            {timePicker.show && (
                <DateTimePicker
                    value={new Date()}
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

export default WS_Time;
