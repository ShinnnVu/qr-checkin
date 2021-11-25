import React, { useState, useEffect, useCallback, useRef } from "react";
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
    HStack,
    Input,
    VStack,
    Switch,
    Typeahead,
    FlatList,
    Divider,
    ScrollView,
} from "native-base";
import color from "../../constants/colors";
import { LEFT_CAVRET, RIGHT_CAVRET } from "../../constants/icons";
import translate from "../../localize";
import size from "../../constants/sizes";
import fonts from "../../constants/fonts";
import { ILLUSTRATION, LOCATION, QR_CODE } from "../../constants/images";
import Icon_Button from "../../components/base/icon_button";
import getLocation from "../../services/getLocation";
import MapView, { Marker, Circle } from "react-native-maps";

import { Screens } from "../../navigations/model";
import * as yup from "yup";
import { Formik } from "formik";
import HeaderThree from "../../components/header/headerThree";
import HeaderTwo from "../../components/header/headerTwo";
import Blue_button from "../../components/base/blue_button";
interface location {
    name: string;
    latitude: number;
    longitude: number;
    radius: number;
}
interface location_api {
    title: string;
    highlightedTitle: string;
    vicinity: string;
    position: Array<number>;
    distance: number;
    icon: string;
}
const wsLocationSchema = yup.object().shape({
    location: yup
        .string()
        .trim()
        .min(1, ({ min }) => translate("error.min_input", { field: "Address", min: min }))
        .max(256, ({ max }) => translate("error.max_input", { field: "Address", max: max }))
        .required(translate("error.required", { field: "Address" })),
    radius: yup
        .number()
        .min(1, ({ min }) => translate("error.min_num", { field: "Radius", min: min - 1, unit: "m" }))
        .max(10000, ({ max }) => translate("error.max_num", { field: "Radius", max: max, unit: "m" }))
        .required(translate("error.required", { field: "Radius" })),
});

const dummyLocation: location = {
    name: "Nguyễn Trọng Tuyễn",
    latitude: 10.7981,
    longitude: 106.66983,
    radius: 10,
};

const Item = ({ item, onSelect }) => {
    return (
        <Pressable onPress={onSelect}>
            <Text
                fontSize={size.font.text.small}
                fontFamily={fonts.PoppinsRegular}
                ellipsizeMode={"tail"}
                numberOfLines={1}
                px={"10px"}
            >
                {item.title}
            </Text>
            <Divider my={2} />
        </Pressable>
    );
};
const Ws_s_Location = ({ route, navigation }: { route: any; navigation: any }) => {
    const [result, setResult] = useState(dummyLocation);
    const map = useRef(null);
    useEffect(() => {
        const camera: any = { center: { latitude: result.latitude, longitude: result.longitude } };
        map?.current?.animateCamera(camera);
    }, [result]);
    const handleSubmit = () => {
        const data = { ...route.params, location: result };
        navigation.navigate(Screens.WS_TIME, data);
    };
    return (
        <Flex flex={1} bg={color.WHITE} safeArea>
            <Box px={"10px"}>
                <HeaderTwo title={"workspace_creation.location"} back={() => navigation.goBack()} />
            </Box>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps={"handled"}>
                <Box px={"10px"}>
                    <Formik
                        enableReinitialize
                        validationSchema={wsLocationSchema}
                        initialValues={{ location: result.name, radius: result.radius }}
                        onSubmit={() => {}}
                    >
                        {({
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            values,
                            errors,
                            touched,
                            isValid,
                            setFieldValue,
                            setFieldTouched,
                            setFieldError,
                        }) => {
                            const [searchResults, setSearchResults] = useState<Array<location_api>>([]);
                            const [showSearches, setShowSearches] = useState<boolean>(false);
                            const searchRef = useRef(null);
                            const searchBlur = () => {
                                setFieldTouched("location");
                                setShowSearches(false);
                                searchRef?.current?.blur();
                            };
                            const searchChange = (search: string) => {
                                setFieldValue("location", search);
                                getSearch(search);
                            };
                            const getSearch = async (search: string) => {
                                const locations = await getLocation(search);
                                setSearchResults(locations);
                            };
                            const resultLocationSubmit = (location?: location_api) => {
                                if (location) {
                                    const newLocation: location = {
                                        name: location.title,
                                        latitude: location.position[0],
                                        longitude: location.position[1],
                                        radius: result.radius,
                                    };
                                    setResult(newLocation);
                                    searchBlur();
                                    getSearch(location.title);
                                } else {
                                    if (searchResults.length > 0) {
                                        const chosenLocation = searchResults[0];
                                        const newLocation: location = {
                                            name: chosenLocation.title,
                                            latitude: chosenLocation.position[0],
                                            longitude: chosenLocation.position[1],
                                            radius: result.radius,
                                        };
                                        setResult(newLocation);
                                    }
                                }
                            };
                            const resultRadiusSubmit = () => {
                                if (!errors.radius) {
                                    const newLocation: location = { ...result, radius: parseInt(values.radius, 10) };
                                    setResult(newLocation);
                                }
                            };
                            const renderItem = ({ item }) => {
                                return <Item item={item} onSelect={() => resultLocationSubmit(item)} />;
                            };
                            return (
                                <VStack space={3} w={"95%"} alignSelf="center" py={"10px"}>
                                    <Text fontSize={size.font.text.large} fontFamily={fonts.PoppinsMedium} pl={"10px"}>
                                        {translate("workspace_creation.address")}
                                    </Text>
                                    <VStack>
                                        <Input
                                            value={values.location}
                                            onChangeText={searchChange}
                                            onFocus={() => setShowSearches(true)}
                                            onSubmitEditing={() => resultLocationSubmit()}
                                            onBlur={searchBlur}
                                            ref={searchRef}
                                            placeholder={translate("workspace_creation.enter_add")}
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

                                        {showSearches && searchResults.length > 0 && (
                                            <Box
                                                marginTop={"55px"}
                                                position={"absolute"}
                                                zIndex={1}
                                                bg={color.WHITE}
                                                w={"100%"}
                                            >
                                                <FlatList
                                                    data={searchResults}
                                                    renderItem={renderItem}
                                                    keyExtractor={(item) => item.title + item.distance.toString()}
                                                    keyboardShouldPersistTaps={"handled"}
                                                    nestedScrollEnabled
                                                />
                                            </Box>
                                        )}
                                        {errors.location && touched.location && (
                                            <Text
                                                fontSize={size.font.text.caption}
                                                fontFamily={fonts.PoppinsMedium}
                                                color={color.RED_ERROR}
                                                pl={"10px"}
                                            >
                                                {errors.location}
                                            </Text>
                                        )}
                                    </VStack>
                                    <Text fontSize={size.font.text.large} fontFamily={fonts.PoppinsMedium} pl={"10px"}>
                                        {translate("workspace_creation.radius")}
                                    </Text>
                                    <Input
                                        value={values.radius.toString()}
                                        onChangeText={handleChange("radius")}
                                        onBlur={handleBlur("radius")}
                                        onSubmitEditing={resultRadiusSubmit}
                                        placeholder={translate("workspace_creation.enter_radius")}
                                        placeholderTextColor={color.GRAY_MEDIUM}
                                        type="number"
                                        // fontFamily={fonts.PoppinsRegular}
                                        // // fontSize={size.font.text.small}
                                        w={{
                                            base: "100%",
                                            md: "25%",
                                        }}
                                        keyboardType={"numeric"}
                                        // InputLeftElement={<Image source={HOUSE} alt="No" ml="2" />}
                                        bg={color.GRAY_BUTTON}
                                        borderWidth={"1px"}
                                        borderColor={color.GRAY_MEDIUM}
                                        borderRadius={"14px"}
                                    />
                                    {errors.radius && touched.radius && (
                                        <Text
                                            fontSize={size.font.text.caption}
                                            fontFamily={fonts.PoppinsMedium}
                                            color={color.RED_ERROR}
                                            pl={"10px"}
                                        >
                                            {errors.radius}
                                        </Text>
                                    )}
                                </VStack>
                            );
                        }}
                    </Formik>
                    <Box w={"90%"} h={"250px"} alignSelf="center" marginBottom={"15px"}>
                        <MapView
                            ref={map}
                            style={{ flex: 1 }}
                            initialRegion={{
                                latitude: result.latitude,
                                longitude: result.longitude,
                                latitudeDelta: 0.004,
                                longitudeDelta: 0.005,
                            }}
                        >
                            <Marker
                                title={result.name}
                                coordinate={{ latitude: result.latitude, longitude: result.longitude }}
                                pinColor={"navy"}
                            />
                            <Circle
                                center={{ latitude: result.latitude, longitude: result.longitude }}
                                radius={result.radius}
                                strokeWidth={2}
                                strokeColor="#3399ff"
                            />
                        </MapView>
                    </Box>
                    <Blue_button
                        onPress={() => handleSubmit()}
                        text={translate("workspace_creation.save")}
                        width={"200px"}
                    />
                </Box>
            </ScrollView>
        </Flex>
    );
};

export default Ws_s_Location;
