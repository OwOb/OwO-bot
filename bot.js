const Discord = require("discord.js");

var bot = new Discord.Client();

bot.on("ready", function() {
	console.log("Ready");
});

bot.on("message", function(message) {
	if (message.author.username == "OwO bot") return;
	var s = message.content.split(" ");
	var head = s[0].toLowerCase();
	if(head == "!test") {
		message.channel.sendMessage("本機正常運作中... ...");
	}
	else if (message.content.indexOf("誰是世界上最醜的人OwO") != -1) {
		message.channel.sendMessage("-OwO- 喵？");
	}
	else if (message.content.indexOf("誰是世界上最醜的人") != -1) {
		message.channel.sendMessage(message.author.username+"是世界上最醜的人~~~  OwO");
	}
	//message.channel.sendMessage(message.author.username);
});

bot.login(process.env.BOT_TOKEN);
