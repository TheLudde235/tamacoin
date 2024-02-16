const id = "2d1fa35c";
const callbacks = [];

export default {
    get amount() {
        return localStorage.getItem(id);
    },

    /**
     * @param {number} value
     */
    set amount(value) {
        localStorage.setItem(id, value);
        callbacks.forEach((callback) => {
            callback(value);
        });
        return this.amount;
    },

    onUpdate(callback) {
        callbacks.push(callback);
    },
};
