const Discord = require("discord.js");
const { PG } = require('pg');

const botDB_Client = new PG({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});


function change39(str) {
  return "CONCAT('"+str.replace(/'/g,"', chr(39), '")+"')";
}


module.exports = {
  
  newVar: function(varName, varValue, func) {
    botDB_Client.query("INSERT INTO Var_Table (var_name, value) VALUES ("+change39(varName)+", "+change39(varValue)+");", func);
  }
  
  updateVar: function(varName, varValue, func) {
    botDB_Client.query("UPDATE Var_Table SET value = "+change39(varName)+" WHERE var_name = "+change39(varValue)+";", func);
  }
  
  delVar: function(varName, func) {
    botDB_Client.query("DELETE FROM Var_Table SET WHERE var_name = "+change39(varName)+";", func);
  }
  
}
