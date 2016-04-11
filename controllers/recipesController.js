var express = require("express");
var router = express.Router();
var flash = require('connect-flash');
var DB = require("../db/connection");
var Recipe = DB.models.Recipe;
var Comment = DB.models.Comment;


router.get("/recipes", function(req, res) {
    Recipe.findAll().then(function(recipes) {
        res.render("recipe/index", {
            recipes: recipes,
            message: req.flash('firstTimer'),
            message: req.flash('welcomeBack'),
            userId: req.user.id  // need a guest url to avoid this breaking app
        });
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
                comments: comments
            });
        });
    });
});





router.get("/recipes/:id/edit", function(req, res) {
    Recipe.findById(req.params.id).then(function(recipe) {
        if (!recipe) return error(res, "not found");
        res.render("recipe/edit", {
            recipe: recipe
        });
    });
});

router.put("/recipes/:id", function(req, res) {
    Recipe.findById(req.params.id)
        .then(function(recipe) {
            if (!recipe) return error(res, "not found");
            return recipe.updateAttributes(req.body)
        })
        .then(function(recipe) {
            res.render("recipe/show", {
                recipe: recipe
            });
        });
});

// Below for adding a comment
router.post("/recipes/:id", function(req, res) {
    Comment.create({
        content: req.body.content,
        recipeId: req.params.id
    }).then(function() {
        res.redirect("/recipes/" + req.params.id)
    })
});

router.delete("/recipes/:id", function(req, res) {
    Recipe.findById(req.params.id)
        .then(function(recipe) {
            if (!recipe) return error(res, "not found");
            return recipe.destroy()
        })
        .then(function() {
            res.redirect("/recipes")
        });
});


module.exports = router;
