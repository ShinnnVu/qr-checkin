import format from "date-fns/format";

function formatTime(date: Date) {
    const result = format(date, "HH:mm");
    return result;
}

function getDate() {
    const result = format(new Date(), "eeee, MM/dd/yyyy");
    return result;
}
export { formatTime, getDate };
