var express = require("express");
var router = express.Router();
var flash = require('connect-flash');
var DB = require("../db/connection");
var Recipe = DB.models.Recipe;
var Comment = DB.models.Comment;

router.get("/guest",function(req,res){
  Recipe.findAll({order: [["createdAt", "DESC"]]}).then(function(recipes){
    res.render("recipe/guest",{
      recipes: recipes
    })
  }).catch(function(err) {
      res.send(500)
  });
});
// Guest can view feed
router.get("/guestGet", function(req,res){
  res.render("recipe/guestGet")
})

router.get("/recipes", function(req, res) {
    Recipe.findAll({order: [["createdAt", "DESC"]]}).then(function(recipes) {
        res.render("recipe/index", {
            recipes: recipes,
            message: req.flash('firstTimer'),
            message: req.flash('welcomeBack'),
            userId: req.user.id  // need a guest url to avoid this breaking app
        });
    }).catch(function(err) {
        res.send(500)
    });
});

router.get("/recipes/:id", function(req, res) {
    var recipe;
    Recipe.findById(req.params.id).then(function(recipe) {
        recipe = recipe;
        Comment.findAll({
            where: {
                recipeId: req.params.id
            }
        }).then(function(comments) {
            res.render("recipe/show", {
                recipe: recipe,
                comments: comments,
                userId: req.user.id
            });
        }).catch(function(err) {
            res.send(500)
        });
    }).catch(function(err) {
        res.send(500)
    });
});

module.exports = router;
