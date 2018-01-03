const Discord = require("discord.js");

var bot = new Discord.Client();

var command_cd = [];

bot.on("ready", function() {
	console.log("Ready");
});

bot.on("message", function(message) {
	
	if (message.author.username == "OwO bot") return
	
	var agar = message.content.split(" ");
	
	var head = agar[0].toLowerCase();
	var end = agar[agar.length-1].toLowerCase();
	
	if(head == "!test" && cammand_cd[0] == 0) {
		message.channel.sendMessage("本機正常運作中... ...");
		cammand_cd[0] = 1;
		setTimeout(cammand_cd[0] = 0, 5000);
	}
	
	else if (head == "owo" || end == "owo") {
		message.channel.sendMessage("-OwO- 喵？");
		cammand_cd[1] = 1;
		setTimeout(cammand_cd[1] = 0, 5000);
	}
	
	else if (head == "-owo-" || end == "-owo-") {
		message.channel.sendMessage("=OwO= 喵喵？");
		cammand_cd[2] = 1;
		setTimeout(cammand_cd[2] = 0, 5000);
	}
	
	else if (head == "=owo=" || end == "=owo=") {
		message.channel.sendMessage("≡OwO≡ 喵喵喵？");
		cammand_cd[3] = 1;
		setTimeout(cammand_cd[3] = 0, 5000);
	}
	
	else if (head == "≡owo≡" || end == "≡owo≡") {
		message.channel.sendMessage("≣OwO≣ 喵喵喵喵？");
		cammand_cd[4] = 1;
		setTimeout(cammand_cd[4] = 0, 5000);
	}
	
	else if (head == "≣owo≣" || end == "≣owo≣") {
		message.channel.sendMessage("OwO ？");
		cammand_cd[5] = 1;
		setTimeout(cammand_cd[5] = 0, 5000);
	}
	
	else if (message.content.indexOf("誰是世界上最醜的人") != -1) {
		message.channel.sendMessage(message.author.username+"是世界上最醜的人~~~  OwO");
		cammand_cd[6] = 1;
		setTimeout(cammand_cd[6] = 0, 5000);
	}
	//message.channel.sendMessage(message.author.username);
});

bot.login(process.env.BOT_TOKEN);
