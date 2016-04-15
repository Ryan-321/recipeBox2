var express = require("express");
var router = express.Router();
var flash = require('connect-flash');
var DB = require("../db/connection");
var Recipe = DB.models.Recipe;
var Comment = DB.models.Comment;

// Index page
router.get("/user/:id/recipes", function(req, res) {
    Recipe.findAll({
        where: {
            userId: req.params.id
        },
        order: [
            ["createdAt", "DESC"]
        ]
    }).then(function(recipes) {
        res.render("user/index", {
            recipes: recipes,
            userId: req.params.id
        })
    }).catch(function(err) {
        res.send(500)
    })
});

// New page
router.get("/user/:id/recipes/new", function(req, res) {
  res.render("user/new", {
    userId: req.params.id
  })
});

// Show page
router.get("/user/:id/recipes/:recipeId", function(req, res) {
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
        }).catch(function(err) {
            res.send(500)
        })
    }).catch(function(err) {
        res.sendStatus(status)
    })
});

// Edit Page
router.get("/user/:id/recipes/:recipeId/edit", function(req, res) {
    Recipe.findById(req.params.recipeId).then(function(recipe) {
        if (!recipe) return error(res, "not found");
        res.render("user/edit", {
            recipe: recipe,
            userId: req.params.id
        });
    }).catch(function(err) {
        res.send(500)
    });
});

// Updating a recipe
router.put("/user/:id/recipes/:recipeId", function(req, res) {
    Recipe.findById(req.params.recipeId)
        .then(function(recipe) {
            if (!recipe) return error(res, "not found");
            return recipe.updateAttributes(req.body)
        })
        .then(function(recipe) {
            res.render("user/show", {
                recipe: recipe,
                userId: req.params.id
            });
        }).catch(function(err) {
            if (err.name === "SequelizeValidationError") {
                res.render("user/edit", {
                    recipe: Recipe.build(req.body),
                    userId: req.params.id,
                    errors: err.errors
                });
            } else {
                throw err;
            }
        }).catch(function(err) {
            res.send(500)
        });
});

// Creating a recipe
router.post("/user/:id/recipes", function(req, res) {
    Recipe.create(req.body)
        .then(function(recipe) {
            recipe.inputUser(recipe, req.params.id)  // instanceMethod
            res.redirect("/user/" + req.params.id + "/recipes");
        }).catch(function(err) {
            if (err.name === "SequelizeValidationError") {
                res.render("user/new", {
                    recipe: Recipe.build(req.body),
                    userId: req.params.id,
                    errors: err.errors
                });
            } else {
                throw err;
            }
        }).catch(function(err) {
            res.send(err)
        })
});

router.post("/user/:id/recipes/:recipeId", function(req, res) {
    Comment.create({
        content: req.body.content,
        recipeId: req.params.recipeId
    }).then(function() {
        res.redirect("/recipes/" + req.params.recipeId)
    })
});

// Deleting recipes
router.delete("/user/:id/recipes/:recipeId", function(req, res) {
    Recipe.findById(req.params.recipeId)
        .then(function(recipe) {
            if (!recipe) return error(res, "not found");
            return recipe.destroy()
        })
        .then(function() {
            res.redirect("/user/" + req.params.id + "/recipes")
        }).catch(function(err){
          res.send(500)
        })
});
module.exports = router;
