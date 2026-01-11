const { spawn } = require("child_process");
const axios = require("axios");
const logger = require("./utils/log");

///////////////////////////////////////////////////////////
//========= Create website for dashboard/uptime =========//
///////////////////////////////////////////////////////////

const express = require("express");
const path = require("path");

const app = express();
const port = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(port, () => {
  logger(`Server running on port ${port}`, "[ START ]");
});

/////////////////////////////////////////////////////////
//========= Start bot & auto restart =========//
/////////////////////////////////////////////////////////

global.countRestart = 0;

function startBot(message) {
  if (message) logger(message, "[ BOT ]");

  const child = spawn(
    "node",
    ["--trace-warnings", "--async-stack-traces", "FAIZ-BABU.js"],
    {
      cwd: __dirname,
      stdio: "inherit",
      shell: true
    }
  );

  child.on("close", (code) => {
    if (code !== 0 && global.countRestart < 5) {
      global.countRestart++;
      logger(`Bot crashed! Restarting (${global.countRestart}/5)`, "[ BOT ]");
      startBot();
    } else {
      logger("Bot stopped.", "[ BOT ]");
    }
  });

  child.on("error", (err) => {
    logger("Spawn error: " + err.message, "[ ERROR ]");
  });
}

////////////////////////////////////////////////
//========= Check update from Github =========//
////////////////////////////////////////////////

axios
  .get("https://raw.githubusercontent.com/priyanshu192/bot/main/package.json")
  .then((res) => {
    logger(res.data.name || "Unknown", "[ NAME ]");
    logger("Version: " + res.data.version, "[ VERSION ]");
    logger(res.data.description || "", "[ DESCRIPTION ]");
  })
  .catch(() => {
    logger("Cannot check update (offline)", "[ UPDATE ]");
  });

startBot("Starting bot...");
