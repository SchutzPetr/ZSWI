import BaseEntity from "./BaseEntity";
import moment from "moment/moment";
import DayTimeSheet from "./DayTimeSheet";
import Utils from "../other/Utils";
import ProjectAssign from "./ProjectAssign";
import PublicHoliday from "./PublicHoliday";

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
        this._projectAssign = [];
        this._publicHolidays = [];
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

    get projectAssign() {
        return this._projectAssign;
    }

    set projectAssign(value) {
        this._projectAssign = value;
    }

    get publicHolidays() {
        return this._publicHolidays;
    }

    set publicHolidays(value) {
        this._publicHolidays = value;
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

        timeSheet.projectAssign = ProjectAssign.map(timeSheetDTO.projectAssign);
        timeSheet.publicHolidays = PublicHoliday.map(timeSheetDTO.publicHolidays);

        return timeSheet;
    }

    clone() {
        return Object.assign(new TimeSheet(), this);
    }
}

export default TimeSheet;