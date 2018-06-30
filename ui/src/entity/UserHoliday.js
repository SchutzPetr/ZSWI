import BaseEntity from "./BaseEntity";
import moment from "moment/moment";

class UserHoliday extends BaseEntity {

    constructor(id, userId, date, type) {
        super();
        this._id = id || -1;
        this._userId = userId || {};
        this._date = date || new Date();
        this._type = type || "ALL_DAY";
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get userId() {
        return this._userId;
    }

    set userId(value) {
        this._userId = value;
    }

    get date() {
        return this._date;
    }

    set date(value) {
        this._date = value;
    }

    get type() {
        return this._type;
    }

    set type(value) {
        this._type = value;
    }

    clone() {
        return Object.assign(new UserHoliday(), this);
    }

    static map(userHolidayDTO) {
        if (userHolidayDTO instanceof Array) {
            return userHolidayDTO.map(value => this.map(value)) || [];
        }

        let userHoliday = Object.assign(new UserHoliday(), userHolidayDTO);

        userHoliday.date = moment(userHolidayDTO.date, "YYYY-MM-DD HH:mm:ss").toDate();

        return userHoliday;
    }

    toJSON() {
        let userHolidayDTO = super.toJSON();

        userHolidayDTO.date = moment(this.date, "YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DD HH:mm:ss");

        return userHolidayDTO;
    }
}

export default UserHoliday;