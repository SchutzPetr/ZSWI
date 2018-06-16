import axios from 'axios';

const AUTH_API = "/auth/";
const USER_API = "/user/";
const PROJECT_API = "/project/";
const TIMESHEET_API = "/timesheet/";
const DAYTIMESHEET_API = "/daytimesheet/";
const USERHOLIDAY_API = "/usersholiday/";


const Client = {
    get(url, data) {
        switch (url) {
            case "getUsers":
                return axios.get(USER_API + "findAll.php");
            case "getUser":
                return axios.get(USER_API + "findById.php", {params: data});
            case "authUserByToken":
                return axios.get(AUTH_API + "authUserByToken.php", {params: data});
            case "getProjects":
                return axios.get(PROJECT_API + "findAll.php");
            case "getProject":
                return axios.get(PROJECT_API + "findById.php", {params: data});
            case "getUserTimeSheet":
                return axios.get(TIMESHEET_API + "findAllByUserIdAndYearAndMonth.php", {params: data});
            case "getUserHolidayByUserIdAndYear":
                return axios.get(USERHOLIDAY_API + "findAllByUserIdAndYear.php", {params: data});
            case "login":
                return axios.get(AUTH_API + "authSimple.php", {params: data});
            case "getAssignUsersToProject":
                return axios.get(PROJECT_API + "?/user/getAssignUsersToProject" + {params: data});
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
            case "createUserHoliday":
                return axios.post(USERHOLIDAY_API + "create.php", data);
            default:
                throw `Url ${url} does not exists.`;
        }
    }
};

export default Client;