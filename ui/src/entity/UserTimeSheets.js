class UserTimeSheets {

    constructor(user){
        //map(month, TimeSheet)
        //key = month number
        this._user = user;
        this._timeSheets = {}
    }

    get user() {
        return this._user;
    }

    set user(value) {
        this._user = value;
    }

    get timeSheets() {
        return this._timeSheets;
    }

    set timeSheets(value) {
        this._timeSheets = value;
    }

    putTimeSheet(timeSheet){
        this._timeSheets[timeSheet.month] = timeSheet;
    }

    getTimeSheet(month){
        return this._timeSheets[month];
    }

    clone() {
        return Object.assign(new UserTimeSheets(), this);
    }

    static map(userTimeSheets){
        return Object.assign(new UserTimeSheets(), userTimeSheets);
    }
}

export default UserTimeSheets;