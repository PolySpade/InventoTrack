export function getCurrentDate(separator='/'){

    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    return `${month<10?`0${month}`:`${month}`}${separator}${date<10?`0${date}`:`${date}`}${separator}${year}`
}

export function formatTimestamp(timestamp) {
    const date = new Date(timestamp);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based in JavaScript
    const year = date.getFullYear();

    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${month}-${day}-${year}, ${hours}:${minutes}:${seconds}`;
}

// formatTimestampDay
export function formatTimestampDay(timestamp) {
    const date = new Date(timestamp);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based in JavaScript
    const year = date.getFullYear();

    return `${month}-${day}-${year}`;
}

// formatTimestampMonth
export function formatTimestampMonth(timestamp) {
    const date = new Date(timestamp);
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based in JavaScript
    const year = date.getFullYear();

    return `${month}-${year}`;
}

// formatTimestampWeek
export function formatTimestampWeek(timestamp) {
    const date = new Date(timestamp);
    const firstDayOfWeek = new Date(date.setDate(date.getDate() - date.getDay())); // Adjust date to the start of the week (Sunday)
    const day = String(firstDayOfWeek.getDate()).padStart(2, '0');
    const month = String(firstDayOfWeek.getMonth() + 1).padStart(2, '0'); // Months are 0-based in JavaScript
    const year = firstDayOfWeek.getFullYear();

    return `Week of ${month}-${day}-${year}`;
}
 

export const subtractDays = (date, days) => {
    const result = new Date(date);
    result.setDate(result.getDate() - days);
    return result;
}

export const subtractMonths = (date, months) => {
    const result = new Date(date);
    result.setMonth(result.getMonth() - months);
    return result;
}

export const subtractWeeks = (date, weeks) => {
    const result = new Date(date);
    result.setDate(result.getDate() - (weeks * 7));
    return result;
}
