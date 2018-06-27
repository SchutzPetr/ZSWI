import BaseEntity from "./BaseEntity";
import moment from "moment";

class PublicHoliday extends BaseEntity {

    constructor() {
        super();
        this._id = -1;
        this._date = new Date();
        this._name = "";
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get date() {
        return this._date;
    }

    set date(value) {
        this._date = value;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    clone() {
        return Object.assign(new PublicHoliday(), this);
    }

    static map(dto) {
        if (dto instanceof Array) {
            return dto.map(value => this.map(value)) || [];
        }

        let publicHoliday = Object.assign(new PublicHoliday(), dto);

        publicHoliday.date = moment(dto.day, "YYYY-MM-DD").toDate();

        return publicHoliday;
    }


    toJSON() {
        let publicHolidayDTO = super.toJSON();

        publicHolidayDTO.day = this.date ? moment(this.date, "YYYY-MM-DD").format("YYYY-MM-DD") : null;

        return publicHolidayDTO;
    }
}

export default PublicHoliday;
