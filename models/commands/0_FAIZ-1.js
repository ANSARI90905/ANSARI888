const fs = require("fs");
module.exports.config = {
	name: "IMOGE 1",
    version: "1.1.1",
	hasPermssion: 0,
	credits: "FAIZU", 
	description: "THIS BOT IS MR FAIZA",
	commandCategory: "NO PREFIX",
    cooldowns: 5, 
};

module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
	var { threadID, messageID } = event;
	let react = event.body.toLowerCase();
	if(react.includes("😒") ||
     react.includes("🙊") || react.includes("🥺") || react.includes("😗") ||
react.includes("🥲") ||
react.includes("😙")) {
		var msg = {
				body: `😒😒😒😒😒`,
			}
			api.sendMessage(msg, threadID, messageID);
    api.setMessageReaction("😒", event.messageID, (err) => {}, true)
		}
	}
	module.exports.run = function({ api, event, client, __GLOBAL }) {

  }
