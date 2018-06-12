import BaseEntity from "./BaseEntity";

class DayTimeSheet extends BaseEntity{

    constructor(){
        super();

        this._userId = -1;
        this._date = new Date();
        this._dayType = "";
        this._firstPartFrom = null;
        this._firstPartTo = null;
        this._secondPartFrom = null;
        this._secondPartTo = null;
    }


    get userId() {
        return this._userId;
    }

    set userId(value) {
        this._userId = value;
    }

    /**
     * @returns {Date}
     */
    get date() {
        return this._date;
    }

    set date(value) {
        this._date = value;
    }

    get dayType() {
        return this._dayType;
    }

    set dayType(value) {
        this._dayType = value;
    }

    /**
     * @returns {null|Date}
     */
    get firstPartFrom() {
        return this._firstPartFrom;
    }

    set firstPartFrom(value) {
        this._firstPartFrom = value;
    }

    /**
     * @returns {null|Date}
     */
    get firstPartTo() {
        return this._firstPartTo;
    }

    set firstPartTo(value) {
        this._firstPartTo = value;
    }

    /**
     * @returns {null|Date}
     */
    get secondPartFrom() {
        return this._secondPartFrom;
    }

    set secondPartFrom(value) {
        this._secondPartFrom = value;
    }

    /**
     * @returns {null|Date}
     */
    get secondPartTo() {
        return this._secondPartTo;
    }

    set secondPartTo(value) {
        this._secondPartTo = value;
    }

    clone() {
        return Object.assign(new DayTimeSheet(), this);
    }

    merge(dayTimeSheet){
        return Object.assign(this, dayTimeSheet);
    }

    static map(dayTimeSheet){
        return Object.assign(new DayTimeSheet(), dayTimeSheet);
    }
}

export default DayTimeSheet;