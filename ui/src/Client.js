import axios from 'axios';

const AUTH_API = "/auth/";
const USER_API = "/user/";
const PROJECT_API = "/project/";
const PROJECT_ASSIGN_API = "/projectAssign/";

const TIMESHEET_API = "/timesheet/";
const DAYTIMESHEET_API = "/daytimesheet/";
const USERHOLIDAY_API = "/usersholiday/";
const SHARE_API = "/userShare/";
const SIMPLE_USER_API = "/simpleuser/";
const FILE_REPORT_API = "/filereport/";


const Client = {
    get(url, data) {
        switch (url) {
            case "getUsers":
                return axios.get(USER_API + "findAll.php");
            case "getUser":
                return axios.get(USER_API + "findById.php", {params: data});
            case "getSimpleUsers":
                return axios.get(SIMPLE_USER_API + "findAll.php");
            case "getSimpleUser":
                return axios.get(SIMPLE_USER_API + "findById.php", {params: data});
            case "authUserByToken":
                return axios.get(AUTH_API + "authUserByToken.php", {params: data});
            case "getAvailableUsers":
                return axios.get(SHARE_API + "findAllAvailableUsers.php", {params: data});
            case "getSharedWithOthers":
                return axios.get(SHARE_API + "findAllSharedWithOthers.php", {params: data});
            case "getSharedWithUserId":
                return axios.get(SHARE_API + "findAllSharedWithUserId.php", {params: data});
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
                return axios.get(PROJECT_ASSIGN_API + "findAllByProjectId.php", {params: data});
            case "getFileReportExcel":
                return axios.get(FILE_REPORT_API + "createByMonthAndYear.php", {
                    params: data,
                    responseType: "arraybuffer"
                });
            case "deleteUserHoliday":
                return axios.get(USERHOLIDAY_API + "deleteById.php", {params: data});
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
            case "updateUserHoliday":
                return axios.post(USERHOLIDAY_API + "update.php", data);
            case "createShare":
                return axios.post(SHARE_API + "create.php", data);
            case "deleteShare":
                return axios.post(SHARE_API + "delete.php", data);
            case "createProjectAssign":
                return axios.post(PROJECT_ASSIGN_API + "create.php", data);
            case "updateProjectAssign":
                return axios.post(PROJECT_ASSIGN_API + "update.php", data);
            default:
                throw `Url ${url} does not exists.`;
        }
    }
};

export default Client;