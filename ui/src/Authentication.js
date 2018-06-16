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

    saveToken(token){
        if (typeof(Storage) !== "undefined") {
            localStorage.setItem("X-Auth-Token", token);
        } else {
            console.warn("Sorry! No Web Storage support..");
        }
    }

    getToken(){
        if (typeof(Storage) !== "undefined") {
            return localStorage.getItem("X-Auth-Token");
        } else {
            console.warn("Sorry! No Web Storage support..");
            return null;
        }
    }


}

const authentication = new Authentication();
export default authentication;