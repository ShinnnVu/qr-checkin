import format from "date-fns/format";

function formatTime(date: Date) {
    const result = format(date, "HH:mm");
    return result;
}

export { formatTime };
