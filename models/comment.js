module.exports = function(sequelize, DataTypes) {
    return sequelize.define("comment", {
        content: DataTypes.TEXT,
        recipeId: DataTypes.INTEGER
    });
}