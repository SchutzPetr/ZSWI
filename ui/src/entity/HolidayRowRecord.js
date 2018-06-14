import UserHoliday from "./UserHoliday";
import moment from "moment/moment";

class HolidayRowRecord extends UserHoliday{

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
    static map(holidayRowRecord) {
        if (holidayRowRecord instanceof Array) {
            return holidayRowRecord.map(value => this.map(value)) || [];
        }

        let userHoliday = Object.assign(new HolidayRowRecord(), holidayRowRecord);

        userHoliday.activeFrom = moment(holidayRowRecord.activeFrom, "YYYY-MM-DD HH:mm:ss").toDate();

        return userHoliday;
    }
}

export default HolidayRowRecord;