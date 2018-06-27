class SharedVariable {

    constructor() {
        this._TIMESHEAT_MONTH = new Date().getMonth();
        this._TIMESHEAT_YEAR = new Date().getFullYear();
    }

    get TIMESHEAT_MONTH() {
        return this._TIMESHEAT_MONTH;
    }

    set TIMESHEAT_MONTH(value) {
        this._TIMESHEAT_MONTH = value;
    }

    get TIMESHEAT_YEAR() {
        return this._TIMESHEAT_YEAR;
    }

    set TIMESHEAT_YEAR(value) {
        this._TIMESHEAT_YEAR = value;
    }
}

const sharedVariable = new SharedVariable();
export default sharedVariable;