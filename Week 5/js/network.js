/*
  Retro Game Co. - Network Connection Test
  Author: Joshua Farr
  Date: November 7, 2026
  Purpose: Shows the host name, port, and protocol the site is running on,
           and saves the launch time in a cookie so the next visit can show
           when the site was last launched.
*/

const LAUNCH_COOKIE = "rgcLastLaunch";

const networkTitle = document.getElementById("network-title");
const networkMessage = document.getElementById("network-message");
const hostName = document.getElementById("host-name");
const portNumber = document.getElementById("port-number");
const protocolText = document.getElementById("protocol");
const lastLaunch = document.getElementById("last-launch");
const rerunButton = document.getElementById("rerun-test");

// ===== COOKIES =====
function setCookie(name, value, days) {
  document.cookie = `${name}=${value}; max-age=${days * 24 * 60 * 60}; path=/`;
}

function getCookie(name) {
  for (const cookie of document.cookie.split(";")) {
    const trimmed = cookie.trim();
    if (trimmed.startsWith(name + "=")) {
      return trimmed.substring(name.length + 1);
    }
  }
  return "";
}

// ===== NETWORK CHECK =====
// A page served by a server uses http or https; a file opened from disk uses file
const protocol = location.protocol.replace(":", "");
const onNetwork = protocol === "http" || protocol === "https";
const isLocal = location.hostname === "localhost" || location.hostname === "127.0.0.1";

// Browsers hide the port when it's the default (80 for http, 443 for https)
function getPort() {
  if (location.port) {
    return location.port;
  }
  if (protocol === "https") {
    return "443 (default for HTTPS)";
  }
  if (protocol === "http") {
    return "80 (default for HTTP)";
  }
  return "None (opened as a file)";
}

hostName.textContent = location.hostname || "None (opened as a file)";
portNumber.textContent = getPort();
protocolText.textContent = protocol.toUpperCase();

if (onNetwork) {
  networkTitle.textContent = "Network Recognized";
  networkMessage.textContent = isLocal
    ? "Connected through a local server on this computer."
    : "Connected through a live web server.";
  document.body.classList.add("network-online");
} else {
  networkTitle.textContent = "No Network Detected";
  networkMessage.textContent = "This page was opened as a file. Run it through a local server to test the connection.";
  document.body.classList.add("network-offline");
}

// ===== LAST TIME LAUNCHED =====
// Show the previous launch, then save this one for next time
const previousLaunch = getCookie(LAUNCH_COOKIE);

if (previousLaunch) {
  lastLaunch.textContent = previousLaunch;
} else if (onNetwork) {
  lastLaunch.textContent = "First launch. Run the test again to see it.";
} else {
  lastLaunch.textContent = "Not available (cookies need a server)";
}

if (onNetwork) {
  setCookie(LAUNCH_COOKIE, new Date().toLocaleString(), 30);
}

rerunButton.addEventListener("click", function () {
  location.reload();
});
