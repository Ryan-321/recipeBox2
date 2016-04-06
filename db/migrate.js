var DB = require("./connection");

DB.db_connection.sync({force: true}).then(function(){
  process.exit();
});
