const days = [];
const dayTimeSheets = [];

let month = 5; //(6)

/**
 * @param month {number} The month number, 0 based
 * @param year {number} The year, not zero based, required to account for leap years
 * @return {Date[]} List with date objects for each day of the month
 */
function getDaysInMonth(month, year) {
    let date = new Date(year, month, 1);
    let days = [];
    while (date.getMonth() === month) {
        days.push(new Date(date));
        date.setDate(date.getDate() + 1);
    }
    return days;
}

console.log(getDaysInMonth(month, 2018));
console.log(days);