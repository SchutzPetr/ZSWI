class User {

    constructor(){
        this._givenName = '';
        this._familyName = '';
        this._email = '';
    }


    get givenName() {
        return this._givenName;
    }

    set givenName(value) {
        this._givenName = value;
    }

    get familyName() {
        return this._familyName;
    }

    set familyName(value) {
        this._familyName = value;
    }

    get email() {
        return this._email;
    }

    set email(value) {
        this._email = value;
    }

    toJSON() {
        return JSON.stringify(this);
    }

    clone() {
        return Object.assign(new User(), this);
    }

    static map(userDTO){
        return Object.assign(new User(), userDTO);
    }
}

export default User;