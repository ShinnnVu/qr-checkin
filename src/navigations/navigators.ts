import Example from "../components/base/example";
import Header from "../components/base/header";
import WS_CR_INT from "../screens/ws/ws_cr_intro";
import WS_Naming from "../screens/ws/ws_naming";
import WS_Success from "../screens/ws/ws_cr_success";
import WS_Fail from "../screens/ws/ws_cr_fail";
import WS_Com_Info from "../screens/ws/ws_com_info";
import WS_Checkin_Form from "../screens/ws/ws_checkin_form";
import WS_LOCATION from "../screens/ws/ws_location";
import Home from "../screens/home/home";
import WS_Time from "../screens/ws/ws_time";
import CheckinQRScan from "../screens/checkin/CheckinQRScan";
import CheckinValidation from "../screens/checkin/CheckinValidation";
import CheckoutValidation from "../screens/checkin/CheckoutValidation";
import WS_Home from "../screens/home/ws_home";
import { Screens } from "./model";
export const navigators = {
    home: {
        name: Screens.HOME,
        component: Home,
    },
    ws_cr_intro: {
        name: Screens.WS_CR_INT,
        component: WS_CR_INT,
    },
    ws_cr_success: {
        name: Screens.WS_CR_SUCCESS,
        component: WS_Success,
    },
    ws_cr_fail: {
        name: Screens.WS_CR_FAIL,
        component: WS_Fail,
    },
    ws_naming: {
        name: Screens.WS_NAMING,
        component: WS_Naming,
    },
    ws_com_info: {
        name: Screens.WS_COM_INFO,
        component: WS_Com_Info,
    },
    ws_checkin_form: {
        name: Screens.WS_CHECKIN_FORM,
        component: WS_Checkin_Form,
    },
    ws_location: {
        name: Screens.WS_LOCATION,
        component: WS_LOCATION,
    },
    ws_time: {
        name: Screens.WS_TIME,
        component: WS_Time,
    },
    example: {
        name: Screens.EXAMPLE,
        component: Example,
    },
    header: {
        name: Screens.HEADER,
        component: Header,
    },
    checkin_qr_scan: {
        name: Screens.CHECKINQRSCAN,
        component: CheckinQRScan,
    },
    checkin_validation: {
        name: Screens.CHECKINVALIDATION,
        component: CheckinValidation,
    },
    checkout_validation: {
        name: Screens.CHECKOUTVALIDATION,
        component: CheckoutValidation,
    },
    ws_home: {
        name: Screens.WS_HOME,
        component: WS_Home,
    },
};
