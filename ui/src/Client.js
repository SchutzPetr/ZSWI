import axios from 'axios';
import DayTimeSheet from "./entity/DayTimeSheet";

const API = "http://localhost/backend/api/v1";

const USER_API = API + "/user/";
const PROJECT_API = API + "/project/";
const TIMESHEET_API = API + "/timesheet/";
const DAYTIMESHEET_API = API + "/daytimesheet/";


const Client = {
    get(url, data) {
        switch (url) {
            case "getUsers":
                return axios.get(USER_API + "findAll.php");
            case "getUser":
                return axios.get(USER_API + "findById.php", {params: data});
            case "getProjects":
                return axios.get(PROJECT_API + "findAll.php");
            case "getProject":
                return axios.get(PROJECT_API + "findById.php", {params: data});
            case "getUserTimeSheet":
                return axios.get(TIMESHEET_API + "findAllByUserIdAndYearAndMonth.php", {params: data});
            case "login":
                return axios.get(USER_API + "user/user.ctrl.php?/user/login=" + JSON.stringify(data)); //todo:
            case "getAssignUsersToProject":
                return axios.get(PROJECT_API + "?/user/getAssignUsersToProject" +  {params: data});
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
            case "createProject":
                return axios.post(PROJECT_API + "create.php", data);
            case "updateProject":
                return axios.post(PROJECT_API + "update.php", data);
            case "updateDayTimeSheet":
                return axios.post(DAYTIMESHEET_API + "update.php", data);
            default:
                throw `Url ${url} does not exists.`;
        }
    }
};

export default Client;