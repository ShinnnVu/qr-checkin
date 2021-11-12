import Example from "../components/base/example";
import Header from "../components/base/header";
import CheckinQRScan from "../screens/checkin/CheckinQRScan";
import CheckinValidation from "../screens/checkin/CheckinValidation";
import CheckinValidationError from "../screens/checkin/CheckinValidationError";
import CheckinValidationSuccess from "../screens/checkin/CheckinValidationSuccess";

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
        name: "CheckinValidationSuccess",
        component: CheckinValidationSuccess,
    },
    {
        name: "CheckinValidationError",
        component: CheckinValidationError,
    },
]


