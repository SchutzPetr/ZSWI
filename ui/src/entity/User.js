import Attendance from "./Attendance";
import BaseEntity from "./BaseEntity";

class User extends BaseEntity{

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
        this._timeJob = 1;
        this._attendance = {};
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

    get timeJob() {
        return this._timeJob;
    }

    set timeJob(value) {
        this._timeJob = value;
    }

    get attendance() {
        return this._attendance;
    }

    set attendance(value) {
        this._attendance = value;
    }

    get displayFullName() {
        return `${this._honorificPrefix} ${this._name} ${this._lastName} ${this._honorificSuffix}`;
    }

    clone() {
        return Object.assign(new User(), this);
    }

    static map(userDTO) {
        if (userDTO instanceof Array) {
            return userDTO.map(value => {
                let user = Object.assign(new User(), value);
                user.attendance = Object.assign(new Attendance(), value.attendance);

                return user;
            }) || [];
        }
        let user = Object.assign(new User(), userDTO);
        user.attendance = Object.assign(new Attendance(), userDTO.attendance);

        return user;
    }
}

export default User;