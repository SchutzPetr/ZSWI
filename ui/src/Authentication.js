class Authentication {

    constructor(){
        this._authenticated = false;
    }


    isAuthenticated() {
        return this._authenticated;
    }
}

const authentication = new Authentication();

export {authentication};
export default authentication;