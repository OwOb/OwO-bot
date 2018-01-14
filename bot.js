const Discord = require("discord.js");
var request = require("request");
var math = require("mathjs");

var bot = new Discord.Client();

var command_cd = new Array();

bot.on("ready", function() {
  console.log("Ready");
});

bot.on("message", function(message) {
  
  if (message.author.username == "OwO bot") return
  
  var agar = message.content.split(" ");
  var urllist = message.content.match(/http:\/\/[^ \n]+|https:\/\/[^ \n]+/g);
  
  var head = agar[0], end = agar[agar.length-1]; 
  var headlower = agar[0].toLowerCase(), endlower = agar[agar.length-1].toLowerCase();
  
  if(!command_cd["!test"] && headlower == "!test") {
    message.channel.sendMessage("本機正常運作中... ...");
    command_cd["!test"] = 1;
    setTimeout(function(){command_cd["!test"] = 0;}, 5000);
  }
  
  else if(!command_cd["!id"] && headlower == "!id") {
    message.channel.sendMessage(message.author.username+"的ID為: "+message.author.id);
    command_cd["!id"] = 1;
    setTimeout(function(){command_cd["!id"] = 0;}, 5000);
  }
  
  else if(!command_cd["!me"] && headlower == "!me") {
    message.channel.sendMessage(message.member.roles[message.author.id] == null);
    command_cd["!me"] = 1;
    setTimeout(function(){command_cd["!me"] = 0;}, 5000);
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
    message.channel.sendMessage("≡OwO≡ 喵喵喵喵？");
    command_cd["≡owo≡"] = 1;
    setTimeout(function(){command_cd["≡owo≡"] = 0;}, 5000);
  }
  
  else if (!command_cd["≡owo≡"] && (headlower == "≡owo≡" || endlower == "≡owo≡")) {
    message.channel.sendMessage("OwO ？");
    command_cd["≡owo≡"] = 1;
    setTimeout(function(){command_cd["≡owo≡"] = 0;}, 5000);
  }
  
  else if (!command_cd["??"] && (head.indexOf("??") != -1 || end.indexOf("??") != -1)) {
    var counthead = head.match(/??/g), countend = end.match(/??/g);
    if (counthead == null)
      counthead = [];
    else if (head.length != counthead.length*"??".length)
      counthead = [];
    if (countend == null)
      countend = [];
    else if (end.length != countend.length*"??".length)
      countend = [];
    if (Math.max(counthead.length, countend.length) > 0) {
      message.channel.sendMessage("??".repeat(Math.max(counthead.length, countend.length)+1));
      command_cd["??"] = 1;
      setTimeout(function(){command_cd["??"] = 0;}, 5000);
    }
  }
  
  else if (!command_cd["運算"] && (message.content.indexOf("運算") == 0 || message.content.indexOf("calc") == 0 )) {
    if (agar.length == 1 && head == "運算")
      message.channel.sendMessage("沒給算式本機要算什麼啦！(╯‵□ˊ)╯︵┴─┴");
    else {
      try {
        if (message.content.indexOf("運算") == 0)
            message.channel.sendMessage(math.format(math.eval(message.content.replace(/　/g," ").substring("運算".length).replace(/\'/g,"\"")), {precision: 14}));
        else
            message.channel.sendMessage(math.format(math.eval(message.content.replace(/　/g," ").substring("calc".length).replace(/\'/g,"\"")), {precision: 14}));
      }
      catch(calculateerror) {
        message.channel.sendMessage("算式格式有誤啦！害本機算那麼久！(╯‵□ˊ)╯︵┴─┴");
      }
    }
    command_cd["運算"] = 1;
    setTimeout(function(){command_cd["運算"] = 0;}, 5000);
  }
  
  else if (!command_cd["誰是世界上最醜的人"] && message.content.indexOf("誰是世界上最醜的人") != -1) {
    message.channel.sendMessage(message.author.username+"是世界上最醜的人~~~  OwO");
    command_cd["誰是世界上最醜的人"] = 1;
    setTimeout(function(){command_cd["誰是世界上最醜的人"] = 0;}, 5000);
  }
  
  if (urllist != null) {
    for (var i = 0; i < urllist.length; i++) {
      //message.channel.sendMessage(urllist[i]);
      if (!command_cd["gist.github.com"] && urllist[i].search(/http:\/\/gist.github.com\/[a-zA-Z0-9\-]+\/[0-9a-f]+|https:\/\/gist.github.com\/[a-zA-Z0-9\-]+\/[0-9a-f]+/g) == 0) {
        request({
          url: urllist[i]+"/raw",
          method: "GET"
        }, function(error,response,body) {
          if (!error) message.channel.sendMessage("```\n"+body+"\n```");
        });
        command_cd["gist.github.com"] = 1;
        setTimeout(function(){command_cd["gist.github.com"] = 0;}, 5000);
      }
      
      else if (!command_cd["github.com"] && urllist[i].search(/http:\/\/github.com\/[a-zA-Z0-9\-\.\/]+|https:\/\/github.com\/[a-zA-Z0-9\-\.\/]+/g) == 0) {
        if (urllist[i].substring(20).indexOf(".") != -1) {
          request({
            url: urllist[i].replace("github.com","raw.githubusercontent.com").replace("/blob",""),
            method: "GET"
            }, function(error,response,body) {
              if (!error) message.channel.sendMessage("```\n"+body+"\n```");
            });
          command_cd["github.com"] = 1;
          setTimeout(function(){command_cd["github.com"] = 0;}, 5000);
        }
      }
      
      else if (!command_cd["ideone.com"] && urllist[i].search(/http:\/\/ideone.com\/[a-zA-Z0-9]+|https:\/\/ideone.com\/[a-zA-Z0-9]+/g) == 0) {
        request({
          url: urllist[i].replace("ideone.com","ideone.com/plain"),
          method: "GET"
          }, function(error,response,body) {
            if (!error) message.channel.sendMessage("```\n"+body+"\n```");
          });
        command_cd["ideone.com"] = 1;
        setTimeout(function(){command_cd["ideone.com"] = 0;}, 5000);
      }
        
      else if (!command_cd["codepad.org"] && urllist[i].search(/http:\/\/codepad.org\/[a-zA-Z0-9]+|https:\/\/codepad.org\/[a-zA-Z0-9]+/g) == 0) {
        request({
          url: urllist[i]+"/raw.cpp",
          method: "GET"
          }, function(error,response,body) {
            if (!error) message.channel.sendMessage("```\n"+body+"\n```");
          });
        command_cd["codepad.org"] = 1;
        setTimeout(function(){command_cd["codepad.org"] = 0;}, 5000);
      }
    }
  }
  
  /*
  else {
      var str = "";
      for (var i = 0; i != message.content.length; i++)
        str += message.content[i]+" ";
      message.channel.sendMessage(str);
  }
  */
  /*
  else {
      message.channel.sendMessage(message.content);
  }
  */
  //message.channel.sendMessage(message.author.username);
});

bot.login(process.env.BOT_TOKEN);
