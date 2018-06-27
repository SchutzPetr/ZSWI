import BaseEntity from "./BaseEntity";

class SimpleUser extends BaseEntity {

    constructor() {
        super();
        this._id = -1;
        this._name = "";
        this._lastName = "";
        this._honorificPrefix = "";
        this._honorificSuffix = "";
        this._orionLogin = "";
        this._authority = "USER";
        this._mainWorkStation = "KIV";
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

    get mainWorkStation() {
        return this._mainWorkStation;
    }

    set mainWorkStation(value) {
        this._mainWorkStation = value;
    }

    /**
     * @returns {string}
     */
    get displayFullName() {
        return `${this._honorificPrefix} ${this._name} ${this._lastName} ${this._honorificSuffix}`;
    }

    clone() {
        return Object.assign(new SimpleUser(), this);
    }

    static map(userDTO) {
        if (userDTO instanceof Array) {
            return userDTO.map(value => this.map(value)) || [];
        }

        return Object.assign(new SimpleUser(), userDTO);
    }
}

export default SimpleUser;