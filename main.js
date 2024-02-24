import QrScanner from "./lib/nimiq-qrcode.js";
import codes from "./codes.js";
import coins from "./coinThings.js";

const debugElement = document.querySelector("#debug");
const videoElement = document.querySelector("#qr-scanner");
const dataElement = document.querySelector("#data");
const coinsElement = document.querySelector("#coins");

function debug(text) {
    const p = document.createElement("p");
    p.textContent = JSON.stringify(text);
    debugElement.appendChild(p);
}

function celebrate(amount) {
    debug(`Removed ${amount} coins!`);
}

function handleScan(scanResult) {
    const { data } = scanResult;

    // Remove "X" amount of coins if scanned QR-code includes "delete" + X
    // And current amount of coins exceeds amount to be removed
    const match = data.matches(/delete[0-9]+/);
    if (match != null) {
        const amount = match[0].split("delete")[1];
        if (Number(coins.amount) >= Number(amount)) {
            console.log({ coinamount: coins.amount, amount });
            coins.amount -= amount;
            return celebrate(amount);
        }
    }

    if (codes.has(data) && !codes.hasScanned(data)) {
        debug(`Added ${data}`);
        codes.scan(data);
        coins.amount++;
    }
}

// This should be removed as soon as possible
window.handleScan = handleScan;

coins.amount = codes.populate();
coinsElement.textContent = coins.amount;

const qrScanner = new QrScanner(videoElement, handleScan, {
    returnDetailedScanResult: true,
});

videoElement.insertAdjacentElement("afterend", qrScanner.$canvas);
qrScanner.$canvas.style.display = "block";

coins.onUpdate((value) => {
    coinsElement.textContent = value;
});

qrScanner.start();
