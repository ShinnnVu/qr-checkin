import React from "react";
import { Button, Center } from "native-base";

const Header = ({ navigation }: { navigation: any }) => {
    return (
        <>
            <Center flex={1} px="3">
                <Button onPress={() => navigation.navigate("Example")}>Go to Example</Button>
            </Center>
        </>
    );
};

export default Header;
