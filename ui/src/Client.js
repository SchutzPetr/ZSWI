import axios from 'axios';

const API = "http://development.com/ZSWI/controller";

const USER_API = API + "/user.ctrl.php";
const PROJECT_API = API + "/project.ctrl.php";

const Client = {
    get(url, data) {
        switch (url) {
            case "login":
                return axios.get(USER_API + "?/user/login=" + JSON.stringify(data));
            case "getUsers":
                return axios.get(USER_API + "?/user/getAllUsers");
            case "getUser":
                return axios.get(USER_API + "?/user/getById", {params: data});
            case "createUser":
                return axios.post(USER_API + "?/user/addNewUser=" + data.toJSON());
            case "updateUser":
                return axios.post(USER_API + "?/user/update/id=" + data.toJSON());
            case "getProjects":
                return axios.get(PROJECT_API + "?/project/getAll=");
            case "addProject":
                return axios.get(PROJECT_API + "?/project/addNewProject=" + data.toJSON());
            case "editProject":
                return axios.get(PROJECT_API + "?/project/addNewProject=" + data.toJSON());
            default:
                throw `Url ${url} does not exists.`;
        }
    },

    post(url, data) {
        switch (url) {
            case "createUser":
                return axios.post(USER_API + "?/user/addNewUser=" + data.toJSON());
            case "updateUser":
                return axios.post(USER_API + "?/user/update/id=" + data.toJSON());
            default:
                throw `Url ${url} does not exists.`;
        }
    }
};

export default Client;