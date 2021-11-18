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
export const navigators = [
    {
        name: "Home",
        component: Home,
    },
    {
        name: "WS_CR_INT",
        component: WS_CR_INT,
    },
    {
        name: "WS_CR_SUCCESS",
        component: WS_Success,
    },
    {
        name: "WS_CR_FAIL",
        component: WS_Fail,
    },
    {
        name: "WS_Naming",
        component: WS_Naming,
    },
    {
        name: "WS_COM_INFO",
        component: WS_Com_Info,
    },
    {
        name: "WS_CHECKIN_FORM",
        component: WS_Checkin_Form,
    },
    {
        name: "WS_LOCATION",
        component: WS_LOCATION,
    },
    {
        name: "WS_TIME",
        component: WS_Time,
    },
    {
        name: "Example",
        component: Example,
    },
    {
        name: "Header",
        component: Header,
    },
    {
        name: "CheckinQRScan",
        component: CheckinQRScan,
    },
    {
        name: "CheckinValidation",
        component: CheckinValidation,
    },
    {
        name: "CheckoutValidation",
        component: CheckoutValidation,
    },
];
