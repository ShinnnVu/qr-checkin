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
    Switch,
    Typeahead,
    FlatList,
    Divider,
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
import { debounce } from "lodash";
import { InteractionManagerStatic } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Screens } from "../../navigations/model";

const initialLocation = {
    title: "Đường Nguyễn Trọng Tuyển",
    highlightedTitle: "Đường <b>Nguyễn</b> <b>Trọng</b> <b>Tuyển</b>",
    vicinity: "Quận Phú Nhuận, Ho Chi Minh City",
    highlightedVicinity: "Quận Phú Nhuận, Ho Chi Minh City",
    position: [10.7981, 106.66983],
    distance: 17184,
    icon: "https://firebasestorage.googleapis.com/v0/b/goaway-00.appspot.com/o/street-square.png?alt=media&token=75f330ce-ebba-4a85-a5f9-3f9fbd0d799f",
};

interface location {
    title: string;
    highlightedTitle: string;
    vicinity: string;
    position: Array<number>;
    distance: number;
    icon: string;
}
const Item = ({ item, onSelect }) => {
    return (
        <Pressable onPress={() => onSelect(item)}>
            <Text
                fontSize={size.font.text.small}
                fontFamily={fonts.PoppinsRegular}
                ellipsizeMode={"tail"}
                numberOfLines={1}
                px={"10px"}
            >
                {item.item.title}
            </Text>
            <Divider my={2} />
        </Pressable>
    );
};

const getLatLng = (position) => {
    const lat = position[0];
    const long = position[1];
    return { latitude: lat, longitude: long };
};
const WS_Location = ({ navigation }: { navigation: any }) => {
    const [location, setLocation] = React.useState<string>(initialLocation.title);
    const [showSuggest, setShowSuggest] = React.useState<boolean>(false);
    const [searchResults, setSearchResults] = React.useState<Array<location>>([]);
    const [radius, setRadius] = React.useState<string>("10");
    const search = React.useRef(null);
    const map = React.useRef(null);
    const onSuggestSelect = (item) => {
        locationChange(item.item.title);
        search?.current?.blur();
    };
    const renderItem = (item) => {
        return <Item item={item} onSelect={onSuggestSelect} />;
    };
    const locationChange = async (location) => {
        setLocation(location);
        debounceSubmit(location);
    };
    const submit = async (location) => {
        const locations = await getLocation(location);
        setSearchResults(locations);
    };

    React.useEffect(() => {
        if (!showSuggest) {
            const location = searchResults.length > 0 ? searchResults[0] : initialLocation;
            const cordinate = getLatLng(location.position);
            map?.current?.animateCamera({ center: cordinate });
        }
    }, [showSuggest]);
    const debounceSubmit = React.useCallback(debounce(submit, 400), []);
    return (
        <Flex flex={1} bg={color.WHITE} safeArea>
            <Box px={"10px"} py={"10px"}>
                <HStack justifyContent="space-between" alignItems="center">
                    <Icon_Button
                        onPress={() => navigation.goBack()}
                        pColor={color.GRAY_BUTTON_CLICK}
                        upColor={color.GRAY_BUTTON}
                        icon={LEFT_CAVRET}
                    />
                    <Text fontSize={size.font.title.H4} fontFamily={fonts.PoppinsBold}>
                        {translate("workspace_creation.location")}
                    </Text>
                    <Icon_Button
                        onPress={() => navigation.navigate(Screens.WS_TIME)}
                        pColor={color.GRAY_BUTTON_CLICK}
                        upColor={color.GRAY_BUTTON}
                        icon={RIGHT_CAVRET}
                    />
                </HStack>
                <VStack space={3} w={"95%"} alignSelf="center" py={"30px"}>
                    <Text fontSize={size.font.text.large} fontFamily={fonts.PoppinsMedium} pl={"10px"}>
                        {translate("workspace_creation.address")}
                    </Text>
                    <VStack>
                        <Input
                            value={location}
                            onFocus={() => setShowSuggest(true)}
                            onBlur={() => setShowSuggest(false)}
                            onChangeText={locationChange}
                            ref={search}
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
                        {showSuggest && (
                            <Box marginTop={"55px"} position={"absolute"} zIndex={1} bg={color.WHITE} w={"100%"}>
                                <FlatList
                                    data={searchResults}
                                    renderItem={renderItem}
                                    keyExtractor={(item) => item.title + item.distance.toString()}
                                    keyboardShouldPersistTaps={"handled"}
                                />
                            </Box>
                        )}
                    </VStack>
                    <Text fontSize={size.font.text.large} fontFamily={fonts.PoppinsMedium} pl={"10px"}>
                        {translate("workspace_creation.radius")}
                    </Text>
                    <Input
                        value={radius}
                        onChangeText={(text) => setRadius(text)}
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
                </VStack>
                <Box w={"90%"} h={"300px"} alignSelf="center">
                    <MapView
                        ref={map}
                        style={{ flex: 1 }}
                        initialRegion={{
                            latitude: initialLocation.position[0],
                            longitude: initialLocation.position[1],
                            latitudeDelta: 0.004,
                            longitudeDelta: 0.005,
                        }}
                    >
                        {!showSuggest && (
                            <>
                                <Marker
                                    title={searchResults.length > 0 ? searchResults[0]?.title : initialLocation.title}
                                    coordinate={
                                        searchResults.length > 0
                                            ? getLatLng(searchResults[0]?.position)
                                            : getLatLng(initialLocation?.position)
                                    }
                                    pinColor={"navy"}
                                />
                                <Circle
                                    center={
                                        searchResults.length > 0
                                            ? getLatLng(searchResults[0]?.position)
                                            : getLatLng(initialLocation?.position)
                                    }
                                    radius={Number(radius)}
                                    strokeWidth={2}
                                    strokeColor="#3399ff"
                                />
                            </>
                        )}
                    </MapView>
                </Box>
            </Box>
        </Flex>
    );
};

export default WS_Location;
