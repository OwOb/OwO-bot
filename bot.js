const Discord = require("discord.js");

var bot = new Discord.Client();

var command_cd = new Array();

bot.on("ready", function() {
	console.log("Ready");
});

bot.on("message", function(message) {
	
	if (message.author.username == "OwO bot") return
	
	var agar = message.content.split(" ");
	
	var head = agar[0], end = agar[agar.length-1]; 
	var headlower = agar[0].toLowerCase(), endlower = agar[agar.length-1].toLowerCase();
	
	if(!command_cd["!test"] && headlower == "!test") {
		message.channel.sendMessage("本機正常運作中... ...");
		command_cd["!test"] = 1;
		setTimeout(function(){command_cd["!test"] = 0;}, 5000);
	}
	
	else if (!command_cd["owo"] && (headlower == "owo" || endlower == "owo")) {
		message.channel.sendMessage("-OwO- 喵？");
		command_cd["owo"] = 1;
		setTimeout(function(){command_cd["owo"] = 0;}, 5000);
	}
	
	else if (!command_cd["-owo-"] && (headlower == "-owo-" || endlower == "-owo-")) {
		message.channel.sendMessage("=OwO= 喵喵？");
		command_cd["-owo-"] = 1;
		setTimeout(function(){command_cd["-owo-"] = 0;}, 5000);
	}
	
	else if (!command_cd["=owo="] && (headlower == "=owo=" || endlower == "=owo=")) {
		message.channel.sendMessage("≡OwO≡ 喵喵喵？");
		command_cd["=owo="] = 1;
		setTimeout(function(){command_cd["=owo="] = 0;}, 5000);
	}
	
	else if (!command_cd["≡owo≡"] && (headlower == "≡owo≡" || endlower == "≡owo≡")) {
		message.channel.sendMessage("≣OwO≣ 喵喵喵喵？");
		command_cd["≡owo≡"] = 1;
		setTimeout(function(){command_cd["≡owo≡"] = 0;}, 5000);
	}
	
	else if (!command_cd["≣owo≣"] && (headlower == "≣owo≣" || endlower == "≣owo≣")) {
		message.channel.sendMessage("OwO ？");
		command_cd["≣owo≣"] = 1;
		setTimeout(function(){command_cd["≣owo≣"] = 0;}, 5000);
	}
	
	else if (!command_cd["😶"] && (head.indexOf("😶") != -1 || end.indexOf("😶") != -1)) {
		var counthead = head.match(/😶/g).length, endcount = end.match(/😶/g).length;
		if (head.length != counthead*"😶".length)
			counthead = 0;
		if (end.length != countend*"😶".length)
			countend = 0;
		if (Math.max(counthead, countend) > 0) {
			message.channel.sendMessage("😶".repeat(Math.max(counthead, countend)+1));
			command_cd["😶"] = 1;
			setTimeout(function(){command_cd["😶"] = 0;}, 5000);
		}
	}
	
	else if (!command_cd["誰是世界上最醜的人"] && message.content.indexOf("誰是世界上最醜的人") != -1) {
		message.channel.sendMessage(message.author.username+"是世界上最醜的人~~~  OwO");
		command_cd["誰是世界上最醜的人"] = 1;
		setTimeout(function(){command_cd["誰是世界上最醜的人"] = 0;}, 5000);
	}
	/*
	else {
		var str = "";
		for (var i = 0; i != message.content.length; i++)
			str += message.content[i]+" ";
		message.channel.sendMessage(str);
	}
	*/
	//message.channel.sendMessage(message.author.username);
});

bot.login(process.env.BOT_TOKEN);
