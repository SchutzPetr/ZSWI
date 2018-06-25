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

    saveSessionToken(token){
        if (typeof(Storage) !== "undefined") {
            sessionStorage.setItem("X-Auth-Token", token);
        } else {
            console.warn("Sorry! No Web Storage support..");
        }
    }

    getSessionToken(token){
        if (typeof(Storage) !== "undefined") {
            sessionStorage.getItem("X-Auth-Token");
        } else {
            console.warn("Sorry! No Web Storage support..");
        }
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

    clearToken() {
        if (typeof(Storage) !== "undefined") {
            localStorage.removeItem("X-Auth-Token");
        } else {
            console.warn("Sorry! No Web Storage support..");
        }
    }
}

const authentication = new Authentication();
export default authentication;