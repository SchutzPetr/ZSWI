import BaseEntity from "./BaseEntity";
import moment from "moment/moment";

class UserHolidaySettings extends BaseEntity{

    constructor(userId, year, days){
        super();
        this._userId = userId || -1;
        this._year = year || new Date().getFullYear();
        this._days = days || 20;
    }

    get userId() {
        return this._userId;
    }

    set userId(value) {
        this._userId = value;
    }

    get year() {
        return this._year;
    }

    set year(value) {
        this._year = value;
    }

    get days() {
        return this._days;
    }

    set days(value) {
        this._days = value;
    }

    clone() {
        return Object.assign(new UserHolidaySettings(), this);
    }

    /**
     *
     * @param userHolidaySettingsDTO
     * @returns {UserHolidaySettings|UserHolidaySettings[]}
     */
    static map(userHolidaySettingsDTO) {
        if (userHolidaySettingsDTO instanceof Array) {
            return userHolidaySettingsDTO.map(value => this.map(value)) || [];
        }
        return new UserHolidaySettings(Number(userHolidaySettingsDTO.userId), Number(userHolidaySettingsDTO.year), Number(userHolidaySettingsDTO.days));
    }
}

export default UserHolidaySettings;