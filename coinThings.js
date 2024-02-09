const id = "2d1fa35cb71";

export default coins = {
    amount: localStorage.getItem("coins") || 0,

    get amount() {
        return this.amount;
    },

    /**
     * @param {number} value
     */
    set amount(value) {
        this.amount = value;

        localStorage.setItem("coins", this.amount);
        return this.amount;
    },
};
