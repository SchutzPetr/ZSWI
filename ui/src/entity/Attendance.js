import BaseEntity from "./BaseEntity";

class Attendance extends BaseEntity{

    constructor(){
        super();
        this._id = -1;
        this._userId = -1;
        this._activeFrom = new Date();
        this._firstPartFrom = new Date().setHours(8, 0);
        this._firstPartTo = new Date().setHours(12, 0);
        this._secondPartFrom = new Date().setHours(12, 30);
        this._secondPartTo = new Date().setHours(16, 30);
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
}

export default Attendance;