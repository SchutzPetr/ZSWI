import BaseEntity from "./BaseEntity";
import moment from "moment/moment";

class DayTimeSheet extends BaseEntity {

    constructor() {
        super();
        /**
         * User id
         * @type {number}
         * @private
         */
        this._userId = -1;
        /**
         * Date
         * @type {Date}
         * @private
         */
        this._date = new Date();
        /**
         * Day type
         * @type {string}
         * @private
         */
        this._dayType = "";
        /**
         * @type {null|Date}
         * @private
         */
        this._firstPartFrom = null;
        /**
         * @type {null|Date}
         * @private
         */
        this._firstPartTo = null;
        /**
         * @type {null|Date}
         * @private
         */
        this._secondPartFrom = null;
        /**
         * @type {null|Date}
         * @private
         */
        this._secondPartTo = null;
    }

    /**
     * @returns {number}
     */
    get userId() {
        return this._userId;
    }

    /**
     * @param value {number}
     */
    set userId(value) {
        this._userId = value;
    }

    /**
     * @returns {Date}
     */
    get date() {
        return this._date;
    }

    /**
     * @param value {Date}
     */
    set date(value) {
        this._date = value;
    }

    /**
     * @returns {string}
     */
    get dayType() {
        return this._dayType;
    }

    /**
     * @param value {string}
     */
    set dayType(value) {
        this._dayType = value;
    }

    /**
     * @returns {Date}
     */
    get firstPartFrom() {
        return this._firstPartFrom;
    }

    /**
     * @param value {Date}
     */
    set firstPartFrom(value) {
        this._firstPartFrom = value;
    }

    /**
     * @returns {Date}
     */
    get firstPartTo() {
        return this._firstPartTo;
    }

    /**
     * @param value {Date}
     */
    set firstPartTo(value) {
        this._firstPartTo = value;
    }

    /**
     * @returns {Date}
     */
    get secondPartFrom() {
        return this._secondPartFrom;
    }

    /**
     * @param value {Date}
     */
    set secondPartFrom(value) {
        this._secondPartFrom = value;
    }

    /**
     * @returns {Date}
     */
    get secondPartTo() {
        return this._secondPartTo;
    }

    /**
     * @param value {Date}
     */
    set secondPartTo(value) {
        this._secondPartTo = value;
    }

    /**
     *
     * @param dayTimeSheetDTO {*}
     * @returns {DayTimeSheet|DayTimeSheet[]}
     */
    static map(dayTimeSheetDTO) {
        if (dayTimeSheetDTO instanceof Array) {
            return dayTimeSheetDTO.map(value => this.map(value)) || [];
        }

        let dayTimeSheet = new DayTimeSheet();

        dayTimeSheet.userId = dayTimeSheetDTO.userId;
        dayTimeSheet.dayType = dayTimeSheetDTO.dayType;

        dayTimeSheet.date = moment(dayTimeSheetDTO.date, "YYYY-MM-DD").toDate();

        dayTimeSheet.firstPartFrom = dayTimeSheetDTO.firstPartFrom ? moment(dayTimeSheetDTO.firstPartFrom, "HH:mm:ss").toDate() : null;
        dayTimeSheet.firstPartTo = dayTimeSheetDTO.firstPartTo ? moment(dayTimeSheetDTO.firstPartTo, "HH:mm:ss").toDate() : null;
        dayTimeSheet.secondPartFrom = dayTimeSheetDTO.secondPartFrom ? moment(dayTimeSheetDTO.secondPartFrom, "HH:mm:ss").toDate() : null;
        dayTimeSheet.secondPartTo = dayTimeSheetDTO.secondPartTo ? moment(dayTimeSheetDTO.secondPartTo, "HH:mm:ss").toDate() : null;

        return dayTimeSheet;
    }

    toJSON() {
        let dayTimeSheetDTO = super.toJSON();

        dayTimeSheetDTO.date = moment(this.date, "YYYY-MM-DD").format("YYYY-MM-DD");

        dayTimeSheetDTO.firstPartFrom = this.firstPartFrom ? moment(this.firstPartFrom).format("HH:mm:ss") : null;
        dayTimeSheetDTO.firstPartTo = this.firstPartTo ? moment(this.firstPartTo).format("HH:mm:ss") : null;
        dayTimeSheetDTO.secondPartFrom = this.secondPartFrom ? moment(this.secondPartFrom).format("HH:mm:ss") : null;
        dayTimeSheetDTO.secondPartTo = this.secondPartTo ? moment(this.secondPartTo).format("HH:mm:ss") : null;

        return dayTimeSheetDTO;
    }

    clone() {
        return Object.assign(new DayTimeSheet(), this);
    }

    merge(dayTimeSheet) {
        return Object.assign(this, dayTimeSheet);
    }
}

export default DayTimeSheet;