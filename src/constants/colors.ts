import { LinearGradientPoint } from "expo-linear-gradient";

const color = {
    BLACK: "#000",
    DARK: "#1D1617",
    WHITE: "#fff",
    GRAY_LIGHT: "#DDDADA",
    GRAY_MEDIUM: "#ADA4A5",
    GRAY_HEAVY: "#7B6F72",
    GRAY_BUTTON: "#F7F8F8",
    GRAY_BUTTON_CLICK: "#DCE0E0",
    BORDER: "#F7F8F8",
    BLUE_HEAVY: "#92A3FD",
    BLUE_LIGHT: "#9DCEFF",
    DARKEN_LIGHT: "#021475",
    PURLE_LIGHT: "#C58BF2",
    PURPLE_HEAVY: "#EEA4CE",
    BLUE_SHADOW: "#95ADFE4D",
    PURPLE_SHADOW: "#C58BF24D",
    WHITE_SHADOW: "#1D161712",
    TRANSPARENT: "transparent",
    RED_ERROR: "#CC0000",
    DANGER: "#FF0000",
    DANGER_01: "#FF00001A",
    BLUE_P: "#0891b2",
    GRAY_P: "#aaaaaa",
};

interface Gradient {
    BLUE: Array<string>;
    PURPLE: Array<string>;
    START_LINEAR: LinearGradientPoint;
    END_LINEAR: LinearGradientPoint;
}
const gradient: Gradient = {
    BLUE: [color.BLUE_LIGHT, color.BLUE_HEAVY],
    PURPLE: [color.PURLE_LIGHT, color.PURPLE_HEAVY],
    START_LINEAR: [0, 0],
    END_LINEAR: [1, 0],
};

const tintColors = { true: color.BLUE_P, false: color.GRAY_P };
export default color;
export { gradient, tintColors };
