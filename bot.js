const Discord = require("discord.js");
const { Client } = require('pg');
var fs = require('fs');
var request = require("request");
var sync_request = require("sync-request");
const imagemin = require('imagemin');
const pngToJpeg = require('png-to-jpeg');
var GoogleImages = require("google-images");
var cmd = require("node-cmd");
var safeEval = require("notevil");
const {c, cpp, node, python, java} = require("compile-run");
var math = require("mathjs");
math.import(require("mathjs-simple-integral"));

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});
client.connect();

var bot = new Discord.Client();
var GoogleImagesClient = new GoogleImages(process.env.GoogleCSE_TOKEN, process.env.GoogleAPI_TOKEN);

var cd = 3000;
var noteMAXN = 16;
var user_cd = new Array();
var NakanoMiku = ["39", "３９", "三玖", "中野三玖", "三九", "三十九", "nakanomiku"];
var languages = ["!c", "!cpp", "!c++", "!python", "!py", "!python2", "!py2", "!python3", "!py3"];
var activities = {"p": "PLAYING", "s": "STREAMING", "l": "LISTENING", "w": "WATCHING"};

/*
function HappyNewYear() {
  bot.channels.get("527078660616749056").send("ヽ(≧▽≦)ﾉ｡+｡ﾟ☆ Happy New Year ☆ﾟ｡+｡ヽ(≧▽≦)ﾉ", {files:["./image/新年.png"]});
  bot.channels.get("396212584757592066").send("ヽ(≧▽≦)ﾉ｡+｡ﾟ☆ Happy New Year ☆ﾟ｡+｡ヽ(≧▽≦)ﾉ", {files:["./image/新年.png"]});
  bot.channels.get("387545955324657666").send("ヽ(≧▽≦)ﾉ｡+｡ﾟ☆ Happy New Year ☆ﾟ｡+｡ヽ(≧▽≦)ﾉ", {files:["./image/新年.png"]});
}
*/

function to02d(n) {
  if (n > 100)
    return n.toString();
  else
    return Math.floor(n/10).toString() + (n%10).toString();
}

bot.on("ready", function() {
  /*
  cmd.get(
    "apt-get install libc6-dev",
    function(err, data, stderr) {
      if (!err)
        console.log("done!");
      else
        console.log("err:\n"+err);
    }
  );
  */
  bot.user.setActivity("《OwO bot 使用手冊》", {type: "WATCHING"});
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
  
  var isself = message.author.id == process.env.OwObot_ID;
  var owner = message.author.id == process.env.OwO_ID;
  var guild = message.guild.name;
  var channel = message.channel.name;
  var nickname = message.guild.members.get(message.author.id).nickname ? message.guild.members.get(message.author.id).nickname : message.author.username;
  
  if (!isself)
    console.log("----------------\n群組: "+guild+" / 頻道: "+channel+" / 留言者: "+nickname+"\n"+message.content);
  
  if (/*message.author.bot ||*/ user_cd[message.author.id]) return ;
  
  
  var lowermessage = message.content.toLowerCase();
  var args = message.content.replace(/(^\s*)|(\s*$)/g,"").split(/\s+/g);
  var lowerargs = lowermessage.replace(/(^\s*)|(\s*$)/g,"").split(/\s+/g);
  var urllist = message.content.match(/http(|s):\/\/[^\s\.]*\.[^\s]*/g);
  
  var head = args[0], end = args[args.length-1]; 
  var headlower = args[0].toLowerCase(), endlower = args[args.length-1].toLowerCase();

  
  if(!isself && headlower == "!test") {
    message.channel.send("本機正常運作中... ...");
  }
  
  else if (owner && headlower == "!a") {
    var comm = "const {c, cpp, node, python, java} = require(\"compile-run\"); 10+10";
    console.log(comm);
    var mmm = safeEval(comm);
    console.log(mmm);
    message.channel.send(mmm);
    /*
    c.runSource("#include <stdio.h>\nint main() {\n    puts(\"OwO\");\n}",{executionPath: "", stdin: ""})
    .then(result => {
      var resultmessage = result.stdout;
      var stderrmessage = result.stderr;
      message.channel.send("resultmessage:\n"+resultmessage);
      message.channel.send("stderrmessage:\n"+stderrmessage);
    })
    .catch(err => {
      message.channel.send("QQ\n\n"+err);
    });
    */
  }
  
  else if (owner && headlower == "!b") {
    //var ccode = message.content.substring(headlower.length);
    try {
      var saf = safeEval(
        `
        var {c, cpp, node, python, java} = require("compile-run");
        var mse = "QAQ";
        c.runSource("#include <stdio.h>\nint main() {\n    int n = 10; scanf(\"%d\", n), printf(\"%d\\n\", n), puts(\"OwO\");\n}",{compilationPath: "g++", stdin: "5"})
        .then(result => {
          var resultmessage = result.stdout;
          mse = "resultmessage:\n"+resultmessage;
        })
        .catch(err => {
          mse = "QQ\n\n"+err;
        });
        mse
        `
      )
      message.channel.send(saf);
    }
    catch(e) {
      message.channel.send(e);
    }
  }
  
  else if (owner && headlower == "!cmd") {
    var cmdcommand = message.content.substring(headlower.length);
    cmd.get(
      cmdcommand,
      function(err, data, stderr) {
        if (!err && !stderr) {
          var cmdmessage = data;
          if (cmdmessage.length < 1900)
            message.channel.send("完成~~~  OwO/\n\ncmd訊息：\n```\n"+cmdmessage+"\n```");
          else {
            //message.channel.send("完成~~~  OwO/\n\ncmd訊息：\n```\n"+cmdmessage.substring(0,1900)+"\n訊息太長以下省略...\n```");
            message.channel.send("完成~~~  OwO/\n\ncmd訊息：");
            for (var i = 0; i < cmdmessage.length; i += 1900)
              message.channel.send("```\n"+cmdmessage.substring(i,i+1900)+"\n```");
          }
          //console.log("done!\n"+data);
        }
        else {
          var errormessage = err ? err.toString() : stderr;
          //console.log("err:\n"+err);
          if (errormessage.length < 1900)
            message.channel.send("發生錯誤!!\n\n錯誤訊息：\n```\n"+errormessage+"\n```");
          else {
            message.channel.send("完成~~~  OwO/\n\ncmd訊息：");
            for (var i = 0; i < errormessage.length; i += 1900)
              message.channel.send("```\n"+errormessage.substring(i,i+1900)+"\n```");
            //message.channel.send("發生錯誤!!\n\n錯誤訊息：\n```\n"+errormessage.substring(0,1900)+"\n訊息太長以下省略...\n```");
          }
        }
      }
    );
  }
  
  else if (owner && headlower == "!db") {
    var db_command = message.content.substring(headlower.length).replace(/(^\s*)|(\s*$)/g,"");
    if (db_command[db_command.length-1] != ";")
      db_command += ";";
    console.log("----------------");
    console.log(db_command);
    client.query(db_command, (err, res) => {
      if (!err) {
        console.log(res);
        /*
        for (let row of res.rows) {
          message.channel.send(JSON.stringify(row));
        }
        */
      }
      else {
        message.channel.send("QAQ");
        console.log(err);
      }
    });
  }
  
  else if (owner && headlower == "!sba") {
    if (args.length < (urllist ? 4 : 3) || lowerargs[1] == "s" && urllist && urllist[0] != args[2]) {
      message.channel.send("指令有誤啦！(╯‵□ˊ)╯︵┴─┴\n格式: !sba [活動類型] ([直播網址](限STREAMING)) [活動名稱]");
    }
    else if (!(lowerargs[1] in activities)) {
      message.channel.send("活動類型有誤啦！(╯‵□ˊ)╯︵┴─┴\n活動類型:\nP - PLAYING\nS - STREAMING\nL - LISTENING\nW - WATCHING");
    }
    else {
      var activitytype = activities[lowerargs[1]];
      var activityurl = (lowerargs[1] == "s" && urllist ? urllist[0] : "");
      var setbotact = message.content.substring(activityurl ? message.content.indexOf(activityurl)+activityurl.length : headlower.length+2).replace(/(^\s*)|(\s*$)/g,"");
      //console.log(setbotact);
      //console.log(activitytype);
      //console.log(activityurl);
      bot.user.setActivity(setbotact, activityurl ? {type: activitytype, url: activityurl} : {type: activitytype});
      message.channel.send("設定為: "+activitytype+" "+setbotact);
    }
  }
  
  else if (headlower == "!id") {
    message.channel.send(nickname+"的ID為: "+message.author.id);
  }
  
  else if (headlower == "!me" || headlower == "!whoami") {
    var roles = message.member.roles.array();
    var rolename = "";
    for (var key in roles) {
      if (roles[key].name != "@everyone")
        rolename += ", "+roles[key].name;
    }
    if (rolename.length)
      message.channel.send(nickname+"是**"+guild+"**中的: "+rolename.substring(2));
    else
      message.channel.send(nickname+"不屬於**"+guild+"**中的任何身分組");
  }
  
  else if (!isself && headlower == "!say") {
    message.channel.send(message.content.substring(5));
  }
  
  else if (!isself && headlower.indexOf("...") == 0 && headlower == ".".repeat(headlower.length)) {
    message.channel.send("別無言了，本機在此有話直說 😐");
  }
  
  else if (NakanoMiku.indexOf(headlower) != -1 || NakanoMiku.indexOf(endlower) != -1) {
    var mikumessage = ["三玖天下第一", "三玖是天", "三玖三玖得第一"];
    var richembed = new Discord.RichEmbed().setColor(11068927).setTitle("**"+mikumessage[Math.floor(Math.random()*mikumessage.length)]+"!!  (*´∀`)～♥**").setImage("https://raw.githubusercontent.com/OwOb/OwO-bot/master/image/39/"+to02d(Math.floor(Math.random()*12)+1)+".jpg");
    message.channel.send(richembed);
  }
  
  else if (!isself && (headlower == "3210" || message.content.indexOf("新年快樂") != -1 || lowermessage.indexOf("happy new year") != -1)) {
    message.channel.send("ヽ(≧▽≦)ﾉ｡+｡ﾟ☆ Happy New Year ☆ﾟ｡+｡ヽ(≧▽≦)ﾉ", {files:["./image/新年.png"]});
  }
  
  else if (headlower == "emt") {
    message.channel.send("愛蜜莉雅簡直是天使！");
  }
  
  else if (headlower == "san") {
    message.channel.send("＼(・ω・＼)SAN値！(／・ω・)／ピンチ！");
  }
  
  else if (headlower == "罷工" || headlower == "\罷工/" || message.content.indexOf("\ 罷工 /") == 0) {
    message.channel.send("我們絕對不要工作，自由就是最棒的！\ 罷工 /\ 罷工 /\ 罷工 /\ 罷工 /");
  }
  
  else if (headlower == "單身狗") {
    message.channel.send("汪汪汪... ?");
  }
  
  else if (headlower == "四月" || headlower == "4月" || headlower == "４月" || headlower == "april") {
    var richembed = new Discord.RichEmbed().setTitle("四月是你的胃痛，四月一日正式上映❤️").setImage("https://raw.githubusercontent.com/OwOb/OwO-bot/master/image/%E5%9B%9B%E6%9C%88.jpg");
    message.channel.send(richembed);
  }
  
  else if (!isself && (headlower == "新增筆記" || headlower == "!newnote" || headlower == "!addnote")) {
    var matchTitle = message.content.substring(0, message.content.indexOf("`", message.content.indexOf("`")+1)+1).match(/\s*(新增筆記|!newnote|!addnote)\s*`(.|\n)+`/);
    var noteNewNo = 1;
    var noteNewDetail = message.content.substring(matchTitle ? matchTitle[0].length : headlower.length).replace(/(^\s*)|(\s*$)/g,"");
    var noteNewTitle = matchTitle ? matchTitle[0].split("`")[1].replace(/(^\s*)|(\s*$)/g,"").replace(/\s+/g," ") : "";
    
    if (!noteNewDetail)
      message.channel.send("根本就沒有內容是要本機紀錄什麼啦！(╯‵□ˊ)╯︵┴─┴\n指令格式: "+headlower+" (**`筆記標題`**) [筆記內容]");
    else if (noteNewTitle && noteNewTitle.length >= 64)
      message.channel.send("由於本機的記憶體很小！所以只能記錄標題小於64字的筆記！十分抱歉！( > 人 <  ; )");
    else if (noteNewDetail.length >= 1600)
      message.channel.send("由於本機的記憶體很小！所以只能記錄內容小於1600字的筆記！十分抱歉！( > 人 <  ; )");
    else {
      client.query("SELECT * FROM Note_Table WHERE user_id = "+message.author.id+";", (err, res) => {
        if (!err) {
          var rows = res.rows;
          if (rows.length >= noteMAXN)
            message.channel.send("由於本機的記憶體很小！所以一人最多擁有"+noteMAXN.toString()+"份筆記！十分抱歉！( > 人 <  ; )\n你已經達到持有筆記上限，還請刪除多餘的筆記！");
          else {
            var noteTitles = new Set();
            var noteNos = new Set();
            
            for (var row of rows) {
              noteTitles.add(row.note_title.replace(/(^\s*)|(\s*$)/g,""));
              noteNos.add(row.note_no);
            }
            for (noteNewNo = 1; noteNewNo <= noteMAXN; noteNewNo++)
              if (!noteNos.has(noteNewNo))
                break;
            
            if (noteTitles.has(noteNewTitle))
              message.channel.send("你已經擁有相同標題的筆記 **`"+noteNewTitle+"`** 了！請刪除原筆記或者換另一個標題名稱！");
            else {
              if (!noteNewTitle)
                noteNewTitle = nickname+"的筆記"+to02d(noteNewNo);
              client.query("INSERT INTO Note_Table (user_id, note_no, note_title, note_detail) VALUES ("+message.author.id+", "+noteNewNo.toString()+", CONCAT('"+noteNewTitle.replace(/'/g,"', chr(39), '")+"'), CONCAT('"+noteNewDetail.replace(/'/g,"', chr(39), '")+"'));", (err, res) => {
                if (!err)
                  message.channel.send("筆記編號 **"+to02d(noteNewNo)+"** : 筆記 **`"+noteNewTitle+"`** 已成功儲存！ OwO/");
                else
                  message.channel.send("Oops!! 好像發生了點錯誤... 等待本機修復... 🛠");
              });
              
            }
          }
        }
        else
          message.channel.send("Oops!! 好像發生了點錯誤... 等待本機修復... 🛠");
      });
    }
  }
  
  else if (!isself && (headlower == "我的筆記" || headlower == "!mynote")) {
    client.query("SELECT * FROM Note_Table WHERE user_id = "+message.author.id+";", (err, res) => {
      if (!err) {
        var rows = res.rows;
        var noteList = [];
        
        if (rows.length) {
          for (var row of rows)
            noteList.push([row.note_no, row.note_title.replace(/(^\s*)|(\s*$)/g,"")]);
          noteList.sort(function (a, b) { return a[0]-b[0]; });
          var notes = "根據本機不可靠的記憶體來看，你擁有以下 "+rows.length.toString()+" 份筆記:\n\n";
          for (var note of noteList)
            notes += "筆記編號 **"+to02d(note[0])+"** : **`"+note[1]+"`**\n";
          message.channel.send(notes);
        }
        else
          message.channel.send("別想愚弄本機！你根本就沒有筆記！O3O");
      }
      else
        message.channel.send("Oops!! 好像發生了點錯誤... 等待本機修復... 🛠");
    });
  }
  
  else if (!isself && (headlower == "筆記" || headlower == "!note")) {
    var matchTitle = message.content.substring(0, message.content.indexOf("`", message.content.indexOf("`")+1)+1).match(/\s*(筆記|!note)\s*`(.|\n)+`/);
    var noteFindNo = !matchTitle && /^(|-)\d+$/.test(args[1]) ? parseInt(args[1]) : null;
    var noteFindTitle = matchTitle ? matchTitle[0].split("`")[1].replace(/(^\s*)|(\s*$)/g,"").replace(/\s+/g," ") : "";
    
    if (!noteFindTitle && noteFindNo == null)
      message.channel.send("指令格式有誤啦！(╯‵□ˊ)╯︵┴─┴\n指令格式: "+headlower+" [**`筆記標題`**/筆記編號]");
    else if (!noteFindTitle && noteFindNo <= 0)
      message.channel.send("別想愚弄本機！筆記編號一定是正整數！O3O");
    else if (!noteFindTitle && noteFindNo > noteMAXN)
      message.channel.send("別想愚弄本機！筆記編號不可能超過"+noteMAXN.toString()+"！O3O");
    else {
      client.query("SELECT * FROM Note_Table WHERE user_id = "+message.author.id+";", (err, res) => {
        if (!err) {
          var rows = res.rows;
          var noteFind = null;
          
          if (noteFindTitle) {
            for (var row of rows) {
              if (row.note_title.replace(/(^\s*)|(\s*$)/g,"") == noteFindTitle) {
                noteFind = row;
                break;
              }
            }
          }
          else {
            for (var row of rows) {
              if (row.note_no == noteFindNo) {
                noteFind = row;
                break;
              }
            }
          }
          
          if (noteFind)
            message.channel.send("筆記編號 **"+to02d(noteFind.note_no)+"** / 標題 **`"+noteFind.note_title.replace(/(^\s*)|(\s*$)/g,"")+"`**\n\n"+noteFind.note_detail.replace(/(^\s*)|(\s*$)/g,""));
          else if (noteFindTitle)
            message.channel.send("別想愚弄本機！你根本就沒有標題為 **`"+noteFindTitle+"`** 的筆記！O3O");
          else
            message.channel.send("別想愚弄本機！你根本就沒有編號為 **"+to02d(noteFindNo)+"** 的筆記！O3O");
        }
        else
          message.channel.send("Oops!! 好像發生了點錯誤... 等待本機修復... 🛠");
      });
    }
  }
  
  else if (!isself && (headlower == "刪除筆記" || headlower == "!delnote")) {
    var matchTitle = message.content.substring(0, message.content.indexOf("`", message.content.indexOf("`")+1)+1).match(/\s*(筆記|!note)\s*`(.|\n)+`/);
    var noteFindNo = !matchTitle && /^(|-)\d+$/.test(args[1]) ? parseInt(args[1]) : null;
    var noteFindTitle = matchTitle ? matchTitle[0].split("`")[1].replace(/(^\s*)|(\s*$)/g,"").replace(/\s+/g," ") : "";
    
    client.query("SELECT * FROM Note_Table WHERE user_id = "+message.author.id+";", (err, res) => {
      if (!err) {
        var rows = res.rows;
        var noteFind = null;
        
        if (!rows.length)
          message.channel.send("別想愚弄本機！你根本就沒有筆記是要刪除什麼啦！");
        else if (!noteFindTitle && noteFindNo == null)
          message.channel.send("指令格式有誤啦！(╯‵□ˊ)╯︵┴─┴\n指令格式: "+headlower+" [**`筆記標題`**/筆記編號]");
        else if (!noteFindTitle && noteFindNo <= 0)
          message.channel.send("別想愚弄本機！筆記編號一定是正整數！O3O");
        else if (!noteFindTitle && noteFindNo > noteMAXN)
          message.channel.send("別想愚弄本機！筆記編號不可能超過"+noteMAXN.toString()+"！O3O");
        
        else {
          if (noteFindTitle) {
            for (var row of rows) {
              if (row.note_title.replace(/(^\s*)|(\s*$)/g,"") == noteFindTitle) {
                noteFind = row;
                break;
              }
            }
          }
          else {
            for (var row of rows) {
              if (row.note_no == noteFindNo) {
                noteFind = row;
                break;
              }
            }
          }
          
          if (noteFind) {
            client.query("DELETE FROM Note_Table WHERE user_id = "+message.author.id+" AND "+(noteFindTitle ? "note_title = CONCAT('"+noteFindTitle.replace(/'/g,"', chr(39), '")+"')" : "note_no = "+noteFindNo.toString()), (err, res) => {
              if (!err)
                message.channel.send("筆記編號 **"+to02d(noteFind.note_no)+"** : 筆記 **`"+noteFind.note_title.replace(/(^\s*)|(\s*$)/g,"")+"`** 已成功刪除！ OwO/");
              else
                message.channel.send("Oops!! 好像發生了點錯誤... 等待本機修復... 🛠");
            });
          }
          else if (noteFindTitle)
            message.channel.send("別想愚弄本機！你根本就沒有標題為 **`"+noteFindTitle+"`** 的筆記！O3O");
          else
            message.channel.send("別想愚弄本機！你根本就沒有編號為 **"+to02d(noteFindNo)+"** 的筆記！O3O");
        }
      }
      else
        message.channel.send("Oops!! 好像發生了點錯誤... 等待本機修復... 🛠");
    });
  }
  
  else if (/*!isself*/ owner && headlower == "!tex") {
    var texCommand = message.content.substring(headlower.length).replace(/(^\s*)|(\s*$)/g,"").replace(/\%/g,"%25").replace(/\s+/g,"%20").replace(/\+/g,"%2B").replace(/=/g,"%3D").replace(/\&/g,"%26").replace(/\|/g,"%7C").replace(/#/g,"%23");
    try {
      var res = sync_request("GET", "http://latex2png.com/?latex="+texCommand, {timeout : 500}).body.toString();
      var imageURL = "http://latex2png.com/"+res.match(/\/output\/\/latex_[0-9a-f]+\.png/);
      var imageName = "./"+imageURL.match(/latex_[0-9z-f]+\.png/);
      request(imageURL).pipe(fs.createWriteStream("./"+imageName)).on("close", function(){
        imagemin(["./"+imageName], "build/images", {
          plugins: [
            pngToJpeg({quality: 85})
          ]
        }).then((file) => {
          console.log('PNGs converted to JPEGs:', file);
        });
      });
      message.channel.send({files:[imageURL]});
    }
    catch (e) {
      message.channel.send("Oops!! 好像發生了點錯誤... 等待本機修復... 🛠");
      console.log(e);
    }
  }
  
  else if (!isself && (message.content.indexOf("什麼是") == 0 || headlower == ("!google"))) {
    if (message.content.indexOf("什麼是") == 0)
      message.channel.send("https://www.google.com.tw/search?q="+message.content.substring("什麼是".length).replace(/\%/g,"%25").replace(/\+/g,"%2B").replace(/=/g,"%3D").replace(/\&/g,"%26").replace(/\|/g,"%7C").replace(/#/g,"%23").replace(/(^[\s||\?]*)|([\s||\?]*$)/g,"").replace(/[\s||\?]+/g,"+").replace(/(\？*$)/g,""));
    else
      message.channel.send("https://www.google.com.tw/search?q="+message.content.substring("!google".length).replace(/\%/g,"%25").replace(/\+/g,"%2B").replace(/=/g,"%3D").replace(/\&/g,"%26").replace(/\|/g,"%7C").replace(/#/g,"%23").replace(/(^[\s||\?]*)|([\s||\?]*$)/g,"").replace(/[\s||\?]+/g,"+").replace(/(\？*$)/g,""));
  }
  
  else if (!isself && (headlower == "圖片搜尋" || headlower == "google圖片" || headlower == "!image")) {
    var search = message.content.substring(headlower.length).replace(/(^\s*)|(\s*$)/g,"").replace(/\s+/g," ");
    GoogleImagesClient.search(search)
    .then(images => {
      if (images.length > 0) {
        var index = Math.floor(Math.random()*images.length);
        var richembed = new Discord.RichEmbed().setColor(3447003).setTitle("**"+search.replace(/\\/g,"\\\\").replace(/\*/g,"\\*").replace(/~/g,"\\~").replace(/\_/g,"\\_").replace(/`/g,"\\`")+"**").setImage(images[index]["url"]).setFooter(images[index]["url"]);
        message.channel.send(richembed);
      }
      else
        message.channel.send("本機找不到符合的圖片... ╮(╯_╰)╭");
    })
    .catch(error => {
      message.channel.send("Oops!! 好像發生了點錯誤... 等待本機修復... 🛠");
      console.log(error);
    });
  }
  
  else if (message.content.indexOf("蛤") == 0) {
    message.channel.send({files:["./image/蛤.png"]})
  }
  
  else if (!isself && (headlower == "選擇" || headlower == "!choose")) {
    var chooses = message.content.substring(headlower.length).split(",");
    var truechooses = [];
    for (var i in chooses) {
      var n = chooses[i].replace(/(^\s*)|(\s*$)/g,"");
      if (n)
        truechooses.push(n);
    }
    if (truechooses.length == 0)
      message.channel.send("沒給選項本機要選什麼啦！(╯‵□ˊ)╯︵┴─┴");
    else if (truechooses.length == 1)
      message.channel.send("只給一個選項本機要選什麼啦！(╯‵□ˊ)╯︵┴─┴");
    else
      message.channel.send(truechooses[Math.floor(Math.random()*truechooses.length)]);
  }
  
  else if (headlower == "數加百列") {
    try {
      var res = sync_request("GET", "https://twitch.center/customapi/quote?token=469f651b&no_id=1", {timeout : 500}).body.toString();
      var count = parseInt(res);
      var res = sync_request("GET", "https://twitch.center/customapi/editquote?token=00bacf764ec2ec4a&data=1%20"+(count+1), {timeout : 500}).body.toString();
      message.channel.send("本機已經數了 "+count+" 隻加百列～ (っ﹏-) .｡o", {files:["./image/加百列.jpg"]});
    }
    catch (e) {
      message.channel.send("本機數累了... 讓本機休息一下... (っ﹏-) .｡o");
    }
  }
  
  else if (!isself && (headlower == "魔法少女" || headlower == "馬猴燒酒")) {
    message.channel.send(nickname+"和本機簽訂契約，成為魔法少女吧！／人◕ ‿‿ ◕人＼");
  }
  
  else if (!isself && languages.indexOf(headlower) != -1) {
    var language = "";
    if (headlower == "!c")
      language = "c";
    else if (headlower == "!cpp" || headlower == "!cpp")
       language = "cpp";
    else if (headlower == "!python2" || headlower == "!py2")
      language = "python2";
    else
      language = "python3";
    var codeS = lowermessage.indexOf("```");
    if (codeS < 0) {
      message.channel.send("沒給code是要本機執行什麼啦!! (╯‵□ˊ)╯︵┴─┴")
    }
    else {
      codeS += lowermessage.substring(codeS).indexOf("\n")+1;
      var codeE = codeS+lowermessage.substring(codeS).indexOf("```");
      var inputS = codeE+3+lowermessage.substring(codeE+3).indexOf("```");
      var inputcode = "";
      if (inputS > codeE+3) {
        inputS = inputS+lowermessage.substring(inputS).indexOf("\n")+1;
        inputcode = message.content.substring(inputS,inputS+message.content.substring(inputS).indexOf("```"));
      }
      //console.log("language="+language+" codeS="+codeS+" codeE="+codeE+" inputS="+inputS);
      //console.log("code:\n"+message.content.substring(codeS,codeE));
      //console.log("inputcode:\n"+inputcode);
      var lastTime = new Date();
      (language == "c" ? c : language == "cpp" ? cpp : python).runSource(message.content.substring(codeS,codeE)+"\n", {executionPath: language == "python3" ? language : "", stdin: inputcode})
      .then(result => {
        if (!result.errorType) {
          var resultmessage = result.stdout;
          if (resultmessage != "") {
            //console.log(resultmessage);
            if (resultmessage.length < 1900)
              message.channel.send("code成功執行\\~\\~\\~  OwO/\n\n執行結果：\n```\n" + resultmessage + "\n```");
            else {
              var sss = "code成功執行\\~\\~\\~  OwO/\n\n執行結果：\n```\n" + resultmessage.substring(0,1900) + "\n\n訊息太長以下省略...\n```";
              //console.log("sss:\n"+sss);
              message.channel.send(sss);
            }
          }
          else {
            message.channel.send("code成功執行\\~\\~\\~  OwO/\n但好像沒有輸出... ?  = =?");
          }
        }
        else {
          var nowTime = new Date();
          if (nowTime.getTime()-lastTime.getTime() >= 3000) {
            message.channel.send("**TLE** 執行超過3秒了!! 你確定這code會結束?? O3O");
          }
          else {
            var errorType = result.errorType == "compile-time" || result.errorType == "pre-compile-time" ? "**CE** 編譯錯誤!! " : "**RE** 執行時錯誤!! ";
            var stderrmessage = result.stderr;
            if (stderrmessage.length < 1900)
              message.channel.send(errorType+"請確認code的正確性!!  O3O\n\n錯誤訊息：\n```\n"+stderrmessage+"\n```");
            else
              message.channel.send(errorType+"請確認code的正確性!!  O3O\n\n錯誤訊息：\n```\n"+stderrmessage.substring(0,1900)+"\n\n訊息太長以下省略...\n```");
          }
        }
      })
      .catch(err => {
        var errormessage = err.toString();
        if (errormessage.length < 1900)
          message.channel.send("貌似遇到一些錯誤了... ?  ( ˘•ω•˘ )\n\n錯誤訊息如下：\n```\n"+ errormessage +"\n```");
        else
          message.channel.send("貌似遇到一些錯誤了... ?  ( ˘•ω•˘ )\n\n錯誤訊息如下：\n```\n"+ errormessage.substring(0,1900) +"\n\n訊息太長以下省略...\n```");
      });
    }
  }
  /*
  else if (message.content.indexOf("javascript") == 0) {
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
  }
  */
  else if (!isself && (headlower == "owo" || endlower == "owo")) {
    message.channel.send("-OwO- 喵？");
  }
  
  else if (!isself && (headlower == "-owo-" || endlower == "-owo-")) {
    message.channel.send("=OwO= 喵喵？");
  }
  
  else if (!isself && (headlower == "=owo=" || endlower == "=owo=")) {
    message.channel.send("≡OwO≡ 喵喵喵？");
  }
  
  else if (!isself && (headlower == "≡owo≡" || endlower == "≡owo≡")) {
    message.channel.send("≣OwO≣ 喵喵喵喵？");
  }
  
  else if (!isself && (headlower == "≣owo≣" || endlower == "≣owo≣")) {
    message.channel.send("OwO ？");
  }
  
  else if (lowermessage.indexOf("咚噠yo") != -1 || lowermessage.indexOf("咚~噠yo") != -1 || lowermessage.indexOf("咚～噠yo") != -1) {
    var index = Math.floor(Math.random()*2)+1;
    var richembed = new Discord.RichEmbed().setColor(14535382).setTitle("**咚噠YO!!**").setImage("https://raw.githubusercontent.com/OwOb/OwO-bot/master/image/%E5%92%9A%E5%99%A0YO_"+to02d(index)+".jpg").setFooter("《輝夜姬想讓人告白~天才們的戀愛頭腦戰~》"+(index == 1 ? "動畫 第04話" : "漫畫 第02卷 第18話"));
    message.channel.send(richembed);
  }
  
  else {
    var qcount = 0;
    for (i = message.content.length-1; (message.content[i] == 'Q' || message.content[i] == 'q' || message.content[i] == ' ' || message.content[i] == '\n') && i >= 0; i--)
        if (message.content[i] == 'Q' || message.content[i] == 'q')
            qcount++;
    if (!isself && qcount >= 2) {
      message.channel.send("別難過了\\~\\~\\~  😭\n本機會陪著你的\\~\\~\\~  "+message.content.substring(i+1, message.content.length).trim());
    }

    else if (!isself && (head.indexOf("😶") != -1 || end.indexOf("😶") != -1)) {
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

    else if (!isself && (message.content.indexOf("運算") == 0 ||  message.content.indexOf("calculate") == 0 || message.content.indexOf("calc") == 0)) {
      if (args.length == 1)
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
    
    else if (!isself && message.content.indexOf("誰是世界上最醜的人") != -1) {
      message.channel.send(nickname+"是世界上最醜的人~~~  OwO");
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
  user_cd[message.author.id] = 1;
  setTimeout(function(){user_cd[message.author.id] = 0;}, cd);
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
