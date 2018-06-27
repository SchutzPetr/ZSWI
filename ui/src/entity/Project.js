import BaseEntity from "./BaseEntity";

class Project extends BaseEntity {

    constructor() {
        super();
        this._id = -1;
        this._projectName = "";
        this._projectNameShort = "";
        this._description = "";
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get projectName() {
        return this._projectName;
    }

    set projectName(value) {
        this._projectName = value;
    }

    get projectNameShort() {
        return this._projectNameShort;
    }

    set projectNameShort(value) {
        this._projectNameShort = value;
    }

    get description() {
        return this._description;
    }

    set description(value) {
        this._description = value;
    }

    clone() {
        return Object.assign(new Project(), this);
    }

    static map(dto) {
        if (dto instanceof Array) {
            return dto.map(value => Object.assign(new Project(), value)) || [];
        }
        return Object.assign(new Project(), dto);
    }
}

export default Project;