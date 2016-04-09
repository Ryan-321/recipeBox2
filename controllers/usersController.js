var express = require("express");
var router = express.Router();
var passport = require("passport");
var bcrypt = require("bcrypt-nodejs");
var DB = require("../db/connection");
var User = DB.models.User;

// Authentication
router.get("/signup",function(req,res){
  res.render("auth/signup")
});

router.get("/signin",function(req,res){
  res.render("auth/signin")
});
router.get("/signout",function(req,res){
  req.session.destroy();
  res.redirect("/");
});

router.post("/signup", function(req,res,callback){
  User.findOne({
    where: {
      username: req.body.username
    }
  }).then(function(user){

    if(!user){
      User.create({
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password)
      }).then(function(user){
        passport.authenticate("local", {
          failureRedirect: "/signup",
          successRedirect: "/recipes"
        })(req,res,callback)
      })
    } else{
      res.send("user exists")
    }
  })
});
router.post("/signin", passport.authenticate("local", {
  failureRedirect: "/signin",
  successRedirect: "/recipes"
}));

module.exports = router;
