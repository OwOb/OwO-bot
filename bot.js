const Discord = require("discord.js");
var request = require("request");
var math = require("mathjs");
math.import(require('mathjs-simple-integral'));

var bot = new Discord.Client();

var command_cd = new Array();

/*
function HappyNewYear() {
  bot.channels.get("527078660616749056").send("ヽ(≧▽≦)ﾉ｡+｡ﾟ☆ Happy New Year ☆ﾟ｡+｡ヽ(≧▽≦)ﾉ", {files:["./image/新年.png"]});
  bot.channels.get("396212584757592066").send("ヽ(≧▽≦)ﾉ｡+｡ﾟ☆ Happy New Year ☆ﾟ｡+｡ヽ(≧▽≦)ﾉ", {files:["./image/新年.png"]});
  bot.channels.get("387545955324657666").send("ヽ(≧▽≦)ﾉ｡+｡ﾟ☆ Happy New Year ☆ﾟ｡+｡ヽ(≧▽≦)ﾉ", {files:["./image/新年.png"]});
}
*/

bot.on("ready", function() {
  console.log("Ready");
  /*
  var nowTime = new Date();
  var newYear = new Date("2019/01/01 00:00:00");
  var timeZone = nowTime.getTimezoneOffset();
  var t = newYear.getTime()-28800000-nowTime.getTime()+timeZone*60000-100;
  if (t >= 0)
    setTimeout(HappyNewYear, t);
  */
});

bot.on("message", function(message) {
  
  if (message.author.bot || command_cd[message.author.id]) return ;
  
  var lowermessage = message.content.toLowerCase();
  var agar = message.content.split(" ");
  var urllist = message.content.match(/http:\/\/[^ \n]+|https:\/\/[^ \n]+/g);
  
  var head = agar[0], end = agar[agar.length-1]; 
  var headlower = agar[0].toLowerCase(), endlower = agar[agar.length-1].toLowerCase();
  var cd = 3000;
  
  if(headlower == "!test") {
    /*
    function limitEval(code, fnOnStop, opt_timeoutInMS) {
      var id = Math.random() + 1,
        blob = new Blob(
          ['onmessage=function(a){a=a.data;postMessage({i:a.i+1});postMessage({r:eval.call(this,a.c),i:a.i})};'],
          { type:'text/javascript' }
        ),
        myWorker = new Worker(URL.createObjectURL(blob));

      function onDone() {
        URL.revokeObjectURL(blob);
        fnOnStop.apply(this, arguments);
      }

      myWorker.onmessage = function (data) {
        var ddata = data.data;
        if (ddata) {
          if (ddata.i === id) {
            id = 0;
            onDone(true, ddata.r);
          }
          else if (ddata.i === id + 1) {
            setTimeout(function() {
              if (id) {
                myWorker.terminate();
                onDone(false);
              }
            }, opt_timeoutInMS || 1000);
          }
        }
      };

      myWorker.postMessage({ c: code, i: id });
    }

    limitEval("var a = 123; a", function(success, returnValue) {
      if (success) {
        message.channel.sendMessage("www");
      }
      else {
        message.channel.sendMessage("QQ");
      }
    }, 3000);
    */
    message.channel.send("本機正常運作中... ...");
  }
  
  else if(headlower == "!id") {
    message.channel.send(message.author.username+"的ID為: "+message.author.id);
  }
  
  else if(headlower == "!me") {
    var roles = message.member.roles.array();
    var rolename = "";
    for (var key in roles) {
      if (roles[key].name != "@everyone")
        rolename += ", "+roles[key].name;
    }
    if (rolename.length)
      message.channel.send(message.author.username+"是本頻道的: "+rolename.substring(2));
    else
      message.channel.send(message.author.username+"不屬於本頻道的任何身分組");
  }
  
  else if(headlower == "!say") {
    message.channel.send(message.content.substring(5));
  }
  
  else if(headlower.indexOf("...") == 0 && headlower == ".".repeat(headlower.length)) {
    message.channel.send("別無言了，本機在此有話直說 😐");
  }
  
  else if(headlower == "3210" || message.content.indexOf("新年快樂") != -1 || lowermessage.indexOf("happy new year") != -1) {
    message.channel.send("ヽ(≧▽≦)ﾉ｡+｡ﾟ☆ Happy New Year ☆ﾟ｡+｡ヽ(≧▽≦)ﾉ");
  }
  
  else if(headlower == "78+9") {
    message.channel.send("其實8+9就是... ...\n咳... 那是各位說的，可不是本機說的 😏");
  }
  
  else if(headlower == "8+9") {
    message.channel.send("8+9=義氣");
  }
  
  else if(headlower == "86") {
    message.channel.send("能超越86的人... 就是下面那位... ... 😏");
  }
  
  else if(message.content.indexOf("javascript") == 0) {
    /*
    try {
      var geval = eval, timer = setTimeout(function(){try {throw "TLE";} catch(TLEerror) {if(TLEerror == "TLE")message.channel.sendMessage("執行時間超過1s了！ 你確定這程式會結束？ O3O");}}, 1000);
      var javascripteval = geval(message.content.substring(10));
      message.channel.sendMessage(javascripteval);
    }
    catch(javascripterror) {
      if (javascripterror.name == "TLE")
        message.channel.sendMessage("執行時間超過1s了！ 你確定這程式會結束？ O3O");
      else
        message.channel.sendMessage("別想拿錯誤或跑不出結果的的程式碼來坑本機！ O3O");
    }
    */
  }
  
  else if (headlower == "owo" || endlower == "owo") {
    message.channel.send("-OwO- 喵？");
  }
  
  else if (headlower == "-owo-" || endlower == "-owo-") {
    message.channel.send("=OwO= 喵喵？");
  }
  
  else if (headlower == "=owo=" || endlower == "=owo=") {
    message.channel.send("≡OwO≡ 喵喵喵？");
  }
  
  else if (headlower == "≡owo≡" || endlower == "≡owo≡") {
    message.channel.send("≣OwO≣ 喵喵喵喵？");
  }
  
  else if (headlower == "≣owo≣" || endlower == "≣owo≣") {
    message.channel.send("OwO ？");
  }
  
  else {
    var qcount = 0;
    for (i = message.content.length-1; (message.content[i] == 'Q' || message.content[i] == 'q' || message.content[i] == ' ' || message.content[i] == '\n') && i >= 0; i--)
        if (message.content[i] == 'Q' || message.content[i] == 'q')
            qcount++;
    if (qcount >= 2) {
      message.channel.send("別難過了\\~\\~\\~  😭\n本機會陪著你的\\~\\~\\~  "+message.content.substring(i+1, message.content.length).trim());
    }

    else if (head.indexOf("😶") != -1 || end.indexOf("😶") != -1) {
      var counthead = head.match(/😶/g), countend = end.match(/😶/g);
      if (counthead == null)
        counthead = [];
      else if (head.length != counthead.length*"😶".length)
        counthead = [];
      if (countend == null)
        countend = [];
      else if (end.length != countend.length*"😶".length)
        countend = [];
      if (Math.max(counthead.length, countend.length) > 0) {
        message.channel.send("😶".repeat(Math.max(counthead.length, countend.length)+1));
      }
    }
    
    else if (message.content.indexOf("什麼是") == 0 ||  message.content.indexOf("!google") == 0 ) {
      if (message.content.indexOf("什麼是") == 0)
        message.channel.send("https://www.google.com.tw/search?q="+message.content.substring("什麼是".length).replace(/\%/g,"%25").replace(/\+/g,"%2B").replace(/=/g,"%3D").replace(/\&/g,"%26").replace(/\|/g,"%7C").replace(/#/g,"%23").replace(/(^[\s||\?]*)|([\s||\?]*$)/g,"").replace(/[\s||\?]+/g,'+').replace(/(\？*$)/g,""))
      else
        message.channel.send("https://www.google.com.tw/search?q="+message.content.substring("!google".length).replace(/\%/g,"%25").replace(/\+/g,"%2B").replace(/=/g,"%3D").replace(/\&/g,"%26").replace(/\|/g,"%7C").replace(/#/g,"%23").replace(/(^[\s||\?]*)|([\s||\?]*$)/g,"").replace(/[\s||\?]+/g,'+').replace(/(\？*$)/g,""))
    }
    
    else if (message.content.indexOf("蛤") == 0) {
      message.channel.send({files:["./image/蛤.png"]})
    }

    else if (message.content.indexOf("運算") == 0 ||  message.content.indexOf("calculate") == 0 || message.content.indexOf("calc") == 0) {
      if (agar.length == 1)
        message.channel.send("沒給算式本機要算什麼啦！(╯‵□ˊ)╯︵┴─┴");
      else {
        try {
          if (message.content.indexOf("運算") == 0)
            message.channel.send(math.format(math.eval(message.content.replace(/　/g," ").substring("運算".length).replace(/\'/g,"\"")), {precision: 14}));
          else if (message.content.indexOf("calculate") == 0)
            message.channel.send(math.format(math.eval(message.content.replace(/　/g," ").substring("calculate".length).replace(/\'/g,"\"")), {precision: 14}));
          else
            message.channel.send(math.format(math.eval(message.content.replace(/　/g," ").substring("calc".length).replace(/\'/g,"\"")), {precision: 14}));
        }
        catch(calculateerror) {
          message.channel.send("算式格式有誤啦！害本機算那麼久！(╯‵□ˊ)╯︵┴─┴");
        }
      }
    }

    else if (message.content.indexOf("誰是世界上最醜的人") != -1) {
      message.channel.send(message.author.username+"是世界上最醜的人~~~  OwO");
    }
    
  }
  
  if (urllist != null) {
    for (var i = 0; i < urllist.length; i++) {
      //message.channel.sendMessage(urllist[i]);
      if (urllist[i].search(/http:\/\/gist.github.com\/[a-zA-Z0-9\-]+\/[0-9a-f]+|https:\/\/gist.github.com\/[a-zA-Z0-9\-]+\/[0-9a-f]+/g) == 0) {
        request({
          url: urllist[i]+"/raw",
          method: "GET"
        }, function(error,response,body) {
          if (!error) message.channel.send("```\n"+body+"\n```");
        });
      }
      
      else if (urllist[i].search(/http:\/\/github.com\/[a-zA-Z0-9\-\.\/]+|https:\/\/github.com\/[a-zA-Z0-9\-\.\/]+/g) == 0) {
        if (urllist[i].substring(20).indexOf(".") != -1) {
          request({
            url: urllist[i].replace("github.com","raw.githubusercontent.com").replace("/blob",""),
            method: "GET"
            }, function(error,response,body) {
              if (!error) message.channel.send("```\n"+body+"\n```");
            });
        }
      }
      
      else if (urllist[i].search(/http:\/\/ideone.com\/[a-zA-Z0-9]+|https:\/\/ideone.com\/[a-zA-Z0-9]+/g) == 0) {
        request({
          url: urllist[i].replace("ideone.com","ideone.com/plain"),
          method: "GET"
          }, function(error,response,body) {
            if (!error) message.channel.send("```\n"+body+"\n```");
          });
      }
        
      else if (urllist[i].search(/http:\/\/codepad.org\/[a-zA-Z0-9]+|https:\/\/codepad.org\/[a-zA-Z0-9]+/g) == 0) {
        request({
          url: urllist[i]+"/raw.cpp",
          method: "GET"
          }, function(error,response,body) {
            if (!error) message.channel.send("```\n"+body+"\n```");
          });
      }
    }
  }
  command_cd[message.author.id] = 1;
  setTimeout(function(){command_cd[message.author.id] = 0;}, cd);
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
