var express = require("express");
var router = express.Router();
var DB = require("../db/connection");
var Recipe = DB.models.Recipe;
var Comment = DB.models.Comment;


router.get("/recipes", function(req, res){
  Recipe.findAll().then(function(recipes){
    res.render("recipe/index", {recipes: recipes});
  });
});

router.get("/recipes/new", function(req, res){
  Recipe.findAll().then(function(){
    res.render("recipe/new");
  });
});

router.get("/recipes/:id", function(req,res){
  Recipe.findById(req.params.id).then(function(recipe){
    res.render("recipe/show", {recipe: recipe});
  });
});

router.get("/recipes/:id/edit", function(req, res){
  Recipe.findById(req.params.id).then(function(recipe){
    if(!recipe) return error(res, "not found");
    res.render("recipe/edit", {recipe: recipe});
  });
});

router.put("/recipes/:id", function(req, res){
  Recipe.findById(req.params.id)
  .then(function(recipe){
    if(!recipe) return error(res, "not found");
    return recipe.updateAttributes(req.body)
  })
  .then(function(recipe){
    res.render("recipe/show", {recipe: recipe});
  });
});

router.post("/recipes", function(req, res){
  Recipe.create(req.body).then(function(){
    res.redirect("/recipes");
  });
});

router.delete("/recipes/:id", function(req, res){
  Recipe.findById(req.params.id)
  .then(function(recipe){
    if(!recipe) return error(res, "not found");
    return recipe.destroy()
  })
  .then(function(){
    res.redirect("/recipes")
  });
});


module.exports = router;
