var express = require("express");
var router = express.Router();
var DB = require("../db/connection");
var Recipe = DB.models.Recipe;


router.get("/recipes", function(req, res){
  Recipe.findAll().then(function(recipes){
    res.render("recipe/index", {recipes: recipes});
  });
});
module.exports = router;
