import axios from 'axios';

const API = "http://development.com/ZSWI/controller";

const Client = {
    get(url, data) {
        switch (url) {
            case "login":
                return axios.get(API + "/user.ctrl.php?/user/login=" + JSON.stringify(data));
            case "getUsers":
                return axios.get(API + "/users");
            case "getUser":
                return axios.get(API + "/users", {params: data});
            default:
                throw `Url ${url} does not exists.`;
        }
    },

    post(url, data) {
        switch (url) {
            default:
                throw `Url ${url} does not exists.`;
        }
    }
};

export default Client;