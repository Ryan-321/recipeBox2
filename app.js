var express = require('express');
var app = express();

var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/public", express.static(__dirname + "/public"));
app.set("view engine", "hbs");
var methodOverride = require('method-override');
app.use(methodOverride('_method'));
var recipeController = require("./controllers/recipesController.js");

app.get("/", function(req,res){
  res.render("home");
});

app.use("/",recipeController);

app.listen(process.env.PORT || 3000, function(){
  console.log("Listening on port 3000");
});
