import QrScanner from "./lib/nimiq-qrcode.js";

const debugElement = document.querySelector("#debug");
const videoElement = document.querySelector("#qr-scanner");
const dataElement = document.querySelector('#data');

function debug(text) {
  const p = document.createElement("p");
  p.textContent = JSON.stringify(text);
  debugElement.appendChild(p);
}

const qrScanner = new QrScanner(videoElement, res => {dataElement.textContent = `Output: ${res.data}`; qrScanner.pause();}, { returnDetailedScanResult: true, highlightCodeOutline: true });
videoElement.insertAdjacentElement('afterend', qrScanner.$canvas)
qrScanner.$canvas.style.display = 'block'
qrScanner.start()

