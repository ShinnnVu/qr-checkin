import format from "date-fns/format";

function formatTime(date: Date) {
    const result = format(date, "HH:mm");
    return result;
}

function getDate() {
    const result = format(new Date(), "eeee, dd/MM/yyyy");
    return result;
}

function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function getNumOfLetters(string: string, num: number) {
    if (num >= string.length) {
        return capitalizeFirstLetter(string);
    }
    if (string === "") {
        return "";
    }
    return capitalizeFirstLetter(string.substr(0, num));
}

function getRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function stringToColour(str: string) {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    var colour = "#";
    for (var i = 0; i < 3; i++) {
        var value = (hash >> (i * 8)) & 0xff;
        colour += ("00" + value.toString(16)).substr(-2);
    }
    return colour;
}

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export { formatTime, getDate, capitalizeFirstLetter, getNumOfLetters, getRandomColor, stringToColour, sleep };
