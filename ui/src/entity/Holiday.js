class Holiday {

    constructor(id, userId, date, type){
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
        return Object.assign(new Holiday(), this);
    }

    static map(holidayDTO){
        return Object.assign(new Holiday(), holidayDTO);
    }
}

export default Holiday;