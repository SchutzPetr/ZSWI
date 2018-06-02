import axios from 'axios';

const API = "http://localhost/backend/api/v1";

const USER_API = API + "/user/";
const PROJECT_API = API + "/project.ctrl.php";

const Client = {
    get(url, data) {
        switch (url) {
            case "login":
                return axios.get(USER_API + "user/user.ctrl.php?/user/login=" + JSON.stringify(data));
            case "getUsers":
                return axios.get(USER_API + "findAll.php");
            case "getUser":
                return axios.get(USER_API + "findById.php", {params: data});
            case "getAssignUsersToProject":
                return axios.get(USER_API + "?/user/getAssignUsersToProject" + JSON.stringify(data));
            case "getProjects":
                return axios.get(PROJECT_API + "?/project/getAll=");
            case "addProject":
                return axios.get(PROJECT_API + "?/project/addNewProject=" + data.toJSON());
            case "editProject":
                return axios.get(PROJECT_API + "?/project/updateProject=" + data.toJSON());
            default:
                throw `Url ${url} does not exists.`;
        }
    },

    post(url, data) {
        switch (url) {
            case "createUser":
                return axios.post(USER_API + "create.php", data);
            case "updateUser":
                return axios.post(USER_API + "update.php", data);
            default:
                throw `Url ${url} does not exists.`;
        }
    }
};

export default Client;