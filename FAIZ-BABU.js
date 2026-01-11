/**
 * FAIZ-BABU – SINGLE FILE FB BOT
 * Copy → Paste → Run
 */

const login = require("fca-priyansh");
const fs = require("fs");
const moment = require("moment-timezone");

// ================= CONFIG =================
const CONFIG = {
  PREFIX: "!",
  BOT_NAME: "FAIZ-BABU",
  ADMIN_UIDS: [], // apni uid daal sakte ho
  TIMEZONE: "Asia/Kolkata"
};

// ================= APPSTATE =================
let appState;
try {
  appState = require("./appstate.json");
} catch (e) {
  console.log("❌ appstate.json nahi mila");
  process.exit(0);
}

// ================= TIME FUNCTION =================
function getTime() {
  return moment().tz(CONFIG.TIMEZONE).format("HH:mm:ss DD/MM/YYYY");
}

// ================= START BOT =================
login({ appState }, (err, api) => {
  if (err) {
    console.log("❌ Login Error:", err);
    return;
  }

  api.setOptions({
    listenEvents: true,
    selfListen: false
  });

  console.log("✅ BOT STARTED:", CONFIG.BOT_NAME);
  console.log("⏰ Time:", getTime());

  api.listenMqtt((error, event) => {
    if (error) return console.log(error);
    if (!event.body) return;

    const msg = event.body.trim();

    // ================= PING COMMAND =================
    if (msg === `${CONFIG.PREFIX}ping`) {
      return api.sendMessage(
        `🏓 Pong!\n🤖 ${CONFIG.BOT_NAME}\n⏰ ${getTime()}`,
        event.threadID
      );
    }

    // ================= HELLO =================
    if (msg.toLowerCase() === "hi" || msg.toLowerCase() === "hello") {
      return api.sendMessage(
        `👋 Hi! Main ${CONFIG.BOT_NAME} hoon 😎`,
        event.threadID
      );
    }

  });
});
