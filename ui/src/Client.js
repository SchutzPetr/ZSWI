import axios from 'axios';

const API = "localhost";

const Client = {
    get(url, data) {
        switch (url) {
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
            case "login":
                return axios.post(API + "/login", {params: data});
            default:
                throw `Url ${url} does not exists.`;
        }
    }
};

export default Client;