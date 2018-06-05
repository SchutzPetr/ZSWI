class BaseEntity {

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

        return obj;
    }
}

export default BaseEntity;