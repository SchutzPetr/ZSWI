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
    
    static login(dataIn){
        Calls._get("login", dataIn);
    }

    static createUser(dataIn){
        Calls._get("createUser", dataIn);
    }

    static editUser(dataIn){
        Calls._get("updateUser", dataIn);
    }

    static getUsers(dataIn){
        Calls._get("getUsers", dataIn);
    }

    static getAssignUsersToProject(dataIn){
        Calls._get("getAssignUsersToProject", dataIn)
    }

    static getProjects(dataIn){
        Calls._get("getProjects", dataIn);
    }
    
    static getUser(dataIn){
        Calls._get("getUser", dataIn);
    }

    static editProject(dataIn) {
        Calls._get("editProject", dataIn)
    }

    static createProject(dataIn) {
        Calls._get("addProject", dataIn)
    }
}

const calls = new Calls();
export {calls, Calls}
export default Calls;
