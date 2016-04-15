module.exports = function(sequelize, DataTypes) {
    return sequelize.define("recipe", {
        title: {
          type: DataTypes.STRING,
          validate: {
            notEmpty: {
              msg: "Title is required"
            }
          }
        },
        photo_url: {
          type: DataTypes.STRING,
          validate: {
            notEmpty: {
              msg: "Photo URL required"
            }
          }
        },
        directions: {
          type: DataTypes.TEXT,
          validate: {
            notEmpty: {
              msg: "Directions Required"
            }
          }
        },
        ingredients: {
          type: DataTypes.TEXT,
          validate: {
            notEmpty: {
              msg: "Ingredients Required"
            }
          }
        },
        userId: DataTypes.INTEGER
    }, {
        instanceMethods: {
            inputUser: function(recipe, user) {
                recipe.userId = user;
                recipe.save()
            }
        }
    })
};
