import BaseEntity from "./BaseEntity";
import moment from "moment";

class Attendance extends BaseEntity {

    constructor(dayInWeek = 0) {
        super();
        this._id = -1;
        this._userId = -1;
        this._dayInWeek = dayInWeek;
        this._enabled = true;
        this._activeFrom = new Date();
        this._firstPartFrom = new Date(new Date().setHours(8, 0, 0, 0));
        this._firstPartTo = new Date(new Date().setHours(12, 0, 0, 0));
        this._secondPartFrom = new Date(new Date().setHours(12, 30, 0, 0));
        this._secondPartTo = new Date(new Date().setHours(16, 30, 0, 0));
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

    get dayInWeek() {
        return this._dayInWeek;
    }

    set dayInWeek(value) {
        this._dayInWeek = value;
    }

    get enabled() {
        return this._enabled;
    }

    set enabled(value) {
        this._enabled = value;
    }

    get activeFrom() {
        return this._activeFrom;
    }

    set activeFrom(value) {
        this._activeFrom = value;
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

    static map(attendanceDTO) {
        if (attendanceDTO instanceof Array) {
            return attendanceDTO.map(value => this.map(value)) || [];
        }

        let attendance = new Attendance();

        attendance.id = attendanceDTO.id;
        attendance.userId = attendanceDTO.userId;
        attendance.dayInWeek = attendanceDTO.dayInWeek;
        attendance.enabled = attendanceDTO.enabled;
        attendance.activeFrom = moment(attendanceDTO.activeFrom, "YYYY-MM-DD HH:mm:ss").toDate();
        attendance.firstPartFrom = attendanceDTO.firstPartFrom ? moment(attendanceDTO.firstPartFrom, "HH:mm:ss").toDate() : null;
        attendance.firstPartTo = attendanceDTO.firstPartTo ? moment(attendanceDTO.firstPartTo, "HH:mm:ss").toDate() : null;
        attendance.secondPartFrom = attendanceDTO.secondPartFrom ? moment(attendanceDTO.secondPartFrom, "HH:mm:ss").toDate() : null;
        attendance.secondPartTo = attendanceDTO.secondPartTo ? moment(attendanceDTO.secondPartTo, "HH:mm:ss").toDate() : null;

        return attendance;
    }

    toJSON() {
        let attendanceDTO = super.toJSON();

        attendanceDTO.activeFrom = moment(this.activeFrom, "YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DD HH:mm:ss");
        attendanceDTO.firstPartFrom = this.firstPartFrom ? moment(this.firstPartFrom).format("HH:mm:ss") : null;
        attendanceDTO.firstPartTo = this.firstPartTo ? moment(this.firstPartTo).format("HH:mm:ss") : null;
        attendanceDTO.secondPartFrom = this.secondPartFrom ? moment(this.secondPartFrom).format("HH:mm:ss") : null;
        attendanceDTO.secondPartTo = this.secondPartTo ? moment(this.secondPartTo).format("HH:mm:ss") : null;

        return attendanceDTO;
    }
}

export default Attendance;