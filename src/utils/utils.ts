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
export { formatTime, getDate, capitalizeFirstLetter };
