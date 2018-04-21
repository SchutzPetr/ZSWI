class User {

    constructor(){
        this._name = "";
        this._lastName = "";
        this._email = "";
        this._honorificPrefix = "";
        this._honorificSuffix = "";
        this._authority = "";
        this._active = true;
        this._mainWorkStation = "";
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

    get displayFullName(){
        return `${this._honorificPrefix} ${this._name} ${this._lastName} ${this._honorificSuffix}`;
    }

    clone() {
        return Object.assign(new User(), this);
    }

    static map(userDTO){
        return Object.assign(new User(), userDTO);
    }
}

export default User;