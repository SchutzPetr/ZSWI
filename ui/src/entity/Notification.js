import BaseEntity from "./BaseEntity";
import moment from "moment/moment";

class Notification extends BaseEntity {

    constructor() {
        super();
        this._id = -1;
        this._title = "";
        this._description = "";
        this._date = new Date();
        this._shown = false;
        this._link = "";
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get title() {
        return this._title;
    }

    set title(value) {
        this._title = value;
    }

    get description() {
        return this._description;
    }

    set description(value) {
        this._description = value;
    }

    get date() {
        return this._date;
    }

    set date(value) {
        this._date = value;
    }

    get shown() {
        return this._shown;
    }

    set shown(value) {
        this._shown = value;
    }

    get link() {
        return this._link;
    }

    set link(value) {
        this._link = value;
    }

    clone() {
        return Object.assign(new Notification(), this);
    }

    static map(dto) {
        if (dto instanceof Array) {
            return dto.map(value => this.map(value)) || [];
        }

        let notification = Object.assign(new Notification(), dto);

        notification.shown = Boolean(Number(dto.shown));
        notification.date = moment(dto.date, "YYYY-MM-DD HH:mm:ss").toDate();

        return notification;
    }

    toJSON() {
        let notification = super.toJSON();

        notification.date = moment(this.date, "YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DD HH:mm:ss");

        return notification;
    }
}

export default Notification;