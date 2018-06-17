import BaseEntity from "./BaseEntity";
import moment from "moment";

class ProjectAssign extends BaseEntity {

    constructor() {
        super();
        this._projectId = -1;
        this._userId = -1;
        this._activeFrom = new Date();
        this._activeTo = null;
        this._obligation = 0.0;
    }

    get projectId() {
        return this._projectId;
    }

    set projectId(value) {
        this._projectId = value;
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

    get obligation() {
        return this._obligation;
    }

    set obligation(value) {
        this._obligation = value;
    }

    clone() {
        return Object.assign(new ProjectAssign(), this);
    }

    static map(dto) {
        if (dto instanceof Array) {
            return dto.map(value => this.map(value)) || [];
        }

        let projectAssign = Object.assign(new ProjectAssign(), dto);

        projectAssign.activeFrom = moment(dto.activeFrom, "YYYY-MM-DD").toDate();
        projectAssign.activeTo = moment(dto.activeTo, "YYYY-MM-DD").toDate();

        return projectAssign;
    }


    toJSON() {
        let projectAssignDTO = super.toJSON();

        projectAssignDTO.activeFrom = this.activeFrom ? moment(this.activeFrom, "YYYY-MM-DD").format("YYYY-MM-DD") : null;
        projectAssignDTO.activeTo = this.activeTo  ? moment(this.activeTo, "YYYY-MM-DD").format("YYYY-MM-DD") : null;

        return projectAssignDTO;
    }
}

export default ProjectAssign;
