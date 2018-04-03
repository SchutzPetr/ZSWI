class DayTimeSheet {

    constructor(){
        this._firstPartFrom = null;
        this._firstPartTo = null;
        this._secondPartFrom = null;
        this._secondPartTo = null;

        this._email = "";
        this._honorificPrefix = "";
        this._honorificSuffix = "";
        this._authority = "";
        this._active = true;
        this._mainWorkStation = "";
    }

    toJSON() {
        return JSON.stringify(this);
    }

    clone() {
        return Object.assign(new DayTimeSheet(), this);
    }

    static map(dayTimeSheet){
        return Object.assign(new DayTimeSheet(), dayTimeSheet);
    }
}

export default DayTimeSheet;