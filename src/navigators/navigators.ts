import Example from "../components/base/example";
import Header from "../components/base/header";
import CheckinQRScan from "../screens/checkin/CheckinQRScan";
import CheckinValidation from "../screens/checkin/CheckinValidation";
import CheckoutValidation from "../screens/checkin/CheckoutValidation";

export const navigators = [
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
]


