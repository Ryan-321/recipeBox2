var express = require("express");
var router = express.Router();
var flash = require('connect-flash');
var DB = require("../db/connection");
var Recipe = DB.models.Recipe;
var Comment = DB.models.Comment;
var User = DB.models.User;

router.get("/user/:id/recipes", function(req, res) {
    Recipe.findAll({
        where: {
            userId: req.params.id
        }
    }).then(function(recipes) {
        res.render("user/index", {
            recipes: recipes,
            userId: req.params.id
        })
    })
});

router.get("/user/:id/recipes/new", function(req, res) {
    res.render("user/new", {
        userId: req.params.id
    })
});

router.get("/user/:id/recipes/:recipeId", function(req,res) {
    var recipe;
    Recipe.findById(req.params.recipeId).then(function(recipe) {
        recipe = recipe;
        Comment.findAll({
            where: {
                recipeId: req.params.recipeId
            }
        }).then(function(comments) {
            res.render("user/show", {
                comments: comments,
                recipe: recipe,
                userId: req.params.id
            })
        })
    })
});

router.post("/user/:id/recipes", function(req, res) {
    Recipe.create(req.body)
        .then(function(recipe) {
            recipe.update({
                    userId: req.params.id
                })
                .then(function() {
                    res.redirect("/user/" + req.params.id + "/recipes");
                })
        })
});



module.exports = router;
