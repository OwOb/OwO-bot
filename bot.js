const Discord = require("discord.js");

var bot = new Discord.Client();

bot.on("ready", function() {
	console.log("Ready");
});

bot.on("message", function(message) {
	
	if (message.author.username == "OwO bot") return
	
	var agar = message.content.split(" ");
	
	var head = agar[0].toLowerCase();
	var end = agar[arar.length-1].toLowerCase();
	
	if(head == "!test") {
		message.channel.sendMessage("本機正常運作中... ...");
	}
	
	else if (head == "owo" || end == "owo") {
		message.channel.sendMessage("-OwO- 喵？");
	}
	
	else if (head == "-owo-" || end == "-owo-") {
		message.channel.sendMessage("=OwO= 喵喵？");
	}
	
	else if (head == "=owo=" || end == "=owo=") {
		message.channel.sendMessage("≡OwO≡ 喵喵喵？");
	}
	
	else if (head == "≡owo≡" || end == "≡owo≡") {
		message.channel.sendMessage("≣OwO≣ 喵喵喵喵？");
	}
	
	else if (head == "≣owo≣" || end == "≣owo≣") {
		message.channel.sendMessage("OwO ？");
	}
	
	else if (message.content.indexOf("誰是世界上最醜的人") != -1) {
		message.channel.sendMessage(message.author.username+"是世界上最醜的人~~~  OwO");
	}
	//message.channel.sendMessage(message.author.username);
});

bot.login(process.env.BOT_TOKEN);
