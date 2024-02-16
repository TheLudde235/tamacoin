const id = "c2a1c35f";

const qrCodes = {
    da1aa9d1: false,
    a0ca7bfa: false,
    b809a9c6: false,
};

export default {
    get() {
        return JSON.parse(localStorage.getItem(id)) || qrCodes;
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
        if (item in qrCodes && !this.get()[item]) {
            const codes = { ...qrCodes };
            codes[item] = true;
            localStorage.setItem(id, JSON.stringify(codes));
            return true;
        }
        return false;
    },
};
