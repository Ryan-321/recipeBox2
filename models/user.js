// var Sequelize = require("sequelize");
// module.exports = function(db){
//   return db.define("user",{
//     username: Sequelize.STRING,
//     password: Sequelize.STRING
//   })
// };
// Above was Jesse's way of doing it.


module.exports = function(sequelize, DataTypes) {
    return sequelize.define("user", {
        username: DataTypes.STRING,
        password: DataTypes.STRING
    });
}
