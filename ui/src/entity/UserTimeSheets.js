import BaseEntity from "./BaseEntity";
import TimeSheet from "./TimeSheet";
import User from "./User";

class UserTimeSheets extends BaseEntity {

    constructor(user) {
        super();
        //map(month, TimeSheet)
        //key = month number
        this._user = user;
        /**
         *
         * @type {TimeSheet[]}
         * @private
         */
        this._timeSheets = [];
    }


    get user() {
        return this._user;
    }

    set user(value) {
        this._user = value;
    }

    /**
     * @returns {TimeSheet[]}
     */
    get timeSheets() {
        return this._timeSheets;
    }

    /**
     * @param value {TimeSheet[]}
     */
    set timeSheets(value) {
        this._timeSheets = value;
    }

    /**
     * @param timeSheet {TimeSheet}
     */
    putTimeSheet(timeSheet) {
        this._timeSheets[timeSheet.month] = timeSheet;
    }

    /**
     * @param month {number}
     * @returns {TimeSheet}
     */
    getTimeSheet(month) {
        return this._timeSheets[month];
    }

    clone() {
        return Object.assign(new UserTimeSheets(), this);
    }

    /**
     *
     * @param userTimeSheetsDTO {*}
     * @returns {UserTimeSheets|UserTimeSheets[]}
     */
    static map(userTimeSheetsDTO) {
        if (userTimeSheetsDTO instanceof Array) {
            return userTimeSheetsDTO.map(value => this.map(value)) || [];
        }

        let userTimeSheets = new UserTimeSheets();
        userTimeSheets.user = User.map(userTimeSheetsDTO.user);

        userTimeSheets.timeSheets = TimeSheet.map(userTimeSheetsDTO.timeSheets);

        return userTimeSheets;
    }
}

export default UserTimeSheets;