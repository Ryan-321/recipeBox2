var express = require("express");
var router = express.Router();
var passport = require("passport");
var bcrypt = require("bcrypt-nodejs");
var DB = require("../db/connection");
var User = DB.models.User;


// Sign Up page
router.get("/signup", function(req, res) {
    res.render("auth/signup")
});

// Sign In page
router.get("/signin", function(req, res) {
    res.render("auth/signin")
});

// Sign Out page
router.get("/signout", function(req, res) {
    req.session.destroy();
    res.redirect("/");
});

// Creating User
router.post("/signup", function(req, res, callback) {
    User.findOne({
        where: {
            username: req.body.username
        }
    }).then(function(user) {

        if (!user) {
            User.create({
                username: req.body.username,
                password: bcrypt.hashSync(req.body.password)
            }).then(function(user) {
                passport.authenticate("local", {
                    failureRedirect: "/signup",
                    successRedirect: "/user/" + user.id + "/recipes"
                })(req, res, callback)
            })
        } else {
            res.render("static/exists")
        }
    })
});

// User sign in
router.post("/signin", function(req, res, next) {
            passport.authenticate('local', function(err, user, info) {
                if (err) {
                    return next(err);
                }
                if (!user) {
                    return res.redirect('/signin');
                }
                req.logIn(user, function(err) {
                    if (err) {
                        return next(err);
                    }
                    return res.redirect('/user/' + user.id + "/recipes");
                });
            })(req, res, next);
        });

        module.exports = router;
