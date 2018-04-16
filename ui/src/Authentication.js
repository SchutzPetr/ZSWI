class Authentication {

    constructor(){
        this._authenticated = true;
    }

    isAuthenticated() {
        return this._authenticated;
    }
}

const authentication = new Authentication();
export default authentication;