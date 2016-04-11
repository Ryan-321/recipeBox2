module.exports = function(sequelize, DataTypes) {
    return sequelize.define("recipe", {
        title: DataTypes.STRING,
        photo_url: DataTypes.STRING,
        directions: DataTypes.TEXT,
        ingredients: DataTypes.TEXT,
        userId: DataTypes.INTEGER
    });
}