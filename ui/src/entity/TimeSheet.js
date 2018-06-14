import BaseEntity from "./BaseEntity";
import moment from "moment/moment";
import DayTimeSheet from "./DayTimeSheet";
import Utils from "../other/Utils";

class TimeSheet extends BaseEntity{

    constructor(month, isNTIS, dayTimeSheets){
        super();
        /**
         *
         * @type {DayTimeSheet[]}
         * @private
         */
        this._dayTimeSheets = dayTimeSheets || {};
        this._isNTIS = isNTIS || false;
        this._month = month || 0;
        this._year = 0;
    }

    /**
     * @returns {DayTimeSheet[]}
     */
    get dayTimeSheets() {
        return this._dayTimeSheets;
    }

    /**
     * @param value {DayTimeSheet[]}
     */
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

    get year() {
        return this._year;
    }

    set year(value) {
        this._year = value;
    }

    /**
     *
     * @param timeSheetDTO {*}
     * @returns {TimeSheet|TimeSheet[]}
     */
    static map(timeSheetDTO) {
        if (timeSheetDTO instanceof Array) {
            return timeSheetDTO.map(value => this.map(value)) || [];
        }

        let timeSheet = new TimeSheet();
        timeSheet.month = timeSheetDTO.month -= 1;
        timeSheet.year = timeSheetDTO.year;

        let dayTimeSheets = [];

        Object.keys(timeSheetDTO.dayTimeSheets).forEach(value => {
            dayTimeSheets[Number(value)] = DayTimeSheet.map(timeSheetDTO.dayTimeSheets[value]);
        });

        timeSheet.dayTimeSheets = dayTimeSheets;

        return timeSheet;
    }

    clone() {
        return Object.assign(new TimeSheet(), this);
    }
}

export default TimeSheet;