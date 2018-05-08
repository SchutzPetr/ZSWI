class Suggestion {

    constructor(value, label, data) {
        this._value = value || "";
        this._label = label || "";
        this._data = data || null;
    }

    get value() {
        return this._value;
    }

    set value(value) {
        this._value = value;
    }

    get label() {
        return this._label;
    }

    set label(value) {
        this._label = value;
    }

    get data() {
        return this._data;
    }

    set data(value) {
        this._data = value;
    }
}

export default Suggestion;