import QrScanner from "./lib/nimiq-qrcode.js";

const debugElement = document.querySelector("#debug");

function debug(text) {
  const p = document.createElement("p");
  p.textContent = text;
  debugElement.appendChild(p);
}
// const videoElement = document.querySelector("#qr-scanner");

if ("mediaDevices" in navigator && "getUserMedia" in navigator.mediaDevices) {
  debug("Let's get this party started");
  navigator.mediaDevices.getUserMedia({ video: true });
}
