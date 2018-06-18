class Config {

    constructor(){
        this._API_URL = "";
        this._VERSION = "0.0.0";
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