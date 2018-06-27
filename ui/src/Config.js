class Config {

    constructor() {
        this._APP_DIRECTORY = "";
        this._API_URL = "";
        this._VERSION = "0.0.0";
    }

    get APP_DIRECTORY() {
        return this._APP_DIRECTORY;
    }

    set APP_DIRECTORY(value) {
        this._APP_DIRECTORY = value;
    }

    get API_URL() {
        return this._API_URL;
    }

    set API_URL(value) {
        this._API_URL = value;
    }

    get VERSION() {
        return this._VERSION;
    }

    set VERSION(value) {
        this._VERSION = value;
    }
}

const conf = new Config();
export default conf;