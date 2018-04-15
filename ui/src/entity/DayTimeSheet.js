class DayTimeSheet {

    constructor(date, dayType, firstPartFrom, firstPartTo, firstPartType, secondPartFrom, secondPartTo, secondPartType){
        this._date = date;
        this._dayType = dayType;
        this._firstPartFrom = firstPartFrom;
        this._firstPartTo = firstPartTo;
        this._secondPartFrom = secondPartFrom;
        this._secondPartTo = secondPartTo;
    }

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

    get firstPartFrom() {
        return this._firstPartFrom;
    }

    set firstPartFrom(value) {
        this._firstPartFrom = value;
    }

    get firstPartTo() {
        return this._firstPartTo;
    }

    set firstPartTo(value) {
        this._firstPartTo = value;
    }

    get firstPartType() {
        return this._firstPartType;
    }

    set firstPartType(value) {
        this._firstPartType = value;
    }

    get secondPartFrom() {
        return this._secondPartFrom;
    }

    set secondPartFrom(value) {
        this._secondPartFrom = value;
    }

    get secondPartTo() {
        return this._secondPartTo;
    }

    set secondPartTo(value) {
        this._secondPartTo = value;
    }

    get secondPartType() {
        return this._secondPartType;
    }

    set secondPartType(value) {
        this._secondPartType = value;
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