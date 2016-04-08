var DB = require("./connection");
// var User = require("../models/user")(DB)

DB.db_connection.sync({force: true}).then(function(){
  process.exit();
});
