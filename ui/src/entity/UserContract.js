import BaseEntity from "./BaseEntity";
import moment from "moment/moment";
import Attendance from "./Attendance";

class UserContract extends BaseEntity {

    constructor(userId) {
        super();
        this._userId = userId || -1;
        this._activeFrom = new Date();
        this._activeTo = null;
        this._obligationKIV = 0;
        this._obligationNTIS = 0;
        this._userProjectAssignment = [];
    }

    get userId() {
        return this._userId;
    }

    set userId(value) {
        this._userId = value;
    }

    get activeFrom() {
        return this._activeFrom;
    }

    set activeFrom(value) {
        this._activeFrom = value;
    }

    get activeTo() {
        return this._activeTo;
    }

    set activeTo(value) {
        this._activeTo = value;
    }

    get obligationKIV() {
        return this._obligationKIV;
    }

    set obligationKIV(value) {
        this._obligationKIV = value;
    }

    get obligationNTIS() {
        return this._obligationNTIS;
    }

    set obligationNTIS(value) {
        this._obligationNTIS = value;
    }

    get userProjectAssignment() {
        return this._userProjectAssignment;
    }

    set userProjectAssignment(value) {
        this._userProjectAssignment = value;
    }

    clone() {
        return Object.assign(new UserContract(), this);
    }

    static map(userContractDTO) {
        if (userContractDTO instanceof Array) {
            return userContractDTO.map(value => this.map(value)) || [];
        }

        let userContract = Object.assign(new UserContract(), userContractDTO);

        userContract.activeFrom = moment(userContractDTO.activeFrom, "YYYY-MM-DD HH:mm:ss").toDate();
        if(userContractDTO.activeTo){
            userContract.activeTo = moment(userContractDTO.activeTo, "YYYY-MM-DD HH:mm:ss").toDate();
        }else {
            userContract.activeTo = null;
        }

        return userContract;
    }

    toJSON() {
        let userContractDTO = super.toJSON();
        userContractDTO.activeFrom = moment(this.activeFrom, "YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DD HH:mm:ss");
        if(this.activeTo){
            userContractDTO.activeTo = moment(this.activeTo, "YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DD HH:mm:ss");
        }else {
            userContractDTO.activeTo = null;
        }
        return userContractDTO;
    }
}

export default UserContract;