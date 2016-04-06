var Sequelize = require("sequelize");
var db_connection = new Sequelize(process.env.DATABASE_URL || "postgres:///recipe_db");
var Recipe = db_connection.import("../models/recipe");
var Comment = db_connection.import("../models/comment");

Comment.belongsTo(Recipe);
Recipe.hasMany(Comment);

module.exports ={
  Sequelize: Sequelize,
  db_connection: db_connection,
  models: {
    Recipe: Recipe,
    Comment: Comment
  }
};
