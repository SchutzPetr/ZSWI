class Authentication {

    constructor(user){
        this._user = user;
    }

    isAuthenticated() {
        return this._user != null;
    }

    get user() {
        return this._user;
    }

    set user(value) {
        this._user = value;
    }


}

const authentication = new Authentication();
export default authentication;