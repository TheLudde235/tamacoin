const id = "c2a1c35f";

const coinCodes = {
    da1aa9d1: false,
    a0ca7bfa: false,
    b809a9c6: false,
};

export default {
    get() {
        return JSON.parse(localStorage.getItem(id)) || coinCodes;
    },
    has(item) {
        return this.get()[item] !== undefined;
    },
    populate() {
        let amount = 0;
        for (const key in this.get()) {
            if (this.hasScanned(key)) amount++;
        }
        return amount;
    },
    hasScanned(item) {
        return this.get()[item] || false;
    },
    scan(item) {
        if (item in coinCodes && !this.get()[item]) {
            const codes = { ...coinCodes };
            codes[item] = true;
            localStorage.setItem(id, JSON.stringify(codes));
            return true;
        }
        return false;
    },
};
