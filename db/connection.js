var Sequelize = require("sequelize");
var db_connection = new Sequelize(process.env.DATABASE_URL || "postgres:///recipe_db");
var Recipe = db_connection.import("../models/recipe");
var Comment = db_connection.import("../models/comment");
var User = db_connection.import("../models/user");

Comment.belongsTo(Recipe);
Recipe.hasMany(Comment);

Recipe.belongsTo(User);
User.hasMany(Recipe);



module.exports = {
    Sequelize: Sequelize,
    db_connection: db_connection,
    models: {
        Recipe: Recipe,
        Comment: Comment,
        User: User
    }
};
