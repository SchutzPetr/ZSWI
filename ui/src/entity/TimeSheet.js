import BaseEntity from "./BaseEntity";

class TimeSheet extends BaseEntity{

    constructor(month, isNTIS, dayTimeSheets){
        super();
        //map(day, DayTimeSheet)
        //key2 = day number
        this._dayTimeSheets = dayTimeSheets || {};
        this._isNTIS = isNTIS || false;
        this._month = month || 0;
    }

    get dayTimeSheets() {
        return this._dayTimeSheets;
    }

    set dayTimeSheets(value) {
        this._dayTimeSheets = value;
    }

    get isNTIS() {
        return this._isNTIS;
    }

    set isNTIS(value) {
        this._isNTIS = value;
    }

    get month() {
        return this._month;
    }

    set month(value) {
        this._month = value;
    }

    putDayTimeSheet(dayTimeSheet){
        this._dayTimeSheets[dayTimeSheet.day] = dayTimeSheet;
    }

    getDayTimeSheet(day){
        return this._dayTimeSheets[day];
    }

    clone() {
        return Object.assign(new TimeSheet(), this);
    }

    static map(timeSheet){
        return Object.assign(new TimeSheet(), timeSheet);
    }
}

export default TimeSheet;