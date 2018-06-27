import Attendance from "./Attendance";
import BaseEntity from "./BaseEntity";
import UserContract from "./UserContract";
import UserHolidaySettings from "./UserHolidaySettings";

class User extends BaseEntity {

    constructor() {
        super();
        this._id = -1;
        this._name = "";
        this._lastName = "";
        this._email = "";
        this._honorificPrefix = "";
        this._honorificSuffix = "";
        this._orionLogin = "";
        this._authority = "USER";
        this._active = true;
        this._mainWorkStation = "KIV";
        this._attendanceSchedules = {
            1: new Attendance(1),
            2: new Attendance(2),
            3: new Attendance(3),
            4: new Attendance(4),
            5: new Attendance(5),
        };
        this._currentUserContract = new UserContract();
        this._futureUserContract = [];
        this._userHolidaySettings = [];
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get lastName() {
        return this._lastName;
    }

    set lastName(value) {
        this._lastName = value;
    }

    get email() {
        return this._email;
    }

    set email(value) {
        this._email = value;
    }

    get honorificPrefix() {
        return this._honorificPrefix;
    }

    set honorificPrefix(value) {
        this._honorificPrefix = value;
    }

    get honorificSuffix() {
        return this._honorificSuffix;
    }

    set honorificSuffix(value) {
        this._honorificSuffix = value;
    }

    get orionLogin() {
        return this._orionLogin;
    }

    set orionLogin(value) {
        this._orionLogin = value;
    }

    get authority() {
        return this._authority;
    }

    set authority(value) {
        this._authority = value;
    }

    get active() {
        return this._active;
    }

    set active(value) {
        this._active = value;
    }

    get mainWorkStation() {
        return this._mainWorkStation;
    }

    set mainWorkStation(value) {
        this._mainWorkStation = value;
    }

    /**
     * @returns {UserContract}
     */
    get currentUserContract() {
        return this._currentUserContract;
    }

    /**
     * @param value {UserContract}
     */
    set currentUserContract(value) {
        this._currentUserContract = value;
    }

    /**
     * @returns {UserContract[]}
     */
    get futureUserContract() {
        return this._futureUserContract;
    }

    /**
     * @param value {UserContract[]}
     */
    set futureUserContract(value) {
        this._futureUserContract = value;
    }

    /**
     *
     * @returns {{"1": Attendance, "2": Attendance, "3": Attendance, "4": Attendance, "5": Attendance}|*}
     */
    get attendanceSchedules() {
        return this._attendanceSchedules;
    }

    set attendanceSchedules(value) {
        this._attendanceSchedules = value;
    }

    /**
     * @returns {UserHolidaySettings[]}
     */
    get userHolidaySettings() {
        return this._userHolidaySettings;
    }

    /**
     * @param value {UserHolidaySettings[]}
     */
    set userHolidaySettings(value) {
        this._userHolidaySettings = value;
    }

    /**
     * @returns {string}
     */
    get displayFullName() {
        return `${this._honorificPrefix} ${this._name} ${this._lastName} ${this._honorificSuffix}`;
    }

    clone() {
        return Object.assign(new User(), this);
    }

    static map(userDTO) {
        if (userDTO instanceof Array) {
            return userDTO.map(value => this.map(value)) || [];
        }

        let user = Object.assign(new User(), userDTO);

        for (let key in userDTO.attendanceSchedules) {
            // skip loop if the property is from prototype
            if (!userDTO.attendanceSchedules.hasOwnProperty(key)) continue;

            let obj = userDTO.attendanceSchedules[key];
            for (let prop in obj) {
                // skip loop if the property is from prototype
                if (!obj.hasOwnProperty(prop)) continue;

                user.attendanceSchedules[key] = Attendance.map(userDTO.attendanceSchedules[key]);
            }
        }

        user.userHolidaySettings = UserHolidaySettings.map(userDTO.userHolidaySettings);

        return user;
    }
}

export default User;