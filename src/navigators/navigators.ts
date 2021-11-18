import Example from "../components/base/example";
import Header from "../components/base/header";
import CheckinQRScan from "../screens/checkin/CheckinQRScan";
import CheckinValidation from "../screens/checkin/CheckinValidation";
import CheckoutValidation from "../screens/checkin/CheckoutValidation";
import EmployeeInvitation from "../screens/invitation/EmployeeInvitation";
import ExcelInvitation from "../screens/invitation/ExcelInvitation";

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
    {
        name: "EmployeeInvitation",
        component: EmployeeInvitation,
    },
    {
        name: "ExcelInvitation",
        component: ExcelInvitation,
    },
]


