import BaseEntity from "./BaseEntity";

class Project extends BaseEntity{

    constructor() {
        super();
        this._id = -1;
        this._name = "";
        this._shortName = "";
        this._description = "";
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get shortName() {
        return this._shortName;
    }

    set shortName(value) {
        this._shortName = value;
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

    toJSON() {
        let obj = {};

        for (let key in this) {
            if (!this.hasOwnProperty(key)) {
                continue;
            }
            if (key[0] === '_') {
                obj[key.substr(1)] = this[key];
            } else {
                obj[key] = this[key];
            }
        }

        return JSON.stringify(obj);

    }
}

export default Project;