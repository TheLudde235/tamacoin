import QrScanner from "./lib/nimiq-qrcode.js";
import { qrCodes } from "./codes.js";
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

const scannedCodes = JSON.parse(localStorage.getItem("")) || qrCodes;

for (const key in scannedCodes) {
    console.log(key);
    coins.amount += scannedCodes[key];
}

const qrScanner = new QrScanner(
    videoElement,
    (res) => {
        dataElement.textContent = `Output: ${res.data}`;
        if (alreadyScannedCodes[res.data]) {
            dataElement.textContent = `Output: ${res.data}`;
            localStorage.setItem(res.data, "true");
            coinsElement.textContent++;
        }
    },
    { returnDetailedScanResult: true }
);

videoElement.insertAdjacentElement("afterend", qrScanner.$canvas);
qrScanner.$canvas.style.display = "block";

qrScanner.start();
