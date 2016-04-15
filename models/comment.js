module.exports = function(sequelize, DataTypes) {
    return sequelize.define("comment", {
        content: {
          type: DataTypes.STRING,
          validate: {
            notEmpty: {
              msg: "Content is required"
            }
          }
        },
        recipeId: DataTypes.INTEGER
    });
}
