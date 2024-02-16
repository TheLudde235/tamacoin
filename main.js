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

function handleScan(scanResult) {
    const { data } = scanResult;
    if (codes.has(data) && !codes.hasScanned(data)) {
        debug(`Added ${data}`);
        codes.scan(data);
        coins.amount++;
    }
}
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
