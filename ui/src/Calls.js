/**
 * Server calls of application client.
 */
import Client from "./Client";

class Calls {
    static _call(method, url, dtoIn) {
        Client[method](url, "data" in dtoIn ? dtoIn.data : {}).then(
            (response) => {
                response = response || {};
                response.data = response.data || {};
                dtoIn.done(response);
            },
            (response) => {
                response = response || {};
                response.data = response.data || {};
                dtoIn.fail(response);
            }
        );
    }

    static _get(url, dataIn){
        Calls._call("get", url, dataIn);
    }

    static _post(url, dataIn){
        Calls._call("post", url, dataIn);
    }

    static createUser(dataIn){
        Calls._post("createUser", dataIn);
    }

    static updateUser(dataIn){
        Calls._post("updateUser", dataIn);
    }

    static createProject(dataIn){
        Calls._post("createProject", dataIn);
    }

    static updateProject(dataIn){
        Calls._post("updateProject", dataIn);
    }

    static updateDayTimeSheet(dataIn){
        Calls._post("updateDayTimeSheet", dataIn);
    }

    static getUsers(dataIn){
        Calls._get("getUsers", dataIn);
    }

    static getUser(dataIn){
        Calls._get("getUser", dataIn);
    }

    static getUserTimeSheet(dataIn){
        Calls._get("getUserTimeSheet", dataIn);
    }

    static getProjects(dataIn){
        Calls._get("getProjects", dataIn);
    }

    static getProject(dataIn){
        Calls._get("getProject", dataIn);
    }

    static login(dataIn){
        Calls._get("login", dataIn);
    }

    static getAssignUsersToProject(dataIn){
        Calls._get("getAssignUsersToProject", dataIn)
    }

    static createUserHoliday(dataIn) {
        Calls._post("createUserHoliday", dataIn);
    }

    static getUserHolidayByUserIdAndYear(dataIn){
        Calls._get("getUserHolidayByUserIdAndYear", dataIn)
    }

    static authUserByToken(dataIn) {
        Calls._get("authUserByToken", dataIn)
    }
}

const calls = new Calls();
export {calls, Calls}
export default Calls;
