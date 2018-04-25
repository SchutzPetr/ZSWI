import Holiday from "./Holiday";

class HolidayRowRecord extends Holiday{

    constructor(id, userId, date, type, isSelected){
        super(id, userId, date, type);

        this._isSelected = isSelected || false;
    }

    get isSelected() {
        return this._isSelected;
    }

    set isSelected(value) {
        this._isSelected = value;
    }

    clone() {
        return Object.assign(new HolidayRowRecord(), this);
    }

    static map(holidayRowRecord){
        return Object.assign(new HolidayRowRecord(), holidayRowRecord);
    }
}

export default HolidayRowRecord;