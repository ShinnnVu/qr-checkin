import Example from "../components/base/example";
import Header from "../components/base/header";
import WS_CR_INT from "../screens/ws_cr_intro";
import WS_Naming from "../screens/ws_naming";
import WS_Success from "../screens/ws_cr_success";
import WS_Fail from "../screens/ws_cr_fail";
import WS_Com_Info from "../screens/ws_com_info";
import WS_Checkin_Form from "../screens/ws_checkin_form";
import WS_LOCATION from "../screens/ws_location";
import Home from "../screens/home";
import WS_Time from "../screens/ws_time";
import CheckinQRScan from "../screens/checkin/CheckinQRScan";
import CheckinValidation from "../screens/checkin/CheckinValidation";
import CheckoutValidation from "../screens/checkin/CheckoutValidation";
import Login from "../screens/login";
import Signin from "../screens/signin";
export const navigators = {
    home: {
        name: "Home",
        component: Home,
    },
    signin: {
        name: "Signin",
        component: Signin,
    },
    login: {
        name: "Login",
        component: Login,
    },
    ws_cr_intro: {
        name: "WS_CR_INT",
        component: WS_CR_INT,
    },
    ws_cr_success: {
        name: "WS_CR_SUCCESS",
        component: WS_Success,
    },
    ws_cr_fail: {
        name: "WS_CR_FAIL",
        component: WS_Fail,
    },
    ws_naming: {
        name: "WS_Naming",
        component: WS_Naming,
    },
    ws_com_info: {
        name: "WS_COM_INFO",
        component: WS_Com_Info,
    },
    ws_checkin_form: {
        name: "WS_CHECKIN_FORM",
        component: WS_Checkin_Form,
    },
    ws_location: {
        name: "WS_LOCATION",
        component: WS_LOCATION,
    },
    ws_time: {
        name: "WS_TIME",
        component: WS_Time,
    },
    example: {
        name: "Example",
        component: Example,
    },
    header: {
        name: "Header",
        component: Header,
    },
    checkin_qr_scan: {
        name: "CheckinQRScan",
        component: CheckinQRScan,
    },
    checkin_validation: {
        name: "CheckinValidation",
        component: CheckinValidation,
    },
    checkout_validation: {
        name: "CheckoutValidation",
        component: CheckoutValidation,
    },
};
